import React, { useEffect, useRef, useState } from "react";
import { Mail, ArrowUpRight, Sparkles, Code2 } from "lucide-react";

const Github = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

/* ---------------------------------------------------------
   Design tokens (see design plan):
   bg      #FFF1F7  blush
   surface #FFFFFF
   ink     #2B1830  deep plum-black
   pink    #FF4FA3  primary accent
   violet  #7C5CFA  secondary whimsy accent
   butter  #FFD166  pop / sparkle highlight
   Display: Fraunces (wonky italic for whimsy)
   Body: Space Grotesk
   Mono: IBM Plex Mono (labels, tags — echoes Kirti's Nexus UI)
--------------------------------------------------------- */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,600&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const PROJECTS = [
  {
    title: "Mockstar",
    tag: "flagship",
    rotate: -3,
    blurb:
      "An AI-powered mock interview platform. Upload a resume, it parses it, predicts your domain, and spins up a tailored interview on the spot.",
    stack: ["React", "FastAPI", "Scikit-Learn", "Gemini API", "pdfplumber"],
    accent: "pink",
    url: "https://github.com/KirtiSaini07/Mockstar"
  },
  {
    title: "Daily Calorie Tracker",
    tag: "CLI tool",
    rotate: 2,
    blurb:
      "A friendly command-line companion for logging meals and calories, with running totals and daily averages.",
    stack: ["Python"],
    accent: "violet",
    url: "https://github.com/KirtiSaini07/Daily-Calorie-Tracker-CLI-Tool"
  },
  {
    title: "Gradebook Analyzer",
    tag: "data tool",
    rotate: -2,
    blurb:
      "Crunches student grade data into something actually readable — built while leaning hard into data-science fundamentals.",
    stack: ["Python", "pandas"],
    accent: "butter",
    url: "https://github.com/KirtiSaini07/Gradebook-Analyzer"
  },
  {
    title: "Library Management System",
    tag: "systems",
    rotate: 3,
    blurb:
      "A structured system for tracking books, members, and checkouts — the kind of project that teaches you to respect a schema.",
    stack: ["Python", "SQL"],
    accent: "pink",
    url: "https://github.com/KirtiSaini07/Library-Management-System"
  },
];

const STACK = [
  "JavaScript", "Python", "React", "FastAPI", "SQL", "Tailwind CSS",
  "Vite", "pandas", "NumPy", "PostgreSQL", "MySQL", "Git",
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(22px)",
        transition: `opacity 0.7s cubic-bezier(.2,.7,.3,1) ${delay}s, transform 0.7s cubic-bezier(.2,.7,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Blob({ style, colorVar, size = 340, delay = 0, duration = 22 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "42% 58% 61% 39% / 45% 41% 59% 55%",
        background: `var(${colorVar})`,
        filter: "blur(2px)",
        opacity: 0.35,
        animation: `float ${duration}s ease-in-out ${delay}s infinite, morph 14s ease-in-out infinite`,
        ...style,
      }}
    />
  );
}

function Sparkle({ style }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        fontSize: 14,
        color: "var(--butter)",
        animation: "sparkle 1.8s ease-in-out infinite",
        pointerEvents: "none",
        ...style,
      }}
    >
      ✦
    </span>
  );
}

function ProjectCard({ p, index }) {
  const [ref, visible] = useReveal();
  const [hover, setHover] = useState(false);
  const accentVar = `var(--${p.accent})`;
  return (
    <a
      href={p.url || "#"}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          background: "var(--surface)",
          borderRadius: 22,
          padding: "28px 26px",
          border: "2px solid var(--ink)",
          boxShadow: hover ? "8px 8px 0 var(--ink)" : "4px 4px 0 var(--ink)",
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? 0 : 24}px) rotate(${hover ? 0 : p.rotate}deg) translate(${hover ? "-3px, -6px" : "0,0"})`,
          transition: "opacity .6s ease, box-shadow .25s ease, transform .3s cubic-bezier(.2,.8,.3,1.2)",
          transitionDelay: visible ? `${(index % 4) * 0.08}s` : "0s",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {hover && (
          <>
            <Sparkle style={{ top: -10, right: 18 }} />
            <Sparkle style={{ top: 8, right: -6, animationDelay: "0.4s", fontSize: 10 }} />
          </>
        )}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
          background: accentVar, color: "var(--ink)", padding: "3px 10px",
          borderRadius: 999, border: "1.5px solid var(--ink)", marginBottom: 14,
          alignSelf: "flex-start"
        }}>
          {p.tag}
          <ArrowUpRight size={12} />
        </div>
        <h3 style={{
          fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 26,
          margin: "0 0 10px", color: "var(--ink)",
        }}>
          {p.title}
        </h3>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, lineHeight: 1.55, color: "#5b4a5f", margin: "0 0 16px", flex: 1 }}>
          {p.blurb}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.stack.map((s) => (
            <span key={s} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
              border: "1.5px solid var(--ink)", borderRadius: 8,
              padding: "3px 8px", color: "var(--ink)",
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Portfolio() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [dynamicRepos, setDynamicRepos] = useState([]);
  
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    fetch('https://api.github.com/users/KirtiSaini07/repos?per_page=100')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const ignoreList = [
            "mockstar", "nexus", "daily-calorie-tracker", "daily-calorie-tracker-cli-tool", 
            "gradebook-analyzer", "library-management-system", "kirtisaini07",
            "assg", "capstone", "endterm", "practical", "campus-energy"
          ];
          
          const filtered = data
            .filter(repo => !repo.fork)
            .filter(repo => !ignoreList.some(ignore => repo.name.toLowerCase().includes(ignore)))
            .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort best first
            .map((repo, i) => {
              const accents = ["pink", "violet", "butter"];
              return {
                title: repo.name.replace(/-/g, ' '),
                tag: "project",
                rotate: (i % 2 === 0 ? 1 : -1) * (1 + (i % 3)),
                blurb: repo.description || "Another cool project cooked up with code.",
                stack: repo.language ? [repo.language] : ["Code"],
                accent: accents[i % accents.length],
                url: repo.html_url
              };
            });
            
          setDynamicRepos(filtered);
        }
      })
      .catch(console.error);
  }, []);

  const name = "Kirti Saini";
  const allProjects = [...PROJECTS, ...dynamicRepos];

  return (
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      background: "var(--bg)",
      color: "var(--ink)",
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        ${FONT_IMPORT}
        :root {
          --bg: #FFF1F7;
          --surface: #FFFFFF;
          --ink: #2B1830;
          --pink: #FF4FA3;
          --violet: #A78BFA;
          --butter: #FFD166;
        }
        * { box-sizing: border-box; }
        @keyframes float {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33% { transform: translate(18px,-24px) rotate(6deg); }
          66% { transform: translate(-16px,14px) rotate(-5deg); }
        }
        @keyframes morph {
          0%,100% { border-radius: 42% 58% 61% 39% / 45% 41% 59% 55%; }
          50% { border-radius: 58% 42% 39% 61% / 55% 60% 40% 45%; }
        }
        @keyframes sparkle {
          0%,100% { opacity: 0; transform: scale(0.6) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(15deg); }
        }
        @keyframes wiggle-underline {
          0% { stroke-dashoffset: 340; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes bob {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        a.pill:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }
        .navlink { position: relative; }
        .navlink::after {
          content: ""; position: absolute; left: 0; bottom: -3px; height: 2px; width: 0%;
          background: var(--pink); transition: width .25s ease;
        }
        .navlink:hover::after { width: 100%; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
        ::selection { background: var(--butter); color: var(--ink); }
      `}</style>

      {/* ambient background blobs */}
      <Blob style={{ top: -80, left: -100 }} colorVar="--pink" size={360} duration={20} />
      <Blob style={{ top: 260, right: -120 }} colorVar="--violet" size={300} duration={26} delay={2} />
      <Blob style={{ bottom: -60, left: "40%" }} colorVar="--butter" size={260} duration={18} delay={1} />

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 20,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 6vw", backdropFilter: "blur(8px)",
        background: "rgba(255,241,247,0.75)", borderBottom: "2px solid var(--ink)",
      }}>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 20 }}>
          kirti<span style={{ color: "var(--pink)" }}>.</span>saini
        </span>
        <div style={{ display: "flex", gap: 28, fontSize: 14, fontFamily: "'IBM Plex Mono', monospace" }}>
          <a href="#work" className="navlink" style={{ color: "var(--ink)", textDecoration: "none" }}>work</a>
          <a href="#about" className="navlink" style={{ color: "var(--ink)", textDecoration: "none" }}>about</a>
          <a href="#contact" className="navlink" style={{ color: "var(--ink)", textDecoration: "none" }}>contact</a>
        </div>
      </nav>

      {/* HERO */}
      <header style={{
        position: "relative", zIndex: 5, padding: "13vh 6vw 10vh", maxWidth: 980,
      }}>
        <Reveal>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5,
            border: "1.5px solid var(--ink)", borderRadius: 999, padding: "5px 12px",
            marginBottom: 26, background: "var(--surface)",
          }}>
            <Sparkles size={13} /> B.Tech CSE · Data Science · K.R. Mangalam University
          </div>
        </Reveal>

        <h1 style={{
          fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: "clamp(42px, 8vw, 92px)",
          lineHeight: 1.02, margin: "0 0 20px",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(26px)",
          transition: "opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1)",
        }}>
          Hey, I'm {name.split(" ")[0]}
          <span style={{ display: "inline-block", animation: "bob 3s ease-in-out infinite", marginLeft: 10 }}>👋</span>
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 600, color: "var(--pink)" }}>
            I build things that talk back.
          </span>
        </h1>

        <Reveal delay={0.15}>
          <p style={{ fontSize: 18, lineHeight: 1.65, maxWidth: 560, color: "#5b4a5f", margin: "0 0 34px" }}>
            Mock interviews that adapt to your resume, tools that make sense of messy data,
            and a soft spot for clean UI wrapped around real logic. Currently deep in building{" "}
            <strong style={{ color: "var(--ink)" }}>Mockstar</strong> — an AI-powered mock interview platform.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#work" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--pink)", color: "#fff", textDecoration: "none",
              padding: "12px 22px", borderRadius: 999, border: "2px solid var(--ink)",
              fontWeight: 600, boxShadow: "4px 4px 0 var(--ink)", transition: "transform .2s, box-shadow .2s",
            }}>
              See my work <ArrowUpRight size={16} />
            </a>
            <a href="https://github.com/KirtiSaini07" target="_blank" rel="noreferrer" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--surface)", color: "var(--ink)", textDecoration: "none",
              padding: "12px 22px", borderRadius: 999, border: "2px solid var(--ink)",
              fontWeight: 600, boxShadow: "4px 4px 0 var(--ink)", transition: "transform .2s, box-shadow .2s",
            }}>
              <Github size={16} /> GitHub
            </a>
          </div>
        </Reveal>
      </header>

      {/* PROJECTS */}
      <section id="work" style={{ position: "relative", zIndex: 5, padding: "6vh 6vw 12vh" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 600, fontSize: 36, margin: 0 }}>
              things I've made
            </h2>
            <span style={{ height: 2, flex: 1, background: "var(--ink)", opacity: 0.15 }} />
          </div>
        </Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "34px 28px",
        }}>
          {allProjects.map((p, i) => <ProjectCard key={p.title + i} p={p} index={i} />)}
        </div>
      </section>

      {/* ABOUT / STACK */}
      <section id="about" style={{
        position: "relative", zIndex: 5, padding: "8vh 6vw",
        background: "var(--surface)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 50, maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 600, fontSize: 32, margin: "0 0 18px" }}>
                a little about me
              </h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "#5b4a5f", marginBottom: 14 }}>
                I'm a Computer Science student specializing in Data Science, and most of my time
                lately goes into <strong style={{ color: "var(--ink)" }}>Mockstar</strong> — parsing resumes,
                predicting candidate domains, and getting an LLM to ask genuinely good interview questions.
              </p>
              <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "#5b4a5f" }}>
                I care about clean UI and thoughtful branding as much as I care about the logic underneath —
                a project isn't finished until both feel right.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, letterSpacing: 1,
                textTransform: "uppercase", color: "var(--pink)", marginBottom: 16,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Code2 size={15} /> toolkit
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {STACK.map((s, i) => (
                  <span key={s} style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5,
                    border: "1.5px solid var(--ink)", borderRadius: 999,
                    padding: "6px 13px", background: i % 3 === 0 ? "var(--butter)" : i % 3 === 1 ? "#FFE3EF" : "var(--surface)",
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <footer id="contact" style={{ position: "relative", zIndex: 5, padding: "10vh 6vw 8vh", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: "clamp(30px,5vw,52px)", margin: "0 0 16px" }}>
            let's make something <span style={{ fontStyle: "italic", color: "var(--pink)" }}>together</span>
          </h2>
          <p style={{ color: "#5b4a5f", marginBottom: 30 }}>Always up for talking projects, data science, or good UI.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:sainikirti.2007@gmail.com" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
              background: "var(--ink)", color: "var(--bg)", padding: "12px 22px", borderRadius: 999,
              border: "2px solid var(--ink)", fontWeight: 600, boxShadow: "4px 4px 0 var(--pink)", transition: "transform .2s, box-shadow .2s",
            }}>
              <Mail size={16} /> Email
            </a>
            <a href="https://github.com/KirtiSaini07" target="_blank" rel="noreferrer" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
              background: "var(--surface)", color: "var(--ink)", padding: "12px 22px", borderRadius: 999,
              border: "2px solid var(--ink)", fontWeight: 600, boxShadow: "4px 4px 0 var(--ink)", transition: "transform .2s, box-shadow .2s",
            }}>
              <Github size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/kirti-saini-4bb01b3a8" target="_blank" rel="noreferrer" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
              background: "var(--violet)", color: "var(--ink)", padding: "12px 22px", borderRadius: 999,
              border: "2px solid var(--ink)", fontWeight: 600, boxShadow: "4px 4px 0 var(--ink)", transition: "transform .2s, box-shadow .2s",
            }}>
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </Reveal>
        <p style={{ marginTop: 60, fontSize: 12.5, fontFamily: "'IBM Plex Mono', monospace", color: "#9a879e" }}>
          made with 💗 and a little too much CSS
        </p>
      </footer>
    </div>
  );
}
