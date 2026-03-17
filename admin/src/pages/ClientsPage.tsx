import { useState } from 'react'
import { Search, User, Filter, MoreVertical, Shield, Clock } from 'lucide-react'

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-quote">Клієнти</h1>
      </div>

      <div className="bg-df2b-bg-card rounded-xl border border-white/5 p-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-df2b-text-secondary" />
            <input 
              type="text" 
              placeholder="Пошук клієнта..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-df2b-text-secondary focus:outline-none focus:border-df2b-accent/50"
            />
          </div>
          <button className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-df2b-text-secondary hover:text-white transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Фільтри
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-df2b-text-secondary border-b border-white/5">
                <th className="pb-4 font-medium">Клієнт</th>
                <th className="pb-4 font-medium">Рівень доступу</th>
                <th className="pb-4 font-medium">Остання активність</th>
                <th className="pb-4 font-medium">Статус</th>
                <th className="pb-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-df2b-accent/20 flex items-center justify-center text-df2b-accent">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-white font-medium">User_{3420 + item}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2 text-df2b-text-secondary">
                      <Shield className="w-4 h-4 text-df2b-accent" />
                      Standard
                    </div>
                  </td>
                  <td className="py-4 text-df2b-text-secondary">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      2 години тому
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
                      Active
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 text-df2b-text-secondary hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ClientsPage