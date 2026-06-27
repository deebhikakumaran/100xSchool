import { client } from '../index';

export async function createTask(projectId: number, title: string, dueDate: string) {
 const query = `INSERT INTO tasks (project_id, title, due_Date)
                VALUES ($1, $2, $3)
                RETURNING *`
 const values = [projectId, title, dueDate]
 const response = await client.query(query, values)
 return response.rows[0]
}

export async function updateTask(taskId: number, completed: boolean) {
 const query = `UPDATE tasks
                SET completed=$2
                WHERE id=$1
                RETURNING *`
 const values = [taskId, completed]
 const response = await client.query(query, values)
 return response.rows[0]
}

export async function getTasks(projectId: number) {
    const query = `SELECT * FROM tasks
                   WHERE project_id=$1`
    const values = [projectId]
    const response = await client.query(query, values)
    return response.rows
}