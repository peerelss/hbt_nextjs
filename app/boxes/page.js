"use client";
import { useState, useEffect } from "react";

export default function BoxesPage() {
  const [miners, setMiners] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [boxIds, setBoxIds] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/miners");
      const data = await res.json();
      setMiners(data);

      // 去重矿箱 ID
      const uniqueBoxIds = [...new Set(data.map(m => m.miner_box_id))];
      setBoxIds(uniqueBoxIds);
    }
    loadData();
  }, []);

  const filteredIps = selectedBox
    ? miners.filter(m => m.miner_box_id == selectedBox).map(m => m.ip)
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
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">
            矿箱 {selectedBox} 的矿机 IP
          </h3>
          <ul className="list-disc pl-6">
            {filteredIps.map((ip, idx) => (
              <li key={idx} className="mb-1">{ip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
