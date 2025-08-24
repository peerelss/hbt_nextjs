import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { verifyUser } from "../../lib/user"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
    const { username, password } = await req.json()
    const user = await verifyUser(username, password)
    if (!user) {
        return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 })
    }
    console.log(user)
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "2h" })

    const res = NextResponse.json({ ok: true })
    res.cookies.set("token", token, { httpOnly: true, path: "/" })
    return res
}
