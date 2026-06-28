const pool = require("../config/db")

const submitProblems = async (req, res) => {
    const userId = req.body.user_id
    const problemId = req.body.problem_id

    if(!userId || !problemId) return res.status(400).json({error: "user id or problem id is missing"})
    // check if userid and problemid already exists in db.

    const client = await pool.connect()

    try {
        await client.query("BEGIN")

        await client.query(`INSERT INTO submissions (user_id, problem_id)
                   VALUES ($1, $2)`, [userId, problemId])
        const problemResponse = await client.query(`SELECT course_id FROM problems
            WHERE id=$1`, [problemId])

        if(!problemResponse.rows.length) return res.status(400).json({error: "problem not found"})
        
        const totalResponse = await client.query(`SELECT COUNT(*) AS total FROM problems
                                        WHERE course_id=$1`, [problemResponse.rows[0].course_id])
        const solvedResponse = await client.query(`SELECT COUNT(DISTINCT p.id) as solved
                                FROM submissions s JOIN problems p
                                ON p.id = s.problem_id
                                WHERE s.user_id=$1 AND p.course_id=$2`, [userId, problemResponse.rows[0].course_id])
        
        const total = Number(totalResponse.rows[0].total)
        const solved=Number(solvedResponse.rows[0].solved)

        const completionPert = ((solved/total)*100).toFixed(2)

        await client.query(`INSERT INTO progress (user_id, course_id, completion_percentage)
                            VALUES ($1, $2, $3)
                            ON CONFLICT (user_id, course_id)
                            DO UPDATE SET completion_percentage=$3`, [userId, problemResponse.rows[0].course_id, completionPert])

        await client.query("COMMIT")
        return res.status(201).json({message: "submitted and progress updated successfully."})
    }
    catch(err) {
        await client.query("ROLLBACK")
        return res.status(500).json({error: err.message})
    }
    finally {
        await client.release()
    }
}

module.exports = {submitProblems}