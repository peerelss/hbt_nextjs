"use client";
import { useEffect, useState } from "react";

export default function HashratePage() {
    const [miners, setMiners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/hash");
            const data = await res.json();
            setMiners(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) return <div>加载中...</div>;

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">矿机算力列表</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-200 text-sm sm:text-base">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-1">序号</th>
                        <th className="border px-2 py-1">名称</th>
                        <th className="border px-2 py-1">值</th>
                        <th className="border px-2 py-1">算力</th>
                        <th className="border px-2 py-1">时间戳</th>
                    </tr>
                    </thead>
                    <tbody>
                    {miners.map((miner, index) => (
                        <tr key={miner._id} className="hover:bg-gray-50">
                            <td className="border px-2 py-1">{index + 1}</td>
                            <td className="border px-2 py-1">{miner.name}</td>
                            <td className="border px-2 py-1">{miner.value}</td>
                            <td className="border px-2 py-1">{miner.hashrate}</td>
                            <td className="border px-2 py-1">{miner.timestamp}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
