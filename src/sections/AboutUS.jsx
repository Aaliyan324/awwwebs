import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutUS = () => {
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)

  const text = "We’re a creative web agency focused on building modern, interactive, and high-performance websites that look stunning and work flawlessly. From bold landing pages to complete business websites, we blend clean development with thoughtful design, smooth animations, and a touch of personality."

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: Blur-in
      gsap.fromTo(
        headingRef.current,
        {
          filter: 'blur(12px)',
          opacity: 0,
          y: 20
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Paragraph: Word-by-word from left to right with blur effect
      const words = paragraphRef.current.querySelectorAll('.word')

      gsap.fromTo(
        words,
        {
          filter: 'blur(10px)',
          opacity: 0,
          x: -30,
          y: 20
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          stagger: 0.04, // Controls the delay between each word
          ease: 'power3.out',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className='mt-12 min-h-[40vh] px-20 overflow-hidden'>
      <div>
        <h1
          ref={headingRef}
          className='heading text-7xl font-bold text-[var(--text-primary)]'
        >
          About Us
        </h1>
      </div>
      <div className='mt-6'>
        <p
          ref={paragraphRef}
          className='paragraph text-4xl tracking-wide text-[var(--text-secondary)] flex flex-wrap gap-x-3 gap-y-1'
        >
          {text.split(' ').map((word, index) => (
            <span key={index} className='word inline-block will-change-transform'>
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default AboutUS