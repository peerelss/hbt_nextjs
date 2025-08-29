"use client";
import {useEffect, useState} from "react";
import StatusBadge from '../comp/StatusBadge';

export default function HashratePage() {
  const [miners, setMiners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('正常');
  const theoreticalHash = {
    "tope1": 0.0019,          // TH/s
    "hashunion600": 122.95, // PH/s
    "topb1": 169.46          // PH/s
  };
  const toPHs = (hashrate) => {
    if (hashrate.includes("TH/s")) {
      return parseFloat(hashrate.replace("TH/s", "").trim()) / 1000;
    } else if (hashrate.includes("PH/s")) {
      return parseFloat(hashrate.replace("PH/s", "").trim());
    } else {
      return 0;
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload(); // 整个页面刷新
    }, 3 * 60 * 1000); // 每 10 秒刷新一次

    return () => clearInterval(interval); // 组件卸载时清理
  }, []);


  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/hash");
      const data = await res.json();
      if (!data || data.length === 0) {
        console.warn("API 返回为空，主机无反应");
        setMiners([]);
        setLoading(false);
        return;
      }
      const now = new Date();
      const tenMinutes = 10 * 60 * 1000;
      const firstTimestamp = new Date(data[0].timestamp);
      const diff = now - firstTimestamp;

      setStatus(diff > tenMinutes ? "主机无反应" : "正常");

      const processed = data.map((miner) => {
        const actualPH = toPHs(miner.hashrate);
        const theoretical = theoreticalHash[miner.name] || 0;
        const ratio = theoretical > 0 ? +(actualPH / theoretical).toFixed(4) : 0;
        return {...miner, theoretical, ratio};
      });

      setMiners(processed);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>加载中...</div>;

  // @ts-ignore
  // @ts-ignore
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4 flex items-center justify-center gap-3">
        矿机算力列表
        <StatusBadge status={status}/>
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="border px-2 py-1 dark:border-gray-700">序号</th>
            <th className="border px-2 py-1 dark:border-gray-700">名称</th>
            <th className="border px-2 py-1 dark:border-gray-700">值</th>
            <th className="border px-2 py-1 dark:border-gray-700">算力</th>
            <th className="border px-2 py-1 dark:border-gray-700">理论算力</th>
            <th className="border px-2 py-1 dark:border-gray-700">实际/理论比例</th>
            <th className="border px-2 py-1 dark:border-gray-700">时间戳</th>
          </tr>
          </thead>

          <tbody>
          {miners.map((miner, index) => (
            <tr key={miner._id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">{miner.name}</td>
              <td className="border px-2 py-1">{miner.value}</td>
              <td className="border px-2 py-1">{miner.hashrate}</td>
              <td className="border px-2 py-1">
                {miner.theoretical} {miner.theoretical >= 1 ? "PH/s" : "PH/s"}
              </td>
              <td className="border px-2 py-1">{miner.ratio}</td>
              <td className="border px-2 py-1">{miner.timestamp}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
