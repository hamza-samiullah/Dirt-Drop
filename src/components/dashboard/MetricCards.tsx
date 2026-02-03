'use client'

import { Download, UserPlus, TrendingUp, Star, DollarSign, Users } from 'lucide-react'
import { formatNumber, formatCurrency, formatPercentage, getChangeColor, getChangeIcon } from '@/lib/utils'
import { AppMetrics } from '@/types/dashboard'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  color: string
}

function MetricCard({ title, value, change, icon, color }: MetricCardProps) {
  return (
    <div className="metric-card group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 mb-2">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center text-sm ${getChangeColor(change)}`}>
              <span className="mr-1">{getChangeIcon(change)}</span>
              <span className="font-medium">{formatPercentage(Math.abs(change))}</span>
              <span className="ml-1 text-neutral-500">vs last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-200`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

interface MetricCardsProps {
  metrics: AppMetrics
  chartData?: any[]
}

export default function MetricCards({ metrics, chartData = [] }: MetricCardsProps) {
  // Calculate real change percentages from chart data
  const calculateChange = (currentValue: number, dataKey: string) => {
    if (!chartData || chartData.length < 14) return 0
    
    const lastWeek = chartData.slice(-7).reduce((sum, day) => sum + (day[dataKey] || 0), 0)
    const previousWeek = chartData.slice(-14, -7).reduce((sum, day) => sum + (day[dataKey] || 0), 0)
    
    if (previousWeek === 0) return lastWeek > 0 ? 100 : 0
    return ((lastWeek - previousWeek) / previousWeek) * 100
  }

  const cards = [
    {
      title: 'Total Downloads',
      value: formatNumber(metrics.totalDownloads),
      change: calculateChange(metrics.totalDownloads, 'downloads'),
      icon: <Download className="w-6 h-6 text-primary-600" />,
      color: 'bg-primary-100'
    },
    {
      title: 'Daily Downloads',
      value: formatNumber(metrics.dailyDownloads),
      change: chartData.length >= 2 ? 
        ((chartData[chartData.length - 1]?.downloads || 0) - (chartData[chartData.length - 2]?.downloads || 0)) / Math.max(1, chartData[chartData.length - 2]?.downloads || 1) * 100 : 0,
      icon: <TrendingUp className="w-6 h-6 text-secondary-600" />,
      color: 'bg-secondary-100'
    },
    {
      title: 'Total Signups',
      value: formatNumber(metrics.totalSignups),
      change: calculateChange(metrics.totalSignups, 'signups'),
      icon: <UserPlus className="w-6 h-6 text-accent-600" />,
      color: 'bg-accent-100'
    },
    {
      title: 'Conversion Rate',
      value: formatPercentage(metrics.conversionRate),
      change: 0, // Conversion rate is calculated, not trended
      icon: <Users className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-100'
    },
    {
      title: 'App Rating',
      value: metrics.averageRating.toFixed(1),
      change: 0, // Rating changes are typically small and not weekly
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      color: 'bg-yellow-100'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue),
      change: calculateChange(metrics.totalRevenue, 'revenue'),
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      color: 'bg-green-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <MetricCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  )
}