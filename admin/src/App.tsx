import { useState, useEffect } from 'react'
import { LogOut, BarChart3, Music, Settings, Users, Loader2 } from 'lucide-react'
import { supabase } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ClientsPage from './pages/ClientsPage'
import PromptsPage from './pages/PromptsPage'
import AudioPage from './pages/AudioPage'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
      const [currentPage, setCurrentPage] = useState('dashboard')
        const [adminEmail, setAdminEmail] = useState('')

          useEffect(() => {
                supabase.auth.getSession().then(({ data: { session } }) => {
                        setIsLoggedIn(!!session)
                              if (session?.user?.email) setAdminEmail(session.user.email)
                                    })

                                        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                                                setIsLoggedIn(!!session)
                                                      if (session?.user?.email) setAdminEmail(session.user.e)
                                        })
                })
          })
}