'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  Instagram, 
  Brain, 
  Settings, 
  Home,
  TrendingUp,
  Users,
  DollarSign,
  Menu,
  X,
  FolderOpen,
  LineChart
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'analytics', label: 'App Analytics', icon: BarChart3 },
  { id: 'content', label: 'Content Manager', icon: FolderOpen },
  { id: 'performance', label: 'IG Performance', icon: LineChart },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'campaigns', label: 'Campaigns', icon: TrendingUp },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'ai-insights', label: 'AI Insights', icon: Brain },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-custom border border-neutral-200"
      >
        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 shadow-custom-lg
        transform transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">AI Marketing</h1>
                <p className="text-xs text-neutral-500">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id)
                    setIsCollapsed(true) // Close mobile menu
                  }}
                  className={`
                    w-full sidebar-item
                    ${isActive ? 'active' : ''}
                  `}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">User</p>
                <p className="text-xs text-neutral-500 truncate">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
}