import { Users, Music, MessageSquare, Shield, Activity, TrendingUp } from 'lucide-react'

const DashboardPage = () => {
  const stats = [
    { label: 'Усього клієнтів', value: '1,284', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Аудіо-файлів', value: '156', icon: Music, color: 'text-df2b-accent', bg: 'bg-df2b-accent/10' },
    { label: 'Діалогів з AI', value: '42.5k', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Активні преміум', value: '312', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white font-quote">Панель керування</h1>
          <p className="text-df2b-text-secondary mt-1">Вітаємо в адмін-панелі DF2B</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-df2b-bg-card border border-white/5 rounded-lg">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-white">Система стабільна</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-df2b-bg-card p-6 rounded-xl border border-white/5 hover:border-df2b-accent/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500 opacity-50" />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-df2b-text-secondary mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-df2b-bg-card p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-6">Остання активність</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-df2b-accent" />
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">Нова аудіо-медитація додана</p>
                  <p className="text-xs text-df2b-text-secondary">2 години тому • Адмін_01</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-df2b-bg-card p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-6">Популярність категорій</h3>
          <div className="space-y-6">
            {[ 
              { name: 'Дихання', value: 85 },
              { name: 'SOS Паніка', value: 65 },
              { name: 'Сон', value: 45 },
              { name: 'AI Чат', value: 95 }
            ].map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-df2b-text-secondary font-medium">{cat.name}</span>
                  <span className="text-white">{cat.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-df2b-accent rounded-full transition-all duration-1000"
                    style={{ width: cat.value + '%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage