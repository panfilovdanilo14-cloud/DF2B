import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wind, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-df2b-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-df2b-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-df2b-bg-card border border-white/5 rounded-2xl p-8 backdrop-blur-xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-df2b-accent/20 rounded-2xl flex items-center justify-center mb-4">
              <Wind className="w-8 h-8 text-df2b-accent" />
            </div>
            <h1 className="text-2xl font-bold text-white">Вхід в Адмін-панель</h1>
            <p className="text-df2b-text-secondary mt-2">Панель керування DF2B</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-df2b-text-secondary">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-df2b-text-secondary" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-df2b-text-secondary focus:outline-none focus:border-df2b-accent transition-colors"
                  placeholder="admin@df2b.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-df2b-text-secondary">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-df2b-text-secondary" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-df2b-text-secondary focus:outline-none focus:border-df2b-accent transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-df2b-accent hover:bg-df2b-accent-light text-df2b-bg font-bold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Увійти'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-df2b-text-secondary">
            © 2024 DF2B. Захищена територія.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage