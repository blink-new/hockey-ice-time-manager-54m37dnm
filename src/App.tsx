import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { AuthPage } from './components/AuthPage'
import { Dashboard } from './components/Dashboard'
import { Toaster } from './components/ui/toaster'

interface User {
  id: string
  name: string
  email: string
  associationName: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      if (state.user) {
        setUser({
          id: state.user.id,
          name: state.user.displayName || state.user.email,
          email: state.user.email,
          associationName: 'Sample Hockey Association' // Will be fetched from DB later
        })
      } else {
        setUser(null)
      }
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-lg mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-foreground"></div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Hockey Ice Time Manager</h2>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <AuthPage />
        <Toaster />
      </>
    )
  }

  return (
    <>
      <Dashboard user={user} />
      <Toaster />
    </>
  )
}

export default App