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
   mint    #99F2C8  extra whimsical accent
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
    rotate: -4,
    blurb:
      "An AI-powered mock interview platform. Upload a resume, it parses it, predicts your domain, and spins up a tailored interview on the spot.",
    stack: ["React", "FastAPI", "Scikit-Learn", "Gemini API", "pdfplumber"],
    accent: "pink",
    url: "https://github.com/KirtiSaini07/Mockstar"
  },
  {
    title: "Daily Calorie Tracker",
    tag: "CLI tool",
    rotate: 3,
    blurb:
      "A friendly command-line companion for logging meals and calories, with running totals and daily averages.",
    stack: ["Python"],
    accent: "violet",
    url: "https://github.com/KirtiSaini07/Daily-Calorie-Tracker-CLI-Tool"
  },
  {
    title: "Gradebook Analyzer",
    tag: "data tool",
    rotate: -3,
    blurb:
      "Crunches student grade data into something actually readable — built while leaning hard into data-science fundamentals.",
    stack: ["Python", "pandas"],
    accent: "butter",
    url: "https://github.com/KirtiSaini07/Gradebook-Analyzer"
  },
  {
    title: "Library Management System",
    tag: "systems",
    rotate: 4,
    blurb:
      "A structured system for tracking books, members, and checkouts — the kind of project that teaches you to respect a schema.",
    stack: ["Python", "SQL"],
    accent: "mint",
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
        transform: visible ? "translateY(0px) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
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
        opacity: 0.45,
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
        fontSize: 18,
        color: "var(--butter)",
        animation: "sparkle 1.5s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 10,
        ...style,
      }}
    >
      ✦
    </span>
  );
}

function Marquee() {
  return (
    <div style={{
      width: '100%', overflow: 'hidden', background: 'var(--butter)', 
      borderTop: '3px solid var(--ink)', borderBottom: '3px solid var(--ink)',
      padding: '12px 0', display: 'flex', whiteSpace: 'nowrap', position: 'relative', zIndex: 10,
      transform: 'rotate(-1deg) scale(1.05)', margin: '40px 0'
    }}>
      <div style={{
        animation: 'scrollText 20s linear infinite', 
        fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '24px', fontWeight: 800, color: 'var(--ink)',
        display: 'flex', gap: '30px'
      }}>
        {Array(8).fill(null).map((_, i) => (
          <React.Fragment key={i}>
            <span>✨ TURNING DATA INTO INTELLIGENT EXPERIENCES ✨</span>
            <span>✦ BRIDGING LOGIC & DESIGN ✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
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
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', outline: 'none' }}
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
          border: "3px solid var(--ink)",
          boxShadow: hover ? `12px 12px 0 var(--ink)` : "5px 5px 0 var(--ink)",
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? 0 : 30}px) rotate(${hover ? (p.rotate > 0 ? p.rotate + 2 : p.rotate - 2) : p.rotate}deg) translate(${hover ? "-6px, -10px" : "0,0"})`,
          transition: "opacity .6s ease, box-shadow .3s cubic-bezier(0.34, 1.56, 0.64, 1), transform .3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transitionDelay: visible && !hover ? `${(index % 4) * 0.08}s` : "0s",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {hover && (
          <>
            <Sparkle style={{ top: -15, right: 20, transform: 'scale(1.5)' }} />
            <Sparkle style={{ top: 15, right: -15, animationDelay: "0.2s", fontSize: 14 }} />
            <Sparkle style={{ bottom: 20, left: -10, animationDelay: "0.5s", fontSize: 16 }} />
          </>
        )}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600,
          background: accentVar, color: "var(--ink)", padding: "4px 12px",
          borderRadius: 999, border: "2px solid var(--ink)", marginBottom: 16,
          alignSelf: "flex-start",
          boxShadow: "2px 2px 0 var(--ink)"
        }}>
          {p.tag}
          <ArrowUpRight size={14} />
        </div>
        <h3 style={{
          fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 28,
          margin: "0 0 12px", color: "var(--ink)",
        }}>
          {p.title}
        </h3>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, lineHeight: 1.6, color: "#4a3b4e", margin: "0 0 20px", flex: 1, fontWeight: 500 }}>
          {p.blurb}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {p.stack.map((s, i) => (
            <span key={s} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 500,
              border: "2px dashed var(--ink)", borderRadius: 8,
              padding: "4px 10px", color: "var(--ink)",
              background: hover && i % 2 === 0 ? "var(--pink)" : (hover ? "var(--butter)" : "transparent"),
              transition: "background 0.3s ease",
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

// Custom magic cursor component
function MagicCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => setPos({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: pos.y, left: pos.x,
      transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
      pointerEvents: 'none',
      zIndex: 9999,
      transition: 'transform 0.1s ease-out',
    }}>
      <div style={{
        width: '24px', height: '24px',
        border: '3px solid var(--ink)',
        borderRadius: '50%',
        background: 'var(--butter)',
        boxShadow: '2px 2px 0 var(--ink)',
        position: 'relative'
      }}>
        <Sparkle style={{ top: -10, right: -10, fontSize: 12 }} />
      </div>
    </div>
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
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .map((repo, i) => {
              const accents = ["pink", "violet", "butter", "mint"];
              return {
                title: repo.name.replace(/-/g, ' '),
                tag: "project",
                rotate: (i % 2 === 0 ? 1 : -1) * (2 + (i % 4)),
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
      cursor: "none" /* hide default cursor for magic cursor */
    }}>
      <MagicCursor />
      <style>{`
        ${FONT_IMPORT}
        :root {
          --bg: #FFF1F7;
          --surface: #FFFFFF;
          --ink: #2B1830;
          --pink: #FF4FA3;
          --violet: #A78BFA;
          --butter: #FFD166;
          --mint: #99F2C8;
        }
        * { box-sizing: border-box; cursor: none !important; }
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
        @keyframes scrollText {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes bob {
          0%,100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        @keyframes floatPic {
          0%, 100% { transform: rotate(8deg) translateY(0); }
          50% { transform: rotate(12deg) translateY(-15px); }
        }
        a.pill:hover { transform: translate(-3px,-3px) scale(1.05); box-shadow: 8px 8px 0 var(--ink); }
        .navlink { position: relative; padding: 4px 8px; border-radius: 8px; transition: background 0.2s; }
        .navlink:hover { background: var(--pink); color: white !important; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
        ::selection { background: var(--butter); color: var(--ink); }
      `}</style>

      {/* ambient background blobs */}
      <Blob style={{ top: -80, left: -100 }} colorVar="--pink" size={360} duration={20} />
      <Blob style={{ top: 260, right: -120 }} colorVar="--violet" size={300} duration={26} delay={2} />
      <Blob style={{ bottom: -60, left: "40%" }} colorVar="--mint" size={260} duration={18} delay={1} />
      <Blob style={{ top: "40%", right: "10%" }} colorVar="--butter" size={220} duration={15} delay={3} />

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 20,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 6vw", backdropFilter: "blur(12px)",
        background: "rgba(255,241,247,0.85)", borderBottom: "3px solid var(--ink)",
      }}>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 24 }}>
          kirti<span style={{ color: "var(--pink)" }}>.</span>saini
        </span>
        <div style={{ display: "flex", gap: 16, fontSize: 15, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>
          <a href="#work" className="navlink" style={{ color: "var(--ink)", textDecoration: "none" }}>work</a>
          <a href="#about" className="navlink" style={{ color: "var(--ink)", textDecoration: "none" }}>about</a>
          <a href="#contact" className="navlink" style={{ color: "var(--ink)", textDecoration: "none" }}>contact</a>
        </div>
      </nav>

      {/* HERO */}
      <header style={{
        position: "relative", zIndex: 5, padding: "12vh 6vw 8vh", maxWidth: 1100, margin: "0 auto",
        display: "flex", flexDirection: "column", minHeight: "75vh"
      }}>
        <Reveal>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600,
            border: "2px solid var(--ink)", borderRadius: 999, padding: "6px 16px",
            marginBottom: 32, background: "var(--surface)", boxShadow: "3px 3px 0 var(--ink)"
          }}>
            <Sparkles size={16} color="var(--pink)" /> B.Tech CSE · Data Science · K.R. Mangalam
          </div>
        </Reveal>

        <div style={{ position: "relative" }}>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: "clamp(48px, 9vw, 100px)",
            lineHeight: 1.05, margin: "0 0 24px", maxWidth: "800px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(26px)",
            transition: "opacity .8s ease, transform .8s cubic-bezier(.34, 1.56, 0.64, 1)",
          }}>
            Hey, I'm {name.split(" ")[0]}
            <span style={{ display: "inline-block", animation: "bob 2.5s ease-in-out infinite", marginLeft: 12 }}>✌️</span>
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 700, color: "var(--pink)", position: 'relative' }}>
              Turning complex data into intuitive interfaces.
              <Sparkle style={{ top: -10, right: -30, fontSize: 24, animationDelay: "0.5s" }} />
            </span>
          </h1>

          {/* Whimsical Polarid Avatar */}
          <div style={{ 
            position: 'absolute', right: '0', top: '-20px', 
            border: '4px solid var(--ink)', background: 'var(--surface)', 
            padding: '12px 12px 40px 12px', 
            boxShadow: '10px 10px 0 var(--butter)', width: 'clamp(150px, 15vw, 220px)', zIndex: 2,
            animation: 'floatPic 6s ease-in-out infinite',
            display: 'none' // Hide on very small screens, use CSS in style tag ideally but inline works if we just do a media query. We will just let it be absolute and rely on the container width.
          }} className="polaroid">
            <img src="https://avatars.githubusercontent.com/u/234885469?v=4" alt="Kirti" style={{width: '100%', border: '3px solid var(--ink)'}}/>
            <div style={{
              fontFamily: "'Fraunces', serif", fontStyle: 'italic', textAlign: 'center', 
              position: 'absolute', bottom: '8px', left: 0, right: 0, fontWeight: 800, fontSize: '18px'
            }}>me! ✨</div>
          </div>
          <style>{`
            @media (max-width: 900px) {
              .polaroid { display: none !important; }
            }
          `}</style>
        </div>

        <Reveal delay={0.15}>
          <p style={{ fontSize: 20, lineHeight: 1.6, maxWidth: 620, color: "#4a3b4e", margin: "0 0 40px", fontWeight: 500 }}>
            I engineer scalable systems, leverage machine learning to make sense of messy data, 
            and wrap it all in clean, dynamic UIs. Currently deep in building{" "}
            <strong style={{ color: "var(--ink)", background: "var(--mint)", padding: "0 6px", borderRadius: "4px" }}>Mockstar</strong>.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <a href="#work" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--pink)", color: "#fff", textDecoration: "none",
              padding: "14px 28px", borderRadius: 999, border: "3px solid var(--ink)",
              fontWeight: 700, fontSize: 16, boxShadow: "5px 5px 0 var(--ink)", transition: "transform .2s, box-shadow .2s",
            }}>
              See my work <ArrowUpRight size={18} />
            </a>
            <a href="https://github.com/KirtiSaini07" target="_blank" rel="noreferrer" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--surface)", color: "var(--ink)", textDecoration: "none",
              padding: "14px 28px", borderRadius: 999, border: "3px solid var(--ink)",
              fontWeight: 700, fontSize: 16, boxShadow: "5px 5px 0 var(--ink)", transition: "transform .2s, box-shadow .2s",
            }}>
              <Github size={18} /> GitHub
            </a>
          </div>
        </Reveal>
      </header>

      <Marquee />

      {/* PROJECTS */}
      <section id="work" style={{ position: "relative", zIndex: 5, padding: "8vh 6vw 12vh" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 50 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 800, fontSize: "clamp(32px, 5vw, 48px)", margin: 0 }}>
              things I've made
            </h2>
            <span style={{ height: 3, flex: 1, background: "var(--ink)", opacity: 1, borderRadius: "2px" }} />
          </div>
        </Reveal>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px 30px",
        }}>
          {allProjects.map((p, i) => <ProjectCard key={p.title + i} p={p} index={i} />)}
        </div>
      </section>

      {/* ABOUT / STACK */}
      <section id="about" style={{
        position: "relative", zIndex: 5, padding: "10vh 6vw",
        background: "var(--surface)", borderTop: "3px dashed var(--ink)", borderBottom: "3px dashed var(--ink)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 60, maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ position: "relative" }}>
              <Sparkle style={{ top: -20, left: -20, fontSize: 24, color: "var(--pink)" }} />
              <h2 style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 800, fontSize: 40, margin: "0 0 24px" }}>
                a little about me
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "#4a3b4e", marginBottom: 18, fontWeight: 500 }}>
                I'm a Computer Science student specializing in Data Science. I enjoy bridging the gap between raw data 
                and user-friendly applications by building APIs, experimenting with AI/ML, and designing dynamic frontends. 
                Currently deep in building <strong style={{ color: "var(--ink)", borderBottom: "2px solid var(--violet)" }}>Mockstar</strong>.
              </p>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "#4a3b4e", fontWeight: 500 }}>
                I care about clean UI and thoughtful branding as much as I care about the logic underneath —
                a project isn't finished until both feel right. 🪄
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: "var(--bg)", padding: "30px", borderRadius: "24px", border: "3px solid var(--ink)", boxShadow: "8px 8px 0 var(--ink)", transform: "rotate(2deg)" }}>
              <h3 style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 16, letterSpacing: 1,
                textTransform: "uppercase", color: "var(--ink)", marginBottom: 24, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <Code2 size={20} color="var(--violet)"/> toolkit
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {STACK.map((s, i) => (
                  <span key={s} style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 600,
                    border: "2px solid var(--ink)", borderRadius: 999,
                    padding: "8px 16px", background: i % 4 === 0 ? "var(--butter)" : i % 4 === 1 ? "var(--pink)" : i % 4 === 2 ? "var(--violet)" : "var(--surface)",
                    color: i % 4 === 1 || i % 4 === 2 ? "white" : "var(--ink)",
                    boxShadow: "2px 2px 0 var(--ink)", transition: "transform 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <footer id="contact" style={{ position: "relative", zIndex: 5, padding: "12vh 6vw 8vh", textAlign: "center", overflow: 'hidden' }}>
        <Blob style={{ top: -100, right: "20%" }} colorVar="--mint" size={200} duration={12} delay={1} />
        <Reveal>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: "clamp(36px, 6vw, 64px)", margin: "0 0 20px" }}>
            let's make something <span style={{ fontStyle: "italic", color: "var(--violet)", position: 'relative' }}>
              together
              <Sparkle style={{ top: -10, right: -20 }} />
            </span>
          </h2>
          <p style={{ color: "#4a3b4e", marginBottom: 40, fontSize: 20, fontWeight: 500 }}>Always up for talking projects, data science, or good UI.</p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:sainikirti.2007@gmail.com" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none",
              background: "var(--ink)", color: "var(--bg)", padding: "16px 32px", borderRadius: 999,
              border: "3px solid var(--ink)", fontWeight: 700, fontSize: 18, boxShadow: "6px 6px 0 var(--pink)", transition: "transform .2s, box-shadow .2s",
            }}>
              <Mail size={20} /> Email
            </a>
            <a href="https://github.com/KirtiSaini07" target="_blank" rel="noreferrer" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none",
              background: "var(--surface)", color: "var(--ink)", padding: "16px 32px", borderRadius: 999,
              border: "3px solid var(--ink)", fontWeight: 700, fontSize: 18, boxShadow: "6px 6px 0 var(--butter)", transition: "transform .2s, box-shadow .2s",
            }}>
              <Github size={20} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/kirti-saini-4bb01b3a8" target="_blank" rel="noreferrer" className="pill" style={{
              display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none",
              background: "var(--violet)", color: "var(--ink)", padding: "16px 32px", borderRadius: 999,
              border: "3px solid var(--ink)", fontWeight: 700, fontSize: 18, boxShadow: "6px 6px 0 var(--ink)", transition: "transform .2s, box-shadow .2s",
            }}>
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
        </Reveal>
        <p style={{ marginTop: 80, fontSize: 14, fontFamily: "'IBM Plex Mono', monospace", color: "var(--ink)", fontWeight: 600 }}>
          made with 💗 and a <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>lot</span> of CSS
        </p>
      </footer>
    </div>
  );
}
