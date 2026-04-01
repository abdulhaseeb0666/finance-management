import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FinanceContext } from '../../context/FinanceContext';
import { useContext } from 'react';
import { financeData } from '../../data/financeData';
const MonthlyLineChart = () => {
    const finance = financeData;

    if(!finance) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={finance.monthlySummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey="income"
                    stroke="#22C55E"
                    strokeWidth={2}
                  />
                  <Line
                    type="natural"
                    dataKey="expenses"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
  )
}

export default MonthlyLineChart
