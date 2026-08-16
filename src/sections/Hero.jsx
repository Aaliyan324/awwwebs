import React, { useRef, useEffect, useState, useCallback, Suspense } from "react";
import gsap from "gsap";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

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

const Hero = ({ onSplineLoad, timelineRef }) => {
  const heroRef = useRef(null);
  const testimonialCardRef = useRef(null);
  const splineAppRef = useRef(null); // Store Spline instance reference
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(true);

  // References for GSAP targets
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const testimonialContainerRef = useRef(null);
  const hudLeftRef = useRef(null);
  const hudRightRef = useRef(null);

  // 1. Observe Intersection to pause/play Spline without unmounting
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsIntersecting(visible);

        // Pause Spline rendering loop when out of view, resume when visible
        if (splineAppRef.current) {
          if (visible && typeof splineAppRef.current.play === "function") {
            splineAppRef.current.play();
          } else if (!visible && typeof splineAppRef.current.stop === "function") {
            splineAppRef.current.stop();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Hardware Performance Adjustments & Ref Storage
  const handleSplineOnLoad = useCallback(
    (splineApp) => {
      splineAppRef.current = splineApp;

      const isLowEnd = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 4) <= 4;
      if (isLowEnd && splineApp?.setQuality) {
        splineApp.setQuality("low");
      }

      if (onSplineLoad) onSplineLoad(splineApp);
    },
    [onSplineLoad]
  );

  // 3. Lightweight Testimonial Switcher
  const handleTestimonialChange = useCallback(
    (nextIndex) => {
      if (!testimonialCardRef.current || nextIndex === activeTestimonialIndex) return;

      gsap.to(testimonialCardRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setActiveTestimonialIndex(nextIndex);
          gsap.to(testimonialCardRef.current, { opacity: 1, duration: 0.25 });
        },
      });
    },
    [activeTestimonialIndex]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIdx = (activeTestimonialIndex + 1) % testimonialsData.length;
      handleTestimonialChange(nextIdx);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeTestimonialIndex, handleTestimonialChange]);

  // 4. GSAP Setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out", duration: 0.8 },
      });

      tl.fromTo(
        headingRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 }
      )
        .fromTo(
          paragraphRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=0.5"
        )
        .fromTo(
          buttonsRef.current?.children || [],
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          testimonialContainerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.3"
        )
        .fromTo(
          [hudLeftRef.current, hudRightRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          "-=0.2"
        );

      if (timelineRef) {
        timelineRef.current = tl;
      }
    }, heroRef);

    return () => ctx.revert();
  }, [timelineRef]);

  const activeItem = testimonialsData[activeTestimonialIndex];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-[var(--bg-primary)] [contain:strict]"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-15"
        style={{
          backgroundImage: `radial-gradient(var(--purple-primary) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* 3D Spline Canvas Container (Permanently mounted, visibility toggled) */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${
          isIntersecting ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ visibility: isIntersecting ? "visible" : "hidden" }}
      >
        <Suspense fallback={<div className="w-full h-full bg-[var(--bg-primary)]" />}>
          <Spline
            scene="https://prod.spline.design/b6g2OU8fYKPVwjwr/scene.splinecode"
            onLoad={handleSplineOnLoad}
          />
        </Suspense>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,transparent_20%,var(--bg-primary)_90%)]" />

      {/* Hero Content */}
      <div className="absolute left-6 sm:left-12 md:left-14 inset-y-0 z-20 pointer-events-none flex items-center max-w-4xl">
        <div className="w-full flex flex-col items-start gap-6">
          <h1
            ref={headingRef}
            className="heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight text-[var(--text-primary)] uppercase"
          >
            <span className="block">WE BUILD DIGITAL EXPERIENCES</span>
            <span className="block">THAT MOVE BUSINESSES</span>
            <span className="block">FORWARD</span>
          </h1>

          <p
            ref={paragraphRef}
            className="paragraph text-base md:text-xl text-[var(--text-secondary)] tracking-wider max-w-xl font-medium"
          >
            HIGH-PERFORMANCE WEBSITES & INTERACTIVE 3D PLATFORMS ENGINEERED FOR SCALING BRANDS.
          </p>

          <div
            ref={buttonsRef}
            className="pointer-events-auto flex flex-wrap items-center gap-4 pt-4"
          >
            <button className="group relative inline-flex items-center justify-center font-mono text-sm tracking-widest font-bold text-[var(--text-primary)] uppercase transition-transform duration-200 active:scale-95">
              <span className="relative z-10 flex items-center gap-3 px-8 py-3.5 bg-[var(--bg-card)] border-2 border-[var(--purple-primary)] transition-colors duration-200 group-hover:bg-[var(--bg-tertiary)]">
                <span>LET'S TALK</span>
                <svg
                  className="w-4 h-4 text-[var(--purple-light)] transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <button className="px-8 py-3.5 font-mono text-sm tracking-widest uppercase font-semibold text-[var(--text-secondary)] border border-[var(--border-primary)] bg-[var(--bg-primary)] transition-colors duration-200 hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] active:scale-95">
              EXPLORE WORK
            </button>
          </div>
        </div>
      </div>

      {/* Testimonial Box */}
      <div
        ref={testimonialContainerRef}
        className="absolute top-1/2 -translate-y-1/2 right-8 md:right-12 z-20 pointer-events-auto hidden xl:flex flex-col gap-3 w-80 p-5 bg-[var(--bg-card)]/90 border border-[var(--border-primary)] shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-primary)]/40 pb-2.5">
          <div className="flex text-[var(--purple-light)] text-xs gap-1">★★★★★</div>
          <span className="font-mono text-[10px] tracking-widest text-[var(--purple-primary)] uppercase bg-[var(--purple-primary)]/10 px-2 py-0.5 border border-[var(--purple-primary)]/30">
            REVIEW
          </span>
        </div>

        <div ref={testimonialCardRef} className="flex flex-col gap-3 pt-1">
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic font-sans min-h-[56px]">
            "{activeItem.quote}"
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-primary)]/50">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[var(--purple-primary)]/20 border border-[var(--purple-primary)] flex items-center justify-center font-mono text-[11px] font-bold text-[var(--purple-light)]">
                {activeItem.initials}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] tracking-wide uppercase">
                  {activeItem.author}
                </h4>
                <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase">
                  {activeItem.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 pt-1">
          {testimonialsData.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => handleTestimonialChange(dotIndex)}
              className={`h-1 rounded-full transition-all duration-200 ${
                dotIndex === activeTestimonialIndex
                  ? "w-5 bg-[var(--purple-light)]"
                  : "w-1 bg-[var(--border-primary)]"
              }`}
              aria-label={`Go to testimonial ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>

      {/* HUD Accents */}
      <div
        ref={hudLeftRef}
        className="absolute bottom-8 left-12 md:left-14 z-20 pointer-events-none hidden md:flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]"
      >
        <span className="w-2 h-2 bg-[var(--purple-primary)]" />
        <span>SYS.STATUS: OPERATIONAL</span>
      </div>

      <div
        ref={hudRightRef}
        className="absolute bottom-8 right-8 md:right-12 z-20 pointer-events-none hidden md:flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]"
      >
        <span>AGENCY // 2026</span>
        <span className="w-8 h-[1px] bg-[var(--border-primary)]" />
      </div>
    </section>
  );
};

export default Hero;