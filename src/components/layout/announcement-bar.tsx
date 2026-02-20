'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'fps-announcement-dismissed'

interface AnnouncementBarProps {
  message?: string
  className?: string
}

export function AnnouncementBar({
  message = '🔥 Free delivery on orders over $100 — Order by Wednesday for Sunday delivery!',
  className,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(true) // default hidden to prevent flash

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== 'true') {
      setDismissed(false)
    }
  }, [])

  function handleDismiss() {
    setDismissed(true)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  if (dismissed) return null

  return (
    <div
      className={cn(
        'relative flex items-center justify-center bg-sage px-10 py-2 text-center text-sm font-medium text-white',
        className
      )}
    >
      <span className="line-clamp-1">{message}</span>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-white/70 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
