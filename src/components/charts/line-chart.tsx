"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

type LineSeries = {
  dataKey: string
  color?: string
  name?: string
}

interface StatsLineChartProps<T extends Record<string, number | string>> {
  data: T[]
  xKey: keyof T
  series: LineSeries[]
}

export function StatsLineChart<T extends Record<string, number | string>>({ 
  data, 
  xKey, 
  series 
}: StatsLineChartProps<T>) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
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
        {series.map((s) => (
          <Line 
            key={s.dataKey} 
            type="monotone" 
            dataKey={s.dataKey} 
            stroke={s.color || "#3b82f6"} 
            strokeWidth={2} 
            dot={false} 
            name={s.name} 
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}