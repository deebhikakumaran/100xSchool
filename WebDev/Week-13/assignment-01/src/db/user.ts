import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */

export async function createUser(
  username: string,
  password: string,
  name: string
) {
  const newUser = await client.query(
    `INSERT INTO users (username, password, name)
     VALUES ($1, $2, $3)
     RETURNING username, password, name
     `, [username, password, name])
  return newUser.rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */

export async function getUser(userId: number) {
 const user = await client.query(`
  SELECT * from users
  WHERE id=$1
  `, [userId])
 return user.rows[0];
}

