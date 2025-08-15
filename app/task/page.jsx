"use client";

import { useEffect, useState } from "react";

export default function MinersPage() {
  const [miners, setMiners] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchMiners() {
    const res = await fetch("/api/task");
    const data = await res.json();
    setMiners(data);
    setLoading(false);
  }

  // 先执行一次
  fetchMiners();

  // 每 5 秒刷新一次
  const intervalId = setInterval(fetchMiners, 5000);

  // 组件卸载时清除定时器
  return () => clearInterval(intervalId);
}, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-500">
        正在加载数据...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">矿机任务列表</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-semibold">IP 地址</th>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-semibold">算力</th>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-semibold">状态</th>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-semibold">时间戳</th>
            </tr>
          </thead>
          <tbody>
            {miners.map((miner) => (
              <tr key={miner._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 border-b text-gray-800">{miner.ip}</td>
                <td className="px-6 py-3 border-b text-gray-800">{miner.hash_rate}</td>
                <td
                  className={`px-6 py-3 border-b font-medium ${
                    miner.status?.includes("WinError")
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {miner.status}
                </td>
                  <td className="px-6 py-3 border-b text-gray-800">{miner.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
