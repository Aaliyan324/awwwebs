import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const text = "We’re a creative web agency focused on building modern, interactive, and high-performance websites that look stunning and work flawlessly. From bold landing pages to complete business websites, we blend clean development with thoughtful design, smooth animations, and a touch of personality."

const AboutUS = () => {
  const headingRef = useRef(null)
  const paragraphRef = useRef(null)

  useEffect(() => {
    // Respect user reduced motion settings to preserve low-end CPU cycles
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, paragraphRef.current.querySelectorAll('.word')], { opacity: 1, x: 0, y: 0 })
        return
      }

      // Heading: GPU-accelerated reveal (opacity + y shift instead of heavy live filter blur)
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Paragraph: Word-by-word reveal using lightweight transforms
      const words = paragraphRef.current.querySelectorAll('.word')

      gsap.fromTo(
        words,
        {
          opacity: 0,
          x: -16,
          y: 12,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          stagger: 0.025, // Optimized stagger speed for smooth 60fps frame pacing
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="mt-12 min-h-[40vh] px-6 md:px-20 overflow-hidden [contain:content]">
      <div>
        <h1
          ref={headingRef}
          className="heading text-5xl md:text-7xl font-bold text-[var(--text-primary)] [will-change:transform,opacity]"
        >
          About Us
        </h1>
      </div>
      <div className="mt-6">
        <p
          ref={paragraphRef}
          className="paragraph text-2xl md:text-4xl tracking-wide text-[var(--text-secondary)] flex flex-wrap gap-x-3 gap-y-1"
        >
          {text.split(' ').map((word, index) => (
            <span
              key={index}
              className="word inline-block [will-change:transform,opacity]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default AboutUS