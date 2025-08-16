"use client";
import { useState, useEffect } from "react";

export default function BoxesPage() {
  const [miners, setMiners] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [boxIds, setBoxIds] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/boxes");
      const data = await res.json();
      setMiners(data);

      // 去重矿箱 ID
      const uniqueBoxIds = [...new Set(data.map(m => m.box_id))];
      setBoxIds(uniqueBoxIds);
    }
    loadData();
  }, []);

  const filteredIps = selectedBox
    ? miners.filter(m => m.box_id == selectedBox).map(m => m.ip)
    : [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">矿箱列表</h2>

      {/* 按钮列表 */}
      <div className="flex flex-wrap gap-3 mb-6">
        {boxIds.map(id => (
          <button
            key={id}
            onClick={() => setSelectedBox(id)}
            className={`px-4 py-2 rounded shadow text-white transition ${
              selectedBox == id ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {/* 显示 IP 列表 */}
      {selectedBox && (
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
      )}
    </div>
  );
}
