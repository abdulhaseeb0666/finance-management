import React from 'react'
import { useContext } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { FinanceContext } from '../../context/FinanceContext';

const SpendingPieChart = () => {
    const finance = useContext(FinanceContext);

    if(!finance) return <p>Loading...</p>

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
    
    </div>
  )
}

export default SpendingPieChart
