'use client'

import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ChartData, GeographicData, DeviceData } from '@/types/dashboard'

interface DownloadsChartProps {
  data: ChartData[]
}

export function DownloadsChart({ data }: DownloadsChartProps) {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Downloads & Signups Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="downloadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="signupsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey="downloads"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#downloadsGradient)"
              name="Downloads"
            />
            <Area
              type="monotone"
              dataKey="signups"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#signupsGradient)"
              name="Signups"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

interface RevenueChartProps {
  data: ChartData[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Revenue Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

interface GeographicChartProps {
  data: GeographicData[]
}

export function GeographicChart({ data }: GeographicChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Downloads by Country</h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-neutral-500">No geographic data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Downloads by Country</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" fontSize={12} />
            <YAxis 
              type="category" 
              dataKey="country" 
              stroke="#64748b" 
              fontSize={12}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [value, 'Downloads']}
            />
            <Bar 
              dataKey="downloads" 
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

interface DeviceChartProps {
  data: DeviceData[]
}

export function DeviceChart({ data }: DeviceChartProps) {
  const COLORS = ['#3b82f6', '#10b981']

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Downloads by Platform</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="downloads"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [value, 'Downloads']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        {data.map((entry, index) => (
          <div key={entry.platform} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-neutral-600">
              {entry.platform} ({entry.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}