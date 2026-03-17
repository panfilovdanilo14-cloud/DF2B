import { useState } from 'react'
import { MessageSquare, Save, RotateCcw, Shield } from 'lucide-react'

const PromptsPage = () => {
  const [prompts, setPrompts] = useState([
    { id: 'soldier', name: 'Військовий', content: 'Ти — досвідчений психолог, який працює з ветеранами та діючими військовими...' },
    { id: 'civilian', name: 'Цивільний', content: 'Ти — емпатичний слухач та психолог для цивільних осіб...' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-quote">Керування AI-промптами</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-white/10 rounded-lg text-df2b-text-secondary hover:text-white transition-colors flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Скинути
          </button>
          <button className="bg-df2b-accent hover:bg-df2b-accent-light text-df2b-bg px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium">
            <Save className="w-4 h-4" />
            Зберегти всі зміни
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {prompts.map((prompt) => (
          <div key={prompt.id} className="bg-df2b-bg-card rounded-xl border border-white/5 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-df2b-accent/10 text-df2b-accent">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{prompt.name}</h3>
              </div>
              <span className="text-xs text-df2b-text-secondary px-2 py-1 bg-black/20 rounded border border-white/5">
                v1.2.4
              </span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-df2b-text-secondary">Конфигурація системного промпту</label>
              <textarea
                value={prompt.content}
                onChange={(e) => {
                  const newPrompts = prompts.map(p => 
                    p.id === prompt.id ? Object.assign({}, p, { content: e.target.value }) : p
                  )
                  setPrompts(newPrompts)
                }}
                rows={6}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-df2b-accent/50 resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PromptsPage