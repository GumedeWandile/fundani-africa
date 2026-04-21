import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,800;9..144,900&display=swap');`;

const C = {
  bg: "#060d09", card: "#0e1a12", green: "#00c853", greenDark: "#009624",
  gold: "#f5c842", orange: "#ff6d3a", text: "#f0f4f0", muted: "#7a917e",
  whatsapp: "#25D366", border: "rgba(255,255,255,0.06)",
};

function FadeIn({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>{children}</div>;
}

function CountUp({ end, suffix = "" }) {
  const [c, setC] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = Date.now();
        const step = () => { const p = Math.min((Date.now() - s) / 2000, 1); setC(Math.round((1 - Math.pow(1 - p, 3)) * end)); if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [end]);
  return <span ref={ref}>{c.toLocaleString()}{suffix}</span>;
}

export default function Landing() {
  const WHATSAPP_LINK = "https://wa.me/27707473563?text=Hi"; // Replace with real number

  const Sec = ({ children, style = {} }) => (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", ...style }}>{children}</div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.bg, color: C.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{FONTS}{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:${C.green}44}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(37,211,102,0.3)}
        .feat:hover{transform:translateY(-3px);border-color:${C.green}33}
        @media(max-width:768px){
          .hero-g{flex-direction:column!important;text-align:center!important}
          .hero-t{font-size:36px!important}
          .stats-g{grid-template-columns:1fr 1fr!important}
          .feat-g{grid-template-columns:1fr!important}
          .steps-g{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* Nav */}
      <nav style={{ padding: "16px 0", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: `${C.bg}ee`, backdropFilter: "blur(20px)", zIndex: 100 }}>
        <Sec style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>📚</span>
            <span style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 800, background: `linear-gradient(135deg,${C.green},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Fundani</span>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="cta" style={{
            background: C.whatsapp, color: "#fff", border: "none", borderRadius: 24, padding: "10px 20px",
            fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.3s", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6
          }}>💬 Start Free on WhatsApp</a>
        </Sec>
      </nav>

      {/* Hero */}
      <section style={{ padding: "70px 0 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, background: `radial-gradient(circle,${C.green}0d,transparent 70%)`, pointerEvents: "none" }} />
        <Sec>
          <div className="hero-g" style={{ display: "flex", gap: 50, alignItems: "center" }}>
            <div style={{ flex: 1.2 }}>
              <FadeIn>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.green}12`, border: `1px solid ${C.green}28`, borderRadius: 24, padding: "6px 14px", marginBottom: 20 }}>
                  <span style={{ fontSize: 13 }}>🇿🇦</span>
                  <span style={{ color: C.green, fontSize: 12, fontWeight: 700 }}>Free for South African learners</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="hero-t" style={{ fontFamily: "'Fraunces',serif", fontSize: 52, fontWeight: 900, lineHeight: 1.08, marginBottom: 18, letterSpacing: -2 }}>
                  Your marks are about to<br />
                  <span style={{ background: `linear-gradient(135deg,${C.green},${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>change forever</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.7, maxWidth: 480, marginBottom: 28 }}>
                  Fundani is a free AI study partner that lives on WhatsApp. Send your marks, get a personalised study plan, practice past papers, and get daily lessons — all from your phone. No apps. No textbooks. No excuses.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="cta" style={{
                  background: `linear-gradient(135deg,${C.whatsapp},${C.greenDark})`, color: "#fff", borderRadius: 14,
                  padding: "16px 32px", fontSize: 17, fontWeight: 700, cursor: "pointer", transition: "all 0.3s",
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, border: "none"
                }}>
                  💬 Start Studying Free on WhatsApp
                </a>
                <p style={{ color: C.muted, fontSize: 12, marginTop: 10 }}>🔒 Start Free. No signup. Just send "Hi".</p>
              </FadeIn>
            </div>

            {/* Phone mockup */}
            <FadeIn delay={0.4} style={{ flex: 0.75, display: "flex", justifyContent: "center" }}>
              <div style={{ width: 260, background: "#0b141a", borderRadius: 28, padding: 6, boxShadow: "0 40px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.05)", animation: "float 5s ease-in-out infinite" }}>
                <div style={{ background: "#1f2c34", borderRadius: "22px 22px 0 0", padding: "10px 14px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: C.muted }}>16:00</span>
                  <span style={{ fontSize: 9, color: C.muted }}>📶 🔋</span>
                </div>
                <div style={{ background: "#1f2c34", padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${C.green},#075E54)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>📚</div>
                  <div><div style={{ color: "#e9edef", fontSize: 12, fontWeight: 600 }}>Fundani</div><div style={{ color: "#00a884", fontSize: 9 }}>online</div></div>
                </div>
                <div style={{ background: "#0b141a", padding: "10px 6px", minHeight: 220 }}>
                  {[
                    { t: "bot", m: "✅ Report analysed, Naledi!\n\n🔴 Maths: 48%\n🟡 English: 55%\n🟢 Life Sci: 71%\n\n🎯 Let's get that Maths up!" },
                    { t: "user", m: "lesson" },
                    { t: "bot", m: "📐 Let's factorise!\n\nx² - 5x + 6 = 0\n\nWhat are the factors? 🤔" },
                    { t: "user", m: "(x-2)(x-3)" },
                    { t: "bot", m: "✅ Perfect! 🔥 +25 XP\n\nYou're on a 5-day streak!" },
                  ].map((msg, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: msg.t === "user" ? "flex-end" : "flex-start", marginBottom: 3 }}>
                      <div style={{ background: msg.t === "user" ? "#005c4b" : "#1f2c34", borderRadius: 7, padding: "4px 7px", maxWidth: "84%", color: "#e9edef", fontSize: 10, lineHeight: 1.35, whiteSpace: "pre-line" }}>{msg.m}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#1f2c34", borderRadius: "0 0 22px 22px", padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, background: "#2a3942", borderRadius: 18, padding: "5px 10px", fontSize: 10, color: "#8696a0" }}>Type a message</div>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#00a884", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>🎤</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Sec>
      </section>

      {/* Stats */}
      <section style={{ padding: "36px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <Sec>
          <div className="stats-g" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, textAlign: "center" }}>
            {[
              { v: <CountUp end={78} suffix="%" />, l: "of SA Grade 4s can't read for meaning", i: "📖" },
              { v: <CountUp end={62} suffix="%" />, l: "of matric learners fail Maths", i: "📐" },
              { v: <CountUp end={95} suffix="%" />, l: "of SA learners have WhatsApp", i: "📱" },
              { v: "R0", l: "to start learning with Fundani", i: "🆓" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.i}</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontWeight: 900, color: C.green }}>{s.v}</div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{s.l}</div>
              </FadeIn>
            ))}
          </div>
        </Sec>
      </section>

      {/* How It Works */}
      <section style={{ padding: "70px 0" }}>
        <Sec>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 800, marginBottom: 10 }}>How It Works</h2>
              <p style={{ color: C.muted, fontSize: 15, maxWidth: 450, margin: "0 auto" }}>Three steps. No apps to download. Just WhatsApp.</p>
            </div>
          </FadeIn>
          <div className="steps-g" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { s: "01", i: "📤", t: "Send Your Marks", d: "Type your subjects and marks — or snap a photo of your report card. Fundani reads it instantly and identifies your strengths and gaps.", c: C.green },
              { s: "02", i: "🎯", t: "Get Your Plan", d: "AI builds a personalised daily study plan targeting your weakest subjects first. Your parent gets weekly progress reports too.", c: C.gold },
              { s: "03", i: "🚀", t: "Study & Level Up", d: "Daily lessons, past paper practice, XP and streaks. Fundani adapts to you — harder when you're ready, slower when you need it.", c: C.orange },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="feat" style={{ background: C.card, borderRadius: 18, padding: "32px 24px", border: `1px solid ${C.border}`, transition: "all 0.3s", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 14, right: 16, fontFamily: "'Fraunces',serif", fontSize: 56, fontWeight: 900, color: "rgba(255,255,255,0.02)" }}>{s.s}</div>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: `${s.c}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16, border: `1px solid ${s.c}20` }}>{s.i}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: "'Fraunces',serif" }}>{s.t}</h3>
                  <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.65 }}>{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Sec>
      </section>

      {/* Features */}
      <section style={{ padding: "70px 0", background: `linear-gradient(180deg,${C.card},${C.bg})` }}>
        <Sec>
          <FadeIn><h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 800, marginBottom: 40, textAlign: "center" }}>Everything You Need to Pass</h2></FadeIn>
          <div className="feat-g" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {[
              { i: "📝", t: "Past Paper Practice", d: "Real matric-style questions graded by AI with full explanations. Practice by subject at your level." },
              { i: "🧠", t: "AI That Adapts", d: "Struggling? It slows down. Flying? It pushes harder. Every lesson is tailored to exactly where you are." },
              { i: "👨‍👩‍👦", t: "Parent Reports", d: "Every Sunday your parent/guardian gets a WhatsApp update on your progress. They'll see your hard work." },
              { i: "📸", t: "Photo Report Reading", d: "Snap a photo of your report card — AI reads every mark and builds your plan automatically." },
              { i: "🏆", t: "XP & Streaks", d: "Earn points for every lesson and past paper. Build your streak. Show your friends you're putting in work." },
              { i: "🌍", t: "Multilingual", d: "Learn in English, isiZulu, Siswati, Sesotho, or mix them naturally. Fundani speaks your language." },
              { i: "📶", t: "Low Data", d: "Text-based lessons use almost no data. Works on any smartphone — even with R5 airtime." },
              { i: "🎓", t: "CAPS Aligned", d: "Every lesson maps to the South African CAPS curriculum. We teach what your school teaches — just better." },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="feat" style={{ background: `${C.bg}cc`, borderRadius: 14, padding: "20px", border: `1px solid ${C.border}`, display: "flex", gap: 14, transition: "all 0.3s" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${C.green}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{f.i}</div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{f.t}</h4>
                    <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.55 }}>{f.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Sec>
      </section>

      {/* Testimonial */}
      <section style={{ padding: "70px 0" }}>
        <Sec>
          <FadeIn>
            <div style={{ textAlign: "center", maxWidth: 650, margin: "0 auto" }}>
              <div style={{ fontSize: 42, marginBottom: 16 }}>💛</div>
              <blockquote style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 400, fontStyle: "italic", lineHeight: 1.45, marginBottom: 16 }}>
                "Your matric results shouldn't depend on your parents' bank account. Every learner deserves a chance to fly."
              </blockquote>
              <p style={{ color: C.green, fontSize: 13, fontWeight: 600 }}>— The Fundani Mission</p>
            </div>
          </FadeIn>
        </Sec>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "70px 0", background: `linear-gradient(135deg,${C.green}12,${C.greenDark}08)`, borderTop: `1px solid ${C.green}18` }}>
        <Sec>
          <FadeIn>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Ready to change your marks?</h2>
              <p style={{ color: C.muted, fontSize: 15, marginBottom: 28, maxWidth: 440, margin: "0 auto 28px" }}>
                It takes 30 seconds. Open WhatsApp, send "Hi", and Fundani takes it from there. No signup, no payment, no catch.
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="cta" style={{
                background: `linear-gradient(135deg,${C.whatsapp},${C.greenDark})`, color: "#fff", borderRadius: 14,
                padding: "18px 36px", fontSize: 18, fontWeight: 700, cursor: "pointer", transition: "all 0.3s",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, border: "none"
              }}>💬 Start Free on WhatsApp</a>
              <p style={{ color: C.muted, fontSize: 11, marginTop: 12 }}>
                🇿🇦 Built for South African learners • Grade 8–12 • CAPS curriculum • 
              </p>
            </div>
          </FadeIn>
        </Sec>
      </section>

      {/* Footer */}
      <footer style={{ padding: "32px 0", borderTop: `1px solid ${C.border}` }}>
        <Sec style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 18 }}>📚</span>
            <span style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 800, color: C.green }}>Fundani</span>
            <span style={{ color: C.muted, fontSize: 12, marginLeft: 6 }}>Your AI study partner</span>
          </div>
          <div style={{ color: C.muted, fontSize: 11 }}>🇿🇦 Made with ❤️ in South Africa • © 2026</div>
        </Sec>
      </footer>
    </div>
  );
}
