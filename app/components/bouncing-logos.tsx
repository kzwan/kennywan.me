'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import github from '../../content/assets/github_outline.svg'
import linkedin from '../../content/assets/linkedin_outline.svg'
import spotify from '../../content/assets/spotify_outline.svg'
import email from '../../content/assets/email_outline.svg'
import discord from '../../content/assets/discord_outline.svg'
import instagram from '../../content/assets/instagram_outline.svg'
import reddit from '../../content/assets/reddit_outline.svg'

interface Logo {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  src: StaticImageData
  alt: string
  link: string
  targetX: number
  targetY: number
  settled: boolean
}

const LOGOS = [
  { src: linkedin, alt: 'LinkedIn', size: 40, link: 'https://linkedin.com/in/kennethzwan' },
  { src: email, alt: 'Email', size: 40, link: 'mailto:kennethwan@ucla.edu' },
  { src: spotify, alt: 'Spotify', size: 40, link: 'https://open.spotify.com/user/imkennywan' },
  { src: discord, alt: 'Discord', size: 40, link: 'https://discord.com' },
  { src: github, alt: 'GitHub', size: 40, link: 'https://github.com/kzwan' },
  { src: instagram, alt: 'Instagram', size: 40, link: 'https://instagram.com/kennywan_' },
  { src: reddit, alt: 'Reddit', size: 40, link: 'https://reddit.com/user/kennywan' },
]

export function BouncingLogos() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [logos, setLogos] = useState<Logo[]>([])
  const animationRef = useRef<number>()
  const containerSizeRef = useRef({ width: 0, height: 0 })
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    startTimeRef.current = Date.now()

    const rect = containerRef.current.getBoundingClientRect()
    containerSizeRef.current = { width: rect.width, height: rect.height }

    const gap = 40
    const totalWidth = LOGOS.reduce((sum, logo) => sum + logo.size, 0) + gap * (LOGOS.length - 1)
    const startX = (rect.width - totalWidth) / 2
    const targetY = 20

    const initialLogos: Logo[] = LOGOS.map((logo, index) => {
      const targetX = startX + index * (logo.size + gap)
      
      return {
        id: index,
        x: targetX,
        y: -600 - (index * 100),
        vx: (Math.random() - 0.5) * 3,
        vy: 0,
        size: logo.size,
        src: logo.src,
        alt: logo.alt,
        link: logo.link,
        targetX,
        targetY,
        settled: false,
      }
    })

    setLogos(initialLogos)

    const gravity = 0.8
    const damping = 0.65
    const friction = 0.97
    const magnetStrength = 0.008
    const settleTime = 2000

    const animate = () => {
      setLogos((prevLogos) => {
        const allSettled = prevLogos.every(logo => logo.settled)
        if (allSettled) {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
          return prevLogos
        }

        const elapsedTime = Date.now() - startTimeRef.current
        const settleProgress = Math.min(elapsedTime / settleTime, 1)

        return prevLogos.map((logo) => {
          if (logo.settled) return logo

          let newVx = logo.vx * friction
          let newVy = (logo.vy + gravity) * friction

          const dxToTarget = logo.targetX - logo.x
          const dyToTarget = logo.targetY - logo.y
          
          newVx += dxToTarget * magnetStrength * settleProgress
          newVy += dyToTarget * magnetStrength * settleProgress

          let newX = logo.x + newVx
          let newY = logo.y + newVy

          const { width, height } = containerSizeRef.current

          if (newX <= 0) {
            newX = 0
            newVx = Math.abs(newVx) * damping
          }
          
          if (newX + logo.size >= width) {
            newX = width - logo.size
            newVx = -Math.abs(newVx) * damping
          }

          if (newY + logo.size >= height) {
            newY = height - logo.size
            newVy = -Math.abs(newVy) * damping * (1 - settleProgress * 0.5)
          }

          let isSettled = false
          if (settleProgress > 0.85) {
            const distToTarget = Math.sqrt(dxToTarget * dxToTarget + dyToTarget * dyToTarget)
            if (distToTarget < 3 && Math.abs(newVy) < 1 && Math.abs(newVx) < 1) {
              newX = logo.targetX
              newY = logo.targetY
              newVx = 0
              newVy = 0
              isSettled = true
            }
          }

          return {
            ...logo,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            settled: isSettled,
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-16 overflow-visible"
    >
      {logos.map((logo) => (
        <a
          key={logo.id}
          href={logo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute hover:scale-110 cursor-pointer"
          style={{
            left: `${logo.x}px`,
            top: `${logo.y}px`,
            width: `${logo.size}px`,
            height: `${logo.size}px`,
            transition: logo.settled ? 'none' : 'transform 0.2s',
          }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.size}
            height={logo.size}
            className="drop-shadow-md"
          />
        </a>
      ))}
    </div>
  )
}