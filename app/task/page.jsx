"use client";
import {useEffect, useState} from "react";
import Head from "next/head";

export default function TaskPage() {
    const [miners, setMiners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(null);


    useEffect(() => {
        async function fetchMiners() {
            const res = await fetch("/api/task");
            const data = await res.json();
            setMiners(data);
            setLastUpdate(new Date().toLocaleTimeString());
            setLoading(false);
        }

        fetchMiners(); // 初始加载
        const intervalId = setInterval(fetchMiners, 5000); // 每 5 秒刷新
        return () => clearInterval(intervalId); // 卸载清除
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
        return <div className="text-center p-4">加载中...</div>;
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
                <p className="text-sm text-gray-500 text-center mb-4">
                    最后刷新时间: {lastUpdate}
                </p>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-200 text-sm sm:text-base">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">序号</th>
                            <th className="border px-2 py-1">IP</th>
                            <th className="border px-2 py-1">哈希率</th>
                            <th className="border px-2 py-1">状态</th>
                            <th className="border px-2 py-1">时间戳</th>
                        </tr>
                        </thead>
                        <tbody>
                        {miners.map((miner, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border px-2 py-1 text-center">{index + 1}</td>
                                <td className="border px-2 py-1 break-words">{miner.ip}</td>
                                <td className="border px-2 py-1">{miner.hash_rate}</td>
                                <td className="border px-2 py-1 text-red-500">
                                    {miner.status}
                                </td>
                                <td className="border px-2 py-1">{miner.timestamp}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
