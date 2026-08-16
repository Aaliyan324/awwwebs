import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const whatsappNumber = "923365389322";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 60,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Background glow movement
      gsap.to(".contact-glow", {
        y: -100,
        x: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Huge text subtle movement
      gsap.to(".contact-bg-text", {
        x: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-primary)] px-6 pt-28 md:px-16 md:pt-40"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--purple-light) 1px, transparent 1px), linear-gradient(90deg, var(--purple-light) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="contact-glow pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--glow-purple)] opacity-30 blur-[160px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[var(--purple-deep)] opacity-20 blur-[140px]" />

      {/* Huge Background Text */}

      <div className="contact-bg-text pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
        <span className="heading text-[18vw] font-bold leading-none text-white/[0.025]">
          AWWWEBS
        </span>
      </div>

      {/* =====================================================
          MAIN CONTACT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-[var(--container-width)]">

        <div
          ref={contentRef}
          className="flex flex-col items-center text-center"
        >
          {/* Label */}

          <span className="paragraph text-lg uppercase tracking-[0.3em] text-[var(--purple-light)]">
            // HAVE A PROJECT IN MIND?
          </span>

          {/* Main Heading */}

          <h2 className="heading mt-6 max-w-5xl text-6xl font-bold leading-[0.85] text-[var(--text-primary)] md:text-8xl lg:text-[10rem]">
            LET'S
            <br />
            <span className="bg-[var(--gradient-brand)] bg-clip-text text-transparent">
              BUILD.
            </span>
          </h2>

          {/* Description */}

          <p className="paragraph mt-8 max-w-2xl text-xl tracking-wide text-[var(--text-secondary)] md:text-2xl">
            Got an idea, a business, or a crazy concept that needs a website?
            Let's turn it into something people can't stop looking at.
          </p>

          {/* WhatsApp CTA */}

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-5 rounded-full bg-[var(--gradient-brand)] px-8 py-5 shadow-[var(--shadow-purple)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(155,92,255,0.4)]"
          >
            {/* WhatsApp Icon */}

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm">
              ☎
            </span>

            <span className="paragraph text-lg font-bold tracking-[0.15em] text-white">
              LET'S TALK ON WHATSAPP
            </span>

            <span className="text-xl text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>

          {/* Number */}

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="paragraph mt-5 text-lg tracking-[0.15em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--purple-light)]"
          >
            +92 336 5389322
          </a>
        </div>

        {/* =====================================================
            FOOTER NAV
        ===================================================== */}

        <div className="mt-32 border-t border-[var(--border-primary)] py-10">

          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

            {/* Logo Image */}

            <a
              href="#home"
              className="relative flex items-center"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105 md:h-11"
              />
            </a>

            {/* Navigation */}

            <nav className="flex flex-wrap gap-6 md:gap-8">

              <a
                href="#home"
                className="paragraph text-sm uppercase tracking-[0.15em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--purple-light)]"
              >
                HOME
              </a>

              <a
                href="#about"
                className="paragraph text-sm uppercase tracking-[0.15em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--purple-light)]"
              >
                ABOUT
              </a>

              <a
                href="#work"
                className="paragraph text-sm uppercase tracking-[0.15em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--purple-light)]"
              >
                WORK
              </a>

              <a
                href="#contact"
                className="paragraph text-sm uppercase tracking-[0.15em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--purple-light)]"
              >
                CONTACT
              </a>

            </nav>

            {/* WhatsApp */}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="paragraph flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-[var(--purple-light)] transition-colors duration-300 hover:text-[var(--purple-soft)]"
            >
              WHATSAPP
              <span>↗</span>
            </a>

          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col gap-3 border-t border-[var(--border-primary)] py-6 md:flex-row md:items-center md:justify-between">

          <p className="paragraph text-sm tracking-wider text-[var(--text-muted)]">
            © {new Date().getFullYear()} AWWWEBS. ALL RIGHTS RESERVED.
          </p>

          <p className="paragraph text-sm tracking-wider text-[var(--text-muted)]">
            DESIGNED & BUILT WITH
            <span className="mx-2 text-[var(--purple-light)]">
              ♥
            </span>
            IN PAKISTAN
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Contact;