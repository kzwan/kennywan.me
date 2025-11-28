'use client'

import { useState, useEffect } from 'react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Restore scroll position on page load
    const savedScrollPosition = sessionStorage.getItem('scrollPosition')
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition))
      sessionStorage.removeItem('scrollPosition')
    }

    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Save scroll position before page unload
    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    // Check initial scroll position immediately (no animation)
    toggleVisibility()
    
    // Enable animations after initial check
    setTimeout(() => setHasAnimated(true), 100)

    window.addEventListener('scroll', toggleVisibility)
    window.addEventListener('beforeunload', saveScrollPosition)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      window.removeEventListener('beforeunload', saveScrollPosition)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 px-4 py-2 transition-all duration-500 z-50 cursor-pointer ${
            hasAnimated ? 'transition-all duration-500' : ''
        } ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
    >
        <span className="relative inline-block text-md font-medium text-gray-500">
            <span className="py-1">↑</span> Back To Top
            {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-[#3a6e48]"></span> */}
        </span>
    </button>
  )
}