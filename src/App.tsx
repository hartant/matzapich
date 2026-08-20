import { useState, useEffect } from "react";

// ── Real photos only (verified — no watermarked/placeholder graphics) ───────
import imgHero        from "@/assets/703432a5fcb56e67a41d0f46e4538e3a43968100.png";
import imgPortrait1   from "@/assets/2af44579108020ea641e506123286f8a8c1cc76b.png";
import imgPortrait2   from "@/assets/bbc436bbc08a30d121dc0fe5e00b51da913ec261.png";
import imgPortrait3   from "@/assets/d3a6871fd80422d83b461eb75939e32e3421b9e1.png";
import imgPortrait4   from "@/assets/e64e31f159f3d6b4f5d13b93548f0aa6ac8a6f81.png";
import imgPortrait7   from "@/assets/d84741470c25cf5aa7c49667a999fb596b7b5089.png";
import imgPortrait12  from "@/assets/72507aa8629ee5118196e6f119230e10653da8e9.png";
import imgPortrait13  from "@/assets/faad31936791cffc3b8052d98baeaa24fe385519.png";
import imgPortrait14  from "@/assets/752501fbb40b692a09c75bf1a78802aa47cacffd.png";
import imgPortrait15  from "@/assets/7c3ed2b81d5062fc087512990742e71603eecd82.png";
import imgPortrait16  from "@/assets/e3e07d44c933aced3b99b064e049ac985ccfe90f.png";
// NOTE: the source Figma export also contained 6 watermarked Canva placeholder
// graphics (a red X, a green check, and 4 icon doodles). Those are intentionally
// NOT imported — they were never meant to ship on a real site.

// ═════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═════════════════════════════════════════════════════════════════════════
const C = {
  bg: "#F1EEEC",
  text: "#3d3b5b",
  purple: "#888FCD",
  purpleDeep: "#7A81C4",
  lavender: "#E4E0F0",
  lav2: "#EAE7F5",
  lavCard: "#EDEBF7",
  lavStrong: "#C9C6E8",
  white: "#FFFFFF",
  star: "#F1F8AF",
  border: "#D4D0E4",
  borderWarm: "#D8D4C8",
  textSub: "#6B6890",
} as const;

const NAV_LINKS = ["Testimonials", "Curriculum", "Success", "Pricing", "FAQ"];

// ═════════════════════════════════════════════════════════════════════════
// PRIMITIVES
// ═════════════════════════════════════════════════════════════════════════

function PillButton({
  href, children, variant = "dark", className = "",
}: { href: string; children: React.ReactNode; variant?: "dark" | "purple" | "light"; className?: string }) {
  const styles = {
    dark: { backgroundColor: C.text, color: C.white },
    purple: { backgroundColor: C.purple, color: C.white },
    light: { backgroundColor: C.bg, color: C.text },
  }[variant];
  return (
    <a
      href={href}
      className={`inline-block rounded-full px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] no-underline transition-opacity hover:opacity-85 ${className}`}
      style={styles}
    >
      {children}
    </a>
  );
}

function Stars() {
  return <span style={{ color: C.star, fontSize: 13, letterSpacing: 2 }}>★★★★★</span>;
}

function ArrowDown({ color = C.purple, className = "" }: { color?: string; className?: string }) {
  return (
    <div className={`flex justify-center mb-1 ${className}`}>
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none">
        <line x1="7" y1="0" x2="7" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <polyline points="2,14 7,20 12,14" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: C.textSub }}>
      {children}
    </p>
  );
}

function Card({ children, className = "", accent = false, tint = false }: { children: React.ReactNode; className?: string; accent?: boolean; tint?: boolean }) {
  return (
    <div
      className={`rounded-[20px] p-6 md:p-7 ${className}`}
      style={{ backgroundColor: tint ? C.lavCard : C.white, border: `1px solid ${accent ? C.purple : C.border}` }}
    >
      {children}
    </div>
  );
}

function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 cursor-zoom-out"
      style={{ backgroundColor: "rgba(20,18,32,0.86)" }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full text-white text-lg"
        style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)" }}
      >
        ✕
      </button>
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="rounded-[20px] object-contain"
        style={{ maxWidth: "min(90vw, 720px)", maxHeight: "85vh", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
      />
    </div>
  );
}

function ZoomImg({
  src, alt = "", className = "", onClick,
}: { src: string; alt?: string; className?: string; onClick: (src: string) => void }) {
  return (
    <div className={`overflow-hidden cursor-zoom-in ${className}`} style={{ backgroundColor: C.lavender }} onClick={() => onClick(src)}>
      <img src={src} alt={alt} className="h-full w-full object-cover block" />
    </div>
  );
}

function GalleryRow({ images, onImageClick }: { images: string[]; onImageClick: (src: string) => void }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 px-6 w-max">
        {images.map((src, i) => (
          <ZoomImg key={i} src={src} onClick={onImageClick} className="w-[150px] h-[210px] sm:w-[178px] sm:h-[240px] rounded-2xl flex-shrink-0" />
        ))}
      </div>
    </div>
  );
}

/** Card that tilts toward the cursor on hover — inspired by nuovaera.agency's gallery. */
function TiltCard({
  children, className = "", onClick,
}: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14, active: true });
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0, active: false })}
      onClick={onClick}
      className={className}
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.active ? 1.04 : 1})`,
        transition: tilt.active ? "transform 0.08s ease-out, box-shadow 0.08s ease-out" : "transform 0.45s ease, box-shadow 0.45s ease",
        transformStyle: "preserve-3d",
        boxShadow: tilt.active
          ? `${-tilt.y * 1.4}px ${-tilt.x * 1.4 + 14}px 28px rgba(61,59,91,0.28)`
          : "0 0px 0px rgba(0,0,0,0)",
      }}
    >
      {children}
    </div>
  );
}

/** Click a panel to expand it (others shrink). Click the already-active panel to zoom it full-screen.
 *  Alternating panels also drift vertically as the page scrolls for a layered, artistic depth effect. */
function ExpandingGallery({ images, onImageClick, scrollY }: { images: string[]; onImageClick: (src: string) => void; scrollY: number }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex gap-2 px-6 h-[210px] sm:h-[320px]">
      {images.map((src, i) => {
        const isActive = active === i;
        const drift = (i % 2 === 0 ? 1 : -1) * Math.min(scrollY * 0.025, 16);
        return (
          <div
            key={i}
            onClick={() => (isActive ? onImageClick(src) : setActive(i))}
            className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out"
            style={{ flexGrow: isActive ? 6 : 1, flexBasis: 0, minWidth: isActive ? 110 : 36, backgroundColor: C.lavender }}
          >
            <img
              src={src}
              alt=""
              className="absolute left-0 w-full object-cover block transition-transform duration-300"
              style={{
                height: "122%",
                top: "-11%",
                transform: `translateY(${drift}px) scale(${isActive ? 1 : 1.15})`,
              }}
            />
            {!isActive && <div className="absolute inset-0" style={{ background: "rgba(30,25,50,0.18)" }} />}
            {isActive && (
              <div
                className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2" strokeLinecap="round">
                  <circle cx="10.5" cy="10.5" r="6.5" /><line x1="15.3" y1="15.3" x2="21" y2="21" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ExpandCard({
  title, teaser, children, align = "center", tint = false,
}: { title: string; teaser: string; children: React.ReactNode; align?: "center" | "left"; tint?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="cursor-pointer rounded-[20px] p-6 md:p-7 transition-shadow"
      style={{
        backgroundColor: tint ? C.lavCard : C.white,
        border: `1px solid ${open ? C.purple : C.border}`,
        boxShadow: open ? "0 12px 30px rgba(61,59,91,0.12)" : "none",
        textAlign: align,
      }}
    >
      <div className={`flex items-center gap-2.5 mb-2.5 ${align === "center" ? "justify-center" : "justify-between"}`}>
        <p className="text-[13px] font-extrabold uppercase tracking-[0.05em]" style={{ color: C.text }}>{title}</p>
        <span className="inline-block flex-shrink-0 text-lg leading-none transition-transform" style={{ color: C.purple, transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </div>
      {teaser && <p className="text-[13px] leading-relaxed" style={{ color: C.textSub, marginBottom: open ? 14 : 0 }}>{teaser}</p>}
      {open && <div onClick={(e) => e.stopPropagation()} style={{ marginTop: teaser ? 0 : 14 }}>{children}</div>}
    </div>
  );
}

// ── Custom line-icon set for the Visual Roadmap (replaces watermarked PNGs) ─
function RoadmapIcon({ name, inverted = false }: { name: "define" | "design" | "generate" | "expand" | "animate" | "scale"; inverted?: boolean }) {
  const strokeColor = inverted ? C.white : C.purple;
  const p = { fill: "none", stroke: strokeColor, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const icons: Record<typeof name, React.ReactNode> = {
    define: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...p}><circle cx="10.5" cy="10.5" r="6.5" /><line x1="15.3" y1="15.3" x2="21" y2="21" /></svg>
    ),
    design: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...p}>
        <path d="M9 15l-5 5 1-4 8-8" /><path d="M13 8l3-3 3 3-3 3z" /><circle cx="18" cy="6" r="1.3" fill={strokeColor} stroke="none" />
      </svg>
    ),
    generate: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...p}><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1-4 4-6 7.5-6s6.5 2 7.5 6" /></svg>
    ),
    expand: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...p}>
        <path d="M4 9V4h5" /><path d="M20 9V4h-5" /><path d="M4 15v5h5" /><path d="M20 15v5h-5" />
      </svg>
    ),
    animate: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" fill={strokeColor} stroke="none" /></svg>
    ),
    scale: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...p}>
        <path d="M7 8h10l1.3 11.5a1 1 0 01-1 1.5H6.7a1 1 0 01-1-1.5L7 8z" />
        <path d="M9.5 8a2.5 2.5 0 015 0" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
  };
  return icons[name];
}

// ── Scroll tracking for parallax effects ────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

const ROADMAP_STEPS = [
  { icon: "define" as const, label: "Define", sub: "Your Avatar Goal", detail: "Get crystal clear on who your avatar is for — influencer, UGC persona, brand content, or your own AI twin — before you generate a single image." },
  { icon: "design" as const, label: "Design", sub: "Your Character DNA", detail: "Lock in your Character DNA: the exact face, styling, and vibe that stay identical across every future image and video." },
  { icon: "generate" as const, label: "Generate", sub: "Your Base Images", detail: "Produce your first set of realistic base images using your Character DNA as the reusable foundation." },
  { icon: "expand" as const, label: "Expand", sub: "Scenes & Variations", detail: "Multiply your avatar into new scenes, outfits, and aesthetics — lifestyle, product, and campaign visuals." },
  { icon: "animate" as const, label: "Animate", sub: "Images Into Video", detail: "Bring stills to life with talking clips, B-roll, voice, and movement — ready to post." },
  { icon: "scale" as const, label: "Scale", sub: "A Profitable Business", detail: "Turn the system into a repeatable content engine you run for yourself or offer as a paid service." },
];

// ═════════════════════════════════════════════════════════════════════════
// APP
// ═════════════════════════════════════════════════════════════════════════
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const scrollY = useScrollY();

  // Only real photos, deliberately varied and never repeating the watermarked assets.
  const row1 = [imgPortrait2, imgPortrait3, imgPortrait4, imgPortrait7, imgPortrait12, imgPortrait13];
  const row2 = [imgPortrait14, imgPortrait15, imgPortrait16, imgPortrait1, imgHero, imgPortrait2];
  const eyeRow = [imgHero, imgPortrait16, imgPortrait1, imgHero, imgPortrait16, imgPortrait1];
  const aheadRow = [imgPortrait4, imgPortrait13, imgPortrait14];

  return (
    <div className="font-['Inter',sans-serif]" style={{ color: C.text, backgroundColor: C.bg }}>
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />

      {/* ═══ NAV ═══ */}
      <nav className="sticky top-0 z-50 px-4 py-3" style={{ background: `linear-gradient(90deg, ${C.lavStrong} 0%, ${C.bg} 65%)` }}>
        <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-3">
          <div
            className="flex flex-1 items-center justify-between gap-4 rounded-full px-5 sm:px-6 h-12"
            style={{ border: `1px solid ${C.purple}66`, background: `linear-gradient(90deg, ${C.lavStrong}77 0%, transparent 70%)` }}
          >
            <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] whitespace-nowrap" style={{ color: C.text }}>
              Let AI Pay Your Bills
            </span>
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="text-[11px] font-semibold uppercase tracking-[0.08em] no-underline opacity-75 transition-opacity hover:opacity-100 whitespace-nowrap"
                  style={{ color: C.text }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          <PillButton href="#pricing" variant="purple" className="hidden md:inline-block !px-6 !py-3 flex-shrink-0">Enroll</PillButton>

          <button className="md:hidden p-1 flex-shrink-0" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="22" height="22" stroke={C.text} strokeWidth="1.8" fill="none" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="mt-3 flex flex-col gap-4 rounded-2xl px-6 py-5" style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-[12px] font-semibold uppercase tracking-[0.1em] no-underline" style={{ color: C.text }}>
                {l}
              </a>
            ))}
            <PillButton href="#pricing" variant="purple" className="text-center">Enroll</PillButton>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="pb-16" style={{ background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${C.lavender} 0%, ${C.bg} 68%)` }}>
        <div className="mx-auto max-w-[1140px] px-6 pt-10">
          <TiltCard className="relative overflow-hidden rounded-3xl" >
            <div className="relative h-[420px] md:h-[620px] w-full cursor-zoom-in" style={{ backgroundColor: C.lavender }} onClick={() => setLightbox(imgHero)}>
              <img
                src={imgHero}
                alt="Let AI Pay Your Bills"
                className="absolute left-0 w-full object-cover block"
                style={{
                  height: "130%",
                  top: `-${Math.min(scrollY * 0.18, 90)}px`,
                  transform: `scale(${1 + Math.min(scrollY * 0.00025, 0.08)})`,
                  transition: "transform 0.05s linear",
                }}
              />
            </div>
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,25,50,0.68) 0%, rgba(0,0,0,0) 55%)" }} />

            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-md" style={{ backgroundColor: "rgba(61,59,91,0.55)" }}>
              <Stars />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white whitespace-nowrap">400+ Students</span>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 max-w-[580px] px-6 pb-8 md:px-11 md:pb-11">
              <h1 className="mb-3 text-[30px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.15] tracking-[-0.01em] text-white uppercase">
                Let AI Pay Your Bills
              </h1>
              <p className="mb-6 text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                Turn AI into your creative advantage. Learn how to build avatars, generate content, and create
                high-quality visuals that feel real, scalable, and ready to monetize.
              </p>
              <PillButton href="#pricing" variant="light" className="!text-[12px] pointer-events-auto">Build Your Avatar</PillButton>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ═══ QUALIFICATION CHECK ═══ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[840px] text-center">
          <SectionLabel>Before you read ahead</SectionLabel>
          <h2 className="mb-11 text-[26px] md:text-[28px] font-extrabold leading-[1.25] tracking-[-0.01em]">
            This course isn't for everyone.<br />Let's see if it's for you.
          </h2>

          <div className="overflow-hidden rounded-3xl text-left" style={{ backgroundColor: C.white, border: `1px solid ${C.purple}55` }}>
            <div className="p-7 md:p-8" style={{ backgroundColor: C.lav2 }}>
              <p className="mb-1.5 text-[13px] font-bold uppercase tracking-[0.08em]">Qualification Check</p>
              <p className="max-w-[500px] text-[13px] leading-relaxed" style={{ color: C.textSub }}>
                This course is designed for creators, entrepreneurs, and brands who want to turn AI into a real
                creative advantage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b md:border-b-0 md:border-r p-7 md:p-8" style={{ borderColor: C.borderWarm }}>
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: C.textSub }}>This is not for you if:</p>
                {[
                  "You're only curious about AI but don't plan to actually create anything",
                  "You're looking for a \"push one button and get rich\" shortcut",
                  "You're not willing to test, experiment, and apply what you learn",
                  "You expect results without putting the workflow into practice",
                ].map((t, i) => (
                  <div key={i} className="mb-4 flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-[13px] font-bold" style={{ color: "#C07070" }}>✕</span>
                    <span className="text-[13px] leading-relaxed opacity-85">{t}</span>
                  </div>
                ))}
              </div>
              <div className="p-7 md:p-8">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: C.textSub }}>This is for you if you are:</p>
                {[
                  "A creator who wants to build an AI influencer or content page",
                  "Someone who wants to create UGC-style content without filming yourself",
                  "A brand owner who wants to create campaign visuals without expensive photoshoots",
                  "An entrepreneur who wants to offer AI content creation as a service",
                  "Someone who understands that learning AI creation now is a huge advantage",
                ].map((t, i) => (
                  <div key={i} className="mb-4 flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-[13px] font-bold" style={{ color: C.purple }}>✓</span>
                    <span className="text-[13px] leading-relaxed opacity-85">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 text-center" style={{ backgroundColor: C.lavender }}>
              <p className="text-[13px] font-bold uppercase tracking-[0.05em]">Yes, this sounds like me — show me what's inside</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WELCOME ═══ */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="mb-3 text-[20px] md:text-[22px] font-extrabold leading-[1.35] tracking-[-0.01em]">
            Welcome to the new era of content creation.<br />AI avatars, AI campaigns, and content on demand.
          </h2>
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: C.textSub }}>
            Think of it as the power of a full production house: automated and run from your laptop.
          </p>
          <div className="mx-auto max-w-[660px] rounded-[20px] px-8 py-9 md:px-12" style={{ backgroundColor: C.lav2, border: `1px solid ${C.border}` }}>
            {[
              "Create realistic AI avatars and content without filming yourself",
              "Generate product images, aesthetic scenes, and full campaigns",
              "Produce scroll-stopping visuals in minutes instead of days",
              "Perfect for creators, brands, and entrepreneurs who want to move faster with AI",
            ].map((t, i, arr) => (
              <p key={i} className="text-[14px] leading-relaxed text-left" style={{ marginBottom: i < arr.length - 1 ? 16 : 0 }}>→ {t}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROBLEMS ═══ */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-[1100px] text-center">
          <h2 className="mb-2 text-[17px] md:text-[18px] font-extrabold leading-[1.45] tracking-[-0.01em]">
            If it were easy, everyone would already be creating amazing AI content.<br />But the truth is…
          </h2>
          <p className="mb-9 text-[13px] font-bold uppercase tracking-[0.06em]">Most people trying AI run into the same problems.</p>

          <div className="mb-9 grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { img: imgHero, label: "Fake-looking results", fix: "Our Character DNA system" },
              { img: imgPortrait1, label: "Bad prompting", fix: "Our curated prompt library" },
              { img: imgPortrait2, label: "No consistency", fix: "The Avatar Foundation method" },
              { img: imgPortrait3, label: "No clear workflow", fix: "Our step-by-step roadmap" },
            ].map((c, i) => (
              <div key={i}>
                <TiltCard onClick={() => setLightbox(c.img)} className="relative mb-2.5 overflow-hidden rounded-2xl cursor-zoom-in" >
                  <img src={c.img} alt={c.label} className="h-[200px] sm:h-[240px] w-full object-cover block" />
                  <div className="absolute top-2 left-2">
                    <span className="rounded-full px-2.5 py-1 text-[8px] sm:text-[9px] font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>Plastic skin, weird hands</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-7" style={{ background: "linear-gradient(to top, rgba(30,25,50,0.7) 0%, transparent 100%)" }}>
                    <p className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">{c.label}</p>
                  </div>
                </TiltCard>
                <div className="rounded-xl px-3 py-2.5 text-center" style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>
                  <p className="mb-1 text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: C.textSub }}>Fixed with</p>
                  <p className="text-[10.5px] sm:text-[11.5px] leading-tight">{c.fix}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mb-1.5 text-[13px] leading-loose" style={{ color: C.textSub }}>
            The real problem isn't the tools.<br />It's the lack of a clear system that shows you how everything connects.
          </p>
          <p className="mb-10 text-[13px] font-semibold">That's where this course comes in.</p>
          <div style={{ borderTop: `1px dashed ${C.border}` }} />
        </div>
      </section>

      {/* ═══ WORKFLOW GALLERY ═══ */}
      <section>
        <div className="mx-auto max-w-[900px] px-6 pb-7 pt-14 text-center">
          <h2 className="mb-2.5 text-[26px] md:text-[34px] font-extrabold uppercase tracking-[-0.01em]">Master the AI Content Workflow</h2>
          <p className="mb-9 text-[11px] font-bold uppercase leading-relaxed tracking-[0.1em]">
            These are the types of content and visuals you'll learn<br className="hidden sm:block" /> how to create inside the course.
          </p>
        </div>
        <ExpandingGallery images={row1} onImageClick={setLightbox} scrollY={scrollY} />
        <div className="mb-3" />
        <ExpandingGallery images={row2} onImageClick={setLightbox} scrollY={scrollY} />
        <div className="mb-14" />
      </section>

      {/* ═══ CURRICULUM ═══ */}
      <section id="curriculum" className="px-6 py-16" style={{ background: `linear-gradient(180deg, ${C.lavender} 0%, ${C.lav2} 35%, ${C.bg} 100%)` }}>
        <div className="mx-auto max-w-[740px] text-center">
          <h2 className="mb-3.5 text-[26px] md:text-[28px] font-extrabold leading-[1.3] tracking-[-0.01em]">Master the AI-powered<br />Creative Workflow</h2>
          <p className="mx-auto mb-3.5 max-w-[560px] text-[10px] font-medium uppercase leading-loose tracking-[0.18em]" style={{ color: C.textSub }}>
            The complete system for professionals to deliver high-end creative AI campaigns, build industry-ready skills, and stay ahead of the future of creative work.
          </p>
          <p className="mb-7 text-[12px] font-bold uppercase tracking-[0.1em]">Inside our course, you'll learn how to:</p>
          <div className="flex flex-col gap-2.5">
            {[
              <span>Create your own realistic <strong>AI avatars or AI twin</strong></span>,
              <span>Generate consistent images with <strong>professional-level realism</strong></span>,
              <span>Turn AI images into <strong>animated video clips</strong></span>,
              <span>Generate <strong>product images</strong> and <strong>campaign visuals</strong></span>,
              <span>Build a scalable <strong>AI content creation system</strong></span>,
            ].map((content, i) => (
              <div key={i} className="rounded-2xl px-6 py-4 text-left text-[14px]" style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>{content}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISUAL ROADMAP ═══ */}
      <section className="px-6 py-16" style={{ background: `linear-gradient(180deg, ${C.lav2} 0%, ${C.bg} 100%)` }}>
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="mb-2 text-[19px] md:text-[20px] font-extrabold uppercase tracking-[0.04em]">Visual Roadmap</h2>
          <p className="mb-12 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: C.textSub }}>Your step-by-step path to building your AI creation system</p>

          <div className="flex flex-wrap items-start justify-center gap-1.5">
            {ROADMAP_STEPS.map((step, i, arr) => {
              const isActive = activeStep === i;
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    onClick={() => setActiveStep(isActive ? null : i)}
                    className="w-[84px] sm:w-[88px] text-center cursor-pointer"
                  >
                    <div
                      className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-[18px] transition-all"
                      style={{
                        backgroundColor: isActive ? C.purple : C.lavStrong,
                        border: `1.5px solid ${isActive ? C.purple : `${C.purple}55`}`,
                        boxShadow: isActive ? "0 8px 20px rgba(136,143,205,0.45)" : "none",
                      }}
                    >
                      <RoadmapIcon name={step.icon} inverted={isActive} />
                    </div>
                    <p className="mb-0.5 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.06em]">{step.label}</p>
                    <p className="text-[9.5px] sm:text-[10px] leading-tight" style={{ color: C.textSub }}>{step.sub}</p>
                  </div>
                  {i < arr.length - 1 && <span className="mb-6 flex-shrink-0 text-lg" style={{ color: C.purple }}>→</span>}
                </div>
              );
            })}
          </div>

          {activeStep !== null && (
            <div
              className="mx-auto mt-8 max-w-[560px] rounded-2xl px-7 py-6 text-left"
              style={{ backgroundColor: C.white, border: `1px solid ${C.purple}55` }}
            >
              <p className="mb-1.5 text-[12px] font-extrabold uppercase tracking-[0.08em]" style={{ color: C.purple }}>
                {ROADMAP_STEPS[activeStep].label} — {ROADMAP_STEPS[activeStep].sub}
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>{ROADMAP_STEPS[activeStep].detail}</p>
            </div>
          )}

          <PillButton href="#pricing" variant="purple" className="mt-11">Join the Course</PillButton>
        </div>
      </section>

      {/* ═══ 3 MODULES ═══ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[900px] text-center">
          <SectionLabel>How can you create AI campaigns like this? Introducing…</SectionLabel>
          <h2 className="mb-3.5 text-[24px] md:text-[26px] font-extrabold tracking-[-0.01em]">Let AI Pay Your Bills</h2>
          <p className="mx-auto mb-11 max-w-[520px] text-[14px] leading-loose" style={{ color: C.textSub }}>
            A complete workflow for creating realistic AI avatars, generating content, and turning it into videos, posts, and campaigns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Avatar Foundation", teaser: "Build a character that stays consistent across every image and video.", bullets: ["Define your avatar goal (influencer, UGC, brand content, AI twin)", "Create your Character DNA", "Generate your first realistic base images"], outro: "Once this foundation is set, your avatar becomes reusable across unlimited content." },
              { title: "Image Generation", teaser: "Turn your avatar into a full creative system.", bullets: ["Generate different scenes and environments", "Create lifestyle, aesthetic, and cinematic visuals", "Produce AI product images and campaign shots", "Add realism so your content looks natural"], outro: "This is where your avatar starts becoming real content." },
              { title: "Video & Content Creation", teaser: "Bring your avatar to life and turn everything into publishable posts.", bullets: ["Animate images into talking clips and scenes", "Create AI B-roll and aesthetic video shots", "Add voice and movement", "Assemble everything into social media content"], outro: "At the end of this step, you'll have a complete AI post ready to publish." },
            ].map((mod, i) => (
              <ExpandCard key={i} title={mod.title} teaser={mod.teaser} tint>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: C.textSub }}>Inside this step you'll learn how to:</p>
                {mod.bullets.map((b, j) => <p key={j} className="mb-2 text-left text-[12px] leading-relaxed">• {b}</p>)}
                <p className="mt-3.5 text-[13px] leading-relaxed" style={{ color: C.textSub }}>{mod.outro}</p>
              </ExpandCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="px-6 pb-16">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="mb-4 text-[20px] md:text-[22px] font-extrabold leading-[1.35] tracking-[-0.01em]">Trusted by creators, entrepreneurs, and brands<br />learning AI content creation.</h2>
          <div className="mb-1.5"><Stars /></div>
          <p className="mb-9 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: C.textSub }}>Rated 5 stars by students</p>

          <div className="mb-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: "Sofia M.", text: "I had zero experience with AI and now I have a full avatar with a consistent look across dozens of images. The prompting system alone is worth it." },
              { name: "Lena K.", text: "I'm a UGC creator and this completely changed how I work. I can now offer AI content as an add-on service and it's become my most in-demand offering." },
              { name: "Marta R.", text: "The Avatar Foundation module is insane. I built my character DNA in one afternoon and started generating on-brand visuals the same day." },
            ].map((t, i) => (
              <Card key={i}>
                <div className="mb-2.5"><Stars /></div>
                <p className="mb-3 text-[13px] leading-relaxed opacity-85">"{t.text}"</p>
                <p className="text-[11px] font-semibold tracking-[0.08em]" style={{ color: C.purple }}>— {t.name}</p>
              </Card>
            ))}
          </div>
          <div className="mx-auto grid max-w-[600px] grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "Chiara B.", text: "As a brand owner I was spending thousands on photographers. Now I produce my own campaign visuals with AI. The quality is genuinely impressive." },
              { name: "Jess T.", text: "I tried three other AI courses and none of them showed me what this one does. The roadmap makes everything click — it's a proper system, not just tips." },
            ].map((t, i) => (
              <Card key={i}>
                <div className="mb-2.5"><Stars /></div>
                <p className="mb-3 text-[13px] leading-relaxed opacity-85">"{t.text}"</p>
                <p className="text-[11px] font-semibold tracking-[0.08em]" style={{ color: C.purple }}>— {t.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STUDENT WORK ═══ */}
      <section id="success" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.lavender} 18%, ${C.lavender} 82%, ${C.bg} 100%)` }}>
        <p className="px-6 pb-5 pt-14 text-center text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: C.textSub }}>Take a look at our students' work:</p>
        <ExpandingGallery images={eyeRow} onImageClick={setLightbox} scrollY={scrollY} />
        <div className="px-6 pb-5 pt-12 text-center">
          <p className="mb-1.5 text-[13px] font-bold uppercase tracking-[0.08em]">Our students are already learning how to create content with AI</p>
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: C.textSub }}>Building avatars, generating visuals, and turning AI into real creative workflows.</p>
          <PillButton href="#pricing" variant="purple">Enroll Now</PillButton>
        </div>
      </section>

      {/* ═══ FUTURE / COMPARISON ═══ */}
      <section className="px-6 py-16" style={{ background: `linear-gradient(180deg, ${C.lavender} 0%, ${C.lav2} 40%, ${C.bg} 100%)` }}>
        <div className="mx-auto max-w-[840px] text-center">
          <h2 className="mb-4 text-[24px] md:text-[26px] font-extrabold leading-[1.35] tracking-[-0.01em]" style={{ color: C.purple }}>
            The future of content creation is already here.<br />The question is: will you be creating it?
          </h2>
          <p className="mx-auto mb-2.5 max-w-[560px] text-[14px] leading-loose opacity-85">
            This course gives you the system to create realistic AI avatars, generate content, and turn it into real posts, visuals, and campaigns — all from your laptop.
          </p>
          <p className="mx-auto mb-10 max-w-[540px] text-[14px] leading-loose opacity-85">Instead of watching the AI revolution from the sidelines, you'll learn how to actually use it.</p>

          <div className="mx-auto mb-16 grid max-w-[800px] grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-0">
            <Card>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: C.textSub }}>Without this course</p>
              {["Random prompting and inconsistent results", "AI images that look fake or unusable", "No consistent avatar or character", "No idea how to turn images into real content", "Constantly testing tools without a clear workflow"].map((t, i) => (
                <p key={i} className="mb-3 text-[13px] leading-relaxed opacity-80">• {t}</p>
              ))}
            </Card>
            <div className="rotate-90 md:rotate-0 py-2 text-center text-2xl md:px-4" style={{ color: C.purple }}>→</div>
            <Card accent>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: C.purple }}>With this course</p>
              {["A clear system for creating realistic AI avatars", "Consistent characters you can reuse across content", "The ability to generate images, videos, and scenes", "A workflow to turn everything into posts and campaigns", "A skill that can be used for creators, brands, or client work"].map((t, i) => (
                <p key={i} className="mb-3 text-[13px] leading-relaxed opacity-80">• {t}</p>
              ))}
            </Card>
          </div>

          <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: C.textSub }}>Market Reality</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { pct: "91%", bold: "Of brands say visual content is their top marketing priority", desc: "But producing that content consistently is still expensive and time-consuming." },
              { pct: "70%", bold: "Of marketers say they need more content than ever before", desc: "Yet most teams still struggle to keep up with demand." },
              { pct: "60%", bold: "Of small brands say content production is their biggest marketing bottleneck.", desc: "This is your chance!" },
            ].map((s, i) => (
              <Card key={i}>
                <p className="mb-2.5 text-[36px] md:text-[42px] font-extrabold tracking-[-0.02em]">{s.pct}</p>
                <p className="mb-2 text-[12px] font-bold leading-snug">{s.bold}</p>
                <p className="text-[12px] leading-relaxed" style={{ color: C.textSub }}>{s.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-11">
            <ArrowDown className="mx-auto" />
            <h3 className="mt-3 text-[15px] md:text-[16px] font-extrabold uppercase leading-relaxed tracking-[0.04em]">
              This is exactly why learning how to create content<br className="hidden sm:block" />with AI is becoming such a valuable skill.
            </h3>
          </div>
        </div>
      </section>

      {/* ═══ AHEAD OF THE GAME ═══ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[840px] text-center">
          <ArrowDown className="mx-auto" />
          <h2 className="my-3 mb-9 text-[20px] md:text-[22px] font-extrabold uppercase tracking-[-0.01em]">This is your chance to be ahead of the game</h2>
          <div className="mx-auto mb-8 grid max-w-[680px] grid-cols-2 sm:grid-cols-3 gap-3">
            {aheadRow.map((src, i) => (
              <ZoomImg key={i} src={src} onClick={setLightbox} className="h-[170px] sm:h-[220px] rounded-2xl" />
            ))}
          </div>
          <p className="mx-auto mb-14 max-w-[520px] text-[13px] font-bold uppercase leading-relaxed">
            Once the system is built, creating visuals like this becomes fast, scalable, and repeatable.
          </p>

          <p className="mb-6 text-[17px] md:text-[18px] font-extrabold uppercase tracking-[0.08em]">Case Studies</p>
          <div className="mb-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              { name: "Sarah — UGC Creator", teaser: "Tripled her client roster in 60 days.", result: "Tripled her client roster in 60 days by replacing all filming with AI-generated content. Now produces 20+ pieces per week." },
              { name: "Lumé Cosmetics", teaser: "Saved €4,200 in production costs.", result: "Replaced monthly photoshoots with AI campaign visuals. Saved €4,200 in production costs in the first month." },
              { name: "Marco — Freelancer", teaser: "Landed 2 retainer clients in 45 days.", result: "Added AI content services to his agency. Landed 2 retainer clients at €1,500/month each within 45 days of completing the course." },
            ].map((cs, i) => (
              <ExpandCard key={i} title={cs.name} teaser={cs.teaser} align="left" tint>
                <p className="text-[13px] leading-relaxed opacity-80">{cs.result}</p>
              </ExpandCard>
            ))}
          </div>
          <p className="text-[12px] leading-loose" style={{ color: C.textSub }}>
            These are examples of projects created using the techniques taught in the course.<br />Results will vary depending on how you apply the system.
          </p>
        </div>
      </section>

      {/* ═══ WHY DEMAND ═══ */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="mb-3.5 text-[26px] md:text-[28px] font-extrabold leading-[1.3] tracking-[-0.01em]">Why is demand for AI content exploding?</h2>
          <p className="mb-6 text-[14px] leading-relaxed" style={{ color: C.textSub }}>Because brands need more content, faster — without the cost of traditional production.</p>
          <div className="mb-4.5 rounded-2xl px-7 py-6 md:px-9" style={{ backgroundColor: C.lav2, border: `1.5px solid ${C.border}` }}>
            <p className="text-[13px] font-bold uppercase leading-relaxed">AI-powered production reduces costs, increases speed,<br className="hidden sm:block" />and allows brands to scale campaigns instantly.</p>
          </div>
          <p className="mb-3.5 text-[13px]" style={{ color: C.textSub }}>This shift is already happening across the industry.</p>
          <p className="text-[13px] font-bold uppercase tracking-[0.06em]">We can teach you the systems that make this possible.</p>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-[860px]">
          <h2 className="mb-9 text-center text-[26px] md:text-[28px] font-extrabold tracking-[-0.01em]">This is what you get once inside</h2>
          <div className="flex flex-col gap-3">
            {[
              { title: "15 Step-by-Step Video Lessons (20+ Hours of Training)", worth: "Worth 1,497€", desc: "Learn how to build your AI avatar, create realistic visuals, animate your character, and turn everything into complete content and campaigns." },
              { title: "15+ Downloadable Bonus Materials", worth: "Worth 297€", desc: "Step-by-step guides, checklists, templates, troubleshooting tips, and our curated prompt collection to speed up your workflow." },
              { title: "Exclusive Community", worth: "Worth 397€", desc: "Lifetime access to our private community group for feedback, accountability, and support while you build your AI projects." },
              { title: "Lifetime Access & Updates", worth: "Priceless", desc: "The AI industry evolves fast — and so will the course. You'll receive future updates and new tool integrations to ensure your skills never become outdated." },
            ].map((item, i) => (
              <Card key={i} tint>
                <div className="mb-2 flex items-start justify-between gap-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.05em]">{item.title}</p>
                  <p className="flex-shrink-0 text-[12px] font-bold" style={{ color: C.purple }}>{item.worth}</p>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: C.textSub }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLUS BONUSES ═══ */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="mb-1 text-[32px] md:text-[36px] font-extrabold tracking-[-0.01em]">Plus</p>
          <p className="mb-8 text-[12px] font-bold uppercase tracking-[0.1em]">These bonuses ($2,466 additional value)</p>
          <div className="flex flex-col gap-3 text-left">
            {[
              { title: "Bonus Training Chapters", worth: "Worth 295€", desc: "Additional advanced lessons designed to expand your AI capabilities even further beyond the core avatar workflow." },
              { title: "Contract & Pitch Templates", worth: "Worth 197€", desc: "Proven client scripts, email templates, and ready-to-use contracts to help you land and manage projects professionally." },
              { title: "Community Challenges", worth: "Priceless", desc: "Regular creative challenges inside the community where you can practice your skills, showcase your work, and win prizes." },
            ].map((item, i) => (
              <Card key={i} tint>
                <div className="mb-2 flex items-start justify-between gap-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.05em]">{item.title}</p>
                  <p className="flex-shrink-0 text-[12px] font-bold" style={{ color: C.purple }}>{item.worth}</p>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: C.textSub }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="px-6 pb-16 pt-11">
        <div className="mx-auto max-w-[660px]">
          <ArrowDown className="mx-auto" />

          <div className="mt-4 overflow-hidden rounded-3xl" style={{ backgroundColor: C.lavStrong, border: `1px solid ${C.purple}55` }}>
            <div className="px-8 pb-7 pt-9 text-center md:px-10">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: C.text, opacity: 0.65 }}>Total Value</p>
              <p className="text-[32px] md:text-[36px] font-extrabold tracking-[-0.02em]">2,485€</p>
            </div>
            <div className="mx-8 md:mx-10" style={{ borderTop: `1.5px dashed ${C.purple}88` }} />
            <div className="px-8 pb-10 pt-8 text-center md:px-10">
              <p className="mb-4.5 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: C.text, opacity: 0.65 }}>Your Price</p>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <span className="text-[22px] sm:text-[26px] font-semibold line-through" style={{ color: `${C.text}55` }}>997€</span>
                <span className="text-[42px] sm:text-[54px] font-extrabold tracking-[-0.02em]">497€</span>
              </div>
              <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: C.text, opacity: 0.65 }}>or 3 × 179€</p>
              <PillButton href="#" variant="dark" className="!text-[13px]">Enroll Now</PillButton>
              <p className="mt-3.5 text-[12px]" style={{ color: C.text, opacity: 0.65 }}>Only 5 spots left at this price</p>
            </div>
          </div>

          <Card className="mt-3.5 text-center">
            <p className="text-[13px] leading-loose" style={{ color: C.textSub }}>
              When you join, you'll get instant access to all training modules, bonus materials, and resources. The
              AI space evolves quickly, so we'll continue updating the course with new tools, workflows, and
              techniques as they emerge — so your skills always stay relevant.
            </p>
          </Card>
        </div>
      </section>

      {/* ═══ FAQ + FINAL CTA + FOOTER (one continuous panel) ═══ */}
      <section id="faq" className="pt-16 pb-0" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.lav2} 45%, ${C.lavender} 100%)` }}>
        <div className="mx-auto max-w-[740px] px-6">
          <h2 className="mb-9 text-center text-[32px] md:text-[38px] font-extrabold tracking-[-0.02em]">Frequently Asked</h2>
          <div className="flex flex-col gap-2.5">
            {[
              { q: "Do I need any experience with AI or content creation?", a: "No experience needed. This course is built for complete beginners as well as creators who already make content but want to add AI to their workflow. We walk you through every tool step by step." },
              { q: "What exactly will I be able to create after the course?", a: "You'll be able to create your own AI avatar, generate consistent images and scenes, produce product visuals, animate characters into video clips, and assemble full social media campaigns — all without filming yourself." },
              { q: "Do I need expensive software or equipment?", a: "No. All the tools we use have free or low-cost tiers. You only need a laptop and internet connection. We teach you the most cost-effective stack to get professional results." },
              { q: "What if the AI tools change in the future?", a: "That's why we offer lifetime access and updates. As the AI space evolves, we update the course with new tools, workflows, and techniques — so your skills always stay current." },
              { q: "Can this help me make money?", a: "Yes. Students use these skills to monetize as UGC creators, offer AI content services to brands, build their own AI influencer pages, and create scalable campaigns for their own businesses." },
            ].map((item, i) => (
              <ExpandCard key={i} title={item.q} teaser="" align="left">
                <p className="text-[13px] leading-relaxed opacity-80">{item.a}</p>
              </ExpandCard>
            ))}
          </div>
        </div>

        <div className="mt-16 px-6 pb-16 text-center">
          <h2 className="mb-2 text-[34px] md:text-[40px] font-extrabold tracking-[-0.02em]">Ready to Build?</h2>
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: C.textSub }}>Join the AI Studio Academy</p>
          <PillButton href="#pricing" variant="purple" className="!text-[13px] mb-3.5">Enroll Now</PillButton>
          <p className="mt-3.5 text-[12px]" style={{ color: C.textSub }}>Only 5 left</p>
        </div>

        <footer className="px-6 py-6" style={{ backgroundColor: C.lavender }}>
          <div className="mx-auto flex max-w-[960px] flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Content Collective AI</span>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:hello@contentcollectiveai.com" className="text-[11px] font-medium uppercase tracking-[0.1em] no-underline" style={{ color: C.textSub }}>Email</a>
              <a href="https://instagram.com" className="text-[11px] font-medium uppercase tracking-[0.1em] no-underline" style={{ color: C.textSub }}>Instagram</a>
              <a href="#" className="text-[11px] font-medium uppercase tracking-[0.1em] no-underline" style={{ color: C.textSub }}>Privacy Policy</a>
              <a href="#" className="text-[11px] font-medium uppercase tracking-[0.1em] no-underline" style={{ color: C.textSub }}>Terms & Conditions</a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
