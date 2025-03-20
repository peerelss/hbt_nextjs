"use client"; // 必须在 Next.js 15 中使用 "use client"
import React, { useEffect, useState } from "react";
import { RebootMiner } from '../lib/miner_tools';  // Import the function
export default function Home() {
    
    const [status, setStatus] = useState('');

  const handleRestart = async (ip) => {
    const result = await restartMiner(ip);
    setStatus(result.message); // Display result after restarting
  };

  return (
    <div>
      <h1>Restart Miner</h1>
      <button onClick={() => RebootMiner('10.12.1.25')}>Restart Miner 10.12.1.25</button>
      <p>Status: {status}</p>
    </div>
  );
}
