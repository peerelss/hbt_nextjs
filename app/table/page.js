"use client"; // 必须在 Next.js 15 中使用 "use client"
import React, { useEffect, useState } from "react";
import "handsontable/dist/handsontable.full.css"; // 引入 Handsontable 样式
import { HotTable } from "@handsontable/react";
import { Button } from '@mui/material';
import ExcelTable from "../comp/ExcelTable";
import PieChartComponent from "../comp/PieChartComponent";
export default function Home() {
    const box_no_list = ['11', '12', '21', '22', '31', '32', '41', '42', '51', '52', '61', '62', '71', '72', '81', '82', '91', '92',
        '101', '102']
    const [box_no, setBox_no] = useState('11');
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        fetch("/api/users/" + box_no) // 假设后端提供了此 API
            .then((res) => res.json())
            .then((data) => {
                setData(data); setTotal(countStatus(data));
                //console.log("data", data);
                console.log("total", total);
            })
            .catch((err) => console.error("获取数据失败:", err));
    }, [box_no]);
    // 处理按钮点击事件
    const handleClick = (option) => {
        setBox_no(option); // 设置点击的字符串值
    };
    const countStatus = (data) => {
        const o_data = data.reduce((acc, item) => {
            acc[item.status] = (acc[item.status] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(o_data).map(([key, value]) => ({
            name: key,
            value: value,
        }));
    };

    return (
        <main>
            <div>   </div>
            <div>
                {box_no_list.map((item, index) => (
                    <Button key={index} onClick={() => handleClick(item)}>
                        {item}
                    </Button>
                ))}
                <div>
                    <h2>Selected Option: {box_no}</h2>
                </div>
            </div>
            <div>
                <h2>total: </h2>
            </div>
            <div>
                <PieChartComponent total={total} />
            </div>
            <div>
                <ExcelTable box_no={box_no} />
            </div>
        </main>
    );
}
