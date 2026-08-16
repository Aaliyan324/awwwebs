import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".navbar-item",
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -2,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`fixed left-0 top-0 z-[999] w-full px-5 transition-all duration-500 md:px-10 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[var(--container-width)] items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 md:px-6 ${
            scrolled
              ? "border-[var(--border-hover)] bg-[rgba(8,5,15,0.75)] shadow-[var(--shadow-purple)] backdrop-blur-xl"
              : "border-[var(--border-primary)] bg-[rgba(8,5,15,0.35)] backdrop-blur-md"
          }`}
        >
          {/* =================================================
              LOGO (IMAGE)
          ================================================= */}

          <a
            href="#home"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="navbar-item relative z-10 flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 md:h-10"
            />
          </a>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <div className="hidden items-center gap-1 rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)]/60 p-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="navbar-item paragraph group relative rounded-full px-5 py-2.5 text-sm uppercase tracking-[0.12em] text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--purple-dark)] hover:text-white"
              >
                {link.name}

                {/* Hover line */}
                <span className="absolute bottom-1 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-[var(--purple-light)] transition-all duration-300 group-hover:w-5" />
              </a>
            ))}
          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <a
            href="#contact"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="navbar-item group hidden items-center gap-2 rounded-full bg-[var(--gradient-brand)] px-5 py-3 shadow-[var(--shadow-purple)] transition-all duration-300 hover:brightness-125 md:flex"
          >
            <span className="paragraph text-sm font-bold uppercase tracking-[0.12em] text-white">
              Start a Project
            </span>

            <span className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="navbar-item flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-[1.5px] w-full bg-[var(--text-primary)] transition-all duration-300 ${
                  menuOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />

              <span
                className={`h-[1.5px] w-full bg-[var(--text-primary)] transition-all duration-300 ${
                  menuOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <div
          className={`mx-auto mt-3 max-w-[var(--container-width)] overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-primary)] bg-[rgba(8,5,15,0.9)] backdrop-blur-xl transition-all duration-500 md:hidden ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col p-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="paragraph flex items-center justify-between border-b border-[var(--border-primary)] px-4 py-5 text-lg uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors duration-300 last:border-none hover:text-[var(--purple-light)]"
              >
                <span>{link.name}</span>

                <span className="text-[var(--purple-light)]">
                  0{index + 1}
                </span>
              </a>
            ))}

            <a
              href="#contact"
              onClick={handleNavClick}
              className="paragraph mt-4 flex items-center justify-center gap-3 rounded-[var(--radius-sm)] bg-[var(--gradient-brand)] px-5 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white"
            >
              START A PROJECT
              <span>↗</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;