import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, AuthContextType } from '../types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        setUser(user)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication
      if (email === 'admin@examvector.com' && password === 'admin123') {
        const mockUser: User = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date()
        }
        
        setUser(mockUser)
        localStorage.setItem('auth-token', 'mock-jwt-token')
        localStorage.setItem('user-data', JSON.stringify(mockUser))
      } else if (email.includes('@') && password.length >= 6) {
        const mockUser: User = {
          id: '2',
          email,
          name: email.split('@')[0],
          role: 'student',
          createdAt: new Date()
        }
        
        setUser(mockUser)
        localStorage.setItem('auth-token', 'mock-jwt-token')
        localStorage.setItem('user-data', JSON.stringify(mockUser))
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'student',
        createdAt: new Date()
      }
      
      setUser(mockUser)
      localStorage.setItem('auth-token', 'mock-jwt-token')
      localStorage.setItem('user-data', JSON.stringify(mockUser))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-data')
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    register
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}