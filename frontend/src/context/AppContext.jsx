import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Rehydrate user from storage on load
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [notifications, setNotifications] = useState([])

  // Show a toast notification
  const notify = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), duration)
  }, [])

  const login = useCallback((userData, token) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }, [])

  return (
    <AppContext.Provider value={{ user, login, logout, notify }}>
      {children}
      <NotificationStack notifications={notifications} />
    </AppContext.Provider>
  )
}

function NotificationStack({ notifications }) {
  if (!notifications.length) return null
  return (
    <div className="notification-stack" aria-live="polite">
      {notifications.map(n => (
        <div key={n.id} className={`notification notification--${n.type}`} role="status">
          {n.message}
        </div>
      ))}
    </div>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within <AppProvider>')
  return ctx
}
