"use client"; // 必须在 Next.js 15 中使用 "use client"
import React, { useEffect, useState } from "react";
import "handsontable/dist/handsontable.full.css"; // 引入 Handsontable 样式
import { HotTable } from "@handsontable/react";
import { Button } from '@mui/material';
import { useParams } from "next/navigation";
import ExcelTable from "../../comp/ExcelTable";
import PieChartComponent from "../../comp/PieChartComponent";
export default function Home({boxId}) {
    console.log("boxId", boxId);    
    const params = useParams();
    const box_no=params.boxId;
    return (
        <div>
            <h1>Product ID: {box_no}</h1>;
            <ExcelTable box_no={box_no} />
        </div>
    );
}