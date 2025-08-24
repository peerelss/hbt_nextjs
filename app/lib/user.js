import clientPromise from "./mongodb"
import bcrypt from "bcrypt"



// 注册用户
export async function createUser(username, password) {
    const client = await clientPromise
    const db = client.db()
    const exist = await db.collection("users").findOne({ username })
    if (exist) return null

    const hashed = await bcrypt.hash(password, 10)
    const user = { username, password: hashed }
    const result = await db.collection("users").insertOne(user)
    console.log(result)
    return { ...user, _id: result.insertedId }
}

// 验证用户
export async function verifyUser(username, password) {
    const client = await clientPromise
    const db = client.db()
    const user = await db.collection("users").findOne({ username })
    if (!user) return null
    const valid = await bcrypt.compare(password, user.password)
    return valid ? user : null
}
