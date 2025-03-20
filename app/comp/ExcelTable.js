"use client"; // 必须在 Next.js 15 中使用 "use client"

import React, {  useEffect,useState } from "react";
import "handsontable/dist/handsontable.full.css"; // 引入 Handsontable 样式
import { HotTable } from "@handsontable/react";

export default function ExcelTable({ box_no }) {
    console.log("box_no",box_no)
  const [data, setData] = useState([
    ["ID", "姓名", "年龄", "邮箱"],
    [1, "张三", 25, "zhangsan@example.com"],
    [2, "李四", 30, "lisi@example.com"],
    [3, "王五", 28, "wangwu@example.com"],
  ]);
  useEffect(() => {
    fetch("/api/users/"+box_no) // 假设后端提供了此 API
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("获取数据失败:", err));
  //  fetch("/api/users/"+box_no) // 假设后端提供了此 API
}, []);
  return (
    <div style={{ padding: "20px" }}>
      <HotTable
        data={data}
        colHeaders={["ip", "算力", "状态", "更新时间"]}
        rowHeaders={true}
        colWidths={200} 
        licenseKey="non-commercial-and-evaluation"
      />
    </div>
  );
}
