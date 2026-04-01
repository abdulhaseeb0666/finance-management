import React from 'react'
import { useContext } from 'react'
import { FinanceContext } from '../../context/FinanceContext';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { financeData } from '../../data/financeData';

const SpendingPieChart = () => {
    const finance = financeData;
    if(!finance) return <p>Loading...</p>

    const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={finance.spendingByCategory}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {finance.spendingByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
  )
}

export default SpendingPieChart
