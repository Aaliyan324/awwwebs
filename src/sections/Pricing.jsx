import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pricingData = [
  {
    id: "01",
    name: "STARTER",
    description:
      "Perfect for individuals and small businesses that need a clean digital presence.",
    pkr: "15,000",
    usd: "150",
    features: [
      "1–3 Page Website",
      "Responsive Design",
      "Modern UI Design",
      "Basic Animations",
      "Contact Form",
      "Basic SEO",
    ],
  },
  {
    id: "02",
    name: "PRO",
    description:
      "For brands that want a premium website with immersive interactions and stronger functionality.",
    pkr: "40,000",
    usd: "350",
    popular: true,
    features: [
      "Up to 7 Pages",
      "Custom UI/UX Design",
      "Advanced Animations",
      "GSAP Interactions",
      "SEO Optimized",
      "Performance Optimization",
      "Contact & Lead Forms",
      "Deployment",
    ],
  },
  {
    id: "03",
    name: "CUSTOM",
    description:
      "A complete bespoke digital experience built for businesses ready to stand out and scale.",
    pkr: "80,000+",
    usd: "650+",
    features: [
      "Unlimited Pages",
      "Premium UI/UX",
      "Complex Animations",
      "3D / WebGL Experiences",
      "Advanced SEO",
      "CMS / Backend Integration",
      "E-Commerce Functionality",
      "Priority Support",
    ],
  },
];

const hostingData = {
  pkr: "5,000",
  usd: "30",
  features: [
    "High-Speed SSD Storage",
    "Free SSL Security Certificate",
    "99.9% Server Uptime Guarantee",
    "Domain Linking & DNS Setup",
    "Automated Daily Backups",
    "Technical Support & Maintenance",
  ],
};

const Pricing = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const hostingRef = useRef(null);

  // Set USD as default selected
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* HEADER ANIMATION */
      gsap.fromTo(
        headerRef.current.children,
        {
          opacity: 0,
          y: 50,
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
            trigger: headerRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* PRICING CARDS */
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.92,
          filter: "blur(15px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* HOSTING SECTION ANIMATION */
      gsap.fromTo(
        hostingRef.current,
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: hostingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* GLOW PARALLAX */
      gsap.to(".pricing-glow", {
        y: -150,
        x: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* GRID PARALLAX */
      gsap.to(".pricing-grid", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* HOVER EFFECT */
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -12,
      scale: 1.015,
      duration: 0.45,
      ease: "power3.out",
    });

    const glow = e.currentTarget.querySelector(".card-glow");
    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });

    const glow = e.currentTarget.querySelector(".card-glow");
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-primary)] px-6 py-28 md:px-16"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--purple-light) 1px, transparent 1px), linear-gradient(90deg, var(--purple-light) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="pricing-glow pointer-events-none absolute left-1/2 top-1/3 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[var(--glow-purple)] opacity-30 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-[var(--purple-deep)] opacity-10 blur-[140px]" />

      {/* CONTAINER */}
      <div className="relative z-10 mx-auto max-w-[var(--container-width)]">
        {/* HEADER */}
        <div
          ref={headerRef}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <span className="paragraph text-lg uppercase tracking-[0.3em] text-[var(--purple-light)]">
            // INVEST IN YOUR VISION
          </span>

          <h2 className="heading mt-4 text-5xl font-bold leading-[0.95] text-[var(--text-primary)] md:text-7xl lg:text-8xl">
            SIMPLE
            <br />
            <span className="bg-[var(--gradient-brand)] bg-clip-text text-transparent">
              PRICING.
            </span>
          </h2>

          <p className="paragraph mx-auto mt-6 max-w-2xl text-xl tracking-wide text-[var(--text-secondary)] md:text-2xl">
            No confusing packages. No unnecessary extras. Just premium digital
            experiences built around what your business actually needs.
          </p>

          {/* CURRENCY SWITCH */}
          <div className="mt-10 inline-flex rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-1 shadow-[var(--shadow-card)]">
            <button
              onClick={() => setCurrency("USD")}
              className={`paragraph rounded-full px-6 py-3 text-sm font-bold tracking-widest transition-all duration-300 ${
                currency === "USD"
                  ? "bg-[var(--gradient-brand)] text-white shadow-[var(--shadow-purple)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              USD
            </button>

            <button
              onClick={() => setCurrency("PKR")}
              className={`paragraph rounded-full px-6 py-3 text-sm font-bold tracking-widest transition-all duration-300 ${
                currency === "PKR"
                  ? "bg-[var(--gradient-brand)] text-white shadow-[var(--shadow-purple)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              PKR
            </button>
          </div>
        </div>

        {/* PRICING GRID */}
        <div className="pricing-grid grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingData.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border p-7 transition-colors duration-500 md:p-8 ${
                plan.popular
                  ? "border-[var(--purple-primary)] bg-[var(--bg-tertiary)]"
                  : "border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-[var(--border-hover)]"
              }`}
            >
              <div className="card-glow pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--glow-purple)] opacity-0 blur-[80px]" />

              <div className="relative flex items-center justify-between">
                <span className="paragraph text-sm tracking-[0.25em] text-[var(--purple-light)]">
                  {plan.id}
                </span>

                {plan.popular && (
                  <span className="paragraph rounded-full border border-[var(--purple-primary)] bg-[var(--purple-dark)] px-4 py-2 text-xs tracking-[0.15em] text-[var(--purple-soft)]">
                    MOST POPULAR
                  </span>
                )}
              </div>

              <div className="relative mt-10">
                <h3 className="heading text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
                  {plan.name}
                </h3>

                <p className="paragraph mt-4 min-h-[72px] text-lg leading-relaxed tracking-wide text-[var(--text-secondary)]">
                  {plan.description}
                </p>
              </div>

              <div className="relative mt-10 border-y border-[var(--border-primary)] py-7">
                <span className="paragraph text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  STARTING FROM
                </span>

                <div className="mt-2 flex items-end gap-2">
                  <span className="heading text-5xl font-bold text-[var(--text-primary)] md:text-6xl">
                    {currency === "USD" ? `$${plan.usd}` : plan.pkr}
                  </span>

                  {currency === "PKR" && (
                    <span className="paragraph mb-2 text-lg text-[var(--text-muted)]">
                      PKR
                    </span>
                  )}
                </div>
              </div>

              <div className="relative mt-8 flex-1">
                <span className="paragraph text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  INCLUDED
                </span>

                <div className="mt-5 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--purple-primary)] text-xs text-[var(--purple-light)]">
                        ✓
                      </span>

                      <span className="paragraph text-base tracking-wide text-[var(--text-secondary)]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className={`paragraph relative mt-10 flex items-center justify-center gap-3 rounded-[var(--radius-sm)] px-6 py-4 text-sm font-bold tracking-[0.15em] transition-all duration-300 ${
                  plan.popular
                    ? "bg-[var(--gradient-brand)] text-white shadow-[var(--shadow-purple)] hover:brightness-125"
                    : "border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--purple-primary)] hover:bg-[var(--purple-dark)]"
                }`}
              >
                START A PROJECT
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <span className="pointer-events-none absolute bottom-2 right-5 heading text-[100px] font-bold leading-none text-white/[0.025]">
                {plan.id}
              </span>
            </div>
          ))}
        </div>

        {/* HOSTING ADD-ON BANNER */}
        <div
          ref={hostingRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative mt-12 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 transition-colors duration-500 hover:border-[var(--border-hover)] lg:p-10"
        >
          <div className="card-glow pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--glow-purple)] opacity-0 blur-[80px]" />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="paragraph text-sm tracking-[0.25em] text-[var(--purple-light)]">
                  // ADD-ON SERVICE
                </span>
                <span className="paragraph rounded-full border border-[var(--purple-primary)] bg-[var(--purple-dark)] px-3 py-1 text-xs tracking-[0.15em] text-[var(--purple-soft)]">
                  MANAGED HOSTING
                </span>
              </div>

              <h3 className="heading mt-4 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                HIGH-PERFORMANCE HOSTING
              </h3>

              <p className="paragraph mt-2 text-lg text-[var(--text-secondary)]">
                Fully managed, ultra-fast cloud hosting tailored specifically for modern animated web applications.
              </p>

              {/* HOSTING FEATURES GRID */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {hostingData.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[var(--purple-primary)] text-[10px] text-[var(--purple-light)]">
                      ✓
                    </span>
                    <span className="paragraph text-sm tracking-wide text-[var(--text-secondary)]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* HOSTING PRICE & ACTION */}
            <div className="flex flex-col items-start gap-4 border-t border-[var(--border-primary)] pt-6 lg:items-end lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <span className="paragraph text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                YEARLY SUBSCRIPTION
              </span>

              <div className="flex items-baseline gap-2">
                <span className="heading text-5xl font-bold text-[var(--text-primary)] md:text-6xl">
                  {currency === "USD" ? `$${hostingData.usd}` : hostingData.pkr}
                </span>
                <span className="paragraph text-lg text-[var(--text-muted)]">
                  {currency === "PKR" ? "PKR / year" : "/ year"}
                </span>
              </div>

              <a
                href="#contact"
                className="paragraph flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-6 py-3 text-sm font-bold tracking-[0.15em] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--purple-primary)] hover:bg-[var(--purple-dark)]"
              >
                ADD HOSTING ↗
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-primary)] pt-6 text-center md:flex-row md:text-left">
          <p className="paragraph text-base tracking-wide text-[var(--text-muted)]">
            * Final pricing depends on project scope, functionality and
            requirements.
          </p>

          <a
            href="#contact"
            className="paragraph text-sm font-bold tracking-[0.2em] text-[var(--purple-light)] transition-colors hover:text-[var(--purple-soft)]"
          >
            NEED A CUSTOM QUOTE? →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;