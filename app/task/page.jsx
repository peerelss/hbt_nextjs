"use client";
import {useEffect, useState} from "react";
import Head from "next/head";

export default function TaskPage() {
    const [miners, setMiners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchMiners() {
            try {
                const res = await fetch("/api/task");
                if (!res.ok) {
                    throw new Error("请求失败");
                }
                const data = await res.json();
                if (Array.isArray(data) && data.length === 0) {
                    setError("🎉 恭喜，无可用任务。");
                } else {
                    setMiners(data);
                }
            } catch (err) {
                console.error(err);
                setError("❌ 请求失败，请联系管理员。");
            } finally {
                setLoading(false);
            }
        }

        fetchMiners();

        // 自动刷新
        const interval = setInterval(fetchMiners, 10000); // 每10秒刷新
        return () => clearInterval(interval);
    }, []);





    const exportToCSV = () => {
        if (!miners || miners.length === 0) return;

        // 去掉 _id，只保留其他字段
        const headers = ["序号", ...Object.keys(miners[0]).filter((k) => k !== "_id")];

        const rows = miners.map((miner, index) => {
            return [
                index + 1, // 序号
                ...Object.keys(miner)
                    .filter((k) => k !== "_id")
                    .map((h) => JSON.stringify(miner[h] ?? "")),
            ].join(",");
        });

        const csvContent = [headers.join(","), ...rows].join("\n");

        // 创建 Blob 并触发下载
        const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "miners_task.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return <p className="text-center text-gray-500">加载中...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <>
            <title>矿机任务列表</title>

            <div className="p-4 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">矿机任务列表</h1>
                <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    导出 CSV
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                    最后刷新时间: {lastUpdate}
                </p>

                <div className="overflow-x-auto">
                    <table
                        className="table-auto w-full border border-gray-200 dark:border-gray-700 text-sm sm:text-base">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-800 dark:text-gray-200">序号</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-800 dark:text-gray-200">IP</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-800 dark:text-gray-200">哈希率</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-800 dark:text-gray-200">状态</th>
                            <th className="border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-800 dark:text-gray-200">时间戳</th>
                        </tr>
                        </thead>
                        <tbody>
                        {miners.map((miner, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <td className="border border-gray-200 dark:border-gray-700 px-2 py-1 text-center text-gray-800 dark:text-gray-200">
                                    {index + 1}
                                </td>
                                <td className="border border-gray-200 dark:border-gray-700 px-2 py-1 break-words text-gray-800 dark:text-gray-200">
                                    {miner.ip}
                                </td>
                                <td className="border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-800 dark:text-gray-200">
                                    {miner.hash_rate}
                                </td>
                                <td
                                    className={`border border-gray-200 dark:border-gray-700 px-2 py-1 ${
                                        miner.status === "success"
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-500 dark:text-red-400"
                                    }`}
                                >
                                    {miner.status}
                                </td>
                                <td className="border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-800 dark:text-gray-200">
                                    {miner.timestamp}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}
