import { client } from '../index';

export async function createPost(userId: number, content: string) {
 const query = `INSERT INTO posts (user_id, content)
                VALUES ($1, $2)
                RETURNING *`
 const values = [userId, content]
 const response = await client.query(query, values)
 return response.rows[0] 
}

export async function likePost(userId: number, postId: number) {
 const query = `INSERT INTO likes (user_id, post_id)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING`
 const values = [userId, postId]
 const response = await client.query(query, values)
 return response.rows[0]
}

export async function getFeed() {
 const query = `SELECT 
                    p.id, p.content, 
                    p.created_at, u.username, 
                    COUNT(l.id)::int AS like_count
                FROM posts p JOIN users u
                ON p.user_id = u.id
                LEFT JOIN likes l 
                ON l.post_id = p.id
                GROUP BY p.id, u.username
                ORDER BY p.created_at DESC`
 const response = await client.query(query)
 return response.rows
}