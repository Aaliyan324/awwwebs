import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "01",
    title: "Toylo",
    category: "Toys Selling Website",
    description:
      "A playful, cartoon-inspired toy store website featuring colorful visuals, interactive animations, and a fun, kid-friendly shopping experience. Built with a modern, responsive design.",
    thumbnail:
      "/Toylo.png",
    github: "https://github.com/Aaliyan324/TOYLO-Website",
    live: "https://toylo-two.vercel.app/",
    tech: ["React", "GSAP", "React Router", "Tailwind"],
  },
  {
    id: "02",
    title: "Craft Burgers (Comical Website)",
    category: "Resturant Website",
    description:
      "A bold, comic-inspired burger website with playful visuals, vibrant styling, and a modern interactive experience. Built with React and Vite, combining creative UI with smooth, engaging interactions.",
    thumbnail:
      "/Craft.PNG",
    github: "https://github.com/Aaliyan324/CraftBurgers",
    live: "/",
    tech: ["Next.js", "TailwindCSS", "GSAP"],
  },
  {
    id: "03",
    title: "Zentro",
    category: "Interior Designer Website",
    description:
      "This project was all about creating a clean, modern, and premium online presence that instantly builds trust and showcases the designer's portfolio in the best possible way. From smooth page transitions to subtle animations, every detail was crafted to make the browsing experience feel elegant and effortless.",
    thumbnail:
      "/Zentro.png",
    github: "https://github.com/Aaliyan324/RealEstateWebsite",
    live: "/",
    tech: ["React", "Node.js", "Tailwind", "GSAP"],
  },
];

const Work = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const previewRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const [activeProject, setActiveProject] = useState(0);

  const project = projectsData[activeProject];

  /*
  |--------------------------------------------------------------------------
  | INITIAL SCROLL ANIMATIONS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current.children,
        {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Project list animation
      gsap.fromTo(
        ".project-item",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-wrapper",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Preview animation
      gsap.fromTo(
        previewRef.current,
        {
          opacity: 0,
          x: 60,
          scale: 0.96,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: previewRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | PROJECT CHANGE ANIMATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!previewRef.current) return;

    const image = imageRef.current;
    const content = contentRef.current;

    const tl = gsap.timeline();

    // Old content leaves
    tl.to([image, content], {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
    });

    // Change image/content
    tl.set([image, content], {
      y: -20,
    });

    // New content enters
    tl.to([image, content], {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.65,
      stagger: 0.08,
      ease: "power3.out",
    });

    // Image zoom
    gsap.fromTo(
      image,
      {
        scale: 1.12,
      },
      {
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, [activeProject]);

  /*
  |--------------------------------------------------------------------------
  | CHANGE PROJECT
  |--------------------------------------------------------------------------
  */

  const changeProject = (index) => {
    if (index === activeProject) return;

    setActiveProject(index);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] px-6 py-28 md:px-16"
    >
      {/* --------------------------------------------------------------- */}
      {/* BACKGROUND GLOW */}
      {/* --------------------------------------------------------------- */}

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--glow-purple)] opacity-20 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[var(--purple-dark)] opacity-20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[var(--container-width)]">

        {/* --------------------------------------------------------------- */}
        {/* HEADER */}
        {/* --------------------------------------------------------------- */}

        <div
          ref={headerRef}
          className="mb-20 max-w-4xl"
        >
          <span className="paragraph text-lg uppercase tracking-[0.3em] text-[var(--purple-light)]">
            // SELECTED WORK
          </span>

          <h2 className="heading mt-3 text-5xl font-bold leading-[0.95] text-[var(--text-primary)] md:text-7xl lg:text-8xl">
            OUR
            <br />
            <span className="text-transparent bg-clip-text bg-[var(--gradient-brand)]">
              PROJECTS.
            </span>
          </h2>

          <p className="paragraph mt-6 max-w-2xl text-xl leading-relaxed text-[var(--text-secondary)] md:text-2xl">
            A collection of digital experiences we've designed and developed
            for brands, businesses, and ambitious ideas.
          </p>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* PROJECT SHOWCASE */}
        {/* --------------------------------------------------------------- */}

        <div className="projects-wrapper grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">

          {/* ============================================================= */}
          {/* PROJECT LIST */}
          {/* ============================================================= */}

          <div className="project-list">

            {/* List Header */}

            <div className="mb-5 flex items-center justify-between border-b border-[var(--border-primary)] pb-4">
              <span className="paragraph text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
                PROJECTS
              </span>

              <span className="paragraph text-sm text-[var(--text-muted)]">
                {projectsData.length.toString().padStart(2, "0")}
              </span>
            </div>

            {/* Projects */}

            <div>
              {projectsData.map((item, index) => {
                const isActive = activeProject === index;

                return (
                  <button
                    key={item.id}
                    onClick={() => changeProject(index)}
                    className={`project-item group relative flex w-full items-center justify-between border-b border-[var(--border-primary)] py-7 text-left transition-all duration-300 ${
                      isActive
                        ? "text-[var(--purple-light)]"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {/* Active Indicator */}

                    <span
                      className={`absolute left-0 top-0 h-full w-[3px] origin-center bg-[var(--purple-light)] transition-transform duration-500 ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />

                    <div className="flex items-center gap-5 pl-5">

                      {/* Number */}

                      <span
                        className={`paragraph text-sm tracking-widest transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--purple-light)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        {item.id}
                      </span>

                      {/* Title */}

                      <span className="heading text-xl font-bold md:text-2xl">
                        {item.title}
                      </span>

                    </div>

                    {/* Arrow */}

                    <span
                      className={`mr-2 text-xl transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-3 opacity-0"
                      }`}
                    >
                      ↗
                    </span>

                  </button>
                );
              })}
            </div>

            {/* Bottom Text */}

            <div className="mt-8">
              <span className="paragraph text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                HAVE A PROJECT IN MIND?
              </span>

              <a
                href="#contact"
                className="heading mt-2 block text-2xl font-bold text-[var(--text-primary)] transition-colors duration-300 hover:text-[var(--purple-light)]"
              >
                LET'S BUILD SOMETHING ↗
              </a>
            </div>
          </div>

          {/* ============================================================= */}
          {/* PROJECT PREVIEW */}
          {/* ============================================================= */}

          <div
            ref={previewRef}
            className="relative"
          >

            {/* Image */}

            <div className="relative h-[350px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-primary)] md:h-[520px]">

              <img
                ref={imageRef}
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover"
              />

              {/* Dark Gradient */}

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-90" />

              {/* Project Number */}

              <div className="absolute bottom-4 left-6">

                <span className="heading text-[100px] font-bold leading-none text-white/10 md:text-[150px]">
                  {project.id}
                </span>

              </div>

              {/* Category */}

              <div className="absolute left-6 top-6">

                <span className="paragraph rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {project.category}
                </span>

              </div>

              {/* Open Project */}

              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[var(--purple-light)]"
              >
                ↗
              </a>
            </div>

            {/* ----------------------------------------------------------- */}
            {/* PROJECT INFO */}
            {/* ----------------------------------------------------------- */}

            <div
              ref={contentRef}
              className="mt-8"
            >

              {/* Small Label */}

              <div className="mb-4 flex items-center gap-3">

                <span className="h-[1px] w-10 bg-[var(--purple-light)]" />

                <span className="paragraph text-sm uppercase tracking-[0.2em] text-[var(--purple-light)]">
                  {project.id} — {project.category}
                </span>

              </div>

              {/* Title */}

              <h3 className="heading text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
                {project.title}
                <span className="text-[var(--purple-light)]">.</span>
              </h3>

              {/* Description */}

              <p className="paragraph mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
                {project.description}
              </p>

              {/* Tech */}

              <div className="mt-7 flex flex-wrap gap-2">

                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="paragraph rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-2 text-xs uppercase tracking-wider text-[var(--text-muted)] transition-colors duration-300 hover:border-[var(--purple-light)] hover:text-[var(--purple-light)]"
                  >
                    {tech}
                  </span>
                ))}

              </div>

              {/* Buttons */}

              <div className="mt-8 flex flex-wrap gap-3">

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="paragraph inline-flex items-center gap-3 rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--purple-light)] hover:bg-[var(--purple-dark)]"
                  >
                    GITHUB
                    <span>↗</span>
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="paragraph inline-flex items-center gap-3 rounded-full bg-[var(--gradient-brand)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[var(--shadow-purple)] transition-all duration-300 hover:brightness-125"
                  >
                    LIVE PREVIEW
                    <span>↗</span>
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;