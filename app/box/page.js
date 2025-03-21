"use client"; // 必须在 Next.js 15 中使用 "use client"
import PieChartComponent from "../comp/PieChartComponent";
import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { getJSDocReturnType } from "typescript";
import { grey } from "@mui/material/colors";
export default function Home() {
    const [data, setData] = useState([]);
    const box_no_list = ['11', '12', '21', '22', '31', '32', '41', '42', '51', '52', '61', '62', '71', '72', '81', '82', '91', '92',
        '101', '102']
    useEffect(() => {
        fetch("/api/total") // 假设后端提供了此 API
            .then((res) => res.json())
            .then((data) => {
                const f_data = (formatData(data));
                setData(f_data)
                console.log("data", f_data);
            })
            .catch((err) => console.error("获取数据失败:", err));
        //  fetch("/api/users/"+box_no) // 假设后端提供了此 API
    }, []);

    const data1 = {
        "normal": 312,
        "电源问题": 2,
        "掉芯片": 2,
        "风扇问题": 3,
        "温差过大": 1,
        "离线": 1,
        "box_no": "12"
    };

    // Remove the 'box_no' key and prepare data for the pie chart


    const data2pie = (data) => {
        const pieChartData = Object.keys(data)
            .filter(key => key !== 'box_no') // Exclude box_no
            .map(key => ({ name: key, value: data[key] }));
        const sortedData = pieChartData.sort((a, b) => b.value - a.value);;
        return sortedData;
    }
    console.log("data2pie", data2pie(data1));
    const formatData = (data) => {
        return data.map((item) => {
            return { name: item.box_no, value: data2pie(item) }
        })
    }
    return <div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px", backgroundColor: grey }}>
            {data.map((item, index) => (
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition" key={index} onClick={() => console.log(item)}>
                    <h1 className="text-lg font-bold text-blue-500 text-center">{item.name}</h1>
                    <PieChartComponent total={item.value} />
                </div>
            ))}
        </div>

    </div>;
}
