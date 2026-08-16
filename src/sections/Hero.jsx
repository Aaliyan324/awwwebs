import React, { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import Lenis from "lenis";

const testimonialsData = [
  {
    id: 1,
    quote: "They transformed our web application into a stunning 3D interactive showcase. Engagement jumped by 240% within the first month.",
    author: "Alex Kendrick",
    role: "CTO // NEXUS",
    initials: "AK",
  },
  {
    id: 2,
    quote: "The spatial 3D experience set our product launch apart from every competitor. Unmatched quality and flawless execution.",
    author: "Elena Rostova",
    role: "VP DESIGN // AURA",
    initials: "ER",
  },
  {
    id: 3,
    quote: "An absolute masterclass in web performance and immersive graphics. They delivered way beyond our expectations.",
    author: "Marcus Vance",
    role: "FOUNDER // HYPERION",
    initials: "MV",
  },
];

const Hero = () => {
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const testimonialCardRef = useRef(null);

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // References for GSAP targets
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const testimonialContainerRef = useRef(null);
  const hudLeftRef = useRef(null);
  const hudRightRef = useRef(null);

  // 1. Cycle through testimonials with smooth GSAP transition
  useEffect(() => {
    const interval = setInterval(() => {
      if (!testimonialCardRef.current) return;

      // Fade out current testimonial
      gsap.to(testimonialCardRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setActiveTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
          // Fade in new testimonial
          gsap.fromTo(
            testimonialCardRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function updateLenis(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 3. Set up paused GSAP Context and Intro Timeline
    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline({
        paused: true,
        delay: 2.6,
        defaults: { ease: "power3.out", duration: 1.2 },
      });

      timelineRef.current
        .fromTo(
          headingRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15 }
        )
        .fromTo(
          paragraphRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=0.8"
        )
        .fromTo(
          buttonsRef.current.children,
          { y: 25, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.15 },
          "-=0.8"
        )
        .fromTo(
          testimonialContainerRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1 },
          "-=0.8"
        )
        .fromTo(
          [hudLeftRef.current, hudRightRef.current],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2 },
          "-=0.6"
        );
    }, heroRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const handleSplineLoad = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative h-screen w-full overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Tactical Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-15"
        style={{
          backgroundImage: `radial-gradient(var(--purple-primary) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* 3D Spline Canvas */}
      <div className="absolute inset-0 z-0">
        <Spline 
          scene="https://prod.spline.design/b6g2OU8fYKPVwjwr/scene.splinecode" 
          onLoad={handleSplineLoad}
        />
      </div>

      {/* Cyber/Vignette Blend Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,transparent_20%,var(--bg-primary)_90%)]" />

      {/* Main Hero Content (Left side aligned) */}
      <div className="absolute left-12 md:left-14 inset-y-0 z-20 pointer-events-none flex items-center max-w-4xl">
        <div className="w-full flex flex-col items-start gap-6">
          
          {/* Heading */}
          <h1 
            ref={headingRef}
            className="heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-[var(--text-primary)] uppercase drop-shadow-[0_0_35px_var(--glow-purple)]"
          >
            <span className="block">WE BUILD DIGITAL EXPERIENCES</span>
            <span className="block">THAT MOVE BUSINESSES</span>
            <span className="block">FORWARD</span>
          </h1>

          {/* Subtitle */}
          <p 
            ref={paragraphRef}
            className="paragraph text-lg md:text-2xl text-[var(--text-secondary)] tracking-wider max-w-xl font-medium"
          >
            HIGH-PERFORMANCE WEBSITES & INTERACTIVE 3D PLATFORMS ENGINEERED FOR SCALING BRANDS.
          </p>

          {/* Buttons Area */}
          <div 
            ref={buttonsRef}
            className="pointer-events-auto flex flex-wrap items-center gap-6 pt-6"
          >
            <button 
              className="group relative inline-flex items-center justify-center font-mono text-base tracking-widest font-bold text-[var(--text-primary)] uppercase transition-all duration-300 active:scale-95"
            >
              <span className="absolute -inset-1 bg-[var(--gradient-brand)] opacity-70 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
              
              <span 
                className="relative z-10 flex items-center gap-4 px-9 py-4 bg-[var(--bg-card)] border-2 border-[var(--purple-primary)] transition-colors duration-300 group-hover:bg-[var(--bg-tertiary)] group-hover:border-[var(--purple-light)]"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))"
                }}
              >
                <span>LET'S TALK</span>
                
                <svg 
                  className="w-5 h-5 text-[var(--purple-light)] transition-transform duration-300 group-hover:translate-x-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>

                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[var(--purple-primary)] transition-colors duration-300 group-hover:bg-[var(--purple-light)]" />
              </span>
            </button>

            <button 
              className="px-9 py-4 font-mono text-base tracking-widest uppercase font-semibold text-[var(--text-secondary)] border-2 border-[var(--border-primary)] bg-[var(--bg-primary)]/60 backdrop-blur-md transition-all duration-300 hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)] hover:shadow-[0_0_20px_var(--glow-soft)] active:scale-95"
              style={{
                clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)"
              }}
            >
              EXPLORE WORK
            </button>
          </div>

        </div>
      </div>

      {/* Far Right Dynamic Testimonial Container */}
      <div 
        ref={testimonialContainerRef}
        className="absolute top-1/2 -translate-y-1/2 right-8 md:right-12 z-20 pointer-events-auto hidden xl:flex flex-col gap-3 w-80 p-6 bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border-primary)] shadow-[0_0_35px_rgba(0,0,0,0.6)] transition-colors hover:border-[var(--purple-primary)]"
        style={{
          clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
        }}
      >
        {/* Rating Stars & Header Tag */}
        <div className="flex items-center justify-between border-b border-[var(--border-primary)]/40 pb-3">
          <div className="flex text-[var(--purple-light)] text-sm gap-1">
            ★★★★★
          </div>
          <span className="font-mono text-[10px] tracking-widest text-[var(--purple-primary)] uppercase bg-[var(--purple-primary)]/10 px-2 py-0.5 border border-[var(--purple-primary)]/30">
            REVIEW
          </span>
        </div>

        {/* Mapped Testimonials (Rendered based on active index) */}
        {testimonialsData.map((item, index) => {
          if (index !== activeTestimonialIndex) return null;

          return (
            <div 
              key={item.id} 
              ref={testimonialCardRef}
              className="flex flex-col gap-4 pt-1"
            >
              <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed italic font-sans min-h-[64px]">
                "{item.quote}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-primary)]/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--purple-primary)]/20 border border-[var(--purple-primary)] flex items-center justify-center font-mono text-xs font-bold text-[var(--purple-light)]">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)] tracking-wide uppercase">
                      {item.author}
                    </h4>
                    <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {testimonialsData.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setActiveTestimonialIndex(dotIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === activeTestimonialIndex 
                  ? "w-6 bg-[var(--purple-light)]" 
                  : "w-1.5 bg-[var(--border-primary)] hover:bg-[var(--text-muted)]"
              }`}
              aria-label={`Go to testimonial ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Cyber HUD Accents */}
      <div 
        ref={hudLeftRef}
        className="absolute bottom-10 left-12 md:left-14 z-20 pointer-events-none hidden md:flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]"
      >
        <span className="w-2 h-2 bg-[var(--purple-primary)] animate-pulse" />
        <span>SYS.STATUS: OPERATIONAL</span>
      </div>
      
      <div 
        ref={hudRightRef}
        className="absolute bottom-10 right-8 md:right-12 z-20 pointer-events-none hidden md:flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]"
      >
        <span>AGENCY // 2026</span>
        <span className="w-12 h-[1px] bg-[var(--border-primary)]" />
      </div>
    </section>
  );
};

export default Hero;