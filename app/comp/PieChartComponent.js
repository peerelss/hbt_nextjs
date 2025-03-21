"use client"; // 必须在 Next.js 15 中使用 "use client"
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "正常", value: 304 },
  { name: "风扇问题", value: 6 },
  { name: "温差过大", value: 2 },
];

const COLORS = ["#0088FE", "#FFBB28", "#FF8042"]; // 颜色数组

const PieChartComponent = ({total}) => {
    console.log("total", total);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true); // 在客户端渲染时设置为 true
    }, []);
  
    if (!isClient) {
      return null; // 在服务器端渲染时不渲染任何内容
    }
  return (
    <PieChart width={500} height={300}>
      <Pie
        data={total }
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
