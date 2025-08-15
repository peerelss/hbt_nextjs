"use client";
import { useState, useEffect } from "react";

export default function MinerPage() {
  const [miners, setMiners] = useState([]);
  const [ip, setIp] = useState("");
  const [boxId, setBoxId] = useState("");
  const [editId, setEditId] = useState(null);

  async function loadData() {
    const res = await fetch("/api/box");
    const data = await res.json();
    setMiners(data);
  }

  useEffect(() => { loadData(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      await fetch("/api/box", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ip, miner_box_id: boxId  }),
      });
    } else {
      await fetch("/api/box", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip, miner_box_id: boxId }),
      });
    }
    setIp("");
    setBoxId("");
    setEditId(null);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("确定删除?")) return;
    await fetch("/api/box", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadData();
  }

  function handleEdit(miner) {
    setIp(miner.ip);
    setBoxId(miner.miner_box_id);
    setEditId(miner._id);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">矿箱-矿机管理</h2>

      {/* 表单 */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 flex gap-4 items-center"
      >
        <input
          type="text"
          placeholder="IP 地址"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="矿箱 ID"
          value={boxId}
          onChange={(e) => setBoxId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {editId ? "更新" : "添加"}
        </button>
      </form>

      {/* 表格 */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">IP 地址</th>
              <th className="p-3">矿箱 ID</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {miners.map((m) => (
              <tr key={m._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.ip}</td>
                <td className="p-3">{m.miner_box_id}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500 transition"
                  >
                    修改
                  </button>
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
