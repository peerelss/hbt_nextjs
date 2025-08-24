"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isRegister, setIsRegister] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const from = searchParams.get("from") || "/dashboard"

    const handleSubmit = async (e ) => {
        e.preventDefault()
        setError("")

        const api = isRegister ? "/api/register" : "/api/login"

        const res = await fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })

        const data = await res.json()
        if (res.ok) {
            router.push(from)
        } else {
            setError(data.error)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4">
                <h1 className="text-xl font-bold text-center">{isRegister ? "注册" : "登录"}</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    {isRegister ? "注册" : "登录"}
                </button>
                <p className="text-sm text-center mt-2 cursor-pointer text-blue-500" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "已有账号？登录" : "没有账号？注册"}
                </p>
            </form>
        </div>
    )
}
