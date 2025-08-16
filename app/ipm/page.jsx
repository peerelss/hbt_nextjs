"use client";
import { useEffect, useState } from "react";

export default function EditIPs() {
  const [ipText, setIpText] = useState("");
  const [boxId, setBoxId] = useState("");
  const [ipCount, setIpCount] = useState(0);
  const [messages, setMessages] = useState([]);

  // 获取数据库里的IP数量
  async function fetchIpCount() {
    const res = await fetch("/api/miners");
    const data = await res.json();
    setIpCount(data.length);
  }

  useEffect(() => {
    fetchIpCount();
  }, []);

  // 删除 IP
  async function handleDelete() {
    const ipList = ipText
      .split("\n")
      .map((ip) => ip.trim())
      .filter((ip) => ip.length > 0);

    if (ipList.length === 0) {
      alert("请输入 IP 列表");
      return;
    }

    const res = await fetch("/api/miners", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ips: ipList }),
    });

    const result = await res.json();
    setMessages(result.messages || []);
    fetchIpCount();
  }

  // 添加 IP
  async function handleAdd() {
    const ipList = ipText
      .split("\n")
      .map((ip) => ip.trim())
      .filter((ip) => ip.length > 0);

    if (!boxId) {
      alert("请输入矿箱 ID");
      return;
    }
    if (ipList.length === 0) {
      alert("请输入 IP 列表");
      return;
    }

    const res = await fetch("/api/miners", {
      method: "ADD",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boxId, ips: ipList }),
    });

    const result = await res.json();
    setMessages(result.messages || []);
    fetchIpCount();
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 左边：文本区域 */}
      <div>
        <h2 className="text-xl font-bold mb-2">IP 列表</h2>
        <textarea
          className="w-full h-96 border rounded-lg p-2 text-sm"
          value={ipText}
          onChange={(e) => setIpText(e.target.value)}
          placeholder="每行输入一个IP"
        />
      </div>

      {/* 右边：操作区域 */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1">矿箱 ID</label>
          <input
            type="text"
            className="border rounded-lg w-full p-2"
            value={boxId}
            onChange={(e) => setBoxId(e.target.value)}
            placeholder="输入矿箱 ID"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">数据库 IP 数量</label>
          <input
            type="text"
            className="border rounded-lg w-full p-2 bg-gray-100"
            value={ipCount}
            readOnly
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            添加
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            删除
          </button>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">操作结果</h3>
          <ul className="text-sm text-gray-700 mt-2 space-y-1">
            {messages.map((msg, i) => (
              <li key={i}>• {msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
