"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Research and Analysis",
    description:
      "With your vision in mind, we enter the Research and Analysis phase. Here, we examine your competitors, industry trends, and user preferences.",
    color: "rgba(99, 102, 241, 0.8)"
  },
  {
    id: "process-2",
    title: "Wireframing and Prototyping",
    description:
      "We move on to Wireframing and Prototyping, where we create skeletal representations of your website's pages.",
    color: "rgba(139, 92, 246, 0.8)"
  },
  {
    id: "process-3",
    title: "Design Creation",
    description:
      "Now, it's time for the Design Creation phase. Our talented designers bring your vision to life with stunning aesthetics.",
    color: "rgba(168, 85, 247, 0.8)"
  },
  {
    id: "process-4",
    title: "Development and Testing",
    description:
      "In the Development and Testing phase, our skilled developers turn designs into a fully functional website.",
    color: "rgba(192, 132, 252, 0.8)"
  },
  {
    id: "process-5",
    title: "Launch and Support",
    description:
      "Our commitment continues beyond launch. We offer post-launch support to ensure your website remains updated and optimized.",
    color: "rgba(232, 121, 249, 0.8)"
  }
]

const CARD_OFFSET = 60

export const GlassCardsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = cardsRef.current.filter(Boolean)
    if (cards.length === 0) return

    cards.forEach((card, i) => {
      if (!card) return
      gsap.set(card, {
        y: i * 100 + 150,
        scale: 1 - (cards.length - 1 - i) * 0.05,
        opacity: i === 0 ? 1 : 0,
        zIndex: cards.length - i
      })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${PROCESS_PHASES.length * 500}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    })

    PROCESS_PHASES.slice(1).forEach((_, i) => {
      const cardIndex = i + 1
      tl.to(cards[cardIndex], {
        y: cardIndex * CARD_OFFSET,
        scale: 1 - (PROCESS_PHASES.length - cardIndex - 1) * 0.05,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, i * 0.8)
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      style={{ 
        background: '#0a0a0a',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(79, 79, 79, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79, 79, 79, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      <div style={{
        position: 'absolute',
        top: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 10
      }}>
        <img 
          src="/logo.png" 
          alt="VELOCE" 
          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <span style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #007FFF, #9945FF, #FF3CAC)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          VELOCE
        </span>
      </div>

      <div style={{
        position: 'absolute',
        top: '7rem',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 10
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '0.5rem'
        }}>
          Our <span style={{ color: '#8B5CF6' }}>Process</span>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.9rem'
        }}>
          Scroll to see how we transform your vision
        </p>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {PROCESS_PHASES.map((phase, index) => (
          <div
            key={phase.id}
            ref={el => { cardsRef.current[index] = el }}
            style={{
              position: 'absolute',
              width: 'min(90vw, 750px)',
              height: '260px',
              borderRadius: '16px',
              zIndex: index + 1,
              willChange: 'transform, opacity'
            }}
          >
            <div style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: '17px',
              background: `linear-gradient(135deg, ${phase.color}, ${phase.color.replace('0.8', '0.3')})`,
              zIndex: -1
            }} />

            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '0 3rem',
              borderRadius: '16px',
              background: 'rgba(15, 15, 15, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              gap: '2rem'
            }}>
              <div style={{
                fontSize: '4rem',
                fontWeight: 800,
                color: phase.color,
                opacity: 0.4,
                minWidth: '80px',
                lineHeight: 1
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>
                  {phase.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: 1.6,
                  fontSize: '0.95rem'
                }}>
                  {phase.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GlassCardsSection
