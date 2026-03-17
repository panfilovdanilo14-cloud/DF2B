import { useState, useEffect } from 'react'
import { Users, UserCheck, Clock, Activity, Loader2, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { supabase } from '../lib/supabase'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    totalSessions: 0,
    avgDuration: 0,
    loading: true
  })

  interface ChartDataItem {
    name: string
    users: number
    sessions: number
  }

  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { count: total } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true })

      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const { count: active } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString())

      const mockChartData: ChartDataItem[] = Array.from({ length: 7 }, (_, i) => ({
        name: new Date(Date.now() - (6-i) * 24 * 60 * 60 * 1000).toLocaleDateString('uk-UA', { weekday: 'short' }),
        users: Math.floor(Math.random() * 50) + 10,
        sessions: Math.floor(Math.random() * 80) + 20,
      }))

      setStats({
        totalClients: total || 1240,
        activeClients: active || 856,
        totalSessions: 5231,
        avgDuration: 24,
        loading: false
      })
      setChartData(mockChartData)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  const kpis = [
    { label: 'Усього клієнтів', value: stats.totalClients.toLocaleString(), icon: Users, trend: '+12%', trendUp: true },
    { label: 'Активні (7дн)', value: stats.activeClients.toLocaleString(), icon: UserCheck, trend: '+5%', trendUp: true },
    { label: 'Усього сесій', value: stats.totalSessions.toLocaleString(), icon: Activity, trend: '-2%', trendUp: false },
    { label: 'Сер. тривалість', value: `${stats.avgDuration}хв`, icon: Clock, trend: '+8%', trendUp: true },
  ]

  const pieData = [
    { name: 'Індивідуальні', value: 45, color: '#D4A574' },
    { name: 'Корпоративні', value: 35, color: '#6366F1' },
    { name: 'Експерти', value: 20, color: '#A855F7' },
  ]

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-df2b-accent animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-df2b-text">
        <h2 className="text-3xl font-bold">Статистика</h2>
        <p className="text-df2b-text-secondary mt-1">Огляд ключових показників вашого бізнесу</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-df2b-bg-secondary border border-df2b-accent/10 rounded-xl p-6 hover:border-df2b-accent/30 transition-all shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-df2b-accent/10 rounded-lg text-df2b-accent">
                <kpi.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${kpi.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.trend}
                {kpi.trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <p className="text-df2b-text-secondary text-sm font-medium">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-df2b-text mt-1">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-df2b-bg-secondary border border-df2b-accent/10 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-df2b-text mb-6">Динаміка активності</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A574" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4A574" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1F26', border: '1px solid rgba(212, 165, 116, 0.2)', borderRadius: '8px' }}
                  itemStyle={{ color: '#D4A574' }}
                />
                <Area type="monotone" dataKey="users" stroke="#D4A574" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-df2b-bg-secondary border border-df2b-accent/10 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-df2b-text mb-6">Типи клієнтів</h3>
          <div className="h-[300px] w-full text-df2b-text">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1F26', border: 'none', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-df2b-text-secondary">{item.name}</span>
                </div>
                <span className="text-df2b-text font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
