"use client"; // 必须在 Next.js 15 中使用 "use client"
import { Button } from '@mui/material';
import React, { useEffect, useState } from "react";
import "handsontable/dist/handsontable.full.css"; // 引入 Handsontable 样式
import { HotTable } from "@handsontable/react";

export default function ExcelTable({ box_no }) {
    console.log("box_no", box_no)
    const [data, setData] = useState([
        ["ID", "姓名", "年龄", "邮箱"],
        [1, "张三", 25, "zhangsan@example.com"],
        [2, "李四", 30, "lisi@example.com"],
        [3, "王五", 28, "wangwu@example.com"],
    ]);
    const [odata,setOdata] = useState([]);
    useEffect(() => {
        fetch("/api/users/" + box_no) // 假设后端提供了此 API
            .then((res) => res.json())
            .then((data) => {
                setOdata(odata); //原始数据
                const sortedData = data.sort((a, b) => a.status.localeCompare(b.status));
                setData([...sortedData].reverse());
                console.log("sortedData", sortedData);
            })
            .catch((err) => console.error("获取数据失败:", err));
        //  fetch("/api/users/"+box_no) // 假设后端提供了此 API
    }, [box_no]);
    const orderByIp = () => {
        const sortedData = data.sort((a, b) => a.ip.localeCompare(b.ip));
        setData([...sortedData]);
    };
    const orderByStatus = () => {
        const sortedData = data.sort((a, b) => a.status.localeCompare(b.status));
        setData([...sortedData].reverse());
    };
    return (

        <div style={{ padding: "20px" }}>
            <Button onClick={orderByIp}>按照ip排序</Button> <Button onClick={orderByStatus}>按照故障排序</Button>
            <HotTable
                data={data}
                colHeaders={["ip段","ip", "算力", "状态", "更新时间"]}
                rowHeaders={true}
                colWidths={200}
                licenseKey="non-commercial-and-evaluation"
            />
        </div>
    );
}
