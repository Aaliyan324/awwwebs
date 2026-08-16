import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ isLoading, onComplete }) => {
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentTextRef = useRef(null);
  const statusTextRef = useRef(null);
  const contentGroupRef = useRef(null);

  const [progress, setProgress] = useState(0);

  const statusMessages = [
    "INITIALIZING CORE SYSTEM...",
    "CONNECTING NEURAL MESH...",
    "STREAMING 3D ASSETS...",
    "CALIBRATING SPATIAL MATRIX...",
    "SYSTEM OPERATIONAL",
  ];

  useEffect(() => {
    const progressObj = { value: 0 };

    // Animate progress up to 90% while waiting for Spline, then fast-forward to 100%
    const progressTween = gsap.to(progressObj, {
      value: isLoading ? 90 : 100,
      duration: isLoading ? 3.5 : 0.5,
      ease: isLoading ? "power1.inOut" : "power2.out",
      onUpdate: () => {
        const currentVal = Math.floor(progressObj.value);
        setProgress(currentVal);

        if (percentTextRef.current) {
          percentTextRef.current.innerText = `${currentVal.toString().padStart(3, "0")}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${currentVal}%`;
        }
      },
    });

    return () => progressTween.kill();
  }, [isLoading]);

  useEffect(() => {
    // Futuristic shutter collapse animation when ready
    if (!isLoading && progress >= 90) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      tl.to(contentGroupRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power3.in",
      }).to(
        preloaderRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.2"
      );
    }
  }, [isLoading, progress, onComplete]);

  const currentStatus =
    statusMessages[
      Math.min(
        Math.floor((progress / 100) * statusMessages.length),
        statusMessages.length - 1
      )
    ];

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-primary,#0a0a0f)] overflow-hidden select-none"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Tactical Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(var(--purple-primary,#8b5cf6) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[var(--purple-primary,#8b5cf6)]/15 blur-[120px] pointer-events-none" />

      {/* Main Loader Content */}
      <div
        ref={contentGroupRef}
        className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full px-8"
      >
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[var(--purple-light,#c084fc)] uppercase">
          <span className="w-2 h-2 rounded-full bg-[var(--purple-primary,#8b5cf6)] animate-ping" />
          <span>NEURAL_LINK // LOADING</span>
        </div>

        <div className="relative font-mono font-extrabold text-7xl md:text-8xl tracking-tighter text-[var(--text-primary,#ffffff)] drop-shadow-[0_0_25px_var(--purple-primary,#8b5cf6)]">
          <span ref={percentTextRef}>000%</span>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div
            className="relative w-full h-2 bg-[var(--bg-card,#13131d)] border border-[var(--border-primary,#27273a)] p-[2px] overflow-hidden"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[var(--purple-primary,#8b5cf6)] to-[var(--purple-light,#c084fc)] transition-all duration-75 shadow-[0_0_15px_var(--purple-primary,#8b5cf6)]"
              style={{ width: "0%" }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted,#71717a)] tracking-wider uppercase pt-1">
            <span ref={statusTextRef}>{currentStatus}</span>
            <span>SEC_01 // 2026</span>
          </div>
        </div>
      </div>

      {/* Cyber HUD Brackets */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-[var(--purple-primary,#8b5cf6)]/40 pointer-events-none" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-[var(--purple-primary,#8b5cf6)]/40 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-[var(--purple-primary,#8b5cf6)]/40 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-[var(--purple-primary,#8b5cf6)]/40 pointer-events-none" />
    </div>
  );
};

export default Preloader;