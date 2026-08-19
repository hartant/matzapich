import { useState } from "react";

// ── Real images from Figma import ────────────────────────────────────────────
import imgHero        from "@/imports/Page2/703432a5fcb56e67a41d0f46e4538e3a43968100.png";
import imgPortrait1   from "@/imports/Page2/2af44579108020ea641e506123286f8a8c1cc76b.png";
import imgPortrait2   from "@/imports/Page2/bbc436bbc08a30d121dc0fe5e00b51da913ec261.png";
import imgPortrait3   from "@/imports/Page2/d3a6871fd80422d83b461eb75939e32e3421b9e1.png";
import imgPortrait4   from "@/imports/Page2/e64e31f159f3d6b4f5d13b93548f0aa6ac8a6f81.png";
import imgPortrait5   from "@/imports/Page2/b2985d940787aa94ee1a5ff978b6a34e56c8e5d5.png";
import imgPortrait6   from "@/imports/Page2/1e4a93389883e182385bb00f2101c871f7b6afcc.png";
import imgPortrait7   from "@/imports/Page2/d84741470c25cf5aa7c49667a999fb596b7b5089.png";
import imgPortrait8   from "@/imports/Page2/5c807ce5cd3ff461916b19c0ad21c3ac9231d72a.png";
import imgPortrait9   from "@/imports/Page2/888081930c94ddc71bf3c890aea77ed06deb0991.png";
import imgPortrait10  from "@/imports/Page2/c3ecf452f42cb92f7fde554c6b8eb80d8762bb18.png";
import imgPortrait11  from "@/imports/Page2/710b8574c159273c2bd5bec07cb9744c3f02abb5.png";
import imgPortrait12  from "@/imports/Page2/72507aa8629ee5118196e6f119230e10653da8e9.png";
import imgPortrait13  from "@/imports/Page2/faad31936791cffc3b8052d98baeaa24fe385519.png";
import imgPortrait14  from "@/imports/Page2/752501fbb40b692a09c75bf1a78802aa47cacffd.png";
import imgPortrait15  from "@/imports/Page2/7c3ed2b81d5062fc087512990742e71603eecd82.png";
import imgPortrait16  from "@/imports/Page2/e3e07d44c933aced3b99b064e049ac985ccfe90f.png";

// ── Exact Figma colours ──────────────────────────────────────────────────────
const C = {
  bg:        "#F1EEEC",   // warm cream
  text:      "#3d3b5b",   // dark navy-purple
  purple:    "#888FCD",   // periwinkle accent
  lavender:  "#E4E0F0",   // soft lavender
  lav2:      "#EAE7F5",   // lighter lavender for cards
  white:     "#FFFFFF",
  star:      "#F1F8AF",   // yellow-green stars
  border:    "#D4D0E4",   // soft border
  borderWarm:"#D8D4C8",   // warm cream border
  textSub:   "#6B6890",   // muted purple-grey
} as const;

// ── Section background helpers ────────────────────────────────────────────────
const S = {
  cream:    `background-color: ${C.bg}`,
  heroGrad: `background: radial-gradient(ellipse 80% 60% at 50% 0%, ${C.lavender} 0%, ${C.bg} 70%)`,
  lavGrad:  `background: linear-gradient(180deg, ${C.lavender} 0%, #EAE7F5 40%, ${C.bg} 100%)`,
  lavSolid: `background-color: ${C.lavender}`,
  studentBand: `background: linear-gradient(180deg, ${C.bg} 0%, ${C.lavender} 20%, ${C.lavender} 80%, ${C.bg} 100%)`,
};

// ── Inline style builder ─────────────────────────────────────────────────────
type CSSObj = React.CSSProperties;

const inter = (w: number, size: number, spacing?: string): CSSObj => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: w,
  fontSize: size,
  letterSpacing: spacing ?? "normal",
});

const pillBtn = (bg: string, color: string): CSSObj => ({
  ...inter(700, 12, "0.1em"),
  backgroundColor: bg,
  color,
  borderRadius: 999,
  padding: "13px 32px",
  display: "inline-block",
  textDecoration: "none",
  textTransform: "uppercase" as const,
  cursor: "pointer",
  transition: "opacity 0.2s",
  border: "none",
});

// ── Reusable atoms ────────────────────────────────────────────────────────────
function Stars() {
  return (
    <span style={{ color: C.star, fontSize: 14, letterSpacing: 2 }}>★★★★★</span>
  );
}

function ArrowDown({ color = C.purple }: { color?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
        <line x1="7" y1="0" x2="7" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <polyline points="2,14 7,20 12,14" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ ...inter(500, 10, "0.2em"), color: C.textSub, textTransform: "uppercase", marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: CSSObj }) {
  return (
    <div style={{
      backgroundColor: C.white,
      border: `1px solid ${C.border}`,
      borderRadius: 20,
      padding: "24px 28px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        backgroundColor: open ? C.lav2 : C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px" }}>
        <span style={{ ...inter(700, 12, "0.05em"), color: C.text, textTransform: "uppercase", paddingRight: 16 }}>{q}</span>
        <span style={{ color: C.purple, fontSize: 22, flexShrink: 0, transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "none", display: "inline-block", lineHeight: 1 }}>+</span>
      </div>
      {open && (
        <p style={{ ...inter(400, 13), color: C.text, opacity: 0.8, lineHeight: 1.7, padding: "0 24px 20px" }}>{a}</p>
      )}
    </div>
  );
}

// ── Gallery row ───────────────────────────────────────────────────────────────
function GalleryRow({ images, height = 240 }: { images: string[]; height?: number }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "flex", gap: 12, padding: "0 24px", width: "max-content" }}>
        {images.map((src, i) => (
          <div key={i} style={{ width: 178, height, borderRadius: 16, overflow: "hidden", backgroundColor: C.lavender, flexShrink: 0 }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main app ──────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const row1 = [imgPortrait1, imgPortrait2, imgPortrait3, imgPortrait4, imgPortrait5, imgPortrait6];
  const row2 = [imgPortrait7, imgPortrait8, imgPortrait9, imgPortrait10, imgPortrait11, imgPortrait12];
  const eyeRow = [imgHero, imgPortrait13, imgPortrait14, imgPortrait15, imgPortrait16, imgPortrait1];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: C.text, backgroundColor: C.bg }}>

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav style={{
        backgroundColor: C.bg,
        borderBottom: `1px solid ${C.borderWarm}`,
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ ...inter(800, 11, "0.18em"), textTransform: "uppercase", color: C.text }}>
            Let AI Pay Your Bills
          </span>

          {/* desktop links pill */}
          <div className="hidden md:flex" style={{ border: `1px solid ${C.border}`, borderRadius: 999, padding: "0 20px", height: 40, gap: 28, alignItems: "center" }}>
            {["Testimonials", "Curriculum", "Success", "Pricing", "FAQ"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ ...inter(600, 11, "0.1em"), color: C.text, textDecoration: "none", textTransform: "uppercase", opacity: 0.75, transition: "opacity 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}>
                {l}
              </a>
            ))}
          </div>

          <a href="#pricing" className="hidden md:inline-block"
            style={{ ...pillBtn(C.text, C.white), padding: "10px 22px", fontSize: 11 }}>
            Enroll
          </a>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="22" height="22" stroke={C.text} strokeWidth="1.8" fill="none" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.borderWarm}`, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {["Testimonials", "Curriculum", "Success", "Pricing", "FAQ"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{ ...inter(600, 12, "0.1em"), color: C.text, textDecoration: "none", textTransform: "uppercase" }}>{l}</a>
            ))}
            <a href="#pricing" style={{ ...pillBtn(C.purple, C.white), textAlign: "center" }}>Enroll</a>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${C.lavender} 0%, ${C.bg} 68%)`, paddingBottom: 72 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 0" }}>
          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", backgroundColor: C.lavender }}>
            <img src={imgHero} alt="Let AI Pay Your Bills" style={{ width: "100%", height: 540, objectFit: "cover", objectPosition: "center 25%", display: "block" }} />
            {/* overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,25,50,0.68) 0%, rgba(0,0,0,0) 55%)" }} />

            {/* badge top-right */}
            <div style={{ position: "absolute", top: 18, right: 18, backgroundColor: "rgba(61,59,91,0.55)", backdropFilter: "blur(10px)", borderRadius: 999, padding: "7px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <Stars />
              <span style={{ ...inter(600, 10, "0.18em"), color: "#fff", textTransform: "uppercase" }}>400+ Students</span>
            </div>

            {/* text bottom-left */}
            <div style={{ position: "absolute", bottom: 0, left: 0, padding: "0 44px 44px", maxWidth: 520 }}>
              <h1 style={{ ...inter(800, 44, "-0.01em"), color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
                Let AI Pay Your Bills
              </h1>
              <p style={{ ...inter(400, 14), color: "rgba(255,255,255,0.82)", lineHeight: 1.65, margin: "0 0 24px" }}>
                Turn AI into your creative advantage. Learn how to build avatars, generate content, and create high-quality visuals that feel real, scalable, and ready to monetize.
              </p>
              <a href="#pricing" style={{ ...pillBtn(C.bg, C.text), fontSize: 12 }}>
                Build Your Avatar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALIFICATION ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "72px 24px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>Before you read ahead</SectionLabel>
          <h2 style={{ ...inter(800, 28, "-0.01em"), color: C.text, margin: "0 0 44px", lineHeight: 1.25 }}>
            This course isn't for everyone.<br />Let's see if it's for you.
          </h2>

          <div style={{ backgroundColor: C.white, border: `1px solid ${C.borderWarm}`, borderRadius: 24, overflow: "hidden", textAlign: "left" }}>
            {/* header */}
            <div style={{ padding: "28px 32px", borderBottom: `1px solid ${C.borderWarm}` }}>
              <p style={{ ...inter(700, 13, "0.08em"), color: C.text, margin: "0 0 6px", textTransform: "uppercase" }}>Qualification Check</p>
              <p style={{ ...inter(400, 13), color: C.textSub, lineHeight: 1.6, maxWidth: 500 }}>
                This course is designed for creators, entrepreneurs, and brands who want to turn AI into a real creative advantage.
              </p>
            </div>

            {/* two columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ padding: "28px 32px", borderRight: `1px solid ${C.borderWarm}` }}>
                <p style={{ ...inter(600, 10, "0.18em"), color: C.textSub, textTransform: "uppercase", marginBottom: 20 }}>This is not for you if:</p>
                {[
                  "You're only curious about AI but don't plan to actually create anything",
                  "You're looking for a \"push one button and get rich\" shortcut",
                  "You're not willing to test, experiment, and apply what you learn",
                  "You expect results without putting the workflow into practice",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                    <span style={{ color: "#C07070", fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 2 }}>✕</span>
                    <span style={{ ...inter(400, 13), color: C.text, lineHeight: 1.55, opacity: 0.85 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "28px 32px" }}>
                <p style={{ ...inter(600, 10, "0.18em"), color: C.textSub, textTransform: "uppercase", marginBottom: 20 }}>This is for you if you are:</p>
                {[
                  "A creator who wants to build an AI influencer or content page",
                  "Someone who wants to create UGC-style content without filming yourself",
                  "A brand owner who wants to create campaign visuals without expensive photoshoots",
                  "An entrepreneur who wants to offer AI content creation as a service",
                  "Someone who understands that learning AI creation now is a huge advantage",
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                    <span style={{ color: C.purple, fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ ...inter(400, 13), color: C.text, lineHeight: 1.55, opacity: 0.85 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* footer */}
            <div style={{ borderTop: `1px solid ${C.borderWarm}`, backgroundColor: "#F5F2ED", padding: "18px 32px", textAlign: "center" }}>
              <p style={{ ...inter(700, 13, "0.05em"), color: C.text, textTransform: "uppercase" }}>
                Yes, this sounds like me — show me what's inside
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WELCOME ────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "0 24px 72px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...inter(800, 22, "-0.01em"), color: C.text, margin: "0 0 12px", lineHeight: 1.35 }}>
            Welcome to the new era of content creation.<br />
            AI avatars, AI campaigns, and content on demand.
          </h2>
          <p style={{ ...inter(500, 10, "0.18em"), color: C.textSub, textTransform: "uppercase", marginBottom: 32 }}>
            Think of it as the power of a full production house: automated and run from your laptop.
          </p>
          <div style={{ backgroundColor: C.lav2, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 48px", maxWidth: 660, margin: "0 auto" }}>
            {[
              "Create realistic AI avatars and content without filming yourself",
              "Generate product images, aesthetic scenes, and full campaigns",
              "Produce scroll-stopping visuals in minutes instead of days",
              "Perfect for creators, brands, and entrepreneurs who want to move faster with AI",
            ].map((t, i) => (
              <p key={i} style={{ ...inter(400, 14), color: C.text, lineHeight: 1.7, marginBottom: i < 3 ? 16 : 0 }}>
                → {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ───────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "0 24px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...inter(800, 18, "-0.01em"), color: C.text, margin: "0 0 8px", lineHeight: 1.45 }}>
            If it were easy, everyone would already be creating amazing AI content.<br />
            But the truth is…
          </h2>
          <p style={{ ...inter(700, 13, "0.06em"), color: C.text, textTransform: "uppercase", marginBottom: 36 }}>
            Most people trying AI run into the same problems.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 36 }}>
            {[
              { img: imgHero,       label: "Fake-looking results",   fix: "Our Character DNA system" },
              { img: imgPortrait1,  label: "Bad prompting",          fix: "Our curated prompt library" },
              { img: imgPortrait2,  label: "No consistency",         fix: "The Avatar Foundation method" },
              { img: imgPortrait3,  label: "No clear workflow",      fix: "Our step-by-step roadmap" },
            ].map((c, i) => (
              <div key={i}>
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", backgroundColor: C.lavender, marginBottom: 10 }}>
                  <img src={c.img} alt={c.label} style={{ width: "100%", height: 172, objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", top: 8, left: 8 }}>
                    <span style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 999, padding: "3px 10px", fontSize: 9, color: C.text, fontWeight: 600 }}>
                      Plastic skin, weird hands
                    </span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 12px 12px", background: "linear-gradient(to top, rgba(30,25,50,0.7) 0%, transparent 100%)" }}>
                    <p style={{ ...inter(700, 10.5, "0.08em"), color: "#fff", textTransform: "uppercase" }}>{c.label}</p>
                  </div>
                </div>
                <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
                  <p style={{ ...inter(600, 9.5, "0.12em"), color: C.textSub, textTransform: "uppercase", marginBottom: 4 }}>Fixed with</p>
                  <p style={{ ...inter(400, 11.5), color: C.text, lineHeight: 1.4 }}>{c.fix}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ ...inter(400, 13), color: C.textSub, lineHeight: 1.75, marginBottom: 6 }}>
            The real problem isn't the tools.<br />
            It's the lack of a clear system that shows you how everything connects.
          </p>
          <p style={{ ...inter(600, 13), color: C.text, marginBottom: 40 }}>
            That's where this course comes in.
          </p>

          <div style={{ borderTop: `1px dashed ${C.border}` }} />
        </div>
      </section>

      {/* ── WORKFLOW GALLERY ────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 28px", textAlign: "center" }}>
          <h2 style={{ ...inter(800, 38, "-0.02em"), color: C.text, marginBottom: 10 }}>
            Master the AI Content Workflow
          </h2>
          <p style={{ ...inter(700, 11, "0.1em"), color: C.text, textTransform: "uppercase", lineHeight: 1.6, marginBottom: 36 }}>
            These are the types of content and visuals you'll learn<br />how to create inside the course.
          </p>
        </div>
        <GalleryRow images={row1} />
        <div style={{ marginBottom: 12 }} />
        <GalleryRow images={row2} />
        <div style={{ marginBottom: 60 }} />
      </section>

      {/* ── CURRICULUM ─────────────────────────────────────────────────────── */}
      <section id="curriculum" style={{ background: `linear-gradient(180deg, ${C.lavender} 0%, ${C.lav2} 35%, ${C.bg} 100%)`, padding: "72px 24px 64px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...inter(800, 28, "-0.01em"), color: C.text, margin: "0 0 14px", lineHeight: 1.3 }}>
            Master the AI-powered<br />Creative Workflow
          </h2>
          <p style={{ ...inter(500, 10, "0.18em"), color: C.textSub, textTransform: "uppercase", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 14px" }}>
            The complete system for professionals to deliver high-end creative AI campaigns, build industry-ready skills, and stay ahead of the future of creative work.
          </p>
          <p style={{ ...inter(700, 12, "0.1em"), color: C.text, textTransform: "uppercase", marginBottom: 28 }}>
            Inside our course, you'll learn how to:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              <span>Create your own realistic <strong>AI avatars or AI twin</strong></span>,
              <span>Generate consistent images with <strong>professional-level realism</strong></span>,
              <span>Turn AI images into <strong>animated video clips</strong></span>,
              <span>Generate <strong>product images</strong> and <strong>campaign visuals</strong></span>,
              <span>Build a scalable <strong>AI content creation system</strong></span>,
            ].map((content, i) => (
              <div key={i} style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px 24px", textAlign: "left" }}>
                <p style={{ ...inter(400, 14), color: C.text, margin: 0 }}>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL ROADMAP ──────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(180deg, ${C.lav2} 0%, ${C.bg} 100%)`, padding: "64px 24px 72px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...inter(800, 20, "0.04em"), color: C.text, marginBottom: 8, textTransform: "uppercase" }}>Visual Roadmap</h2>
          <p style={{ ...inter(500, 10, "0.2em"), color: C.textSub, textTransform: "uppercase", marginBottom: 48 }}>
            Your step-by-step path to building your AI creation system
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", gap: 6 }}>
            {[
              { emoji: "🔍", label: "Define",    sub: "Your Avatar Goal" },
              { emoji: "✏️", label: "Design",   sub: "Your Character DNA" },
              { emoji: "🧑", label: "Generate", sub: "Your Base Images" },
              { emoji: "🌐", label: "Expand",   sub: "Scenes & Variations" },
              { emoji: "▶️", label: "Animate",  sub: "Images Into Video" },
              { emoji: "💰", label: "Scale",    sub: "A Profitable Business" },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ textAlign: "center", width: 88 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 18, backgroundColor: C.lav2, border: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 8px" }}>
                    {step.emoji}
                  </div>
                  <p style={{ ...inter(700, 10.5, "0.06em"), color: C.text, marginBottom: 3, textTransform: "uppercase" }}>{step.label}</p>
                  <p style={{ ...inter(400, 10), color: C.textSub, lineHeight: 1.35 }}>{step.sub}</p>
                </div>
                {i < 5 && <span style={{ color: C.purple, fontSize: 18, marginBottom: 26, flexShrink: 0 }}>→</span>}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 44 }}>
            <a href="#pricing" style={pillBtn(C.purple, C.white)}>Join the Course</a>
          </div>
        </div>
      </section>

      {/* ── 3 MODULES ───────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>How can you create AI campaigns like this? Introducing…</SectionLabel>
          <h2 style={{ ...inter(800, 26, "-0.01em"), color: C.text, margin: "0 0 14px" }}>Let AI Pay Your Bills</h2>
          <p style={{ ...inter(400, 14), color: C.textSub, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 44px" }}>
            A complete workflow for creating realistic AI avatars, generating content, and turning it into videos, posts, and campaigns.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              {
                title: "Avatar Foundation",
                intro: "Build a character that stays consistent across every image and video.",
                bullets: ["Define your avatar goal (influencer, UGC, brand content, AI twin)", "Create your Character DNA", "Generate your first realistic base images"],
                outro: "Once this foundation is set, your avatar becomes reusable across unlimited content.",
              },
              {
                title: "Image Generation",
                intro: "Turn your avatar into a full creative system.",
                bullets: ["Generate different scenes and environments", "Create lifestyle, aesthetic, and cinematic visuals", "Produce AI product images and campaign shots", "Add realism so your content looks natural"],
                outro: null,
                outroJsx: <span>This is where your avatar starts becoming <strong>real content.</strong></span>,
              },
              {
                title: "Video & Content Creation",
                intro: "Bring your avatar to life and turn everything into publishable posts.",
                bullets: ["Animate images into talking clips and scenes", "Create AI B-roll and aesthetic video shots", "Add voice and movement", "Assemble everything into social media content"],
                outro: "At the end of this step, you'll have a complete AI post ready to publish.",
              },
            ].map((mod, i) => (
              <Card key={i} style={{ textAlign: "center", backgroundColor: "#F7F5F0", padding: "28px 24px" }}>
                <p style={{ ...inter(800, 14, "0.04em"), color: C.text, marginBottom: 14, textTransform: "uppercase" }}>{mod.title}</p>
                <p style={{ ...inter(400, 13), color: C.textSub, lineHeight: 1.65, marginBottom: 14 }}>{mod.intro}</p>
                <p style={{ ...inter(600, 10, "0.14em"), color: C.textSub, textTransform: "uppercase", marginBottom: 12 }}>Inside this step you'll learn how to:</p>
                {mod.bullets.map((b, j) => (
                  <p key={j} style={{ ...inter(400, 12), color: C.text, lineHeight: 1.5, marginBottom: 8, textAlign: "left" }}>• {b}</p>
                ))}
                <p style={{ ...inter(400, 13), color: C.textSub, lineHeight: 1.65, marginTop: 14 }}>
                  {mod.outroJsx ?? mod.outro}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section id="testimonials" style={{ backgroundColor: C.bg, padding: "0 24px 72px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...inter(800, 22, "-0.01em"), color: C.text, margin: "0 0 16px", lineHeight: 1.35 }}>
            Trusted by creators, entrepreneurs, and brands<br />learning AI content creation.
          </h2>
          <div style={{ marginBottom: 6 }}><Stars /></div>
          <p style={{ ...inter(500, 10, "0.2em"), color: C.textSub, textTransform: "uppercase", marginBottom: 36 }}>
            Rated 5 stars by students
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
            {[
              { name: "Sofia M.", text: "I had zero experience with AI and now I have a full avatar with a consistent look across dozens of images. The prompting system alone is worth it." },
              { name: "Lena K.", text: "I'm a UGC creator and this completely changed how I work. I can now offer AI content as an add-on service and it's become my most in-demand offering." },
              { name: "Marta R.", text: "The Avatar Foundation module is insane. I built my character DNA in one afternoon and started generating on-brand visuals the same day." },
            ].map((t, i) => (
              <Card key={i}>
                <div style={{ marginBottom: 10 }}><Stars /></div>
                <p style={{ ...inter(400, 13), color: C.text, lineHeight: 1.65, marginBottom: 12, opacity: 0.85 }}>"{t.text}"</p>
                <p style={{ ...inter(600, 11, "0.08em"), color: C.purple }}>— {t.name}</p>
              </Card>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 600, margin: "0 auto" }}>
            {[
              { name: "Chiara B.", text: "As a brand owner I was spending thousands on photographers. Now I produce my own campaign visuals with AI. The quality is genuinely impressive." },
              { name: "Jess T.", text: "I tried three other AI courses and none of them showed me what this one does. The roadmap makes everything click — it's a proper system, not just tips." },
            ].map((t, i) => (
              <Card key={i}>
                <div style={{ marginBottom: 10 }}><Stars /></div>
                <p style={{ ...inter(400, 13), color: C.text, lineHeight: 1.65, marginBottom: 12, opacity: 0.85 }}>"{t.text}"</p>
                <p style={{ ...inter(600, 11, "0.08em"), color: C.purple }}>— {t.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT WORK ────────────────────────────────────────────────────── */}
      <section id="success" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.lavender} 18%, ${C.lavender} 82%, ${C.bg} 100%)` }}>
        <p style={{ ...inter(500, 10, "0.2em"), color: C.textSub, textTransform: "uppercase", textAlign: "center", padding: "52px 24px 20px" }}>
          Take a look at our students' work:
        </p>
        <GalleryRow images={eyeRow} />
        <div style={{ padding: "48px 24px 20px", textAlign: "center" }}>
          <p style={{ ...inter(700, 13, "0.08em"), color: C.text, textTransform: "uppercase", marginBottom: 6 }}>
            Our students are already learning how to create content with AI
          </p>
          <p style={{ ...inter(500, 10, "0.18em"), color: C.textSub, textTransform: "uppercase", marginBottom: 32 }}>
            Building avatars, generating visuals, and turning AI into real creative workflows.
          </p>
          <a href="#pricing" style={pillBtn(C.purple, C.white)}>Enroll Now</a>
        </div>
      </section>

      {/* ── FUTURE SECTION ──────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(180deg, ${C.lavender} 0%, ${C.lav2} 40%, ${C.bg} 100%)`, padding: "72px 24px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...inter(800, 26, "-0.01em"), color: C.purple, margin: "0 0 18px", lineHeight: 1.35 }}>
            The future of content creation is already here.<br />
            The question is: will you be creating it?
          </h2>
          <p style={{ ...inter(400, 14), color: C.text, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 10px", opacity: 0.85 }}>
            This course gives you the system to create realistic AI avatars, generate content, and turn it into real posts, visuals, and campaigns — all from your laptop.
          </p>
          <p style={{ ...inter(400, 14), color: C.text, lineHeight: 1.75, maxWidth: 540, margin: "0 auto 40px", opacity: 0.85 }}>
            Instead of watching the AI revolution from the sidelines, you'll learn how to actually use it.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, alignItems: "center", maxWidth: 800, margin: "0 auto 64px" }}>
            <Card style={{ textAlign: "center" }}>
              <p style={{ ...inter(700, 11, "0.1em"), color: C.textSub, textTransform: "uppercase", marginBottom: 20 }}>Without this course</p>
              {["Random prompting and inconsistent results", "AI images that look fake or unusable", "No consistent avatar or character", "No idea how to turn images into real content", "Constantly testing tools without a clear workflow"].map((t, i) => (
                <p key={i} style={{ ...inter(400, 13), color: C.text, lineHeight: 1.65, marginBottom: 12, opacity: 0.82 }}>• {t}</p>
              ))}
            </Card>
            <div style={{ padding: "0 18px", color: C.purple, fontSize: 22, flexShrink: 0, marginBottom: 20 }}>→</div>
            <Card style={{ textAlign: "center", borderColor: C.purple }}>
              <p style={{ ...inter(700, 11, "0.1em"), color: C.purple, textTransform: "uppercase", marginBottom: 20 }}>With this course</p>
              {["A clear system for creating realistic AI avatars", "Consistent characters you can reuse across content", "The ability to generate images, videos, and scenes", "A workflow to turn everything into posts and campaigns", "A skill that can be used for creators, brands, or client work"].map((t, i) => (
                <p key={i} style={{ ...inter(400, 13), color: C.text, lineHeight: 1.65, marginBottom: 12, opacity: 0.82 }}>• {t}</p>
              ))}
            </Card>
          </div>

          {/* Market Reality */}
          <p style={{ ...inter(500, 10, "0.2em"), color: C.textSub, textTransform: "uppercase", marginBottom: 28 }}>Market Reality</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { pct: "91%", bold: "Of brands say visual content is their top marketing priority", desc: "But producing that content consistently is still expensive and time-consuming." },
              { pct: "70%", bold: "Of marketers say they need more content than ever before", desc: "Yet most teams still struggle to keep up with demand." },
              { pct: "60%", bold: "Of small brands say content production is their biggest marketing bottleneck.", desc: "This is your chance!" },
            ].map((s, i) => (
              <Card key={i} style={{ textAlign: "center" }}>
                <p style={{ ...inter(800, 42, "-0.02em"), color: C.text, marginBottom: 10 }}>{s.pct}</p>
                <p style={{ ...inter(700, 12), color: C.text, lineHeight: 1.5, marginBottom: 8 }}>{s.bold}</p>
                <p style={{ ...inter(400, 12), color: C.textSub, lineHeight: 1.6 }}>{s.desc}</p>
              </Card>
            ))}
          </div>

          <div style={{ marginTop: 44 }}>
            <ArrowDown />
            <h3 style={{ ...inter(800, 16, "0.04em"), color: C.text, lineHeight: 1.5, textTransform: "uppercase", marginTop: 12 }}>
              This is exactly why learning how to create content<br />with AI is becoming such a valuable skill.
            </h3>
          </div>
        </div>
      </section>

      {/* ── AHEAD OF THE GAME ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "72px 24px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <ArrowDown />
          <h2 style={{ ...inter(800, 22, "-0.01em"), color: C.text, margin: "12px 0 36px", textTransform: "uppercase" }}>
            This is your chance to be ahead of the game
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 680, margin: "0 auto 32px" }}>
            {[imgPortrait4, imgPortrait5, imgPortrait6].map((src, i) => (
              <div key={i} style={{ borderRadius: 18, overflow: "hidden", backgroundColor: C.lavender }}>
                <img src={src} alt="" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
          <p style={{ ...inter(700, 13, "0.04em"), color: C.text, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 56px", textTransform: "uppercase" }}>
            Once the system is built, creating visuals like this becomes fast, scalable, and repeatable.
          </p>

          <p style={{ ...inter(800, 18, "0.08em"), color: C.text, textTransform: "uppercase", marginBottom: 24 }}>Case Studies</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>
            {[
              { name: "Sarah — UGC Creator", result: "Tripled her client roster in 60 days by replacing all filming with AI-generated content. Now produces 20+ pieces per week." },
              { name: "Lumé Cosmetics", result: "Replaced monthly photoshoots with AI campaign visuals. Saved €4,200 in production costs in the first month." },
              { name: "Marco — Freelancer", result: "Added AI content services to his agency. Landed 2 retainer clients at €1,500/month each within 45 days of completing the course." },
            ].map((cs, i) => (
              <Card key={i} style={{ textAlign: "left" }}>
                <p style={{ ...inter(700, 11, "0.08em"), color: C.purple, marginBottom: 10 }}>{cs.name}</p>
                <p style={{ ...inter(400, 13), color: C.text, lineHeight: 1.65, opacity: 0.82 }}>{cs.result}</p>
              </Card>
            ))}
          </div>
          <p style={{ ...inter(400, 12), color: C.textSub, lineHeight: 1.7 }}>
            These are examples of projects created using the techniques taught in the course.<br />Results will vary depending on how you apply the system.
          </p>
        </div>
      </section>

      {/* ── WHY DEMAND ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "0 24px 72px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...inter(800, 28, "-0.01em"), color: C.text, margin: "0 0 14px", lineHeight: 1.3 }}>
            Why is demand for AI content exploding?
          </h2>
          <p style={{ ...inter(400, 14), color: C.textSub, lineHeight: 1.7, marginBottom: 24 }}>
            Because brands need more content, faster — without the cost of traditional production.
          </p>
          <div style={{ backgroundColor: C.lav2, border: `1.5px solid ${C.border}`, borderRadius: 18, padding: "24px 36px", marginBottom: 18 }}>
            <p style={{ ...inter(700, 13, "0.04em"), color: C.text, lineHeight: 1.65, textTransform: "uppercase" }}>
              AI-powered production reduces costs, increases speed,<br />and allows brands to scale campaigns instantly.
            </p>
          </div>
          <p style={{ ...inter(400, 13), color: C.textSub, marginBottom: 14 }}>This shift is already happening across the industry.</p>
          <p style={{ ...inter(700, 13, "0.06em"), color: C.text, textTransform: "uppercase" }}>We can teach you the systems that make this possible.</p>
        </div>
      </section>

      {/* ── WHAT YOU GET ────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "0 24px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...inter(800, 28, "-0.01em"), color: C.text, textAlign: "center", marginBottom: 36 }}>
            This is what you get once inside
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { title: "15 Step-by-Step Video Lessons (20+ Hours of Training)", worth: "Worth 1,497€", desc: "Learn how to build your AI avatar, create realistic visuals, animate your character, and turn everything into complete content and campaigns." },
              { title: "15+ Downloadable Bonus Materials", worth: "Worth 297€", desc: "Step-by-step guides, checklists, templates, troubleshooting tips, and our curated prompt collection to speed up your workflow." },
              { title: "Exclusive Community", worth: "Worth 397€", desc: "Lifetime access to our private community group for feedback, accountability, and support while you build your AI projects." },
              { title: "Lifetime Access & Updates", worth: "Priceless", desc: "The AI industry evolves fast — and so will the course. You'll receive future updates and new tool integrations to ensure your skills never become outdated." },
            ].map((item, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 8 }}>
                  <p style={{ ...inter(700, 12, "0.05em"), color: C.text, textTransform: "uppercase" }}>{item.title}</p>
                  <p style={{ ...inter(700, 12, "0.05em"), color: C.purple, flexShrink: 0 }}>{item.worth}</p>
                </div>
                <p style={{ ...inter(400, 13), color: C.textSub, lineHeight: 1.65 }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLUS BONUSES ────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "0 24px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ ...inter(800, 36, "-0.01em"), color: C.text, marginBottom: 4 }}>Plus</p>
          <p style={{ ...inter(700, 12, "0.1em"), color: C.text, textTransform: "uppercase", marginBottom: 32 }}>These bonuses ($2,466 additional value)</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
            {[
              { title: "Bonus Training Chapters", worth: "Worth 295€", desc: "Additional advanced lessons designed to expand your AI capabilities even further beyond the core avatar workflow." },
              { title: "Contract & Pitch Templates", worth: "Worth 197€", desc: "Proven client scripts, email templates, and ready-to-use contracts to help you land and manage projects professionally." },
              { title: "Community Challenges", worth: "Priceless", desc: "Regular creative challenges inside the community where you can practice your skills, showcase your work, and win prizes." },
            ].map((item, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 8 }}>
                  <p style={{ ...inter(700, 12, "0.05em"), color: C.text, textTransform: "uppercase" }}>{item.title}</p>
                  <p style={{ ...inter(700, 12, "0.05em"), color: C.purple, flexShrink: 0 }}>{item.worth}</p>
                </div>
                <p style={{ ...inter(400, 13), color: C.textSub, lineHeight: 1.65 }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ backgroundColor: C.bg, padding: "44px 24px 72px" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <ArrowDown />

          <div style={{ backgroundColor: C.lavender, border: `1px solid ${C.border}`, borderRadius: 24, overflow: "hidden", marginTop: 16 }}>
            <div style={{ padding: "36px 40px 28px", textAlign: "center", borderBottom: `1px solid ${C.border}` }}>
              <p style={{ ...inter(600, 10, "0.2em"), color: C.textSub, textTransform: "uppercase", marginBottom: 12 }}>Total Value</p>
              <p style={{ ...inter(800, 36, "-0.02em"), color: C.text }}>2,485€</p>
            </div>
            <div style={{ padding: "32px 40px 40px", textAlign: "center" }}>
              <p style={{ ...inter(600, 10, "0.2em"), color: C.textSub, textTransform: "uppercase", marginBottom: 18 }}>Your Price</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 8 }}>
                <span style={{ ...inter(600, 26), color: `${C.text}55`, textDecoration: "line-through" }}>997€</span>
                <span style={{ ...inter(800, 54, "-0.02em"), color: C.text }}>497€</span>
              </div>
              <p style={{ ...inter(600, 11, "0.16em"), color: C.textSub, textTransform: "uppercase", marginBottom: 32 }}>or 3 × 179€</p>
              <a href="#" style={{ ...pillBtn(C.purple, C.white), fontSize: 13 }}>Enroll Now</a>
              <p style={{ ...inter(400, 12), color: C.textSub, marginTop: 14 }}>Only 5 spots left at this price</p>
            </div>
          </div>

          <Card style={{ marginTop: 14, textAlign: "center" }}>
            <p style={{ ...inter(400, 13), color: C.textSub, lineHeight: 1.75 }}>
              When you join, you'll get instant access to all training modules, bonus materials, and resources. The AI space evolves quickly, so we'll continue updating the course with new tools, workflows, and techniques as they emerge — so your skills always stay relevant.
            </p>
          </Card>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.lav2} 50%, ${C.bg} 100%)`, padding: "0 24px 72px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ ...inter(800, 38, "-0.02em"), color: C.text, textAlign: "center", paddingTop: 24, marginBottom: 36 }}>
            Frequently Asked
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { q: "Do I need any experience with AI or content creation?", a: "No experience needed. This course is built for complete beginners as well as creators who already make content but want to add AI to their workflow. We walk you through every tool step by step." },
              { q: "What exactly will I be able to create after the course?", a: "You'll be able to create your own AI avatar, generate consistent images and scenes, produce product visuals, animate characters into video clips, and assemble full social media campaigns — all without filming yourself." },
              { q: "Do I need expensive software or equipment?", a: "No. All the tools we use have free or low-cost tiers. You only need a laptop and internet connection. We teach you the most cost-effective stack to get professional results." },
              { q: "What if the AI tools change in the future?", a: "That's why we offer lifetime access and updates. As the AI space evolves, we update the course with new tools, workflows, and techniques — so your skills always stay current." },
              { q: "Can this help me make money?", a: "Yes. Students use these skills to monetize as UGC creators, offer AI content services to brands, build their own AI influencer pages, and create scalable campaigns for their own businesses." },
            ].map((item, i) => <FAQItem key={i} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.bg, padding: "0 24px 72px", textAlign: "center" }}>
        <h2 style={{ ...inter(800, 40, "-0.02em"), color: C.text, marginBottom: 8 }}>Ready to Build?</h2>
        <p style={{ ...inter(500, 10, "0.2em"), color: C.textSub, textTransform: "uppercase", marginBottom: 32 }}>Join the AI Studio Academy</p>
        <a href="#pricing" style={{ ...pillBtn(C.purple, C.white), fontSize: 13, marginBottom: 14 }}>Enroll Now</a>
        <p style={{ ...inter(400, 12), color: C.textSub, marginTop: 14 }}>Only 5 left</p>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${C.borderWarm}`, backgroundColor: C.bg, padding: "20px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ ...inter(700, 11, "0.18em"), color: C.text, textTransform: "uppercase" }}>Content Collective AI</span>
          <div style={{ display: "flex", gap: 28 }}>
            <a href="mailto:hello@contentcollectiveai.com" style={{ ...inter(500, 11, "0.1em"), color: C.textSub, textDecoration: "none", textTransform: "uppercase" }}>Email</a>
            <a href="#" style={{ ...inter(500, 11, "0.1em"), color: C.textSub, textDecoration: "none", textTransform: "uppercase" }}>Privacy Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
