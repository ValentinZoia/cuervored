"use client"
import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const checkSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) // 1024px es el breakpoint 'lg' en Tailwind
    }

    // Checar tamaño inicial
    checkSize()

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkSize)

    // Cleanup
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  return isLargeScreen
}