import React, { useState, useEffect } from 'react'
import { Wifi, WifiOff } from 'lucide-react'

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-16 left-0 right-0 bg-orange-500 text-white px-4 py-2 text-center text-sm z-40">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff className="h-4 w-4" />
        <span>You are offline. Data will sync when connection is restored.</span>
      </div>
    </div>
  )
}