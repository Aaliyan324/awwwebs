import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Marquee = () => {
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;

    // Get the width of one complete set
    const distance = track.scrollWidth / 2;

    // Infinite marquee
    const marqueeTween = gsap.to(track, {
      x: -distance,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // ScrollTrigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: marquee,
      start: "top bottom",
      end: "bottom top",

      onUpdate: (self) => {
        const velocity = self.getVelocity();

        // Increase marquee speed while scrolling
        gsap.to(marqueeTween, {
          timeScale: Math.max(0.5, Math.min(Math.abs(velocity) / 500, 3)),
          duration: 0.3,
          overwrite: true,
        });
      },

      onLeave: () => {
        gsap.to(marqueeTween, {
          timeScale: 1,
          duration: 0.5,
        });
      },

      onEnterBack: () => {
        gsap.to(marqueeTween, {
          timeScale: 1,
          duration: 0.5,
        });
      },
    });

    return () => {
      marqueeTween.kill();
      scrollTrigger.kill();
    };
  }, []);

  const items = [
    "DIGITAL EXPERIENCES",
    "CREATIVE WEBSITES",
    "SMOOTH ANIMATIONS",
    "BOLD IDEAS",
  ];

  return (
    <section
      ref={marqueeRef}
      className="w-full pointer-events-none -mt-12 mb-12 overflow-hidden bg-[var(--purple-soft)]"
    >
      <div
        ref={trackRef}
        className="flex w-max items-center py-8"
      >
        {/* First set */}
        <div className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <React.Fragment key={`first-${index}`}>
              <h1 className="heading whitespace-nowrap px-8 text-4xl font-bold text-[var(--bg-primary)]">
                {item}
              </h1>

              <span className="heading text-4xl font-bold text-[var(--bg-primary)]">
                •
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate set */}
        <div className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <React.Fragment key={`second-${index}`}>
              <h1 className="heading whitespace-nowrap px-8 text-4xl font-bold text-[var(--bg-primary)]">
                {item}
              </h1>

              <span className="heading text-4xl font-bold text-[var(--bg-primary)]">
                •
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;