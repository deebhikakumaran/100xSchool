const pool = require("../config/db")

const getProgress = async (req, res) => {
    const { user_id } = req.query; 

    if (!user_id) {
        return res.status(400).json({ error: 'user_id query parameter is required' });
    }

    const client = await pool.connect();

    try {

        const response=await client.query(`SELECT c.title, p.completion_percentage
            FROM progress p JOIN users u ON p.user_id=u.id 
            JOIN courses c on p.course_id=c.id
            WHERE u.id=$1`, [user_id])

        if (response.rows.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(response.rows)

    }
    catch(err) {
        return res.status(500).json({error:err.message})
    }

}

module.exports={getProgress}