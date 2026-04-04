import React, { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip , Legend } from 'recharts';
import type { FinanceContextType } from '../../context/FinanceContext';

type Params = {
  name : string,
  email : string
}

const COLORS = [
  "#FF6B6B", // red
  "#4ECDC4", // teal
  "#FFD93D", // yellow
  "#1A73E8", // blue
  "#9D4EDD", // purple
  "#F72585", // pink
];

const SpendingPieChart = (params : Params) => {
  const { name , email } = params;

  const [data, setdata] = useState<FinanceContextType>(
    localStorage && JSON.parse(localStorage.getItem("realData") || "null")
  )
  const [user, setuser] = useState(data?.users.find((user) => user.name === name && user.email === email) || null)
  const spendingsByCategory = user?.spendingByCategory || [];


  return (
  <div className="w-full h-75 flex items-center justify-center">
    
    {(!name || !email) ? (
      <p className="text-gray-400">
        No spendings data available
      </p>
    ) : (!user || spendingsByCategory.length === 0) ? (
      <p className="text-gray-400">
        No spendings found
      </p>
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={spendingsByCategory}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            innerRadius={50}
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {spendingsByCategory.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )}

  </div>
);
}

export default SpendingPieChart
