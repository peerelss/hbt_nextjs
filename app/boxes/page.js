"use client";
import {useState, useEffect} from "react";

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
    ? miners.filter(m => m.box_id == selectedBox).map(m => m)
    : [];
  const totalHashrate = filteredIps.reduce((sum, m) => sum + (m.hash_rate || 0), 0);
  const totalPower = filteredIps.reduce((sum, m) => sum + (m.power_rt || 0), 0);
  const totalHashRate = filteredIps.reduce((sum, m) => sum + (m.hash_rate || 0), 0);
  const totalFactoryHash = filteredIps.reduce((sum, m) => sum + (m.factory_hash || 0), 0);
  const ratio = totalFactoryHash > 0 ? (totalHashRate / totalFactoryHash).toFixed(4) : "0";




  const online = filteredIps.filter(m => m.hash_rate > 0).length;
  const offline = filteredIps.length - online;
  const onlineRatio = filteredIps.length > 0 ? (online / filteredIps.length * 100).toFixed(1) : 0;
  const avgOnlinePower = online > 0 ? (totalPower / online).toFixed(2) : 0
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
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">矿机总览</h2>
        <p className="text-gray-700 dark:text-gray-300">
          总算力: {totalHashrate.toLocaleString()} TH/s
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          总功耗: {totalPower.toLocaleString()} W
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          在线矿机平均功耗: {avgOnlinePower} W
        </p>
        <p className="text-md mt-2 text-gray-700 dark:text-gray-300">
          在线矿机: <span className="text-green-600 dark:text-green-400">{online}</span> 台
          | 离线矿机: <span className="text-red-600 dark:text-red-400">{offline}</span> 台
          | 在线比例: <span className="text-blue-600 dark:text-blue-400">{onlineRatio}%</span>
        </p>
        <p>总算力: {totalHashRate.toFixed(3)} TH/s</p>
        <p>总理论算力: {totalFactoryHash.toFixed(3)} TH/s</p>
        <p>实际/理论比值: {ratio}</p>
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
              <th className="border px-2 py-1">理论值</th>
              <th className="border px-2 py-1">实际/理论比例</th>
              <th className="border px-2 py-1">功率</th>
              <th className="border px-2 py-1">状态</th>
              <th className="border px-2 py-1">时间戳</th>
            </tr>
            </thead>
            <tbody>
            {filteredIps.map((miner, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-2 py-1 text-center">{index + 1}</td>
                <td className="border px-2 py-1 break-words">{miner.ip}</td>
                <td className="border px-2 py-1">{miner.hash_rate}</td>
                <td className="border px-2 py-1">{miner.factory_hash}</td>
                <td className="border px-2 py-1">{(miner.hash_rate / miner.factory_hash* 100).toFixed(2) + "%"}</td>
                <td className="border px-2 py-1">{miner.power_rt}</td>
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
