'use client'

import { Download, UserPlus, Instagram, TrendingUp, Clock } from 'lucide-react'
import { ActivityItem } from '@/types/dashboard'

interface RecentActivityProps {
  activities: ActivityItem[]
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'download':
      return <Download className="w-4 h-4" />
    case 'signup':
      return <UserPlus className="w-4 h-4" />
    case 'post':
      return <Instagram className="w-4 h-4" />
    case 'campaign':
      return <TrendingUp className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case 'download':
      return 'bg-primary-100 text-primary-600'
    case 'signup':
      return 'bg-secondary-100 text-secondary-600'
    case 'post':
      return 'bg-pink-100 text-pink-600'
    case 'campaign':
      return 'bg-accent-100 text-accent-600'
    default:
      return 'bg-neutral-100 text-neutral-600'
  }
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">Recent Activity</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
          >
            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-900 font-medium">
                {activity.description}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-neutral-500">{activity.timestamp}</p>
                {activity.value && (
                  <span className="text-xs font-medium text-secondary-600">
                    +${activity.value}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
          <p className="text-neutral-600 text-sm">No recent activity</p>
        </div>
      )}
    </div>
  )
}