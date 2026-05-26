import { TrendingUp, TrendingDown, Users, DollarSign, FileText, RefreshCw, ArrowUpRight, MoreHorizontal } from 'lucide-react'

const stats = [
  { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true, icon: DollarSign, color: 'brand' },
  { label: 'Total Audience', value: '84,210', change: '+8.2%', up: true, icon: Users, color: 'emerald' },
  { label: 'Total Posts', value: '1,429', change: '+3.1%', up: true, icon: FileText, color: 'violet' },
  { label: 'Refunds', value: '$2,840', change: '-2.4%', up: false, icon: RefreshCw, color: 'rose' },
]

const recentActivity = [
  { name: 'Sarah Johnson', action: 'New subscriber', time: '2 min ago', avatar: 'SJ', color: 'from-pink-400 to-rose-500' },
  { name: 'Mark Williams', action: 'Requested refund', time: '18 min ago', avatar: 'MW', color: 'from-violet-400 to-purple-500' },
  { name: 'Alex Chen', action: 'New post published', time: '1 hr ago', avatar: 'AC', color: 'from-sky-400 to-blue-500' },
  { name: 'Priya Patel', action: 'Payout processed', time: '3 hr ago', avatar: 'PP', color: 'from-amber-400 to-orange-500' },
  { name: 'Tom Baker', action: 'New subscriber', time: '5 hr ago', avatar: 'TB', color: 'from-emerald-400 to-teal-500' },
]

const topPosts = [
  { title: 'Getting Started with React 18', views: '12.4k', revenue: '$840', trend: 18 },
  { title: 'Tailwind CSS Deep Dive', views: '9.8k', revenue: '$620', trend: 12 },
  { title: 'TypeScript for Beginners', views: '8.1k', revenue: '$510', trend: -3 },
  { title: 'Advanced State Management', views: '7.2k', revenue: '$480', trend: 7 },
]

const colorMap = {
  brand: 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400',
  emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  violet: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
  rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
}

function Sparkline({ up }) {
  const points = up
    ? '0,40 15,35 30,28 45,30 60,20 75,15 90,8 105,5'
    : '0,10 15,12 30,8 45,18 60,22 75,28 90,32 105,38'
  return (
    <svg viewBox="0 0 105 50" className="w-16 h-8" fill="none">
      <polyline
        points={points}
        stroke={up ? '#6172f3' : '#f43f5e'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back, Durgesh 👋</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-3 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live · May 26, 2026
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <div className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold ${stat.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                  {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.change}
                  <span className="text-gray-400 font-normal">vs last mo</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
                  <Icon size={18} />
                </div>
                <Sparkline up={stat.up} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Lower grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Top posts */}
        <div className="xl:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Top Performing Posts</h2>
            <button className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {topPosts.map((post, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                <span className="text-xs font-mono font-bold text-gray-300 dark:text-gray-700 w-4 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{post.views} views</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{post.revenue}</p>
                  <p className={`text-xs font-semibold ${post.trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {post.trend > 0 ? '+' : ''}{post.trend}%
                  </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
              <MoreHorizontal size={14} />
            </button>
          </div>
          <div className="space-y-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {item.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 truncate">{item.action}</p>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick income overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Earnings', value: '$42,180', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
          { label: 'Refunds', value: '$2,840', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/10' },
          { label: 'Declines', value: '$980', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/10' },
          { label: 'Payouts', value: '$38,360', color: 'text-brand-600 dark:text-brand-400', bg: 'bg-brand-50 dark:bg-brand-900/10' },
        ].map((item) => (
          <div key={item.label} className={`card text-center ${item.bg} border-0`}>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.label}</p>
            <p className={`text-xl font-bold mt-1 ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
