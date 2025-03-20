"use client"; // 必须在 Next.js 15 中使用 "use client"
import PieChartComponent from "../comp/PieChartComponent";
import React, { useEffect, useState } from "react"; 
import "handsontable/dist/handsontable.full.css"; // 引入 Handsontable 样式
import { Button } from '@mui/material';
import ExcelTable from "../comp/ExcelTable";
export default function Home() {
    const o_data = { normal: 272, "电源问题": 1, "温差过大": 7, "高温问题": 3, "风扇问题": 5, "离线": 1 }
    const [data, setData] = useState([
        { name: "正常", value: 304 },
        { name: "风扇问题", value: 6 },
        { name: "温差过大", value: 2 },
    ]);
    const box_no = '11';
    return <div>
        <div>
            <ExcelTable box_no={box_no} />
        </div>

    </div>;
}
