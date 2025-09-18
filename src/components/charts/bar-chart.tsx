"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface StatsBarChartProps<T extends Record<string, number | string>> {
  data: T[]
  xKey: keyof T
  yKey: keyof T
  color?: string
}

export function StatsBarChart<T extends Record<string, number | string>>({ 
  data, 
  xKey, 
  yKey, 
  color = "#10b981" 
}: StatsBarChartProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey={xKey as string} 
          tick={{ fontSize: 12 }} 
          tickLine={false} 
          axisLine={{ stroke: '#e5e7eb' }} 
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          tickLine={false} 
          axisLine={{ stroke: '#e5e7eb' }} 
        />
        <Tooltip />
        <Bar dataKey={yKey as string} fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}