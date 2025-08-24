import { NextResponse } from "next/server"
import { createUser } from "../../lib/user"

export async function POST(req) {
    const { username, password } = await req.json()
    if (!username || !password) {
        return NextResponse.json({ error: "用户名或密码不能为空" }, { status: 400 })
    }

    const user = await createUser(username, password)
    if (!user) {
        return NextResponse.json({ error: "用户名已存在" }, { status: 400 })
    }

    return NextResponse.json({ ok: true, user: { _id: user._id, username: user.username } })
}
