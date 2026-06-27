import { client } from '../index';

export async function createUser(username: string, password: string, name: string) {
  const query = `INSERT INTO users (username, password, name)
                VALUES ($1, $2, $3)
                RETURNING *`
 const values = [username, password, name]
 const response = await client.query(query, values)
 return response.rows[0]
}

export async function getUser(id: number) {
  const query = `SELECT * FROM users
                 WHERE id=$1`
 const values = [id]
 const response = await client.query(query, values)
 return response.rows[0]
}