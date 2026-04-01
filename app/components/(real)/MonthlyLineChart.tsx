import React from 'react'
import { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FinanceContext } from '../../context/FinanceContext';

const MonthlyLineChart = () => {
    const finance = useContext(FinanceContext);

    if(!finance) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

    </div>
  )
}

export default MonthlyLineChart
