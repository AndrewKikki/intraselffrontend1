import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// INTRASELF — WEB VERSION
// ═══════════════════════════════════════════════════════════

const APP_VERSION = "0.9.0"; // pre-launch — bump this with each meaningful release

const APPS = [
  { id:"njta",   label:"NJTA",         glyph:"🜂", sub:"Typological Assessment", accent:"#C8A84B", bg:"radial-gradient(ellipse at 60% 0%, #1A0A20 0%, #0A0A14 60%, #050510 100%)", desc:"A revised Jungian typology of psychical substance, temperament, and functional form. 56 questions. One of 16 named types." },
  { id:"dream",  label:"DreamMeaning", glyph:"☽", sub:"Dream Journal",           accent:"#C4B5E8", bg:"radial-gradient(ellipse at 40% 0%, #0D0A1E 0%, #0A0A14 60%, #050510 100%)", desc:"Record your dreams and receive interpretations from Freud, Jung, Adler, Perls, and Hillman. Each analyst remembers your history." },
  { id:"dasein", label:"DaseinCare",   glyph:"◦", sub:"Existential Companion",   accent:"#C4A882", bg:"radial-gradient(ellipse at 50% 0%, #0D0D0E 0%, #0A0A14 60%, #050510 100%)", desc:"Three questions about where you find yourself, what you're moving toward, and what you keep turning away from. Then listen." },
];

function AppShell({ active, onHome, children }) {
  const app = APPS.find(a => a.id === active);
  return (
    <div style={{ minHeight:"100vh", background:"#08080F", display:"flex", flexDirection:"column" }}>
      <nav style={{
        display:"flex", alignItems:"center", padding:"0 28px",
        borderBottom:"1px solid #1C1C28", background:"rgba(8,8,15,0.95)",
        backdropFilter:"blur(16px)", position:"sticky", top:0, zIndex:100, height:56,
      }}>
        <button onClick={onHome} style={{ background:"none", border:"none", cursor:"pointer", padding:"0 24px 0 0", marginRight:24, borderRight:"1px solid #1C1C28", flexShrink:0 }}>
          <span style={{ fontSize:15, letterSpacing:"0.2em", color:"#E8E0D0", fontFamily:"Georgia, serif", fontStyle:"italic" }}>
            IntraSelf<span style={{ fontSize:10, verticalAlign:"super", opacity:0.4 }}>™</span>
          </span>
        </button>
        {app && (
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:15, opacity:0.7 }}>{app.glyph}</span>
            <span style={{ fontFamily:"sans-serif", fontSize:12, letterSpacing:"0.1em", color:app.accent, fontWeight:600 }}>{app.label}</span>
            <span style={{ fontFamily:"sans-serif", fontSize:12, color:"#3A3A4A", marginLeft:4 }}>— {app.sub}</span>
          </div>
        )}
      </nav>
      <div style={{ flex:1 }}>{children}</div>
    </div>
  );
}

function HomePage({ onSelect, user, onAccountClick }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ minHeight:"100vh", background:"#08080F", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 32px", fontFamily:"Georgia, serif", position:"relative" }}>
      <style>{`
        @keyframes introFade { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .web-card:hover { transform:translateY(-5px) !important; }
      `}</style>

      <button onClick={onAccountClick} style={ user ? { position:"absolute", top:24, right:28, background:"none", border:"1px solid #2A2A38", borderRadius:20, color:"#8A8A9A", fontFamily:"sans-serif", fontSize:12, padding:"7px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:8 } : { position:"absolute", top:26, right:30, background:"none", border:"none", color:"#3A3A48", fontFamily:"sans-serif", fontSize:11, letterSpacing:"0.05em", padding:0, cursor:"pointer" }}>
        {user ? (
          <>
            <span style={{ width:20, height:20, borderRadius:"50%", background:"linear-gradient(135deg,#C8A84B,#5C4033)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#0A0A14" }}>{user.accountName?.[0]?.toUpperCase() || "?"}</span>
            @{user.handle}
          </>
        ) : "Sign In"}
      </button>

      <div style={{ textAlign:"center", marginBottom:72, animation:"introFade 0.7s ease" }}>
        <div style={{ fontSize:64, letterSpacing:"0.18em", color:"#E8E0D0", fontStyle:"italic", lineHeight:1 }}>
          IntraSelf<span style={{ fontSize:20, verticalAlign:"super", letterSpacing:0, opacity:0.4 }}>™</span>
        </div>
        <div style={{ fontSize:11, letterSpacing:"0.35em", color:"#3A3A4A", fontFamily:"sans-serif", textTransform:"uppercase", marginTop:14 }}>
          Tools for inner inquiry
        </div>
      </div>

      <div style={{ display:"flex", gap:24, justifyContent:"center", maxWidth:1000, width:"100%", animation:"introFade 0.9s ease", flexWrap:"wrap" }}>
        {APPS.map(app => {
          const isHovered = hovered === app.id;
          const requiresAccount = app.id !== "njta" && !user;
          return (
            <button key={app.id} className="web-card"
              onClick={() => onSelect(app.id)}
              onMouseEnter={() => setHovered(app.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex:"1 1 260px", maxWidth:300,
                background: isHovered ? app.bg : "#0D0D14",
                border:`1px solid ${isHovered ? app.accent+"66" : "#1C1C28"}`,
                borderRadius:20, padding:"36px 28px 32px",
                cursor:"pointer", textAlign:"left", position:"relative",
                transition:"all 0.25s ease",
                transform:"translateY(0)",
                boxShadow: isHovered ? `0 24px 64px ${app.accent}18` : "none",
              }}>
              {requiresAccount && (
                <div style={{ position:"absolute", top:18, right:18, fontSize:11, color:"#5A5A6A", fontFamily:"sans-serif", display:"flex", alignItems:"center", gap:5 }}>
                  🔒 <span style={{ letterSpacing:"0.05em" }}>Free account required</span>
                </div>
              )}
              <div style={{ fontSize:48, marginBottom:22, lineHeight:1, color: isHovered ? app.accent : app.accent+"88", filter: isHovered ? `drop-shadow(0 0 18px ${app.accent}88)` : `drop-shadow(0 0 6px ${app.accent}33)`, transition:"all 0.25s" }}>{app.glyph}</div>
              <div style={{ fontSize:20, color: isHovered ? app.accent : "#C8C0B0", fontStyle:"italic", marginBottom:6, transition:"color 0.2s" }}>{app.label}</div>
              <div style={{ fontSize:10, letterSpacing:"0.22em", color:"#3A3A4A", fontFamily:"sans-serif", textTransform:"uppercase", marginBottom:18 }}>{app.sub}</div>
              <div style={{ height:1, background: isHovered ? app.accent+"33" : "#1C1C28", marginBottom:18, transition:"background 0.25s" }}/>
              <div style={{ fontSize:13, lineHeight:1.8, color: isHovered ? "#9A9890" : "#4A4A5A", fontFamily:"sans-serif", fontStyle:"normal", transition:"color 0.2s" }}>{app.desc}</div>
              <div style={{ marginTop:24, fontSize:11, letterSpacing:"0.18em", color: isHovered ? app.accent : "transparent", fontFamily:"sans-serif", textTransform:"uppercase", transition:"color 0.2s" }}>{requiresAccount ? "Sign Up →" : "Enter →"}</div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop:80, textAlign:"center", animation:"introFade 1.1s ease" }}>
        <div style={{ width:1, height:32, background:"#1C1C28", margin:"0 auto 18px" }}/>
        <div style={{ fontSize:10, letterSpacing:"0.22em", color:"#2A2A38", fontFamily:"sans-serif" }}>INTRASELF™ · INNER INQUIRY</div>
        <div style={{ fontSize:9, letterSpacing:"0.1em", color:"#22222E", fontFamily:"sans-serif", marginTop:8 }}>© 2026 Psychical Arts LLC</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// NJTA — New Jungian Typological Assessment
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// QUESTIONS — three sections, new structure
// ─────────────────────────────────────────────────────────────

// Section 1: Substance (10 questions, binary A/B — no Neither)
// S1a: Se/Ni axis vs Ne/Si axis (a=Ignis/Aer, b=Terra/Aqua)
// S1b: Te/Fi axis vs Fe/Ti axis (a=Ignis/Terra, b=Aer/Aqua)
// Each question carries aAxis: which axis (within its group's pair) option "a" represents.
// Foregrounding rotates across the 5 questions per pair so no single function is always
// cast as the "background/checking" voice — this matters most for Ni and Ti, which in a
// fixed ordering never get to lead. Question 5 in each set also swaps which slot (a/b)
// hosts which axis entirely, so the axis itself isn't anchored to a letter.
const S1_AXIS_QUESTIONS = [
  { id:"s1a1", section:1, group:"S1a", aAxis:"SeNi",
    text:"Your relationship with reality is best described as…",
    a:"A vivid, immediate engagement with what is present, beneath which runs a quiet, convergent sense of where things are heading",
    b:"A restless reach toward what might be possible, grounded by a deep store of personal experience and established pattern" },
  { id:"s1a2", section:1, group:"S1a", aAxis:"SeNi",
    text:"The way you absorb the world is more characterised by…",
    a:"Intense presence to what is actually here — sensation, atmosphere, the concrete — combined with an undercurrent of long-range, focused intuition",
    b:"A deep reliance on what you've lived and tested before, quietly opened outward by a pull toward new connections and untried possibilities" },
  { id:"s1a3", section:1, group:"S1a", aAxis:"SeNi",
    text:"When you understand something deeply, it is usually because…",
    a:"Something in you had already been converging on it for a while, and encountering it directly simply confirmed what you'd sensed was coming",
    b:"You recognised it against a long accumulation of lived experience, then let a wider field of association draw out its fuller implications" },
  { id:"s1a4", section:1, group:"S1a", aAxis:"SeNi",
    text:"Your orientation toward the unknown is more like…",
    a:"Trusting a slow, convergent intuition about where it leads, confirmed once you make direct contact with what's actually there",
    b:"Mapping it imaginatively from many angles, then filtering what you find through a careful memory of comparable situations" },
  { id:"s1a5", section:1, group:"S1a", aAxis:"NeSi",
    text:"At your most natural, your mind…",
    a:"Fans outward into possibility and connection, while anchoring itself in the familiar rhythms and patterns of lived experience",
    b:"Stays close to what is real and present, while privately following a single thread of intuition deeper than it can easily express" },
  { id:"s1b1", section:1, group:"S1b", aAxis:"TeFi",
    text:"The way you evaluate situations is more naturally shaped by…",
    a:"Objective criteria — effectiveness, logical structure, measurable outcomes — informed by a private moral sense that quietly sets the limits",
    b:"The felt quality of relationships and human meaning — what matters to people — checked by an internal logical rigour that operates below the surface" },
  { id:"s1b2", section:1, group:"S1b", aAxis:"TeFi",
    text:"When you judge whether something is right or good, you draw primarily on…",
    a:"External standards of truth, coherence, and effectiveness — alongside a personal conviction about what is ultimately worth pursuing",
    b:"A precise internal logic that tests whether something truly holds together, alongside an attunement to what feels humanly meaningful in the outcome" },
  { id:"s1b3", section:1, group:"S1b", aAxis:"TeFi",
    text:"Your approach to the world around you is more oriented toward…",
    a:"Living from a private inner conviction about what matters, which you translate outward through clear structure and measurable standards",
    b:"Testing the world against an internal analytical framework for coherence and consistency, while staying attuned to its human and relational dimensions" },
  { id:"s1b4", section:1, group:"S1b", aAxis:"TeFi",
    text:"What you trust most when making important decisions is…",
    a:"A deep personal sense of what truly matters, worked out through clear reasoning and a regard for empirical evidence",
    b:"A combination of felt attunement to the people involved and a careful internal logic you apply privately" },
  { id:"s1b5", section:1, group:"S1b", aAxis:"FeTi",
    text:"The deepest tension in how you engage the world is between…",
    a:"An inner demand for logical coherence and personal integrity, and an equally strong pull toward human connection and shared meaning",
    b:"A private moral core that asks whether something is truly good, and the drive to get things right — objectively, structurally, effectively" },
];

// Section 2: Temperament (10 questions, binary A/B — no Neither)
// S2a: Extroverted vs Introverted
// S2b: Perceiving vs Judging
const S2_TEMP_QUESTIONS = [
  { id:"s2a1", section:2, group:"S2a", text:"After a long social gathering, you typically feel…",  a:"Energised — the interaction charged you",                                  b:"Drained — you need time alone to recover" },
  { id:"s2a2", section:2, group:"S2a", text:"You process ideas most effectively…",                 a:"By talking them through with others",                                      b:"By sitting alone with them first" },
  { id:"s2a3", section:2, group:"S2a", text:"Others tend to know what you think…",                 a:"Readily — you share as you go",                                            b:"Only when you choose — you share after reflection" },
  { id:"s2a4", section:2, group:"S2a", text:"You are more drawn to…",                              a:"A wide network of varied connections",                                      b:"A small number of deep, sustained relationships" },
  { id:"s2a5", section:2, group:"S2a", text:"When working on a problem, you prefer…",              a:"Collaboration — thinking alongside others in real time",                   b:"Solitude — working through it privately before engaging" },
  { id:"s2b1", section:2, group:"S2b", text:"In daily life, you tend to prefer…",                  a:"Flexibility — keeping options open as long as possible",                   b:"Resolution — reaching conclusions and having things settled" },
  { id:"s2b2", section:2, group:"S2b", text:"When plans change at the last minute, you…",          a:"Adapt easily — spontaneity suits you",                                      b:"Find it uncomfortable — you prefer to know what's coming" },
  { id:"s2b3", section:2, group:"S2b", text:"You feel most comfortable when…",                     a:"Things are open — you can still explore and adjust",                       b:"Things are decided — you know where you stand and what to do" },
  { id:"s2b4", section:2, group:"S2b", text:"Your natural orientation is more toward…",            a:"Perceiving — observing, absorbing, staying responsive",                    b:"Judging — evaluating, deciding, acting on conclusions" },
  { id:"s2b5", section:2, group:"S2b", text:"Deadlines make you…",                                 a:"More creative — pressure opens something up",                              b:"More focused — you prefer to be ahead of them" },
];

// Section 3: Process (24 questions, 4-point scale: Strongly A / Somewhat A / Somewhat B / Strongly B)
// 8 pairs × 3 questions each
const S3_PROCESS_QUESTIONS = [
  // Se vs Si
  { id:"s3a1", section:3, group:"SeVsSi", text:"You are more alive to…",          a:"The vivid, present-moment world — what is here now",                  b:"The familiar, remembered world — what has been and recurs" },
  { id:"s3a2", section:3, group:"SeVsSi", text:"You trust experience that is…",   a:"Immediate and direct — happening in front of you",                    b:"Accumulated and tested — confirmed across many instances" },
  { id:"s3a3", section:3, group:"SeVsSi", text:"Your attention is drawn to…",     a:"What is changing and immediate in your environment",                  b:"What is reliable and established in your environment" },
  // Ne vs Ni
  { id:"s3b1", section:3, group:"NeVsNi", text:"Your imagination tends to…",      a:"Branch outward — generating possibilities in many directions",        b:"Converge inward — focusing toward a single deep insight" },
  { id:"s3b2", section:3, group:"NeVsNi", text:"Insight arrives for you as…",     a:"Sudden connections between previously unrelated things",               b:"A slow crystallisation of something felt long before it was named" },
  { id:"s3b3", section:3, group:"NeVsNi", text:"You are more energised by…",      a:"Open possibility — many paths, none yet chosen",                      b:"Focused depth — one path followed to its end" },
  // Te vs Ti
  { id:"s3c1", section:3, group:"TeVsTi", text:"When reasoning, you lean toward…",a:"External standards — what the evidence and results show",              b:"Internal logic — what your own framework determines is coherent" },
  { id:"s3c2", section:3, group:"TeVsTi", text:"You find it more natural to…",    a:"Organise systems and people toward measurable outcomes",               b:"Analyse structures until you understand exactly how they work" },
  { id:"s3c3", section:3, group:"TeVsTi", text:"You are persuaded by arguments that…", a:"Demonstrate real-world effectiveness",                            b:"Hold together with internal consistency" },
  // Fe vs Fi
  { id:"s3d1", section:3, group:"FeVsFi", text:"Your moral sense is mostly shaped by…", a:"Shared values and the needs of the group",                       b:"A private inner standard independent of outside opinion" },
  { id:"s3d2", section:3, group:"FeVsFi", text:"When someone is in distress, you…",     a:"Attune to the room and respond to what the situation needs",      b:"Draw on your own felt response and offer it honestly" },
  { id:"s3d3", section:3, group:"FeVsFi", text:"Authenticity for you means…",            a:"Being genuinely present and attuned to others",                  b:"Being true to your own inner experience regardless of others" },
  // Se vs Ne
  { id:"s3e1", section:3, group:"SeVsNe", text:"You are more drawn to…",          a:"What is concretely present — tangible, immediate, real",              b:"What is abstractly possible — hypothetical, latent, connective" },
  { id:"s3e2", section:3, group:"SeVsNe", text:"In conversation you prefer…",     a:"What is actually happening — specific events, real experiences",      b:"What might be possible — ideas, patterns, what-ifs" },
  { id:"s3e3", section:3, group:"SeVsNe", text:"You engage the unknown by…",      a:"Moving into it through direct sensory contact",                       b:"Mapping it through imaginative association and inference" },
  // Si vs Ni
  { id:"s3f1", section:3, group:"SiVsNi", text:"Your inner life is anchored by…", a:"Personal history — what you have lived, tested, and verified",        b:"A felt orientation — a deep sense of where things are heading" },
  { id:"s3f2", section:3, group:"SiVsNi", text:"You navigate uncertainty by…",    a:"Drawing on precedent — what worked in comparable situations",         b:"Trusting your impression — what the situation seems to be calling for" },
  { id:"s3f3", section:3, group:"SiVsNi", text:"The future feels to you like…",   a:"An extension of established patterns you already understand",         b:"A convergence point you can sense before you can articulate it" },
  // Te vs Fe
  { id:"s3g1", section:3, group:"TeVsFe", text:"When leading, you naturally…",    a:"Establish clear goals, standards, and accountability",                b:"Read the group's energy, build trust, and hold people together" },
  { id:"s3g2", section:3, group:"TeVsFe", text:"You evaluate situations primarily through…", a:"Logic and effectiveness — what works",                       b:"Feeling and relationship — what matters to people" },
  { id:"s3g3", section:3, group:"TeVsFe", text:"You are more concerned with…",    a:"Getting things right — accuracy, results, structure",                 b:"Getting things good — care, harmony, shared meaning" },
  // Ti vs Fi
  { id:"s3h1", section:3, group:"TiVsFi", text:"Your inner critic sounds like…",  a:"A logician — pointing out what doesn't hold together",                b:"A moralist — pointing out what doesn't feel right or true" },
  { id:"s3h2", section:3, group:"TiVsFi", text:"You resist ideas that…",          a:"Contradict your internal model of how things work",                   b:"Conflict with what you know to be personally true or important" },
  { id:"s3h3", section:3, group:"TiVsFi", text:"Your deepest certainties are…",   a:"Structural — grounded in logical frameworks you've built",             b:"Personal — grounded in felt convictions that precede argument" },
  // Se vs Ni
  { id:"s3i1", section:3, group:"SeVsNi", text:"When something captures you fully, it is more often…", a:"A vivid sensory reality you can immediately touch, see, or act within", b:"A quiet conviction that has been converging inside you for some time" },
  { id:"s3i2", section:3, group:"SeVsNi", text:"You feel most yourself when…", a:"Engaging directly and immediately with the world in front of you",     b:"Following an inward pull toward a single, deepening realisation" },
  { id:"s3i3", section:3, group:"SeVsNi", text:"Your sense of what's real is grounded in…", a:"What can be perceived and acted on right now",                b:"What has slowly crystallised into certainty beneath the surface" },
  // Ne vs Si
  { id:"s3j1", section:3, group:"NeVsSi", text:"Faced with a new situation, you're drawn to…", a:"The many directions it could branch into — untested possibilities", b:"How it compares to patterns you've already lived and confirmed" },
  { id:"s3j2", section:3, group:"NeVsSi", text:"You feel most resourceful when…", a:"Generating fresh connections and possibilities on the fly",           b:"Drawing on a deep well of remembered, tested experience" },
  { id:"s3j3", section:3, group:"NeVsSi", text:"Change feels most natural to you when it…", a:"Opens new, unexplored territory",                             b:"Builds carefully on what has already proven reliable" },
  // Fi vs Te
  { id:"s3k1", section:3, group:"FiVsTe", text:"When deciding what matters, you rely on…", a:"A private conviction that doesn't need outside validation",        b:"Clear, external evidence of what actually works" },
  { id:"s3k2", section:3, group:"FiVsTe", text:"You measure a good decision by whether it…", a:"Feels true to something you hold privately and deeply",           b:"Produces effective, verifiable results" },
  { id:"s3k3", section:3, group:"FiVsTe", text:"Your sense of integrity comes from…", a:"Staying faithful to an inner standard, regardless of outcome",       b:"Achieving outcomes that meet clear, objective standards" },
  // Ti vs Fe
  { id:"s3l1", section:3, group:"TiVsFe", text:"You test an idea by asking whether it…", a:"Holds together logically, on its own internal terms",              b:"Serves and strengthens the people it affects" },
  { id:"s3l2", section:3, group:"TiVsFe", text:"In a disagreement, you're more focused on…", a:"Whether the reasoning is actually sound",                        b:"Whether the relationship stays intact" },
  { id:"s3l3", section:3, group:"TiVsFe", text:"Your inner compass responds most to…", a:"Precision — does this actually make sense",                        b:"Attunement — does this feel right for everyone involved" },
];

const ALL_QUESTIONS = [...S1_AXIS_QUESTIONS, ...S2_TEMP_QUESTIONS, ...S3_PROCESS_QUESTIONS];

const SECTIONS = [
  { id:1, label:"Substance", subtitle:"The structure of your psychical substance", questionCount:10 },
  { id:2, label:"Temperament", subtitle:"The orientation of your engagement", questionCount:10 },
  { id:3, label:"Process", subtitle:"The pattern of your psychical development", questionCount:36 },
];

// Colors follow temperament first (Rubeus=Red, Albus=White, Caeruleus=Blue, Nigrus=Gray),
// with a small, consistent per-substance shift (Ignis warmer/lighter, Aer lighter/airier,
// Terra earthier/darker, Aqua cooler/deeper) so each type reads as "its temperament's
// family" at a glance, with substance as a subtle variant rather than a wholly separate hue.
const ALL_TYPES = {
  "Ignis Rubeus":    { ego:"Se", persona:"Fi", anima:"Te", umbra:"Ni", substance:"Ignis", temperament:"Rubeus",    color:"#B83235" },
  "Ignis Nigrus":    { ego:"Fi", persona:"Se", anima:"Ni", umbra:"Te", substance:"Ignis", temperament:"Nigrus",    color:"#636A7E" },
  "Ignis Albus":     { ego:"Te", persona:"Ni", anima:"Se", umbra:"Fi", substance:"Ignis", temperament:"Albus",     color:"#ECE3D5" },
  "Ignis Caeruleus": { ego:"Ni", persona:"Te", anima:"Fi", umbra:"Se", substance:"Ignis", temperament:"Caeruleus", color:"#3E84AC" },
  "Aer Rubeus":      { ego:"Se", persona:"Ti", anima:"Fe", umbra:"Ni", substance:"Aer",   temperament:"Rubeus",    color:"#B85442" },
  "Aer Nigrus":      { ego:"Ti", persona:"Se", anima:"Ni", umbra:"Fe", substance:"Aer",   temperament:"Nigrus",    color:"#75767A" },
  "Aer Albus":       { ego:"Fe", persona:"Ni", anima:"Se", umbra:"Ti", substance:"Aer",   temperament:"Albus",     color:"#EEEBE2" },
  "Aer Caeruleus":   { ego:"Ni", persona:"Fe", anima:"Ti", umbra:"Se", substance:"Aer",   temperament:"Caeruleus", color:"#4F7AAB" },
  "Terra Rubea":     { ego:"Ne", persona:"Fi", anima:"Te", umbra:"Si", substance:"Terra", temperament:"Rubeus",    color:"#8F462D" },
  "Terra Nigra":     { ego:"Fi", persona:"Ne", anima:"Si", umbra:"Te", substance:"Terra", temperament:"Nigrus",    color:"#53535F" },
  "Terra Alba":      { ego:"Te", persona:"Si", anima:"Ne", umbra:"Fi", substance:"Terra", temperament:"Albus",     color:"#DBD6B8" },
  "Terra Caerulea":  { ego:"Si", persona:"Te", anima:"Fi", umbra:"Ne", substance:"Terra", temperament:"Caeruleus", color:"#375486" },
  "Aqua Rubea":      { ego:"Ne", persona:"Ti", anima:"Fe", umbra:"Si", substance:"Aqua",  temperament:"Rubeus",    color:"#9E302E" },
  "Aqua Nigra":      { ego:"Ti", persona:"Ne", anima:"Si", umbra:"Fe", substance:"Aqua",  temperament:"Nigrus",    color:"#575C6B" },
  "Aqua Alba":       { ego:"Fe", persona:"Si", anima:"Ne", umbra:"Ti", substance:"Aqua",  temperament:"Albus",     color:"#E1D5C1" },
  "Aqua Caerulea":   { ego:"Si", persona:"Fe", anima:"Ti", umbra:"Ne", substance:"Aqua",  temperament:"Caeruleus", color:"#386F94" },
};

const SUBSTANCE_DESC = {
  Ignis: {
    symbol:"🜂", name:"Fire", latin:"Substantia Ignis",
    desc:`Ignis is the substance of immediacy and structure. Its irrational axis pairs extroverted Sensing (Se) with introverted Intuition (Ni): the psyche moves between a vivid, present-tense engagement with the physical world and a deep, private undercurrent of pattern and foresight. Se reaches outward into sensation — concrete, tactile, alive to what is happening now — while Ni works below the surface, slowly crystallising impressions into convergent visions the Ignis type may struggle to fully articulate. These two are not opposites but complements: the sharpness of the present and the gravity of the unseen.

Its rational axis pairs extroverted Thinking (Te) with introverted Feeling (Fi): the psyche evaluates through measurable, external criteria — effectiveness, structure, results — while privately anchored to a personal moral core that rarely speaks but never yields. Te organises the world; Fi judges whether it is worth organising at all.

Together, the four functions give Ignis its character: a type grounded in reality, driven by clarity, yet haunted by depth — capable of great force and hidden loyalty in equal measure.`,
  },
  Aer: {
    symbol:"🜁", name:"Air", latin:"Substantia Aeris",
    desc:`Aer is the substance of presence and perception. Its irrational axis pairs extroverted Sensing (Se) with introverted Intuition (Ni): Aer types are acutely attuned to the physical and social world as it unfolds in real time, reading bodies, atmospheres, and shifts in energy with rare sensitivity. Beneath this responsiveness runs Ni — an unconscious, convergent intelligence that draws meaning from accumulated impressions, surfacing as instinct or sudden certainty. Where Se makes Aer types alive to the moment, Ni gives their experience depth without their always knowing why.

Its rational axis pairs extroverted Feeling (Fe) with introverted Thinking (Ti): Aer evaluates through the emotional field of the group — harmonising, attuning, and shaping social reality — while Ti operates quietly inside, constructing precise internal frameworks and noting inconsistencies that warmth alone cannot resolve. Fe is the face Aer presents to the world; Ti is the mind that monitors whether that face is telling the truth.

The result is a substance that is warm and alert on the surface, complex and self-correcting within — a psyche that touches others deeply and asks, in private, whether the touch was real.`,
  },
  Terra: {
    symbol:"🜃", name:"Earth", latin:"Substantia Terrae",
    desc:`Terra is the substance of possibility and precision. Its irrational axis pairs extroverted Intuition (Ne) with introverted Sensing (Si): Terra types project outward into a field of ramifying connections and hypothetical angles — always finding the next idea, the overlooked link, the unexpected parallel — while Si anchors them inwardly to a vast storehouse of personal experience, precedent, and procedure. Ne sees what could be; Si remembers what has been. The tension between them gives Terra its distinctive rhythm: expansive speculation grounded by the weight of the already-known.

Its rational axis pairs extroverted Thinking (Te) with introverted Feeling (Fi): Terra organises its proliferating ideas through external structure — frameworks, systems, outputs that can be measured and shared — while Fi holds the interior standard, the quiet conviction about what matters and what does not, which no argument fully overrides. Te drives Terra toward productivity; Fi ensures the product means something.

The result is a substance that builds — concepts, systems, bodies of work — from a foundation of personal conviction, always generating more than it finishes, and always finishing what it most cares about.`,
  },
  Aqua: {
    symbol:"🜄", name:"Water", latin:"Substantia Aquae",
    desc:`Aqua is the substance of meaning and connection. Its irrational axis pairs extroverted Intuition (Ne) with introverted Sensing (Si): Aqua types move through the world by sensing potential — in people, in ideas, in the unspoken space between things — while Si holds a deep internal record of felt experience that shapes how new possibilities are received. Ne is the reaching out; Si is the returning home. Together they create a psyche that is always discovering and always remembering, weaving the new and the familiar into living pattern.

Its rational axis pairs extroverted Feeling (Fe) with introverted Thinking (Ti): Aqua evaluates through the felt quality of human connection — empathy, attunement, the sense of whether a situation is warm or cold, alive or dead — while Ti quietly constructs the internal logic that makes sense of what feeling alone cannot resolve. Fe flows outward toward people; Ti holds the thread of coherence within. The two rarely announce themselves separately; in Aqua, they are most naturally intertwined.

The result is a substance that is at once porous and principled — a psyche that absorbs the world richly, processes it with invisible care, and gives back something more shaped than what it received.`,
  },
};

// Per-type portrait: how Substance and Temperament interact as a person/psyche
const TYPE_DESC = {
  "Ignis Rubeus":    `The Ignis Rubeus psyche leads with Se — raw, embodied, fully present. The world is met with immediacy and appetite; reality is primary, abstraction secondary. Fi operates as the hidden moral gravity beneath this extroversion: values that are felt rather than announced, personal rather than negotiated. Te lives in the Anima — capable of decisive organisation when roused, but not the primary mode. Ni shadows the whole from below, supplying occasional flashes of convergent vision that can feel unwelcome or uncanny. This type tends to manifest as someone intensely alive to the present, privately principled, and occasionally surprised by how deeply they see.`,

  "Ignis Nigrus":    `The Ignis Nigrus psyche leads with Fi — a sovereign inner life that evaluates the world by personal moral standard before permitting engagement with it. Se is close behind: the values are embodied, not abstract, and this type moves through physical reality with conviction and directness. The Anima is Ni — meaning that a deep, convergent vision occasionally surfaces uninvited, pulling the type toward complexity they would prefer to resolve into clarity. Te shadows from the unconscious, appearing as frustration with inefficiency or a suppressed drive for external control. This is a type of intense interiority that meets the world with force when its values are engaged.`,

  "Ignis Albus":     `The Ignis Albus psyche leads with Te — the world is understood through structure, outcome, and effective organisation. Ni sits close in the Persona: intuitive foresight informs strategy, and this type often knows where things are heading before others do. Se lives in the Anima — the body, the immediate, the physical — available but not primary, emerging most clearly in periods of stress or flow. Fi shadows from below, a private emotional world that is rarely displayed but never absent, and which can surface as unexpectedly strong conviction when least expected. This is a type of organised intelligence, forward-looking and decisive, with a hidden depth of feeling.`,

  "Ignis Caeruleus": `The Ignis Caeruleus psyche leads with Ni — a single, convergent stream of inner knowing that observes the world from a depth others rarely reach. Te supports this as the Persona: the vision finds expression through organisation and structural thought, making the interior legible to the outside world. Fi lives in the Anima, providing an emotional undercurrent that quietly shapes what the type considers worth thinking about at all. Se shadows from the unconscious — the external, sensory world is both underdeveloped and magnetically compelling, and this type may oscillate between aesthetic intensity and a sense that physical reality remains somehow foreign. This is a type of sustained depth, strategic organisation, and private tenderness.`,

  "Aer Rubeus":      `The Aer Rubeus psyche leads with Se, meeting the world through acute, present-tense perception of atmosphere, body, and social energy. Ti provides the Persona: a precise internal logic that this type uses to make sense of what their senses are absorbing, calibrating impressions with quiet intellectual rigour. Fe occupies the Anima — warmth and social attunement are available but not primary, emerging most naturally in close relationships or emotionally significant moments. Ni shadows below, occasionally surfacing as uncanny foresight or an unsettled sense of where things are going. This is a type of sharp environmental awareness and quiet analytical depth, often warmer than they appear and more systematic than they feel.`,

  "Aer Nigrus":      `The Aer Nigrus psyche leads with Ti — a precise, internally consistent framework for making sense of the world, constructed from the inside out. Se supports this as the Persona: the analysis stays close to reality, grounded in concrete detail and direct experience rather than abstraction. Ni lives in the Anima, supplying occasional intimations of pattern or convergence that can unsettle a type committed to rigour. Fe shadows from the unconscious: warmth and social harmony are the least natural territory, and this type's relationship with collective emotional life tends to be complicated — either avoided or idealised. This is a type of disciplined intelligence, sensory precision, and an interior world of considerable coherence.`,

  "Aer Albus":       `The Aer Albus psyche leads with Fe — the emotional field of the group is primary, and this type moves through social reality by attuning, harmonising, and drawing others into connection. Ni sits in the Persona: an intuitive depth informs the social intelligence, giving this type a long view of people and situations that pure warmth alone cannot provide. Se lives in the Anima — embodied, sensory experience is vivid when accessed but not primary, surfacing in moments of aesthetic engagement or physical pleasure. Ti shadows from below, a private analytical capacity that may emerge as self-criticism or sudden rigorous precision. This is a type of social intelligence and relational depth, guided by vision and occasionally surprised by its own sharpness.`,

  "Aer Caeruleus":   `The Aer Caeruleus psyche leads with Ni — deep, convergent, attentive to what lies beneath the surface of events. Fe is the Persona: the inner vision expresses itself through relational warmth and social intelligence, making this type appear more outwardly attuned than their interior life might suggest. Ti occupies the Anima — a capacity for precise internal analysis that emerges in moments of complexity or doubt, quietly checking the coherence of what feeling and intuition have concluded. Se shadows from below: the physical, external world is the least cultivated territory, and this type may have a complex relationship with embodiment and immediate sensation. This is a type of profound attunement, social gift, and hidden analytical rigour.`,

  "Terra Rubea":     `The Terra Rubea psyche leads with Ne — the world is experienced as a field of possibility, connection, and branching meaning. Fi provides the Persona: the exploration is not neutral but value-laden, and this type follows possibility in the direction of what personally matters. Te occupies the Anima — external organisation and structured outcome are available but not primary, often arriving in bursts when a project has caught sufficient meaning. Si shadows from below, a deep store of personal precedent and procedural memory that occasionally surfaces as nostalgia, anxiety about the unfamiliar, or an unexpected conservatism. This is a type of visionary warmth — generative, principled, and privately more grounded than it appears.`,

  "Terra Nigra":     `The Terra Nigra psyche leads with Fi — the inner moral world is primary and sovereign, and everything else, including the proliferating ideas Ne generates, is filtered through it. Ne sits close as the Persona: values find expression through intellectual exploration, and this type is capable of great breadth of thought so long as it serves something they genuinely care about. Si lives in the Anima — the weight of personal history, habit, and the familiar is more present than might be expected, emerging as quiet loyalty to particular places, people, or practices. Te shadows from the unconscious, a suppressed drive for external order that can erupt as perfectionism or frustration when the world fails to arrange itself properly. This is a type of deep conviction and surprising range — structured within, exploratory without.`,

  "Terra Alba":      `The Terra Alba psyche leads with Te — the world is approached through structure, output, and measurable effectiveness. Si provides the Persona: the organisation is not theoretical but grounded in established method and accumulated precedent, making this type one of the most practically reliable. Ne lives in the Anima — creative possibility and divergent thinking emerge most freely in relaxed or playful states, and this type is often more imaginative than their systematic exterior suggests. Fi shadows from below, a private emotional world and a personal moral standard that rarely surfaces directly but strongly influences what the type is willing to do. This is a type of methodical competence and hidden depth — reliable, structured, and quietly principled.`,

  "Terra Caerulea":  `The Terra Caerulea psyche leads with Si — a vast interior archive of personal experience, pattern, and procedure that gives this type an extraordinary sense of what is reliable, familiar, and sound. Te provides the Persona: the accumulated store of experience is organised and applied with structural rigour, making this type precise as well as experienced. Fi occupies the Anima — personal values and emotional depth are available but not primary, emerging most clearly in close relationships and moments of personal significance. Ne shadows from the unconscious: the unfamiliar, the speculative, and the radically new are the least comfortable territory, and this type may find unexpected inspiration in creative or exploratory states that bypass their habitual caution. This is a type of grounded authority — experienced, structured, and privately feeling.`,

  "Aqua Rubea":      `The Aqua Rubea psyche leads with Ne — a reaching, associative intelligence that finds meaning in the space between ideas and people. Ti provides the Persona: the outward generativity is shaped by a precise interior logic, and this type can be surprisingly systematic beneath its exploratory surface. Fe occupies the Anima — warmth and emotional attunement are available and deeply felt, but typically arrive in response to meaning rather than as a primary mode of engagement. Si shadows from below, a deep store of personal precedent that can surface as unexpected attachment to the familiar or a recurring sense that something established and solid is missing. This is a type of analytical imagination — proliferating, precise, and more emotionally alive than it may initially appear.`,

  "Aqua Nigra":      `The Aqua Nigra psyche leads with Ti — a drive toward internal coherence, precise analysis, and the construction of frameworks that make genuine sense. Ne sits as the Persona: the logical mind reaches outward into possibility, and this type explores ideas with the restless curiosity of a system that is never quite finished. Si lives in the Anima, providing a quiet counterweight of personal experience and the known — this type often returns, unexpectedly, to trusted precedents and familiar patterns. Fe shadows from the unconscious: collective warmth and social harmony are the territory this type is least at home in, and the emotional field of the group may be experienced as both compelling and elusive. This is a type of relentless interior intelligence, exploratory and precise, privately more affected by others than it shows.`,

  "Aqua Alba":       `The Aqua Alba psyche leads with Fe — the emotional field of others is primary, and this type moves through the world by creating the conditions for warmth, belonging, and shared meaning. Si provides the Persona: the relational intelligence is grounded in the familiar — trusted relationships, established rituals, accumulated care — rather than in novelty or abstraction. Ne lives in the Anima, a generative, associative energy that surfaces most freely in play, creativity, and conversation, and gives this type a warmth that surprises with its imaginative range. Ti shadows from below — internal analysis and logical precision are the least natural mode, and this type may find its most rigorous thinking arrives only after emotional engagement has opened the door. This is a type of grounded warmth and hidden creativity — loyal, attentive, and more alive to possibility than its reliability suggests.`,

  "Aqua Caerulea":   `The Aqua Caerulea psyche leads with Si — a deep, carefully maintained interior world built from personal experience, felt pattern, and lived history. Fe provides the Persona: the rich inward life expresses itself through relational sensitivity and warmth, making this type one of the most quietly attuned to the needs of those around them. Ti occupies the Anima — analytical precision and internal logical structure are available, emerging in moments of complexity or when feeling alone proves insufficient to navigate a situation. Ne shadows from the unconscious: the divergent, the speculative, and the untried are the least familiar territory, and this type may be unexpectedly energised — or quietly disoriented — by contact with open-ended possibility. This is a type of deep loyalty, felt intelligence, and a private interior life of surprising richness.`,
};

const TEMPERAMENT_DESC = {
  Rubeus:    { color:"#A33D33", name:"Red",   latin:"Temperamentum Rubeum",     desc:"The Ego is led by an Irrational-Extroverted function. This temperament is characterised by active engagement with the external world, responsiveness to immediate reality, and a natural heroism of doing and being." },
  Nigrus:    { color:"#5F616D", name:"Black", latin:"Temperamentum Nigrum",     desc:"The Ego is led by a Rational-Introverted function. This temperament is characterised by deep internal evaluation, principled self-reference, and a heroism rooted in integrity and inner coherence." },
  Albus:     { color:"#E3DBC9", name:"White", latin:"Temperamentum Album",      desc:"The Ego is led by a Rational-Extroverted function. This temperament is characterised by outward organisation and evaluation, structuring the world according to shared standards and social coordination." },
  Caeruleus: { color:"#3E6E98", name:"Blue",  latin:"Temperamentum Caeruleum", desc:"The Ego is led by an Irrational-Introverted function. This temperament is characterised by deep receptivity to inner impressions, accumulated pattern-recognition, and a heroism of vision and depth." },
};

// ─────────────────────────────────────────────────────────────
// SCORING
// ─────────────────────────────────────────────────────────────

// Section 1 & 2 answers: 0=StronglyA, 1=SomewhatA, 2=SomewhatB, 3=StronglyB
// "leans A" = answer is 0 or 1
// Sections 1 & 2: binary 0=A, 1=B
const leansA = v => v === 0;
const leansB = v => v === 1;

function scoreSubstance(answers) {
  // Each question's aAxis tells us which axis option "a" represents for THAT question —
  // this can flip between questions (see S1_AXIS_QUESTIONS comment), so we tally per
  // question rather than assuming a fixed a=X, b=Y mapping across the whole group.
  const s1aQs = S1_AXIS_QUESTIONS.filter(q => q.group==="S1a");
  let s1aA = 0, s1aB = 0; // s1aA = votes for SeNi, s1aB = votes for NeSi
  s1aQs.forEach(q => {
    const v = answers[q.id] ?? 3;
    const bAxis = q.aAxis === "SeNi" ? "NeSi" : "SeNi";
    if (leansA(v)) { if (q.aAxis === "SeNi") s1aA++; else s1aB++; }
    else if (leansB(v)) { if (bAxis === "SeNi") s1aA++; else s1aB++; }
  });

  const s1bQs = S1_AXIS_QUESTIONS.filter(q => q.group==="S1b");
  let s1bA = 0, s1bB = 0; // s1bA = votes for TeFi, s1bB = votes for FeTi
  s1bQs.forEach(q => {
    const v = answers[q.id] ?? 3;
    const bAxis = q.aAxis === "TeFi" ? "FeTi" : "TeFi";
    if (leansA(v)) { if (q.aAxis === "TeFi") s1bA++; else s1bB++; }
    else if (leansB(v)) { if (bAxis === "TeFi") s1bA++; else s1bB++; }
  });

  const SeNi = s1aA >= 3;  // Se/Ni axis dominant
  const NeSi = s1aB >= 3;  // Ne/Si axis dominant
  const TeFi = s1bA >= 3;  // Te/Fi axis dominant
  const FeTi = s1bB >= 3;  // Fe/Ti axis dominant

  // Resolve substance
  if (SeNi && TeFi) return "Ignis";  // Fire
  if (SeNi && FeTi) return "Aer";    // Air
  if (NeSi && TeFi) return "Terra";  // Earth
  if (NeSi && FeTi) return "Aqua";   // Water

  // Fallback: use strongest axis signals
  const axis1 = s1aA >= s1aB ? "SeNi" : "NeSi";
  const axis2 = s1bA >= s1bB ? "TeFi" : "FeTi";
  if (axis1==="SeNi" && axis2==="TeFi") return "Ignis";
  if (axis1==="SeNi" && axis2==="FeTi") return "Aer";
  if (axis1==="NeSi" && axis2==="TeFi") return "Terra";
  return "Aqua";
}

function scoreTemperament(answers) {
  const s2aKeys = S2_TEMP_QUESTIONS.filter(q => q.group==="S2a").map(q=>q.id);
  const s2bKeys = S2_TEMP_QUESTIONS.filter(q => q.group==="S2b").map(q=>q.id);

  // S2a: leans A = Extroverted, leans B = Introverted
  const extCount = s2aKeys.filter(id => leansA(answers[id] ?? 1)).length;
  const intCount = s2aKeys.filter(id => leansB(answers[id] ?? 1)).length;

  // S2b: leans A = Perceiving, leans B = Judging
  const perCount = s2bKeys.filter(id => leansA(answers[id] ?? 1)).length;
  const judCount = s2bKeys.filter(id => leansB(answers[id] ?? 1)).length;

  const isExt = extCount >= 3;
  const isInt = intCount >= 3;
  const isPer = perCount >= 3;
  const isJud = judCount >= 3;

  // Red: Extroverted + Perceiving
  if (isExt && isPer) return "Rubeus";
  // White: Extroverted + Judging
  if (isExt && isJud) return "Albus";
  // Black: Introverted + Perceiving
  if (isInt && isPer) return "Nigrus";
  // Blue: Introverted + Judging
  if (isInt && isJud) return "Caeruleus";

  // Fallback: dominant signals
  const ext = extCount >= intCount ? "Ext" : "Int";
  const rat = judCount >= perCount ? "Jud" : "Per";
  if (ext==="Ext" && rat==="Per") return "Rubeus";
  if (ext==="Ext" && rat==="Jud") return "Albus";
  if (ext==="Int" && rat==="Per") return "Nigrus";
  return "Caeruleus";
}

function determineType(answers) {
  const substance    = scoreSubstance(answers);
  const temperament  = scoreTemperament(answers);
  const substanceMap = { Ignis:"Ignis", Aer:"Aer", Terra:"Terra", Aqua:"Aqua" };
  // Find the type matching both substance and temperament
  for (const [name, t] of Object.entries(ALL_TYPES)) {
    if (t.substance === substanceMap[substance] && t.temperament === temperament) return name;
  }
  return "Aqua Caerulea"; // safe fallback
}

// Section 3 scoring: 4-point scale (0=StronglyA, 1=SomewhatA, 2=SomewhatB, 3=StronglyB)
// "strong pref" = 0 or 3; "weak/no pref" = 1 or 2
const PROCESS_DATA = {
  Eudemonic:  {
    alchemical:"rubedo · iosis",
    color:"#C8A84B",
    summary:"You are someone who has found, at least in the present moment, a working relationship with yourself. The dominant mode through which you meet the world is sufficiently developed that it feels like ground rather than struggle — and the function that supports it has begun to do its work. This does not mean you are finished, or without conflict; it means your centre holds. You can act from somewhere. The deeper layers of the psyche — the figures you have not yet fully faced — are present but not yet demanding. You are, in the language of the alchemists, in the reddening: something has come to maturity, and the work now is to live from it fully rather than to secure it anxiously.",
    culmination:"Stage 5: Self-actualisation — all four layers integrated",
    shadow:"The temptation of this stage is to assume the work is done. The integrated psyche is not an endpoint but a beginning — the Umbra, though quiet, is never absent.",
  },
  Elliptic:   {
    alchemical:"citrinitas · xanthosis",
    color:"#D4C9B0",
    summary:"You are someone who knows what you are, or what you are becoming — but the wider life that knowledge implies has not yet opened. The core of who you are may be clear to you; the rest remains undifferentiated, held in reserve. This is not a failure of development but a particular stance toward it: cautious, careful, unwilling to claim more than has been truly earned. You may be at a threshold — a period between one way of being and another, where the old has been outgrown but the new has not yet taken shape. The yellowing is a transitional light: something is being clarified, but the full colour has not arrived.",
    culmination:"Stage 5: Persona-actualisation with Anima & Umbra developing in parallel",
    shadow:"The risk of this stage is indefinite deferral — remaining at the threshold so long that caution becomes the whole of life. The next layer is not a threat; it is the continuation of what has already begun.",
  },
  Hyperbolic: {
    alchemical:"albedo · leucosis",
    color:"#8AA8B8",
    summary:"You are someone in the grip of a strong current — pulled consistently in one direction, toward one mode of being, at the expense of its complement. This is a recognisable human condition: a life organised around what comes naturally, while what does not come naturally is kept at a distance. The whitening is an image of this: brightness without shadow, clarity without depth, or depth without clarity. Something in you is not yet in dialogue with its other half. This is creative tension — not dysfunction — but it tends to produce a particular kind of restlessness, a sense that something is missing whose name you may not have found.",
    culmination:"Stage 5: Anima-substitution — the semiconscious layer leading before the conscious one is settled",
    shadow:"The risk is that one side of the psyche speaks so loudly that the other goes unheard until it surfaces in a form that is harder to integrate — through projection, through a relationship that seems to carry what you cannot, through a crisis that turns out to be an invitation.",
  },
  Psychotic:  {
    alchemical:"nigredo · melanosis",
    color:"#6A3A7A",
    summary:"You are someone in a genuine state of flux — or at odds with the structure the psyche would naturally assume. This may mean you are in transition: between identities, between chapters, between one understanding of yourself and another that has not yet arrived. It may mean that the expected hierarchy of your inner life has been disrupted — by circumstance, by suffering, by a refusal to settle into what was assumed. The blackening is the alchemists' image for dissolution: what was solid has become uncertain. This is the most demanding of the processes, but it is not without its own gravity. Those who have passed through it tend to know something the others do not.",
    culmination:"Stage 5: Umbra-substitution — the unconscious layer demanding recognition",
    shadow:"The risk is not disintegration but mistaking dissolution for arrival — treating the state of flux as though it were freedom, when it may be the beginning of a harder and more necessary work.",
  },
};


function determineProcess(answers) {
  const typeName = determineType(answers);
  const t = ALL_TYPES[typeName];
  const stack = [t.ego, t.persona, t.anima, t.umbra]; // [dominant, auxiliary, tertiary, shadow]

  // Map each S3 question to what A and B represent — now 12 groups. The last 4
  // (SeVsNi, NeVsSi, FiVsTe, TiVsFe) complete every pairwise matchup within the
  // perceiving functions {Se,Si,Ne,Ni} and within the judging functions {Te,Ti,Fe,Fi} —
  // each function now faces all 3 of its domain-mates once, a full round robin.
  const groupMap = {
    SeVsSi: ["Se","Si"], NeVsNi: ["Ne","Ni"], TeVsTi: ["Te","Ti"], FeVsFi: ["Fe","Fi"],
    SeVsNe: ["Se","Ne"], SiVsNi: ["Si","Ni"], TeVsFe: ["Te","Fe"], TiVsFi: ["Ti","Fi"],
    SeVsNi: ["Se","Ni"], NeVsSi: ["Ne","Si"], FiVsTe: ["Fi","Te"], TiVsFe: ["Ti","Fe"],
  };

  // Group-vote scoring: each of the 12 groups (3 questions each) casts a single verdict.
  // Strongly = 1 full vote, Somewhat = 0.5 vote, summed across the group's 3 questions
  // (range -3..+3, negative leaning toward fnB). A side only WINS the group if it clears
  // a margin of 2.0 — roughly two Strongly answers' worth of conviction — otherwise the
  // group is a genuine SPLIT (no winner). This means three mild "Somewhat" leans no
  // longer masquerade as a hard preference the way raw majority-of-3 voting would.
  const VOTE = { 0: 1, 1: 0.5, 2: -0.5, 3: -1 };
  const WIN_THRESHOLD = 2.0;
  const groupWinner = {};
  Object.entries(groupMap).forEach(([group, [fnA, fnB]]) => {
    const ids = S3_PROCESS_QUESTIONS.filter(q => q.group === group).map(q => q.id);
    const sum = ids.reduce((acc, id) => acc + (VOTE[answers[id]] ?? 0), 0);
    if (sum >= WIN_THRESHOLD) groupWinner[group] = fnA;
    else if (sum <= -WIN_THRESHOLD) groupWinner[group] = fnB;
    else groupWinner[group] = null; // split — nobody wins this group
  });

  // Each function now belongs to exactly 3 groups — a full round robin against every
  // other function in its domain (perceiving or judging). Ego always faces Umbra
  // directly, and Persona always faces Anima directly, in exactly one of the 4 new
  // groups — verified structurally across all 16 types.
  const funcGroups = {
    Se: ["SeVsSi","SeVsNe","SeVsNi"], Si: ["SeVsSi","SiVsNi","NeVsSi"],
    Ne: ["NeVsNi","SeVsNe","NeVsSi"], Ni: ["NeVsNi","SiVsNi","SeVsNi"],
    Te: ["TeVsTi","TeVsFe","FiVsTe"], Ti: ["TeVsTi","TiVsFi","TiVsFe"],
    Fe: ["FeVsFi","TeVsFe","TiVsFe"], Fi: ["FeVsFi","TiVsFi","FiVsTe"],
  };
  const groupWins = fn => funcGroups[fn].filter(g => groupWinner[g] === fn).length;

  // Strong = wins at least 2 of its 3 round-robin matchups. Weak = wins none.
  // With a full round robin, multiple rivals CAN be simultaneously strong (e.g. Se and
  // Ne can each win 2 of 3 despite sharing one matchup) — this single definition now
  // works for every process, including Hyperbolic, without needing a separate loosened
  // threshold the way the old 2-groups-per-function model did.
  const isStrongStrict = fn => groupWins(fn) >= 2;
  const isWeakStrict   = fn => groupWins(fn) === 0;

  const [egoFn, personaFn, animaFn, umbraFn] = stack;

  // Psychotic: inconsistent pattern OR consistent preference for non-stack functions
  const allFns = ["Se","Si","Ne","Ni","Te","Ti","Fe","Fi"];
  const nonStack = allFns.filter(fn => !stack.includes(fn));
  const nonStackStrong = nonStack.filter(isStrongStrict);

  // High variance across S3 answers = inconsistency
  const s3Vals = S3_PROCESS_QUESTIONS.map(q => answers[q.id] ?? 1.5);
  const s3Mean = s3Vals.reduce((a,b)=>a+b,0)/s3Vals.length;
  const s3Var  = s3Vals.reduce((a,b)=>a+(b-s3Mean)**2,0)/s3Vals.length;
  const inconsistent = s3Var > 1.5;

  if (nonStackStrong.length >= 2 || (inconsistent && nonStackStrong.length >= 1)) return "Psychotic";

  // Hyperbolic: strong consistent preference for extroverted (Red/White) or introverted (Blue/Black)
  // functions, crowding out the expected introverted/extroverted balance
  const temperament = scoreTemperament(answers);
  const extFns = ["Se","Ne","Te","Fe"];
  const intFns = ["Si","Ni","Ti","Fi"];
  const extStrong = extFns.filter(isStrongStrict).length;
  const intStrong = intFns.filter(isStrongStrict).length;

  const isExtTemp = temperament==="Rubeus" || temperament==="Albus";
  const isIntTemp = temperament==="Nigrus" || temperament==="Caeruleus";

  const hyperbolic =
    (isExtTemp && extStrong >= 3 && intStrong === 0) ||
    (isIntTemp && intStrong >= 3 && extStrong === 0) ||
    (isExtTemp && intStrong >= 3 && extStrong === 0) ||
    (isIntTemp && extStrong >= 3 && intStrong === 0);

  if (hyperbolic) return "Hyperbolic";

  // Eudemonic: strong preference for ego + persona, weak/no for anima + umbra
  if (isStrongStrict(egoFn) && isStrongStrict(personaFn) && isWeakStrict(animaFn) && isWeakStrict(umbraFn)) return "Eudemonic";

  // Elliptic: strong for ego only, weak everywhere else
  // OR weak/no preference for all functions
  const allWeak = isWeakStrict(egoFn) && isWeakStrict(personaFn) && isWeakStrict(animaFn) && isWeakStrict(umbraFn);
  if ((isStrongStrict(egoFn) && isWeakStrict(personaFn) && isWeakStrict(animaFn)) || allWeak) return "Elliptic";

  // Default to Eudemonic if pattern partially matches but doesn't fit others
  return "Eudemonic";
}

// ─────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────

function AlchemySymbol({ substance, progress, color }) {
  const r=38, cx=60, cy=60;
  const angle = progress * Math.PI * 2;
  const x = cx + r*Math.sin(angle);
  const y = cy - r*Math.cos(angle);
  const large = angle > Math.PI ? 1 : 0;
  const c = color||"#C8A84B";
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={{filter:"drop-shadow(0 0 12px "+c+"55)"}}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2A2A3A" strokeWidth="2"/>
      {progress>0 && <path d={`M ${cx} ${cy-r} A ${r} ${r} 0 ${large} 1 ${x} ${y}`} fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"/>}
      <circle cx={cx} cy={cy} r="5" fill={c}/>
      {substance==="Ignis" && <path d="M60,30 L52,50 L60,44 L68,50 Z" fill={c} opacity="0.7"/>}
      {substance==="Aer"   && <path d="M42,50 Q60,30 78,50 Q60,42 42,50Z" fill={c} opacity="0.7"/>}
      {substance==="Terra" && <path d="M44,68 L60,44 L76,68 Z" fill={c} opacity="0.7"/>}
      {substance==="Aqua"  && <path d="M60,76 Q44,56 60,44 Q76,56 60,76Z" fill={c} opacity="0.7"/>}
      {!substance && <circle cx={cx} cy={cy} r="14" fill="none" stroke="#3A3A4A" strokeWidth="1.5" strokeDasharray="4 3"/>}
    </svg>
  );
}

// Binary scale for Sections 1 & 2 (no Neither — 4 options only)
function BinaryScale({ value, onChange, color, labelA, labelB }) {
  return (
    <div style={{display:"flex",gap:12}}>
      <button onClick={()=>onChange(0)} style={{
        flex:1,padding:"16px 12px",borderRadius:10,
        border:`1px solid ${value===0 ? color : "#2A2A3A"}`,
        background: value===0 ? color+"22" : "#0A0A14",
        cursor:"pointer",transition:"all 0.18s",textAlign:"left",
      }}>
        <div style={{color:value===0?color:"#4A4A5A",fontSize:"10px",letterSpacing:"2px",fontFamily:"Inter,sans-serif",textTransform:"uppercase",marginBottom:6,transition:"color 0.18s"}}>A</div>
        <div style={{color:value===0?"#E8DFC8":"#5A5A6A",fontSize:"13px",fontFamily:"Inter,sans-serif",lineHeight:1.55,transition:"color 0.18s"}}>{labelA}</div>
      </button>
      <button onClick={()=>onChange(1)} style={{
        flex:1,padding:"16px 12px",borderRadius:10,
        border:`1px solid ${value===1 ? color : "#2A2A3A"}`,
        background: value===1 ? color+"22" : "#0A0A14",
        cursor:"pointer",transition:"all 0.18s",textAlign:"left",
      }}>
        <div style={{color:value===1?color:"#4A4A5A",fontSize:"10px",letterSpacing:"2px",fontFamily:"Inter,sans-serif",textTransform:"uppercase",marginBottom:6,transition:"color 0.18s"}}>B</div>
        <div style={{color:value===1?"#E8DFC8":"#5A5A6A",fontSize:"13px",fontFamily:"Inter,sans-serif",lineHeight:1.55,transition:"color 0.18s"}}>{labelB}</div>
      </button>
    </div>
  );
}

// 4-point scale for Section 3 (same 4 options, with pole cards)
function ProcessScale({ value, onChange, color, labelA, labelB }) {
  const opts = [
    { val:0, main:"Strongly", sub:"A" },
    { val:1, main:"Somewhat", sub:"A" },
    { val:2, main:"Somewhat", sub:"B" },
    { val:3, main:"Strongly", sub:"B" },
  ];
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {opts.map(o => {
          const sel = value === o.val;
          return (
            <button key={o.val} onClick={()=>onChange(o.val)} style={{
              flex:1,padding:"10px 4px",borderRadius:8,
              border:`1px solid ${sel ? color : "#2A2A3A"}`,
              background: sel ? color+"22" : "#0A0A14",
              cursor:"pointer",transition:"all 0.18s",textAlign:"center",
            }}>
              <div style={{color: sel ? color : "#5A5A6A",fontSize:"10px",letterSpacing:"1px",fontFamily:"Inter,sans-serif",textTransform:"uppercase",transition:"color 0.18s"}}>{o.main}</div>
              <div style={{color: sel ? "#E8DFC8" : "#3A3A4A",fontSize:"16px",fontFamily:"'Playfair Display',serif",marginTop:"2px",transition:"color 0.18s"}}>{o.sub}</div>
            </button>
          );
        })}
      </div>
      <div style={{display:"flex",gap:12,marginTop:4}}>
        <div style={{flex:1,padding:"10px 12px",borderRadius:8,border:`1px solid ${(value===0||value===1)?color+"66":"#1A1A2A"}`,background:(value===0||value===1)?color+"11":"transparent",transition:"all 0.18s"}}>
          <div style={{color:(value===0||value===1)?"#E8DFC8":"#4A4A5A",fontSize:"12px",fontFamily:"Inter,sans-serif",lineHeight:1.5,transition:"color 0.18s"}}>{labelA}</div>
        </div>
        <div style={{flex:1,padding:"10px 12px",borderRadius:8,border:`1px solid ${(value===2||value===3)?color+"66":"#1A1A2A"}`,background:(value===2||value===3)?color+"11":"transparent",transition:"all 0.18s"}}>
          <div style={{color:(value===2||value===3)?"#E8DFC8":"#4A4A5A",fontSize:"12px",fontFamily:"Inter,sans-serif",lineHeight:1.5,transition:"color 0.18s"}}>{labelB}</div>
        </div>
      </div>
    </div>
  );
}

function NJTASection({title,children}) {
  return (
    <div style={{marginBottom:"24px"}}>
      <div style={{color:"#6A6A8A",fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"14px",paddingBottom:"8px",borderBottom:"1px solid #2A2A3A"}}>{title}</div>
      {children}
    </div>
  );
}

function ResultCard({ typeName, process }) {
  const t = ALL_TYPES[typeName];
  const sub = SUBSTANCE_DESC[t.substance];
  const temp = TEMPERAMENT_DESC[t.temperament];
  const proc = PROCESS_DATA[process];
  const [tab, setTab] = useState("overview");

  const FUNC_LABELS = {
    Se:"Sensing-Extroverted", Si:"Sensing-Introverted",
    Ne:"Intuiting-Extroverted", Ni:"Intuiting-Introverted",
    Te:"Thinking-Extroverted", Ti:"Thinking-Introverted",
    Fe:"Feeling-Extroverted",  Fi:"Feeling-Introverted",
  };

  return (
    <div style={{background:"linear-gradient(160deg,#0F0F1E 0%,#1A1428 100%)",border:"1px solid "+t.color+"55",borderRadius:"16px",overflow:"hidden",boxShadow:"0 0 60px "+t.color+"22, 0 8px 32px #00000080",maxWidth:"680px",margin:"0 auto",fontFamily:"'Playfair Display',Georgia,serif"}}>
      <div className="njta-header" style={{background:"linear-gradient(135deg,"+t.color+"33 0%,transparent 100%)",padding:"36px 32px 28px",borderBottom:"1px solid "+t.color+"33",textAlign:"center"}}>
        <div style={{fontSize:"48px",marginBottom:"8px"}}>{sub.symbol}</div>
        <div style={{color:readableAccent(t.color),fontSize:"11px",letterSpacing:"4px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"8px",opacity:0.8}}>New Jungian Typological Assessment</div>
        <div className="njta-typename" style={{color:"#E8DFC8",fontSize:"36px",fontWeight:"700",letterSpacing:"1px",marginBottom:"4px",lineHeight:1.1}}>{typeName}</div>
        <div style={{color:readableAccent(t.color),fontSize:"13px",opacity:0.7,fontFamily:"Inter,sans-serif",fontStyle:"italic",marginBottom:"12px"}}>{sub.latin} · {temp.latin}</div>
        <div style={{display:"inline-block",padding:"6px 16px",borderRadius:"20px",background:proc.color+"22",border:"1px solid "+proc.color+"55",color:proc.color,fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"Inter,sans-serif"}}>
          {process} Process · {proc.alchemical}
        </div>
      </div>
      <div className="njta-tabs" style={{display:"flex",borderBottom:"1px solid #2A2A3A",fontFamily:"Inter,sans-serif"}}>
        {["overview","structure","process"].map(tb=>(
          <button key={tb} onClick={()=>setTab(tb)} style={{flex:1,padding:"12px 8px",background:tab===tb?t.color+"22":"transparent",border:"none",borderBottom:tab===tb?"2px solid "+t.color:"2px solid transparent",color:tab===tb?t.color:"#6A6A7A",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s"}}>{tb}</button>
        ))}
      </div>
      <div className="njta-body" style={{padding:"28px 32px 32px"}}>
        {tab==="overview" && (
          <div>
            <NJTASection title="Psychical Portrait">
              <div style={{color:"#B0A898",fontSize:"14px",lineHeight:"1.85",fontFamily:"Inter,sans-serif",fontStyle:"italic",borderLeft:"2px solid "+t.color+"44",paddingLeft:"16px"}}>
                {TYPE_DESC[typeName]}
              </div>
            </NJTASection>
            <NJTASection title="Psychical Substance">
              <div style={{display:"flex",gap:"16px",alignItems:"flex-start"}}>
                <div style={{minWidth:"56px",height:"56px",borderRadius:"50%",background:t.color+"22",border:"1px solid "+t.color+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",flexShrink:0}}>{sub.symbol}</div>
                <div>
                  <div style={{color:readableAccent(t.color),fontSize:"16px",marginBottom:"8px"}}>{sub.latin} — {sub.name}</div>
                  {sub.desc.split("\n\n").map((para, i) => (
                    <p key={i} style={{color:"#B0A898",fontSize:"13px",lineHeight:"1.75",fontFamily:"Inter,sans-serif",marginBottom: i < sub.desc.split("\n\n").length - 1 ? "12px" : 0}}>{para}</p>
                  ))}
                </div>
              </div>
            </NJTASection>
            <NJTASection title="Temperament">
              <div style={{display:"flex",gap:"16px",alignItems:"flex-start"}}>
                <div style={{minWidth:"56px",height:"56px",borderRadius:"4px",background:temp.color+"55",border:"1px solid "+t.color+"44",display:"flex",alignItems:"center",justifyContent:"center",color:readableAccent(t.color),fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"1px",textAlign:"center",lineHeight:1.3,padding:"4px",flexShrink:0}}>{temp.name}</div>
                <div>
                  <div style={{color:readableAccent(t.color),fontSize:"16px",marginBottom:"6px"}}>{temp.latin}</div>
                  <div style={{color:"#B0A898",fontSize:"13px",lineHeight:"1.75",fontFamily:"Inter,sans-serif"}}>{temp.desc}</div>
                </div>
              </div>
            </NJTASection>
          </div>
        )}
        {tab==="structure" && (
          <div>
            <div style={{color:"#6A6A8A",fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"20px"}}>Functional Archetype Stack</div>
            {[
              {role:"Ego",    key:t.ego,    desc:"The definitive hero / protagonist — conscious",        opacity:1,   border:t.color},
              {role:"Persona",key:t.persona,desc:"The supportive mentor / friend — conscious",           opacity:0.85,border:t.color+"BB"},
              {role:"Anima",  key:t.anima,  desc:"The seductive lover / contrasexual — semiconscious",  opacity:0.65,border:t.color+"77"},
              {role:"Umbra",  key:t.umbra,  desc:"The elusive villain / antagonist — unconscious",      opacity:0.45,border:t.color+"44"},
            ].map((row,i)=>(
              <div key={row.role} style={{display:"flex",alignItems:"center",gap:"16px",padding:"14px 16px",marginBottom:"10px",borderRadius:"8px",background:"#0D0D1E",border:"1px solid "+row.border,opacity:row.opacity}}>
                <div style={{minWidth:"36px",height:"36px",borderRadius:"50%",background:t.color+"18",border:"1px solid "+row.border,display:"flex",alignItems:"center",justifyContent:"center",color:readableAccent(t.color),fontSize:"11px",fontFamily:"Inter,sans-serif",fontWeight:"600"}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:"12px",alignItems:"baseline",marginBottom:"3px"}}>
                    <span style={{color:readableAccent(t.color),fontSize:"13px",letterSpacing:"1px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",fontWeight:"600"}}>{row.role}</span>
                    <span style={{color:"#E8DFC8",fontSize:"16px"}}>{FUNC_LABELS[row.key]}</span>
                  </div>
                  <div style={{color:"#6A6A8A",fontSize:"12px",fontFamily:"Inter,sans-serif",fontStyle:"italic"}}>{row.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="process" && (
          <div>
            <div style={{color:"#6A6A8A",fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"20px"}}>Your Psychical Process</div>
            <div style={{padding:"20px 24px",marginBottom:"20px",borderRadius:"10px",background:"linear-gradient(135deg,"+proc.color+"18 0%,transparent 100%)",border:"1px solid "+proc.color+"44"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                <div style={{color:proc.color,fontSize:"24px",fontWeight:"700"}}>{process}</div>
                <div style={{color:proc.color+"88",fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"2px",textTransform:"uppercase",fontStyle:"italic"}}>{proc.alchemical}</div>
              </div>
              <div style={{color:"#B0A898",fontSize:"14px",lineHeight:"1.75",fontFamily:"Inter,sans-serif"}}>{proc.summary}</div>
            </div>
            <NJTASection title="Culmination">
              <div style={{color:"#B0A898",fontSize:"13px",fontFamily:"Inter,sans-serif",lineHeight:"1.7",borderLeft:"2px solid "+proc.color+"55",paddingLeft:"14px",fontStyle:"italic"}}>{proc.culmination}</div>
            </NJTASection>
            <NJTASection title="Shadow Risk">
              <div style={{color:"#8A7A7A",fontSize:"13px",fontFamily:"Inter,sans-serif",lineHeight:"1.7"}}>{proc.shadow}</div>
            </NJTASection>
            <div style={{color:"#3A3A4A",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"12px",marginTop:"8px"}}>The Four Paths</div>
            {["Eudemonic","Elliptic","Hyperbolic","Psychotic"].map(p=>(
              <div key={p} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",borderRadius:"6px",marginBottom:"6px",background: p===process ? PROCESS_DATA[p].color+"18" : "transparent",border:"1px solid "+ (p===process ? PROCESS_DATA[p].color+"55" : "#1E1E2A"),opacity: p===process ? 1 : 0.4}}>
                <span style={{color: p===process ? PROCESS_DATA[p].color : "#5A5A6A",fontSize:"14px",fontFamily:"'Playfair Display',serif"}}>{p}</span>
                <span style={{color:"#3A3A4A",fontSize:"10px",fontFamily:"Inter,sans-serif",letterSpacing:"1px",textTransform:"uppercase"}}>{PROCESS_DATA[p].alchemical}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// General (type-independent) explanation of the four-layer functional archetype stack —
// used on the Structures tab of the post-result System Guide, as distinct from the
// per-type "structure" tab in ResultCard which shows a specific individual's layering.
const STRUCTURE_LAYERS = [
  {
    role: "Ego", subtitle: "Dominant function — conscious",
    archetype: "The definitive hero / protagonist",
    desc: "The Ego is the function you inhabit most fully and identify with most readily — the mode of engaging the world you'd reach for first, without deliberation, and the one that feels most like \"you.\" It is exercised confidently, continuously, and in full view of both yourself and others. Where the Ego leads, there is very little internal negotiation: this is simply how you meet reality.",
  },
  {
    role: "Persona", subtitle: "Auxiliary function — conscious",
    archetype: "The supportive mentor / trusted companion",
    desc: "The Persona is the second function you can access with real fluency — still conscious, still reliable, but in service of the Ego rather than sovereign in its own right. It rounds out the Ego's blind spots, supplies balance (an outward function to an inward Ego, or vice versa), and tends to be the mode you present outward when the Ego alone would be too narrow for the situation at hand.",
  },
  {
    role: "Anima", subtitle: "Tertiary function — semiconscious",
    archetype: "The seductive lover / contrasexual figure",
    desc: "The Anima sits at the threshold of awareness — available, but not owned the way the Ego and Persona are. It tends to surface under particular conditions: stress, relaxation, attraction, or moments when the Ego's usual approach has stopped working. Jung's term is deliberately erotic: this function is often experienced as alluring precisely because it is undeveloped — it promises a mode of being you don't yet trust yourself to inhabit.",
  },
  {
    role: "Umbra", subtitle: "Inferior function — unconscious",
    archetype: "The elusive villain / antagonist",
    desc: "The Umbra is the function furthest from conscious control — the one you're least practiced in, most likely to disown, and most likely to project onto others (\"why is everyone around me so obsessed with X\" is often the Umbra speaking through someone else). It is not absent, only unintegrated. Jung considered engagement with this layer — not its elimination, but its conscious relationship — the central work of individuation.",
  },
];

const STRUCTURE_INTRO = `Substance tells you which four functions you carry. Temperament tells you which one leads. Structure is the layer beneath both: the four-tier hierarchy of accessibility that determines how available each function actually is to you in practice, independent of which specific functions occupy which tier.

Every psyche, in this system, organises its four functions into the same four roles — Ego, Persona, Anima, Umbra — running from fully conscious to fully unconscious. The Process section of the assessment (Section III) is precisely a measurement of this structure: it asks how strongly each of your four tiers is actually showing up, and from that pattern derives one of four Processes — Eudemonic, Elliptic, Hyperbolic, or Psychotic — describing the shape your structure currently takes.`;

function SystemGuide({ onBack, initialTab }) {
  const [guideTab, setGuideTab] = useState(initialTab || "substances");
  const [expandedType, setExpandedType] = useState(null);
  const GUIDE_TABS = [
    { id:"substances",   label:"Substances" },
    { id:"temperaments", label:"Temperaments" },
    { id:"types",        label:"Types" },
    { id:"structures",   label:"Structures" },
    { id:"processes",    label:"Processes" },
  ];

  return (
    <div style={{maxWidth:"720px",margin:"0 auto",animation:"fadeIn 0.4s ease"}}>
      <div style={{textAlign:"center",marginBottom:"20px"}}>
        <div style={{color:"#C8A84B",fontSize:"11px",letterSpacing:"4px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",opacity:0.7,marginBottom:"6px"}}>NJTA System Guide</div>
        <h2 style={{fontSize:"24px",fontWeight:"700",margin:0}}>Understanding the Full System</h2>
      </div>

      <div style={{display:"flex",flexWrap:"wrap",gap:"6px",justifyContent:"center",marginBottom:"24px",fontFamily:"Inter,sans-serif"}}>
        {GUIDE_TABS.map(gt => (
          <button key={gt.id} onClick={()=>{setGuideTab(gt.id); setExpandedType(null);}} style={{padding:"9px 16px",borderRadius:"20px",background:guideTab===gt.id?"#C8A84B22":"transparent",border:"1px solid "+(guideTab===gt.id?"#C8A84B":"#2A2A3A"),color:guideTab===gt.id?"#C8A84B":"#7A7A8A",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",cursor:"pointer"}}>{gt.label}</button>
        ))}
      </div>

      <div style={{background:"#0F0F1E",border:"1px solid #2A2A3A",borderRadius:"14px",padding:"28px 26px"}}>

        {guideTab==="substances" && Object.entries(SUBSTANCE_DESC).map(([key, sub]) => (
          <div key={key} style={{marginBottom:"26px",paddingBottom:"26px",borderBottom:"1px solid #1E1E2E"}}>
            <div style={{display:"flex",gap:"14px",alignItems:"center",marginBottom:"12px"}}>
              <div style={{minWidth:"48px",height:"48px",borderRadius:"50%",background:"#C8A84B18",border:"1px solid #C8A84B44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px"}}>{sub.symbol}</div>
              <div>
                <div style={{color:"#C8A84B",fontSize:"18px"}}>{key} <span style={{color:"#6A6A8A",fontSize:"13px",fontStyle:"italic"}}>— {sub.name}</span></div>
                <div style={{color:"#5A5A6A",fontSize:"11px",fontFamily:"Inter,sans-serif",fontStyle:"italic"}}>{sub.latin}</div>
              </div>
            </div>
            {sub.desc.split("\n\n").map((para,i)=>(
              <p key={i} style={{color:"#B0A898",fontSize:"14px",lineHeight:"1.8",fontFamily:"Inter,sans-serif",marginBottom:"10px"}}>{para}</p>
            ))}
          </div>
        ))}

        {guideTab==="temperaments" && Object.entries(TEMPERAMENT_DESC).map(([key, temp]) => (
          <div key={key} style={{marginBottom:"22px",paddingBottom:"22px",borderBottom:"1px solid #1E1E2E"}}>
            <div style={{display:"flex",gap:"14px",alignItems:"center",marginBottom:"10px"}}>
              <div style={{minWidth:"40px",height:"40px",borderRadius:"4px",background:temp.color+"55",border:"1px solid "+temp.color,flexShrink:0}} />
              <div>
                <div style={{color:"#E8DFC8",fontSize:"17px"}}>{key} <span style={{color:"#6A6A8A",fontSize:"13px",fontStyle:"italic"}}>— {temp.name}</span></div>
                <div style={{color:"#5A5A6A",fontSize:"11px",fontFamily:"Inter,sans-serif",fontStyle:"italic"}}>{temp.latin}</div>
              </div>
            </div>
            <p style={{color:"#B0A898",fontSize:"14px",lineHeight:"1.8",fontFamily:"Inter,sans-serif"}}>{temp.desc}</p>
          </div>
        ))}

        {guideTab==="types" && (
          <div>
            <p style={{color:"#8A8A9A",fontSize:"13px",fontFamily:"Inter,sans-serif",lineHeight:"1.7",marginBottom:"20px",fontStyle:"italic"}}>Each of the 16 types is a Substance (which four functions) combined with a Temperament (which one leads). Tap a type to read its full portrait.</p>
            {Object.keys(ALL_TYPES).map(typeName => {
              const t = ALL_TYPES[typeName];
              const isOpen = expandedType === typeName;
              return (
                <div key={typeName} style={{marginBottom:"8px",borderRadius:"8px",border:"1px solid "+(isOpen?t.color+"66":"#2A2A3A"),overflow:"hidden"}}>
                  <button onClick={()=>setExpandedType(isOpen?null:typeName)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",background:isOpen?t.color+"14":"#0D0D1E",border:"none",cursor:"pointer",textAlign:"left"}}>
                    <span style={{color:readableAccent(t.color),fontSize:"15px"}}>{typeName}</span>
                    <span style={{color:"#5A5A6A",fontSize:"11px",fontFamily:"Inter,sans-serif"}}>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div style={{padding:"4px 16px 16px"}}>
                      <p style={{color:"#B0A898",fontSize:"13px",lineHeight:"1.8",fontFamily:"Inter,sans-serif",fontStyle:"italic"}}>{TYPE_DESC[typeName]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {guideTab==="structures" && (
          <div>
            {STRUCTURE_INTRO.split("\n\n").map((para,i)=>(
              <p key={i} style={{color:"#B0A898",fontSize:"14px",lineHeight:"1.8",fontFamily:"Inter,sans-serif",marginBottom:"18px"}}>{para}</p>
            ))}
            {STRUCTURE_LAYERS.map((layer,i) => (
              <div key={layer.role} style={{display:"flex",gap:"16px",padding:"16px",marginBottom:"10px",borderRadius:"8px",background:"#0D0D1E",border:"1px solid #2A2A3A",opacity:1 - i*0.12}}>
                <div style={{minWidth:"36px",height:"36px",borderRadius:"50%",background:"#C8A84B18",border:"1px solid #C8A84B44",display:"flex",alignItems:"center",justifyContent:"center",color:"#C8A84B",fontSize:"11px",fontFamily:"Inter,sans-serif",fontWeight:"600",flexShrink:0}}>{i+1}</div>
                <div>
                  <div style={{display:"flex",gap:"10px",alignItems:"baseline",marginBottom:"4px",flexWrap:"wrap"}}>
                    <span style={{color:"#C8A84B",fontSize:"14px",letterSpacing:"1px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",fontWeight:"600"}}>{layer.role}</span>
                    <span style={{color:"#5A5A6A",fontSize:"11px",fontFamily:"Inter,sans-serif",fontStyle:"italic"}}>{layer.subtitle}</span>
                  </div>
                  <div style={{color:"#8A8A9A",fontSize:"12px",fontFamily:"Inter,sans-serif",fontStyle:"italic",marginBottom:"8px"}}>{layer.archetype}</div>
                  <p style={{color:"#B0A898",fontSize:"13px",lineHeight:"1.75",fontFamily:"Inter,sans-serif"}}>{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {guideTab==="processes" && ["Eudemonic","Elliptic","Hyperbolic","Psychotic"].map(p => {
          const proc = PROCESS_DATA[p];
          return (
            <div key={p} style={{marginBottom:"22px",paddingBottom:"22px",borderBottom:"1px solid #1E1E2E"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"10px"}}>
                <div style={{color:proc.color,fontSize:"19px",fontWeight:"700"}}>{p}</div>
                <div style={{color:proc.color+"99",fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"1px",textTransform:"uppercase",fontStyle:"italic"}}>{proc.alchemical}</div>
              </div>
              <p style={{color:"#B0A898",fontSize:"14px",lineHeight:"1.8",fontFamily:"Inter,sans-serif",marginBottom:"12px"}}>{proc.summary}</p>
              <div style={{color:"#6A6A8A",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"6px"}}>Culmination</div>
              <p style={{color:"#8A8A9A",fontSize:"13px",lineHeight:"1.7",fontFamily:"Inter,sans-serif",fontStyle:"italic",marginBottom:"12px"}}>{proc.culmination}</p>
              <div style={{color:"#6A6A8A",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"6px"}}>Shadow Risk</div>
              <p style={{color:"#8A7A7A",fontSize:"13px",lineHeight:"1.7",fontFamily:"Inter,sans-serif"}}>{proc.shadow}</p>
            </div>
          );
        })}

      </div>

      <div style={{textAlign:"center",marginTop:"24px"}}>
        <button onClick={onBack} style={{background:"transparent",border:"1px solid #2A2A3A",color:"#7A7A8A",padding:"10px 28px",fontFamily:"Inter,sans-serif",fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",borderRadius:"4px",cursor:"pointer"}}>← Back to My Result</button>
      </div>
    </div>
  );
}

// The 4 Nigrus (Black temperament) types use deliberately near-black accent colors
// (e.g. #1A0A08) — appropriate as a swatch/tint, but unreadable as foreground TEXT
// against the app's dark background. This lifts any too-dark color toward a legible
// tone for text use while keeping its hue character, so it still reads as "that type's
// color," just visible. Backgrounds/borders (used at low opacity) are unaffected.
function readableAccent(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  const luminance = 0.299*r + 0.587*g + 0.114*b;
  if (luminance >= 70) return hex; // already legible as text on this dark background
  const mix = 0.6;
  const tr = Math.round(r + (216-r)*mix);
  const tg = Math.round(g + (196-g)*mix);
  const tb = Math.round(b + (170-b)*mix);
  return `rgb(${tr},${tg},${tb})`;
}

// Preferred analyst by ACTUAL USE — counts how many entries each analyst has interpreted,
// rather than just remembering whichever was selected last. Returns null if no entry has
// been interpreted yet, since "preferred" shouldn't be guessed from a single idle choice.
function getPreferredAnalyst(dreamEntries) {
  const counts = {};
  (dreamEntries || []).forEach(e => {
    Object.keys(e.interpretations || {}).forEach(analystId => {
      counts[analystId] = (counts[analystId] || 0) + 1;
    });
  });
  const ids = Object.keys(counts);
  if (ids.length === 0) return null;
  const topId = ids.reduce((best, id) => counts[id] > counts[best] ? id : best, ids[0]);
  return ANALYSTS.find(a => a.id === topId) || null;
}

// DaseinCare deliberately has no "type" or "preferred" equivalent — a session count and
// practice start date, rather than a synthesized label, since Dasein resists being reduced
// to a stable identity the way NJTA's type or DreamMeaning's analyst choice can be.
function getDaseinPracticeSummary(daseinSessions) {
  if (!daseinSessions || daseinSessions.length === 0) return null;
  const sorted = [...daseinSessions].sort((a,b) => new Date(a.date) - new Date(b.date));
  const first = new Date(sorted[0].date);
  return {
    count: daseinSessions.length,
    since: first.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  };
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function NJTAApp({ savedReport, setSavedReport, tier }) {
  const skipActive = tier >= 2 && !!savedReport;
  const [phase, setPhase] = useState(skipActive ? "result" : "intro");
  const [sectionIdx, setSectionIdx] = useState(0); // 0=S1, 1=S2, 2=S3
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(skipActive ? savedReport.typeName : null);
  const [retakeConfirm, setRetakeConfirm] = useState(false);
  const [procResult, setProcResult] = useState(skipActive ? savedReport.process : null);
  const [guideInitialTab, setGuideInitialTab] = useState("substances");
  const [animIn, setAnimIn] = useState(true);
  // Each section's questions shuffled once at start
  const [shuffledS1] = useState(() => shuffleArray([...S1_AXIS_QUESTIONS]));
  const [shuffledS2] = useState(() => shuffleArray([...S2_TEMP_QUESTIONS]));
  const [shuffledS3] = useState(() => shuffleArray([...S3_PROCESS_QUESTIONS]));

  const sectionQs = [shuffledS1, shuffledS2, shuffledS3];
  const currentSectionQs = sectionQs[sectionIdx] || [];
  const q = currentSectionQs[qIdx];

  // Overall progress
  const totalQs = 10 + 10 + 24;
  const answeredCount = Object.keys(answers).length;
  const progress = answeredCount / totalQs;

  const SECTION_COLORS = ["#C8A84B", "#7BBCD4", "#B47BD4"];
  const color = SECTION_COLORS[sectionIdx];

  const SECTION_LABELS = [
    { num:"I", name:"Substance", desc:"Your psychical substance is determined by which axis of perception and judgment you most naturally inhabit." },
    { num:"II", name:"Temperament", desc:"Your temperament is shaped by how your psyche orients itself — toward the world or inward, toward resolution or receptivity." },
    { num:"III", name:"Process", desc:"Your developmental process is read from the pattern of preferences across the full range of functions." },
  ];

  function currentVal() { return answers[q?.id] ?? null; }

  function go(dir) {
    setAnimIn(false);
    setTimeout(() => {
      if (dir === 1) {
        // Move forward
        if (qIdx < currentSectionQs.length - 1) {
          setQIdx(i => i + 1);
        } else if (sectionIdx < 2) {
          // End of section — move to next section's intro
          setSectionIdx(s => s + 1);
          setQIdx(0);
          setPhase("section_intro");
        } else {
          // All done — compute result
          const type = determineType(answers);
          const proc = determineProcess(answers);
          setResult(type);
          setProcResult(proc);
          setPhase("result");
          if (setSavedReport) setSavedReport({ typeName: type, process: proc });
        }
      } else if (dir === -1) {
        if (qIdx > 0) {
          setQIdx(i => i - 1);
        } else if (sectionIdx > 0) {
          setSectionIdx(s => s - 1);
          setQIdx(sectionQs[sectionIdx - 1].length - 1);
          setPhase("test");
        }
      }
      setAnimIn(true);
    }, 200);
  }

  function handleAnswer(val) {
    setAnswers(a => ({ ...a, [q.id]: val }));
  }

  function restart() {
    setPhase("intro"); setSectionIdx(0); setQIdx(0);
    setAnswers({}); setResult(null); setProcResult(null); setAnimIn(true);
    setRetakeConfirm(false);
  }

  // Which question number overall are we on?
  const globalQNum = (sectionIdx === 0 ? 0 : sectionIdx === 1 ? 10 : 20) + qIdx + 1;

  return (
    <div style={{minHeight:"calc(100vh - 52px)",background:"radial-gradient(ellipse at 30% 20%, #1A0A20 0%, #0A0A14 50%, #050510 100%)",padding:"24px 14px",fontFamily:"'Playfair Display',Georgia,serif",color:"#E8DFC8"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`@media(max-width:480px){.njta-tabs button{font-size:10px!important;padding:10px 4px!important}.njta-header{padding:20px 16px!important}.njta-body{padding:18px 16px 22px!important}.njta-typename{font-size:24px!important}}`}</style>

      {/* ── INTRO ── */}
      {phase==="intro" && (
        <div style={{maxWidth:"560px",margin:"0 auto",textAlign:"center",paddingTop:"28px",animation:"fadeIn 0.4s ease"}}>
          <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
          <AlchemySymbol substance={null} progress={0} color="#C8A84B"/>
          <div style={{color:"#C8A84B",fontSize:"11px",letterSpacing:"5px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"14px",opacity:0.7}}>Post-Jungian Typological System</div>
          <h1 style={{fontSize:"34px",fontWeight:"700",marginBottom:"8px",letterSpacing:"1px",lineHeight:1.1}}>New Jungian<br/>Typological Assessment</h1>
          <div style={{color:"#6A6A8A",fontSize:"13px",fontFamily:"Inter,sans-serif",marginBottom:"28px",lineHeight:"1.8",maxWidth:"420px",margin:"0 auto 28px"}}>A revised typology of psychical substance, temperament, and developmental process.</div>
          <div style={{background:"#0F0F1E",border:"1px solid #2A2A3A",borderRadius:"12px",padding:"18px 22px",marginBottom:"28px",textAlign:"left"}}>
            {SECTION_LABELS.map((s,i) => (
              <div key={i} style={{display:"flex",gap:"14px",alignItems:"flex-start",marginBottom:i<2?"16px":0,paddingBottom:i<2?"16px":0,borderBottom:i<2?"1px solid #1E1E2E":"none"}}>
                <div style={{minWidth:"28px",height:"28px",borderRadius:"50%",background:SECTION_COLORS[i]+"22",border:"1px solid "+SECTION_COLORS[i]+"44",display:"flex",alignItems:"center",justifyContent:"center",color:SECTION_COLORS[i],fontSize:"11px",fontFamily:"Inter,sans-serif",fontWeight:"600",flexShrink:0}}>{s.num}</div>
                <div>
                  <div style={{color:"#E8DFC8",fontSize:"14px",marginBottom:"3px"}}>{s.name}</div>
                  <div style={{color:"#5A5A6A",fontSize:"12px",fontFamily:"Inter,sans-serif",lineHeight:"1.5"}}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{color:"#4A4A5A",fontSize:"11px",fontFamily:"Inter,sans-serif",marginBottom:"6px"}}>56 questions across 3 sections</div>
          <div style={{color:"#3A3A4A",fontSize:"11px",fontFamily:"Inter,sans-serif",marginBottom:"24px",fontStyle:"italic"}}>Sections I and II present binary choices. Section III uses a 4-point preference scale.</div>
          <button onClick={()=>{setPhase("section_intro");}} style={{background:"linear-gradient(135deg,#C8A84B,#A88A30)",border:"none",color:"#0A0A14",padding:"14px 36px",fontSize:"13px",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",fontWeight:"600",borderRadius:"4px",cursor:"pointer"}}>Begin Assessment</button>
        </div>
      )}

      {/* ── SECTION INTRO ── */}
      {phase==="section_intro" && (
        <div style={{maxWidth:"520px",margin:"0 auto",paddingTop:"40px",animation:"fadeIn 0.4s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"32px"}}>
            <div style={{color:"#3A3A4A",fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"2px",textTransform:"uppercase"}}>NJTA</div>
            <div style={{flex:1,margin:"0 16px",height:"3px",background:"#1A1A2A",borderRadius:"2px",overflow:"hidden"}}>
              <div style={{width:(progress*100)+"%",height:"100%",background:"linear-gradient(90deg,"+color+","+color+"88)",transition:"width 0.5s ease",borderRadius:"2px"}}/>
            </div>
            <div style={{color:"#6A6A8A",fontSize:"11px",fontFamily:"Inter,sans-serif"}}>{answeredCount} / {totalQs}</div>
          </div>
          <div style={{textAlign:"center",marginBottom:"32px"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:color+"22",border:"1px solid "+color+"44",display:"flex",alignItems:"center",justifyContent:"center",color:color,fontSize:"22px",fontFamily:"Inter,sans-serif",fontWeight:"700",margin:"0 auto 20px"}}>{SECTION_LABELS[sectionIdx].num}</div>
            <div style={{color:color,fontSize:"11px",letterSpacing:"4px",textTransform:"uppercase",fontFamily:"Inter,sans-serif",marginBottom:"10px",opacity:0.8}}>Section {SECTION_LABELS[sectionIdx].num}</div>
            <div style={{color:"#E8DFC8",fontSize:"28px",fontWeight:"700",marginBottom:"12px"}}>{SECTION_LABELS[sectionIdx].name}</div>
            <div style={{color:"#6A6A8A",fontSize:"13px",fontFamily:"Inter,sans-serif",lineHeight:"1.75",maxWidth:"380px",margin:"0 auto 28px"}}>{SECTION_LABELS[sectionIdx].desc}</div>
            {sectionIdx < 2 && (
              <div style={{display:"inline-block",padding:"8px 16px",borderRadius:"20px",background:color+"18",border:"1px solid "+color+"33",color:color,fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"1px",marginBottom:"28px"}}>
                Choose A or B — no middle option
              </div>
            )}
            {sectionIdx === 2 && (
              <div style={{display:"inline-block",padding:"8px 16px",borderRadius:"20px",background:color+"18",border:"1px solid "+color+"33",color:color,fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"1px",marginBottom:"28px"}}>
                4-point scale — Strongly or Somewhat for each pole
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:"12px",justifyContent:"center"}}>
            {sectionIdx > 0 && (
              <button onClick={()=>{setSectionIdx(s=>s-1);setQIdx(sectionQs[sectionIdx-1].length-1);setPhase("test");}} style={{padding:"12px 24px",background:"transparent",border:"1px solid #2A2A3A",borderRadius:"4px",color:"#8A8A9A",fontFamily:"Inter,sans-serif",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer"}}>← Back</button>
            )}
            <button onClick={()=>setPhase("test")} style={{padding:"12px 36px",background:"linear-gradient(135deg,"+color+","+color+"AA)",border:"none",borderRadius:"4px",color:"#0A0A14",fontFamily:"Inter,sans-serif",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",fontWeight:"600",cursor:"pointer"}}>Begin Section →</button>
          </div>
        </div>
      )}

      {/* ── TEST ── */}
      {phase==="test" && q && (
        <div style={{maxWidth:"560px",margin:"0 auto"}}>
          {/* Progress bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
            <div style={{color:color,fontSize:"11px",fontFamily:"Inter,sans-serif",letterSpacing:"2px",textTransform:"uppercase",opacity:0.8}}>{SECTION_LABELS[sectionIdx].name}</div>
            <div style={{flex:1,margin:"0 16px",height:"3px",background:"#1A1A2A",borderRadius:"2px",overflow:"hidden"}}>
              <div style={{width:(progress*100)+"%",height:"100%",background:"linear-gradient(90deg,"+color+","+color+"88)",transition:"width 0.4s ease",borderRadius:"2px"}}/>
            </div>
            <div style={{color:"#6A6A8A",fontSize:"11px",fontFamily:"Inter,sans-serif"}}>{globalQNum} / {totalQs}</div>
          </div>

          <div style={{opacity:animIn?1:0,transform:animIn?"translateY(0)":"translateY(8px)",transition:"all 0.2s ease"}}>
            <div style={{color:"#5A5A6A",fontSize:"11px",letterSpacing:"3px",fontFamily:"Inter,sans-serif",textTransform:"uppercase",marginBottom:"10px"}}>
              {SECTION_LABELS[sectionIdx].name} · {qIdx+1} of {currentSectionQs.length}
            </div>
            <div style={{fontSize:"19px",lineHeight:"1.55",marginBottom:"24px",color:"#E8DFC8"}}>{q.text}</div>

            <div style={{background:"#0A0A14",borderRadius:"10px",border:"1px solid #1E1E2E",padding:"18px 16px 14px"}}>
              {sectionIdx < 2 ? (
                <BinaryScale
                  value={currentVal()}
                  onChange={handleAnswer}
                  color={color}
                  labelA={q.a}
                  labelB={q.b}
                />
              ) : (
                <ProcessScale
                  value={currentVal()}
                  onChange={handleAnswer}
                  color={color}
                  labelA={q.a}
                  labelB={q.b}
                />
              )}
            </div>

            <div style={{display:"flex",gap:"12px",marginTop:"18px"}}>
              <button onClick={()=>go(-1)} style={{padding:"12px 20px",background:"transparent",border:"1px solid #2A2A3A",borderRadius:"4px",color:"#8A8A9A",fontFamily:"Inter,sans-serif",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer"}}>← Back</button>
              <button
                onClick={()=>{ if(currentVal()!==null) go(1); }}
                disabled={currentVal()===null}
                style={{flex:1,padding:"12px 20px",background:currentVal()!==null?"linear-gradient(135deg,"+color+","+color+"AA)":"#1A1A2A",border:"none",borderRadius:"4px",color:currentVal()!==null?"#0A0A14":"#3A3A4A",fontFamily:"Inter,sans-serif",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",fontWeight:"600",cursor:currentVal()!==null?"pointer":"default",transition:"all 0.2s"}}>
                {sectionIdx===2 && qIdx===currentSectionQs.length-1 ? "Reveal Type →" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── REPORT ── */}
      {phase==="result" && result && procResult && (
        <div style={{maxWidth:"680px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"28px"}}>
            <div style={{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap",marginBottom:"16px",fontFamily:"Inter,sans-serif"}}>
              {tier>=3 ? [
                {id:"substances",   label:"Substances"},
                {id:"temperaments", label:"Temperaments"},
                {id:"types",        label:"Types"},
                {id:"structures",   label:"Structures"},
                {id:"processes",    label:"Processes"},
              ].map((link,i,arr)=>(
                <span key={link.id} style={{display:"flex",alignItems:"center",gap:"14px"}}>
                  <button onClick={()=>{setGuideInitialTab(link.id); setPhase("guide");}} style={{background:"none",border:"none",color:"#8A7A50",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",cursor:"pointer",padding:0,textDecoration:"underline",textUnderlineOffset:"4px",textDecorationColor:"#8A7A5066"}}>{link.label}</button>
                  {i<arr.length-1 && <span style={{color:"#3A3A4A"}}>·</span>}
                </span>
              )) : (
                <span style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:"#3A3A48",fontStyle:"italic"}}>🔒 Explanatory Pages — Premium</span>
              )}
            </div>
            <AlchemySymbol substance={ALL_TYPES[result].substance} progress={1} color={ALL_TYPES[result].color}/>
            <div style={{color:"#6A6A8A",fontSize:"12px",fontFamily:"Inter,sans-serif",marginTop:"10px",letterSpacing:"2px",textTransform:"uppercase"}}>Your Report</div>
          </div>

          {tier>=2 ? (
            <ResultCard typeName={result} process={procResult}/>
          ) : (
            <div style={{border:"1px solid #2A2A3A",borderRadius:"10px",padding:"32px 28px",textAlign:"center"}}>
              <div style={{fontSize:"20px",color:ALL_TYPES[result].color,marginBottom:"8px"}}>{result}</div>
              <div style={{color:"#6A6A8A",fontSize:"13px",fontFamily:"Inter,sans-serif",lineHeight:1.7,marginBottom:"22px"}}>
                {SUBSTANCE_DESC[ALL_TYPES[result].substance].name} substance, {TEMPERAMENT_DESC[ALL_TYPES[result].temperament].name} temperament — this is your Overview. The Full Report unpacks your complete function stack, your Process result, and what both mean in practice.
              </div>
              <div style={{color:"#4A4A5A",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"16px"}}>🔒 Full Report — Free with an account</div>
            </div>
          )}

          <div style={{textAlign:"center",marginTop:"24px"}}>
            {tier<3 ? (
              <div style={{color:"#3A3A48",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"Inter,sans-serif"}}>🔒 Unlimited Retakes — Premium</div>
            ) : !retakeConfirm ? (
              <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
                <button onClick={()=>setRetakeConfirm(true)} style={{background:"transparent",border:"1px solid #2A2A3A",color:"#5A5A6A",padding:"10px 28px",fontFamily:"Inter,sans-serif",fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",borderRadius:"4px",cursor:"pointer"}}>Retake Assessment</button>
              </div>
            ) : (
              <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:"10px",padding:"16px 24px",border:"1px solid #3A3A2A",borderRadius:"6px",background:"rgba(200,168,75,0.05)"}}>
                <div style={{color:"#B0A080",fontSize:"12px",fontFamily:"Inter,sans-serif",fontStyle:"italic"}}>Are you sure? Retaking will replace your current report.</div>
                <div style={{display:"flex",gap:"10px"}}>
                  <button onClick={restart} style={{background:"transparent",border:"1px solid #C8A84B66",color:"#C8A84B",padding:"8px 20px",fontFamily:"Inter,sans-serif",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",borderRadius:"4px",cursor:"pointer"}}>Yes, Retake</button>
                  <button onClick={()=>setRetakeConfirm(false)} style={{background:"transparent",border:"1px solid #2A2A3A",color:"#5A5A6A",padding:"8px 20px",fontFamily:"Inter,sans-serif",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",borderRadius:"4px",cursor:"pointer"}}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {phase==="guide" && result && procResult && tier>=3 && (
        <SystemGuide onBack={()=>setPhase("result")} initialTab={guideInitialTab}/>
      )}
    </div>
  );
}

// DREAM MEANING
// ═══════════════════════════════════════════════════════════

const ANALYSTS = [
  { id:"freud",   name:"Sigmund Freud",    years:"1856–1939", school:"Psychoanalysis",       color:"#8B6A4A", accent:"#D4AF6A", locked:false,
    intro:"The father of psychoanalysis. Freud reads dreams as disguised wish-fulfillment — the mind's way of smuggling repressed desires past an internal censor. Expect a formal, incisive style that treats every image as a clue: nothing in the dream is incidental, and the manifest story is rarely the real one.",
    persona:`You are Sigmund Freud, father of psychoanalysis. Interpret dreams through the lens of wish fulfillment, the unconscious, libido, repression, and the id/ego/superego. Reference the Oedipal complex, castration anxiety, and sexual symbolism where relevant. Look for manifest vs. latent content. Use a formal, authoritative Victorian prose style. Speak as Freud himself would, in first person ("I observe...", "One must consider..."). Be bold and specific in your symbolic readings. Keep it to 3–4 focused paragraphs.` },
  { id:"jung",    name:"Carl Gustav Jung", years:"1875–1961", school:"Analytical Psychology", color:"#4A6A7A", accent:"#7BBCD4", locked:false,
    intro:"Founder of analytical psychology. Jung treats dreams as meaningful communication from the unconscious, not disguise — messages built from archetypes, myth, and symbols shared across humanity, often compensating for something missing in waking life. Expect an expansive, philosophical style, full of mythological parallels and a genuine sense of wonder at the image itself.",
    persona:`You are Carl Gustav Jung, founder of analytical psychology. Interpret dreams through archetypes, the collective unconscious, the shadow, the anima/animus, individuation, and synchronicity. Reference mythological parallels and universal symbols. Look for compensatory messages from the unconscious. Use a philosophical, expansive prose style filled with wonder. Speak as Jung himself would. Keep it to 3–4 focused paragraphs.` },
  { id:"adler",   name:"Alfred Adler",     years:"1870–1937", school:"Individual Psychology", color:"#4A7A5A", accent:"#7BD4A0", locked:false,
    intro:"Founder of Individual Psychology. Adler reads dreams for what they reveal about your private logic — feelings of inferiority, the striving toward significance, and your goals and place within your community. Expect a warm, direct, democratic style focused less on hidden symbolism and more on what the dream is trying to help you achieve.",
    persona:`You are Alfred Adler, founder of Individual Psychology. Interpret dreams through the lens of inferiority feelings, the striving for superiority, social interest, lifestyle, and compensatory fantasies. Look for what the dream reveals about the dreamer's goals, their place in community, and their private logic. Use a warm but direct, democratic tone. Keep it to 3–4 focused paragraphs.` },
  { id:"perls",   name:"Fritz Perls",      years:"1893–1970", school:"Gestalt Therapy",       color:"#7A4A6A", accent:"#D47BB4", locked:false,
    intro:"Founder of Gestalt therapy. Perls refuses to treat the dream as a puzzle to decode — instead, every person, object, and setting in it is a disowned piece of you, to be reclaimed rather than explained. Expect a provocative, earthy, confrontational style that stays in the present tense and pushes you to inhabit the dream rather than analyze it from a distance.",
    persona:`You are Fritz Perls, founder of Gestalt therapy. Interpret dreams by treating every element — every person, object, and setting — as a projection of the dreamer's own psyche. Be provocative, earthy, and confrontational in style. Speak as Perls would. Keep it to 3–4 punchy paragraphs.` },
  { id:"hillman", name:"James Hillman",    years:"1926–2011", school:"Archetypal Psychology", color:"#6A4A7A", accent:"#B47BD4", locked:false,
    intro:"Founder of archetypal psychology. Hillman deliberately resists interpreting dreams away — he holds that images should be honored as autonomous and alive, not reduced to a tidy meaning. Expect a poetic, almost incantatory style drawing on Greek gods and goddesses and the idea of a polytheistic psyche, deepening into the image rather than explaining it.",
    persona:`You are James Hillman, founder of archetypal psychology. You believe dreams should NOT be interpreted away but honored as autonomous imaginal events. Resist the urge to reduce images to meanings. Instead, deepen into the images themselves. Reference Greek gods and goddesses, soul (anima mundi), and the polytheistic psyche. Use a poetic, almost incantatory prose style. Keep it to 3–4 lyrical paragraphs.` },
];

function hexToRgb(hex) {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return `${r}, ${g}, ${b}`;
}

function NebulaBackground() {
  const canvasRef=useRef(null), animRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current; if (!canvas) return;
    const ctx=canvas.getContext("2d");
    const resize=()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; };
    resize(); window.addEventListener("resize",resize);
    const orbs=Array.from({length:6},(_,i)=>({
      x:Math.random(),y:Math.random(),r:0.2+Math.random()*0.25,
      speed:0.0003+Math.random()*0.0002,phase:Math.random()*Math.PI*2,
      color:[[80,40,160],[40,60,140],[120,40,100],[60,80,160],[100,50,140],[50,40,120]][i],
    }));
    const draw=(t)=>{
      ctx.fillStyle="#0D0A1E"; ctx.fillRect(0,0,canvas.width,canvas.height);
      orbs.forEach(orb=>{
        const dx=Math.sin(t*orb.speed+orb.phase)*0.08, dy=Math.cos(t*orb.speed*0.7+orb.phase)*0.06;
        const cx=(orb.x+dx)*canvas.width, cy=(orb.y+dy)*canvas.height;
        const radius=orb.r*Math.min(canvas.width,canvas.height);
        const grad=ctx.createRadialGradient(cx,cy,0,cx,cy,radius);
        grad.addColorStop(0,`rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0.18)`);
        grad.addColorStop(0.5,`rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0.07)`);
        grad.addColorStop(1,`rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0)`);
        ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.fillStyle=grad; ctx.fill();
      });
      animRef.current=requestAnimationFrame(draw);
    };
    animRef.current=requestAnimationFrame(draw);
    return()=>{ cancelAnimationFrame(animRef.current); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

function StarField() {
  const stars=useRef(Array.from({length:80},()=>({x:Math.random()*100,y:Math.random()*100,size:Math.random()*1.5+0.3,opacity:Math.random()*0.5+0.1,twinkleSpeed:2+Math.random()*4,twinklePhase:Math.random()*Math.PI*2})));
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}>
      {stars.current.map((s,i)=>(
        <div key={i} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.size,height:s.size,borderRadius:"50%",background:"white",opacity:s.opacity,animation:`dmTwinkle ${s.twinkleSpeed}s ease-in-out infinite`,animationDelay:`${s.twinklePhase}s`}}/>
      ))}
    </div>
  );
}

// Duotone portrait system — loads real iconic photos and applies
// luminance-mapped duotone colorization via canvas pixel manipulation.

const PORTRAIT_DATA_URLS = {
  freud: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAAAAACupDjxAAAC7mlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGCe4Oji5MokwMBQUFRS5B7kGBkRGaXAfp6BjYGZAQwSk4sLHAMCfEDsvPy8VAZUwMjA8O0aiGRguKwLMouBNMCaDLQYSB8AYqOU1OJkIP0FiNPLSwqA4owxQLZIUjaYXQBiZ4cEOQPZLQwMTDwlqRUgvQzO+QWVRZnpGSUKhpaWlgqOKflJqQrBlcUlqbnFCp55yflFBflFiSWpKUC1UDtAgNclv0TBPTEzT8HIQJVEdxMEoHCEsBDhgxBDgOTSojIIC6xIgEGBwYDBgSGAIZGhnmEBw1GGN4zijC6MpYwrGO8xiTEFMU1gusAszBzJvJD5DYslSwfLLVY91lbWe2yWbNPYvrGHs+/mUOLo4vjCmch5gcuRawu3JvcCHimeqbxCvJP4hPmm8cvwLxbQEdgh6Cp4RShV6Idwr4iKyF7RcNEvYpPEjcSvSFRIykkek8qXlpY+IVMmqy57S65P3kX+j8JWxUIlPaW3ymtVClRNVH+qHVTv0gjVVNL8oHVAe5JOqq6VnqDeK/0jBgsMa41ijG1N5E2ZTV+aXTDfabHEcoJVnXWuTZxtoJ2rvbWDsaOOk5qzkouCq7ybgruyh7qnrpeJt42Pu2+wX4J/fkB94MSgpcG7Qi6GvgxnipCLtIqKiK6ImRm7J+5BAluiblJYckPKmtSb6RwZFpmZWXOzL+ay59nnVxRsKnxXrF2SVbqq7E2FfmVJ1a4axlqvuqn1Dxv1mmqaz7bKtRW2H+2U7irqPt2r2tfYf3eizaTZk/9OjZ92eIbGzP5Z3+ckzD0933zB0kUii1uXfFuWufzeypBVp9e4rN233nLDtk0mm7dsNdm2fYfVzv27Xfec3Re2/8HBnEM/j7QfEz++4qT1qXNnks/+Oj/povalo1cSr/67Puemza27d+rvKd8/8TDvsdiT/c8yX4i8PPg6/638uwsfmj6Zfn71dcH38J8Cv079af3n+P8/AA0ADzTeHLSIAAA23UlEQVR4nE28Wa9u23Yd1FofY8z5FavY9T7lreO6xPZN5VixoiSSQSgPIKE8QBQJiX8BPwIeAKEAgaCAiAIvKMSxk9ixHdfOvb7Xxa187yn32dUqvu+bc47Re+NhzHXMOdrrYa9vrT3nKHpvvbXWO//te9ECEkAxCJCQgYABIhACCFIRAUI0gnIAgAGkAAoUGEoC6aQACQrRIygBgjzcPVwtPDwivIbDBLkEQQoKCkogQZIW23zj8gBEAmYBA0AIhBsESgQFUgYB68+JgCyChqAIEyCQohAALQAIoAQTAUASpPVhSQJMMsAUXH8KIkD0PyDlYfkgF/ojJ8oorP+akVR/EYGghXLQZISMCBEG0JwmmgCAIUPASCNCEOEGX9eX5qZgcYv1fRD9rSAIQScgWpCCYV2Z7AESQoIBANgfN0itTwgkSDAl0UwiSLn1fzRghGF9LQMo0gDCiIBoIOCUggZS5sqMZmC0/l4yEeorDoiU+kcDsJaBJAjWz1OQDpE0GJAQZPQDSINCRvTfmvoZtIBEMkT1zVGiEYKASP2YACbJIkgLuCmJlAVIgpCDQLJAQJSbQJlAwALZ4AFAlIEwyGR9YwGYAQaEUTR3wijBQAl9dVMASWEgiAggaAMaAxCU2MIApQiBSpBYWgRyBGhKCpqTABgJ5pASaGEWfS88W5CimGgyhWBhgFm/SBBhSiQpmgRKIghjGAEZZISx+Ol0dQATfcT5HimRQFgWIKUmhiVYCIwkuKgUIIWgCTQxIPMABCecAiBF9v4IyZIUIGU0AxP7jRKgfqYIhJJB4qcHBoRPu5Tz6YNnJ2yYxDQ/LNoRSiF5UICATFF0MInZRBeBiGggA0AAAqQAQBkhNwqC56XHApIBEqBSgoGQRMAgEgQlyWKNAOg32SSk7Yavv/veoVxsY1M25Wxk2eYyXN82c5ChHk4FORQBUgpAkiIYnuj9HocQPRQAAhVAUNkDAtWSw9wAGkVRARLBfrABQTInRImmIEAFGbZ5/+sfxPbBw3tZI/PW7t+b0zxvUrMdD03mgiIUIUVEhGqEi4HAGoHhsv68ijCF+jnq0SXTAIShydbIE+s2ph6jGIAoUhEEon9TEBgRafm1r+SLJ08vzi7EUvIep9NZK+eKRzevt3sdZgCMUESEQlC4ByG5R0ii1Be3/4cQED1VqMlqDvWgIEg9TlAQ1WN7UCIhKEzSGuL7H0E+Pv+lZ5cPHz24v9+lOuacyv4yhi38aHhYrtvDzcdTJkEBIUlQ9KwX3pc1KQKKdUvREw2CQhByZggKmpAgSkYZZJIoWkQigoQAJ9mXVOuZRBu+8y+my8v7jx8MZbNbYltGG3JRSlPU27ofbl6eXVxd348QCJMDUoT800WBAuoLK0j95vYlhEAhMikBkRRpDXyiFFQPeSmkMPQD2cMfqKDCGOXDfzq8+fTxcGahpG0azcZICVk7zoaan968qvvD83t9PwRGixbrCqrve0ZIgqNfHu8Jc90seZYoAkEjelIVIa75h9FTPAQGgmAHPiYjDb/qD999cHEuMOZUhiGlkpGz4OWRv0A7pcv3J7wat0FEgN4BkwKCOYAQQ84IUlKsiAIurnFQua+p2XqqqpmiZ1VQSYKMgsFhIcipABEyxeYP33v7zZ2lNNiQKokhDcgUoWy+G16/n5y6uj7uigFAuAAgQpK3dbsNQqgHQ0WHaaGOJoBAFgQYOzDqAKUHfwBwEj1eS4DCwgKGfpt8/ur4xqMc7eTj2XbhSB9TEZFSC6Z8W86u63FZND07H8MdPZgGEYAll4ckgE4EemgMyqlggOgx3CT0Ywj2p5RoMOuXnlxPq8iIHlzARCk8PXv59BIqWVGXuk1tHFIi05jIQNnBd63E6XC7HCdFT87RAoo1CJgBiAj2XZFC8EAEesCMkGQ0AGaJRiNoBobM+nP16NSjdgCKEAB5c29uH/obpTlqU27NdykN2ZQzGA4Al77cX0rUNh9u5FAo+jsLCrkk95AUCvV9DwUUEQEAgBAeFq6QpBX6aIW7PZYrJEZIIRdEkugxg+TpO/fHk3urlsuYgCFnyhJ7acDUxsXsmILt1XX1u/VRBBWSIUJao0qYQhEI6W4Fhf4S1teeWg8vYKIcpPVkg2AAVP/76GsIQOmTw25pNQ9jsiGlhG0JIepcEU06arfdLrypG53husGlcCm0ZuL18WK9tj2ZQuEBeAiIiGiAGSEmJlsBdN/M/sJ9M+5KqjWlguEt4O39Wk9hYSklIZVCb9XlTIFMJqWzR7cVV5vQ/VTZo55LK9oWEA6AfSUj1COYrZk01qhtchkFqcNGQkJY3/YOzoRQi5CiKSJ8bq6ofvhwOS0OcDOklAi2pXl1gq6UHFZm/8Jz1VeChsxe9iBWaBW9BsB6KkMISRGx1nWSFAIiu4lwhkE935rYiy8aIAjeAS7cJTdBMAXseFOjzWWXyj6SETEzUgYVAtAQ2r68uf97rMtFffnmRU8kYLgEyvyuECEUUJBQdEAoqJdTCiKb1qPWj1YY2TEkpAR1wBkKIFqAIgQPgO12odcqsVQXYiF8hC1DojzkU+L5s/ru19v9eTdkQXJFaN3PAGWMgKRASLhbxo7oRAIK0sI9Yi1CSBF1jVmAWrurbQNyl0eLiHB3RWUwKSIYLRNaamuxzB7LUn3xmJbF8/3bw/m1DQeG4CGXIvxuleQiIjEUECEX1QFEhyIRIiL30MJ+NwMSnKTgIEhngILkUHhjWrOKU0A2eWu1Vg7uoptK8eyLWSPmhtx2X/w3bfPJOzhJogcFuVOhAGi2nsgVY0WHfALgRgQYUGSAblD0OlcCwgQkwNRLwlhTVA+KJkkMmkpQXpdpHsytpRaWaZNAIBZvTo434zt/oHSwzLhLtjTJO9EhQR0l9ICz4sOeIQCCIea2FkChtGIYQGIEe2SGnJ+WNBJ9RXLEcDUXLMd5mZGHJlLVnA10ttYaapRy3D26OtdVvJPXoxai1HkIgYhgwoqr1emBO7zfq0dkAQqnCUGZEIQjQWsAWLkGKSJqR7mEi1w4sBmX6SbTZsASYVUesGQ12gljxKzp7NF2ePTJ7YiOyyGJDOsIoCfOENQfWSataJUr15MthBUlQw4K6FQGPTkMQrDD3ujkEeASIvLliyphmqZdzJEijRmNSQhBtbkMs6fYPrnhk/MbeC8ZxFB4f4geWDqCtgjEekX6FtIkMvJa4ZqAvoCCRRCgCQqsMQ0hMZQQrBAF2XbZ0IacLFmSMeYckZykIhSosdnNdTOXi7h68u7jF99rXNNpz8axbhDYMSDXQEfE3QoaZDnWovWOIKQYd4iDkCjXuoZCx0eUUz7XQvdxyFFlw5bTLDO4WQp4i9psLuODdpofDLr8gVYfv+8drIn9Htt61NY1XHHOWvH0U08qUwANHemveD8oha1r7d4Dk0NopEBHkKpt19jm4vJGzKMVwRQTBspbnWG5xXD2vGCXfujbv/i9H318y+jIg4EA1xALoMeJNd51QNXp0YDlvqhJokSuhKPCGOxgXBCjqUdqW3EvZc++RZrdwsZJLZXZm6wuZVNgET6fciU9hvtbz2988zfOL79xH/18hkIy9542sPIJK+/Ra9sAGQwoMVunQ/ra3aU2gADX7wQiAJdHR7/eD0lTS+M2jm26sLHU6zBESjoSVnJbTkPykn1OvNy+eO8H9k+/WxmiW/TaPNjR3cozryVtR3JiJEEMQ7s7gyvN29GM7A7S3uFISC18JTtFBVqxQBqzlpv5MH3/o3a8j+3m8N7HSvu2fZDDT4GaRp/tpv3s8cPyJk/yoKS1xOgbaZ3hWBFdv7FUp6uIUF4TDAOGWOtyqCcaQOGSXHS1iGiw/psklDhcLsez3UVg/M7py+kDP391/dH3Tk/ffXw4flJsN3JOVi7j5avL22eerfYN7ry7OnMuuUE92Uv/Pzq+fwGUzft16Ik6YOs6Q8CKPyLgHnB5A4MrpZbe/t1R1/X14OnB9Dv7H65fH2+fX8WTMV7fu3h+IAbQUZZ4efjqP/6+n9kdlr5yCnkviPrSxKfXA5Ciw9ZOvkhKuXNr0MpQWl9igAp4hLvChfCQh3sPC4RnX+4/rHFo+eVR38P17zz+4r/85NTAP/uaHp/e/dxoy0yjOw5vP/uZh9+62Y6Hjs07Xu0cm/eCzLHe354u1uTVc08OgpKzEzBcWQRBgEe44O6CR4QrHGDtwkP18tZH8wKfr5sM3/qDX/iFf/Xh89t4hI/1efuVd9/gpYeArPvnl1/+X49TCKJ59DKd6HWZYBErlPlzXCWIXZXw3E8ajF3soMLYP+IRLvfqvRjpcHCNU4EAzl8dl+PCxc149er4+MceffT+2fnFt3d/vf709VgwNGkqpkffuPi+UhfSImBkC5LmHWiuqZYRK0sKrre0n8Yc7GoKxIDd3TAITRFR3d17Hg5vvWL1XpbRxenYtveGG7Rmb5yXh8vb9z45v/fv1e88+Vy4yPAm24m7Vw/qoecxQmRyrpvonx62uwt8t7Dop8yyCYEkAmZ3q9w/565a5VEDkODVm1OMHsMAWBpheRxHTcfztxJxPub55e3l/q0HLRtTbeHxEKdP2sP8/uZ6RUUrGlyXoYfBjgaiR2zcAUIFI7LLAMnISGuAFtlrBfcId/cw3HGkWmvajijPisayHw8ne7qfNzZufvD29sGDe5e0ks1bc1n2qW0evP/wxZL7T60EUWqGoEWPHuZ3pS3ET9MsAsqElClIyW1VHix6Sd1aixatRUIEokVIknPlSam8fTmPhjltMzdjEd76S793a3nc0bJ7eMXQaA/57ZxvkxCkmDr9LYKKACJCjDsRb4X9dwwhldnxwap59NLdQYeiKVq0cIesr6dAeEAMSUqu7RfePxRgxDhu0iZFfB7v5XGA5lm1ttn2w2m7u0q7qVqsZWdCk7W4iyfgWioTYsgCplVXFKUc7NT+qkutiVhqUjSPWns+/pS46EBMIZFa2v0fnDWNzgsCtGzxLq7SiUZHdVdipFbHM1wFVny+8mjmPSSHRddhe5xhiJ0w7qDPeqAmyDslMFbuNWptzZsnIoTw1g84wlfJQI7l9GLc5LB5vEDdetU8PHnKQ4N7ZaFs3A88fpzCbwydS+nnp0sylhb167xeTfs0HcNXeJq79ksDZAT0aepu1b32iK9ghFxyQb6W3oLTb9JSd0o347YuiQvbd+PJzlXa69kv9s3HJD/+yf2yiI3oAqzUdWWsqtodLun/r9dPMCGEyAINluxOYpCIkFdvEe79NCpM4eH94qvvOASm5XaHaQmwqUEYyv6Pd5dxisglyTfLTlHx7a985uFZR9Kgd5ZtPUl3D/XnT7nWeISbCWEGppW4xHqJBUZzR1T3EJpDcO9RxtsdmEEEDLXRFx2THaElctIT/YHOBqDszzbFRsuzpbffSLh7ipWtRSdcCPldbAsg1gAYHdm60MOMmRnVZV6AkjdBzRWGCDeFA4oAnPKut4TEZlYjZtM1l9tX5/tqOswPv3Lvs7SSs5ex5rJ4mp48faFADyWd4kNXXhW+opdOmEMgzMkwuvW3yb04B9fsLYZaSFHDgyEhtQ6kgVVwWYMoPHwz+jzWNg2vX42al9cfxOf+QnzF3zBESkVlmNRa1MJlY10aaiuv7KsIBiC4bqooOGFAarhTxTNpQmIPPR17WZPX1oIhMKo8RPO7Q8LoMA5Q2AjVPG3Onn3neH31/HvzD72dfvj1N4YLM7I0x7xBG3YaJ9F7tIjO8t9Blk8VMgTXzaUYEq3Lw5nw1EX/rod0mFWrQCGhhtyBnujIu9qanYJV9lDYU7348NX7Tx/8hSfvljr99C998wc2JitC2kCusqAEEpwU7VMxrZNVsL44sJ6eQh1drRJyd5gYV8sDIcil5n0/AYZ7RMT6RVRA4d55d43W2un8C/fu77nbvYWbadzV9Pnrjxcm8xbzqXpYSWlbbwCTEYCtUSC6eNyFA6DzDiTX0KYOJbK4+hD6pksB7yS2wFBIHamRYKyc1F3ckmgt1UcPbh+lJz9yGJ7cv19I+xK/scnJOYTtbw+p1GE8/+Ffun1iaMBKmJMhWjTiTmljrHYb9viTeulpkq9CEpgSOk3m6CTmqpASn0qxHc4ouOrO8OnsS3l/782HdZu0Gw4csPncg49enVprpca8DNlseOsv7V68ClP3rPSYcyf7csUC/dc7pJCJ3q9F7qfPOrdLEN56RhTotpK/0IovBXa9KUIU0Lb5+nH7cLYUN/sz43xzc8Fx99kPJgOGNry+3p6fAvmn0jQ+93uk4y7/SpKtNhlhtQ10kEM4oIBI5HUZ+ye8l4DWQuoOIElKCHN1j4TrDtD1OlGj6b336+44XNzPD589wfP8k999cxxoRJ7zxHPz4fCFd379aPEs7ltAjAD9Lud2R5Q+xYJULz3IzhRmpfVGrTA3AvJYOeG7AivWpGR3PPda54g17fKH3zm2lMq5R36Q6va9B6dH474VKZuPm6On85/VvwWZXiwPrUFInWbs6uZaVApgKNgdAFjjYpTcjUMJ6GYrdWjLVQrQp8IGEOgqVX+89eK1zaUvadzvxkHDvjDtt4fvtLfP5joPV+kMGz8Ny1+7+Oa38gzjy+VeMQfZqJA64RHdhgDcVedabUEALHKRwgitHjIB7lhfsHPTwbuSsItwUNyleUrtfBh2Z2cXD+5djLuxXB83b738+PkefhlpPvnmNvlPfR6/fhw5zNod2n6bXEgNhAx3Lrl+ZyxWB8WnN9Ist0R5WdF2Rxhkrz2a8CnVsIrvgOh3yW5VJ+LefPa5Vw+OO97YmxfnVW9sh2EqHDRemwe+74f1/PcHS4sShnZ1Oi8rBcc719yn9RNAumC2KoIm5TCAblwXJaTuVmpSRFoxdD+73qH1yiSLEN2bjSk/evPdJ6d9esY3h9dDsifzvY/Hkp4/uMpz+sKXxV85lEozzqJOx/NiK8XaowOhtbTrB09BEtGfNhudniSY9TtLetfJLC8dOqN/NHinqazQiYBlj20da3t6fNtzrqXkdntxycPjkz7c3sDaD/xl4uq385JcjVCSza82OaeO4Ho5eUdj9hgGxsqSS0SGdzI7CldzS8dWCpkcCiK4Ciwdr3mHIJ0BQZt3WNKOebjOl8ugBx/s733y+WrH3HiI+Yf+koX99ottE5Ir4AGPqXI/dkKhw6Q1wQcgxh1ioBSwvJo6V/0m7sKbYK11KhSAVtsN7pQErMI+helwYZvp8TlzzGmj9oVNXFgd7l+lfLj98s8m0X8beQ6hMkVDVktLReuGgF5d9i2OnkW4VkZOUGERrUHRDQT92Tw6u+9a1dEOV9cTCFgvCjtosuuPlzzkE9v9aNs8x0MMp3k8xUnX00//XJL41W8PyxzuCCtWsC00LMdaXeEOA9ndCOis0Houg4p+T3iXbdf0xa4W445fxaqQdIBl3ZWk9WNQe76Y3z+9fH3AnnZ+yfl0qdE/Kg9PP/ZzJvD4vy9YlsOyIBZmwzxutjymYZPzZpvXY37H33f8z37u6UJ2kwkUHNGJLfTasDNaa0V9pxQA4Wjre1IRLh4/KeU0y6f9sV06uDvE2eHVZK+++NeyGPYPvnMPafRYvORUmYUx0uRRi8VOJ2lpfveI6/FCd7gFpLxGYhn87riukjzWq9VDptb4uGIF3cGaCH24LUwoMdleZtmKTsdtWt76y6MY9n/94pOIWt3dU6uxoSrSrs6b4ijZN8VjyXVuU7d4rtHmLiojr3JDB+CxigGxUmDyrkysYkso2LECTL4aIiItH20Pmzq+fMPazfDw9ubs5hXLzdOf3Yhhv/ePBwcimkdahLZxRMu2YVApJ6QEZtp5nN8eHUwr4OwOaZEZXV+1ro8AosfdTSYVrUfkWBPSisg7fQ2EPFIcXpZ79vY133hdLp9HfHi9f/ntn+zP953/cVJDhcJai1J52Azw5kwlliQM8yBlr5HSZW715GuBvlocqNxts5JIBDt5F9183Mn/O6O77sIVAKDpzg1mIF9CQRyx87qdnr0cPvijv/G3N6J4+z8ttZ5hSrI51XxyJiuOqQkta6hDtQYu2DKRG5/96pp3T9ifILvM1nK5K5Cw1FHqyiAD6gInV8TVCwm67vJxRlyX7fce7A7p/Xvf+v06zK//7n+xFSH7n7+xvd3UUuaqaDwKKStaMzMakufmLOOhxsW2igbLb5SXvNtjBqjMtGLBDHUbvAzJV4KkbynFzuDg7hivRHBnNCOgg+uTJx8/+0gvx3Ge/uO/vwUR9ou/+uDjNmxRm83I1ZnJatFirFFlJvh5PQ7X2aaUHTLOF/qE7NkrICLT4lNKwTq9Y7mCtCCt23gD0Q1TFisNQN1VtN2uEQtfvvf8k9PO9lu7+YX//CIBYX/2v22nqyEOu02rhNec6+yXm+uaF9MwjUJZnBHcSqeLQHann0+30mp0A5ATSIZ6QEdPGl1VtO4IZ5d/Ijpn1x2wPQN+yrhG4ObDGB+/3kP18PN/b1cAof7DtptPe5s9U+lg3Vbhg+ZqF2niUjLG5unFBjOjhl03DrFc6rrcoUTBAhnsFimSQkS0JpH0NWNjBZBc2wruLs1qhlAoHPPzq7T5/ofD+XD6i3///oaA7Be/NsbtbGXA8ahTrjXqkhqudvNxFDRkby0zPp53ltPeXdPN8ZNKu0ihTy1uBsKCvXMhQJnBEOqm5ZUvDPRTvbJl7MxKz+9SKFp9/dJLfvsLyO1H/rOnmwTIvv1/Xgivzeomh3tRJAw8tOVm3KXjwlJnr36rw+04b9KyIKf726W+fH3AZZitZnBks64ImwQ4KVhtATQPAOiGfVFJvUnFHEJyCXfSaDRqen3EmM7+4neOb/1HT7Y7QvJ/NAvHQ2p5pk/DdvEau1QwbetbH7XkGo8bLHa4KphKGozLnB6fuS/LlDeV0dttzFYxvl+PFXyTiHBB1uk7ISwl3tkx774IlCLQluXmCBt2w1/94fo330mZgOz//do4K04pqdTR6omGPLesxk1+NBKlWaOnODRm6TjV4+n1S+y2j959vNlq7lWFRRb/nFOHde9ScoiWgrTOZ3b25s8Zk17jS4GAe1I7uuH83v23/0r+/u0+E2Ff/z+GyWtb8i7qMp/d3pY8zI2O1K5fXOZRjamVhJe3w5iETZ5Ofno+2m4Y8v39k1fPwyhKueOXoGCdY1MwRwTMaY7kvLNddyy5UlN3rk56hFttsOHi3qP/4eO/9WB3XiB79d8cR3k5JEu+tMX202GTrMyyrG/e6PJog7vVSCcO02bDepxP3GyyFYu63KYn26srUmBG5LWWg4KhgLGorsiCYPSWrM4c/Xmp04N1v8zuYuzvPfgn//df+0+3F2OS/L/+3r1TDMfDQuciTfXyxdUla0vZH+w+eTVsSA80DXMsY87AUh5uLKWYk8pxVDvP6QUZNJpWE+RaicJMHqmk3DmHzlrf4cEV7Xu30UjugLuLuvfo3/7zR9/84OmYKfsnv/mgwZa2WMxKtbV63KdZIVZt3z2fboNAodl0UN7yNsn2986KTdqVTRnLbhQevwXvhUhnRNgvjcLb5AajZLa6HNHFm/C+y93E4J3MbpEg5vz0D341Y/5H45Zh3/4n55EQzSYToiHjOE8X+QbWbN/SedSYq03e0utFi5CPGsd0JLLcl5vQ8aSztH9E2F2465jABJhaDcjDuuppayvDCra6UAdA7h0BdxXtfvsqYY9+478vzvhfTqm2PBoiNi1KKja0aS7luCzWsH9iN4cE82H0eShNLec6tush5ZSa6g4slrbh+wcwgwJhtDukAJloiMWF7lMzkuERMEvZ2K2QApLJ0UAJzPnsu5W6p91/+8uZv/U7u9DtNFvUpJHYWFLG6WazLFZevOaFxXGuS3LVOXh5LG3aw2Ke2nhebAvLpA5E2m1lHRauig8h9+5hDyFnyqz3h3Vu1Wi0bgKTJPTmBiHZsJxyxPNny/6//GP8I0QLs3mpvdwdNk636of7Kbb+rF283V7faKzO1upyYORhezpJ2ZYTwkQfM8egp/Oco3fkUOhBz5LzLvuakUYhQTDvYCG0XiqGN29AR+b1ppS5Xdn2tv1XP/nHl4uBFbA2ZETMbXtCLS15njfp5tSevnxxvKwjLGrU+T59ONo02rxXWLYp50WqLiBdZLV05+FXFxa7802iGoxmuUbq7Qnqwh7Wkj3CQXOLKAj4Zi5vT4eT//F7Fy3YAIWcpnzXduNT2WynzXtXTy4+N9cbXt7Kw1hygXukKEyx0LRrSwzV94elWTESUEJE1zyNJDMCNAbNCMvDHjSapWSJa2MkoNBi2VgIMzWPmn/u3/+5Uk/bPWpKTUob8zC0BC6JTVK08rG9+4mXi3u1+jxUNcV8PKaNYrsJXTtxcqpkr7hxCsqrHtrpFgqmFOgEYLALFuMPDr81JayO3bU9gh6Rer26WIbm/fKZnx3f+cOvPcp1yxbISysHwSoMLS9pO9CtnTiNww3r9rKwMSt5O5Qdbr0OPEHLLmyatpHnkpfFLk7JVtIPuAN5zENCMsF79ZmWl/XNH9vTUk7J2B3+Qsc+BhqR8uYemH7+reHel9rDyJFaNSrtFuhWLUqcErwUa4NPdTIfzs6yt2VeclLU6+9940XltCzz3JblsOjEUtpEJSXkVQUQyLDeWZoarXXWgKTpo29h/4NfX5AYq99aItEUCbC0cMhld/v6J/5WSfHjv7FsXLNnzJGnliIleLM0txwpJU+O4Hz7ZPPgSLNqsLr4wfbbiyWg8fw2LdztceTYsAlvlmXds8renwEiNyuzFAEuDviufbh58/yHXn1UsUZLgUC3wjERlrKsXf6dd9r+9ff/+NfPyBCGWSULMG4PkYcFZM0ZrSx7PL/y8vjV0ZWWzUKntZvmPoObI1OCTuNlHnLkNOfIWJsAKa0aD22YBAgl75drabx4fXs1bi+3fyqyN+LS3L0hUTA0poS0//mfPKub9N2rsYQS4K34MbfqqSXNGNBsCJXNzcy4ndKD3aWdINveimIuaW5Npfo+eWpDPQwwb5Z2i/lqXriLxzCxhgH65Gb/1hufHU1vTYfrT24PDy5XGkmi5M0dFLLCck72V37m8WYY8u98fKlNrbvUqoOCkkXJqBJlIc0qy/DG8ZOXtzeRgAUDYaUkIJVNihRLStDo7Xp2D9V+BkFwbUVnv58wvngxfJQ0PPpu3r/zrdvdg8svvH1bsdKZiOYggAEeyZT58Oy8hX/4q0OwDhOQUkviYOJ4UthJapiXy13UjC9efaz5/pjqKfLuOOfBVNhGyTOZcllaartqI+oy5B5i7p4yqPAmEbG92T/hcJ1sOv/8+JX87pvt4um3pbWh2qszJzGlhpRYeNraIdq/+uDhMjYbo0URwlVdTXAnUbMfXUKS/cjraUj3UzUO2sxNGRtl347T2AarOKsxcDo7trOEzmF3rrKbBBStwZXub8bHF9PLZxcvP/wA937gJ/JNfvdeVQsa4F6DpFDgKSnRj+f1UP/sl0enl2jO1GSbzDpnYc7ZguN48Va6PcLqST9i3qYjx3qbN1hOJ061QvlyTNU3O7HFrZ3A+fQqg71wi965xFI1sNV6uNW3739f+qAmOx0evDG9vrzA7ksv5hYRTT43JgKWahCEs+U5ln/zwVu5pQjSK1JtIYRr047R6nyWAm9dGRHXu3dv/ixhHI9eGlJdjDaX5BiXcjBw8dHj3hLzsikZwCr3d6eo+yfX03Ghnn90tZ+uzvczbm+/0x48fDen3ZN3vhpeI2KJHm9KOtbRUsqKFPjo1yxUXKZMa16qpUhD8cyI1OazqHMZW3DZ+F9oB1k1azmKRz0OPmbToWBM0FbpyENW0bLJakZEsj6dIjM//bOvPD0fE16ofvW9h5t2+uRV3s2x2X/GjG/+6evwUGuBREgJDcnMzH1o/lsfjPUsnOBULFCGU6o1joB5PtFv5+aibfdXL3D5xT9CbvO4LNkQrQYX7A5l0eihxlAymXNoWWpGY0gU8/WDn1H+d1f1ZorvzdaOh7TffPZHvzz+/je+tLeTaX/5GkJ4uJFoSHAmCtVk86tfw7APx5JzNqdOmVhmZGicWGqtqVkIaovFjT24hsNpninVlsc4IXxccMZmbQhiYA3lMFNvhSIg//hf1w++vfgkJcb9Jw/j3htv3xs++Q/+UE/ef7DjuHWjpEZKRBpjoZEpUj1uf/e9MgSyWpnhGKaSck5KqW4mCakVL5M42+aKm7P8xT86mtGJklosKS0jULNFqft9jVpCs7FaVlgo9Z5ox/n0Sb39caehfPWjL33/40cv/uDq7DSVBz/x6nKfNGOrcETIU6Iz26n1rY6P/+TLvxRs2RvKlBJ8HqgCQBUNYyyxJVF9KaXeMNe3r978YLZISGVsHubV0xh23OjIPFidxxNlpkxP/mnbvWQ7v/xCVI/5K08fLe3myd/8k9vHflXeMJybo24JuguJCc5ShMRo86BXv/abH+W5mCGlGGJRjqEZMc/b6jYuzEM0pVrNc7k5Wz4c3nj7OxHW5CkpYpGZF3iNMt+Mhcj3b0ctlhFOZHOgWRbDtYS7Dx+e8uvhVG7Of+ajq+Pxg+lysKYl7bvCSyQKGFJTBq1ZGl7MtVh4O22seCSDqsHMqaQ82/ktWjYLYZm27XW9N97u772/NdCSAcGaOz4E05wslcZEbCPHnRqfJSc9uuL+wXtDfZYL8Oz+Z2+f+ZVGb0scrFsCIqyP7kAFg3RF/k5RQCUSXaXR6qDBM+M0RFJaonjJjWO1vDmrS53q0h4drgpJMIXQLODcRELduJ0KtFHmnEFRjU5nAgA2CvnZr/7I0+kb33r99n374r2L9l4Z5iu1sljJMyJaoiilgkZRLSLXCAO3sAgQgwqxbJeSWizFUWqoVCKLMdn5ML86vY5tfO6PjglLpZm3Et6SPEdSU0t1MJ+SIXcSUGiBAatqY+kGX/7d4bP7715fvnPz4sGjKy3yfIEypOGgcCIxpGSOZPCxLknjtKneKpEtPHHaeJ6GmpZlM6aJTJFawKCNz/dPM0/zabs8ePo9BgmkJsXkakLOiDYa5mFyppQVsD6MR4q74SusL/7Buym9cf7eh4f29hfLy3ubypzSLiL3pqHIgGitmdF8qTXVFirEGGCGpxRpM1e3OD1c3IXsTRzmiiXZMEybl3OdyvPLwwuBVBSXUJXchEGJPo9TvYjKbN22Iig8xcpn3n58/7nu7S52T/PVNz5+uXn3fDrP2wTVU0Dy7oVkylMbAuB2mseAi21DVbUtZqupWN0Ot3NLu+mYl0oplDibo9TtvdM0pVSf3BzTnFxKoOTB25S3tOxDWqwOc8smMQzRhzCF4Izx+kXavLq9rBfp4dnHn2x+yst4fUo15dOrozfvCoDnzVBFImALyjIiAjVtmp0fubFWT1t54aJNC1XCraZkYUIcE85K8YHAm9+tpSkiVSUAPjO3YTzSBqQlGTJBhoxISKuVimRLD3R88eL83qCnT37oreOr8006xHZzeO8k9+gzevJoFRYJar5tgvIIViCcg3MLRkFmrSXs7DAtFnkJLAaEW2kbA+exXTx8D21lRJOBcKpGTaluWmuDslNMFGXGrtjAdHF2O6THh49evNjce5K+N+znlPNQ0u2rk+i1piQGLbmbkRJyEq2ZtEPVWBdQJ6STXU55UcXQzMopHwcgx3B8vnPmeb8smViePLsOASwSgh50YhqKo0hTQ17LYkOCr0Sc2vjZ3z+22D/eH25ftO2HH771ZJxvNm2+ShflREoRhjAizCjXUrJnJc3jwUfOYyFrG1w8puE4u9epmmVoCSoaZ21z0A/bpN1c37xhCBaNToCJYapI6fVgIWTJkEgnXbLwCIj6wp8s8cmSN+P2ePvy59K2Ylja0sbtvdOfNJFGJeQUAUANPkgeOfcJG3ayXCpMjSPp728vlmQL4NbMPKc8i/PWmjm5KD+4/zEJwWpmn/5lhLvJiWy5JqOBFq27G7tZ/fyLvzfgijCUtNhP766vgOub3fDJFzffPa5WDTOLRjXiZMlZTHNJVaeSfNtqcreS583WOLTiLBvMNUfAWcpcVbeQLZvEFG8/bxCYqFDpNhUXLbUEh0XEXdf7OomGBP3H7r0+LZePx0Lah//sl98/24fqzcen8Z3zrSxB0WBQg6stC4Fo8uxAHszLnM3hqTmwtVoJ1EkYL8ghGb1YxWmar+ATeVrKO0sXUPs2LnNzRbSK1prnPrQL6pYVc8EUpvGnXt0Oy6O39sPVadLXH9oyPXudd7t2sbm8nRKASCkvHi1FxSZNhMu4IGSaR+/93zYmpNMLswSviDTMFdnyuAx12CwXkVo0U3rzg5usLgS3OiCclhJrmNxy0AEwJEdCgL0vbPnC3/32r38wnV8+evi4lZ/cvNTNNG622vE0XjSCziHRQTWlvF+cuZnnKAq3rPCxAaYUm3KaiazsZ3PFGFNqpdy/HtqcfUl2fRZJ5fP/LkAmhaVWMyMGGhANiAyoZVMVgGbi3SwaP/vxx7/20eEw591QP8mlvdY94+HeN6fz3VVAhBV4mEBsdpNQzelq2bPariUamHEYyvblsRY2GywiO0sqylP2shyLj0qnXcpx78GrO18RwpPgJQtwGnMY4Awn+9AcOLtJIJbHv/CnX7kp8zEQ1JT2bTeXe1/t08pI5UIozMj9ywM8OZoPnja54rRstCTjRiHi4OMS8Ch97EhypVJqcidhVOWCN64FUQlBMNhQ2GSl0bJibQ4kXJQ1BhUJBBb+4Ge++e3v1Z3JT+efHQKvvvzyT3Pr1r9kKS8izBKqHkynLMUM45yQiznJqLnKUY9bZ7TBIoCSnbGf5bUYs9d9G1Tmi/ufEDIgwVvy1eWbR6YsebYImoBod6KwhJSoOv7E8pVlW+D7p57KafOj//TVJV1EWMlUYzLm+sbhmWwEXLLFOG0w+wC3gZ7DfLrelbSkJcaqSdZK8bxsymzuY1rawJbx4GYiIDcmka4pj2Y2iNmFJutPlZSCYYBadxkFbl+X08atbGZPvPrbL//NgHAiDMyptbAijd9L9TQ9Gl1YlCMNw8xhfJ0ZZfDpePZzfxypDdOgOZoiktDGEowY6K1uXGWpZ/c/Wr3lTKGkpZ7vZJtQDjCI1TxPx9pOESmcUrqaL6+mx9zvtxhe/vCX/ruPL2OdamDmqICnuJyny/unOeUFQ+Rszc14OksZaQk7/vDzq/sLvDKleX+ak2Xf0iGOtizYFjHEzX5zTHLrDWyR0vS6jJw38zqMBAqTI4eM6lxNp5Re2ef+6IhNOb9nHz3+y7/5mxvImie5ydBmAsGcHp9HmZuVqfQGx1iYKyOTOObbU8xZKFka59xqiU1ziyF5zbTkMm54LNuDsrkQIBPS9vTBG0i3yaJ5eDRZDu9anNahABFtaa/Pv/ygvh7ZeLr8+cM/OxYzNJDGseSoCWoDjvPh1OwCmzGh7JNXDinHYtnDTsfjWA9pv0UlA3YxgreN2KmkvCm1xVJv5yUPZYAg7zMfFeVc73387PbKPLw1j4i5oc9dco/eLhPN/Wr8mR+0Gy/xcvy581/9E5PgiyAyW6rNzFu0elgaYt4wDWOqKY9hWMwrCItyYbqdlLelJqTFWyk5DzEX2+XwfJqzsNC25ztGJCDTTJHC99v56urGwt2bpBrRvHfEwijAI4Rlnh/+xcvTFZ4Pf/3Bd/51SwgPpyHIdnPrUQVbYj7MJ8xAFjmWcRx8yLFlRBwPT4A0z7dH0JqiHoSFwW3Jl8Nuu2cZTjMSotmQLFsGUjKkJDWe7XzOjTQ4A+4IWG9zZ7dSKKblpv7AFz9+gbf+9qPDv/ggBwEPQ2JOZo1UhAmoNGlJAksFTkhz3h4vNggte09Y6pZJHKa5GiMftqVs6i0shlKPY8q+qTbk5Fjlc1t9lSUtWWHrvEzJTUFzpN5C2Jpu69Xh6Y/+7rPP/IeX8bXfC09MrEqJVjLrBMltqEoI+FBby7kq5I7B53o1R8pPY7e3Pz7tPcMtZZFpYMJs5qWFM+8UN/m4GWNIJii5KLPc/eh5yBVGQ0L3AlskmdRdb0Acal22X0g/8vcelWf/6kAzI5pTqRSDO1xM5QQm1RqjEuZm7iOn5ZxnziEto0xn5fZ+ztiymDtnpMOcy05BKbm1cbF0TLnkFtH7r1cvvhHIATBSpN73FAZ4kWfRA4gJp9Pm4mf/zmO1X/9u80yYz1FolgrqLChGjziVspRYkCUiks8MB0tGjFGR0tn1ArVAOlVbLNUd6FOJAmxPldhOR4abmS2QsU866v53ZfTZh91vrgAMzoSI1pqfFl9ej+f/yZkP/+4Pel24xNRFFUdtnhDlsj7XXjOWgpwotDGQtrO5zakNOcNj9+qwTbtJNWXAajaYRfOMpc5jHHS0bZ/murIcsN6nLTALEQl9+FokRJKFNVe06j57xe20Y8svf/e6dTfKPNGTFTYuzgBHLblOWSejxZJAZme0GtgJdvOgzMu4savd1jCX2SZshqlq2SDvINxsl4kRqeUysE8VATKs98GAyog+V7C7RKMPbyVZF/e2wOz24/ne1L72vTqHZUQsbWROOY+1F2EX7zzfP/64BriUXGAYm45kuAy0dLJcNW6WOjM2qS1JHu1mx3rRDiWlPa14pZM2rJP7YOtYVFBmOVwGBS1EVaZwJBqw1Gg+a3P88BOM//xrqU0KOFIcIptgOS3hnpGWo223MZaYAi0ngyLObBhe0kryrSVLmvLh9baNmwM2qFyyzymdmBbst8swRHM4me1T02DqeiooZolSGFoPQEGY06RaW9VShu03/vDH9te/8cUpPEcjfYEyZQVRXcTm+tfGeJG2u4ZmsQx0B8PIoU7NMITEIWfMhwfm949LDit1zA2TebrPPEvaLYpyGnbP77p5rY9ldJzdy70hWSHzAK1/y5x1juo+FH70i9+fHn++nahQS3FsjBhzdrQaJd76sX/5Y3/jHzzGaw7amJYqcxtZo9kAWT6AFkHZdLiPqY/pRI7FZqVkVcrTGNvs00ltMyxrA0xahc2H91ImvPevREimABpF19Ki1SjF09d+60vf1TRZaSLmYySGDzm1uSLVi/PPfOZbnwk9uk3DcFzSMI8ntJwWK6yRShohT3V7rfmEDQgPzinSwhCaNie7yOPRYlsXbR5/uPZ7pu5gfXwuZTBB7LP+ZL31NyBvLVpFbNKM/+fph9NtTWSoTVVpMMuIaFUqx3d+49cepVAebPA85yVhlKHmYLYbjSWgkvJpjHnaecYgDZWI1GQtLbYnjgwkT4PvhumlBCjLEwOP7y/B3PoUpd5tuZbwiEDzaF4O6XIavv0P79XFILC1qflmW8ehYZqX0O71rzz8JMEUKYI8U8qdjywR0GChkZPVnC3X2+2GYzJIMlPkXJed34xLKUnKTno8aFeEjEbBHuybKTIQDGntrF85hj5xRWJ59Ybf6M90aAYLb9Vdm5EGYz2B2PzVZ2+99Nw2rEXaYB7rsCTl3i8Pn/YEK3Iqk263OS0VqSiWYklwnNKw5LRNeY8TUot86bcEk9Hw6OFhATeZ3odb9m5VIODrJBfQ5vb64lHbjy9rImGqc4sxYpM38ubImw/fKr/8QPCqIBMylu3By6Yt2N6mxMhTDLnARwPbLC75qKWxpCiTbdoiIMbahtOy2ZwKfEc/9YCzP594UxS5NxlGH4Hbh0N9OjRCcX38ZuM4T8Uio4Y3oQyWckRdXOZnr9556nGClr3MUTNbCk3KOIWPGsBqrDAMYByi1Y+fzou2SZM2IDfVcsRhd2w7n0q0wfTg+ZyMfnaR6owFkcne3dwbd+8aI7nu9WZ79ceZkc2NiOZC2gxQtGhTRDr9wPgrQRgbj4NABThCvhXoSOFJ5hlibIvS/GfWznOVlGOMoOV5rM2Ul7xtpzxmZAz7+gyqPD9f8pSrqlmCMYCQwiN6k/anvYu894jNaTF7C58XNdtbKmNmc1cM5599+HzhMomJRGAyxmawea5l0GRWmAfUqQ02kFD6zJdcnhBmGLNVAdE8xzQ1i3pKIW4fPpDl3WBbbZKQc2/BX+fDhSlMkWLtMxB4Zq8C0Uo0m+eK2FikxLxMLUxx/vJrbWphUyrYwEO00JIVqgGcTJErd/I2wqBpGfdpU5ckbH2WJTOGLy37tLFSVS1L2wdnm2Nl0fZQzSynQJ9HGRHRF4/dhef9eG7uv1i8sMpPTdS4jYjmp7nJdbF9z9sSyeedCM5D8VpsFOfkNi6WAdWCKmlEnpzz7YMB3tyTosSoatklBaY4p/sYJS/j/UPT1qvPpSWY2Z1d/26MTJ9R+ak9PsYHO3mty1RDYWUzppTDA6FE7e0zUy42FkZbqsIQSy0ZsiQKtZihaXOW7hsoteNhSqnFNLdCNYe3GEe/vT3o9iibWpyW1CCoYmqRiNzLlD6awPok4d7IiT48FfJ8zrkq1wjIsmfKW4sgsN18/eZQfYxcUeK0j1Y5IpZxqHOJmpnakI9Ak3gGRXNp9GDLyxAzyylxYYVd1DhJY5KzJmNOc4xLDk/hebU0QjC/ux1AiL765iFgx7m694HcblBtEaJd3OKv/InvzZiTY+GUhtAxMbtbE1pwtGUYxVg4mpbU2nE/D+m8XuejhSDWJoNsWKxpQR5oWuK8vlowhKZsltcZZqBFdyr/eW/u6qBHiKMmBwWzzSArUZcqDVubf/Ft97kNw+Y0p6FVLkNEsGYOwe1pibEsqbSNPBfUqH6aPO/jeFvTbKJOjQykQ66pacH5GJrn7cYM8kR5pP8PmY4vJWvHrMAAAAAASUVORK5CYII=",
  jung: "data:image/png;base64,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",
  adler: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAAAAACupDjxAAAKNmlDQ1BJQ0MgUHJvZmlsZQAAeJydlndUU8kXx+e9l15oCZFO6M3QFAggUkIvUqSLQkgChBIgJIBdEVGBFUVFihVZFXDB1aXIWhBRLCwCCljQDbIIKOviKjYsm8g5q7/97Tm/3+73j3mfc2fu3Jk7951zASC5+PMF6bACAGkCkTDEy40eGRVNx/YAGOABBlgBwOZkZQQs9QwFUvl4sOhZ0kXgP/RqEECy7y2GdxCdDv6ZFDkZQhEAUJCUF+SIMmScL2VqfMpnLpexUHooKZ+QceIct39eM8e3ZcxNE3ClPCHlDG4aV8pwpJS3Zot5MpZIuSCbz8sBAEmSsn6qOI0v5WKZbxqPnSXlQzK7iMeRziOdUiYJQ0NYUu4FAEdK/Irjv2IuL4sDAHFYup4j4uWKZJdipWesFPITk0R0Y44J3crenkn35uWk8kQiRhCbk8IWcums9LQMtmAlALJ8z6XiRfDnPEK07i+2L/piS68GgDkjjb/jiy2+AoCWzQCo3Pti05feR16ay+abc2f8LJrsDZNEogwHC4ucnBxzPo9jLrvwn/qfC/4PfRXPXLadrZW9rS3D2tyK7s5LYItTRXRZpXHSU9PFQnpWBpvDozP+Wlj/2vHvzzE/hJfAE/IEUo9waRXwBYnSJxBw+SJ+uoDOF9Cl0f4M9tUO/9LtL5qrO6koNR8BNdYcKNykAuTXboCiEAESc0A6A/35bv74cCD7GyK0x+fq8rOg/94VLpENWfzEz36skFA6RyzMnptDyQY0IAB5QAWqQAvoAWPAANbADjgCF+ABfEEgCAVRYAXggCSQBoQgB6wBG0EBKAI7wB5QCQ6CGlALGsAp0ALOgovgCrgBesEAuA8kYAw8BdPgFZiFIAgLkSEKpAppQwaQGWQNMaHFkAfkD4VAUVAclAgJIDG0BtoEFUGlUCV0GKqFvofOQBeha1AfdBcagSah36F3MAKTYCqsCRvCFjATdoX94FB4OZwIZ8Kr4Hx4O1wOV8Mn4Gb4InwDHoAl8FN4BgEIEaEhOggDYSIsJBCJRhIQIbIOKUTKkGqkAWlDupBbiASZQt6iMCgKio5ioBxR3qgwFAeViVqHKkZVoo6jmlGdqFuoEdQ06iOajNZAm6Ed0D7oSHQiOgddgC5DH0U3oS+jB9Bj6FcYDIaGMcLYYbwxUZhkzGpMMWY/phHTjunDjGJmsFisKtYM64QNxLKxImwBtgJ7AnsB248dw77BEXHaOGucJy4aJ8Dl4cpwdbjzuH7cOG4Wr4A3wDvgA/Fc/Ep8Cb4G34a/iR/DzxIUCUYEJ0IoIZmwkVBOaCBcJgwTXhCJRF2iPTGYyCduIJYTTxKvEkeIb0lKJFMSixRDEpO2k46R2kl3SS/IZLIh2YUcTRaRt5NryZfID8lv5Chy5nI+cly59XJVcs1y/XLP5PHyBvKu8ivkV8mXyZ+Wvyk/pYBXMFRgKbAV1ilUKZxRGFKYUaQoWikGKqYpFivWKV5TnFDCKhkqeShxlfKVjihdUhqlIBQ9CovCoWyi1FAuU8aoGKoR1YeaTC2ifkftoU4rKykvVA5XzlWuUj6nLKEhNEOaDy2VVkI7RRukvZunOc91Hm/etnkN8/rnvVZRV3FR4akUqjSqDKi8U6WreqimqO5UbVF9oIZSM1ULVstRO6B2WW1KnaruqM5RL1Q/pX5PA9Yw1QjRWK1xRKNbY0ZTS9NLM0OzQvOS5pQWTctFK1lrt9Z5rUltivZibb72bu0L2k/oynRXeiq9nN5Jn9bR0PHWEesc1unRmdU10g3TzdNt1H2gR9Bj6iXo7dbr0JvW19YP0F+jX69/zwBvwDRIMthr0GXw2tDIMMJwi2GL4YSRipGP0SqjeqNhY7Kxs3GmcbXxbROMCdMkxWS/Sa8pbGpjmmRaZXrTDDazNeOb7Tfrm4+ebz9fML96/hCDxHBlZDPqGSPmNHN/8zzzFvNnFvoW0RY7LbosPlraWKZa1ljet1Ky8rXKs2qz+t3a1JpjXWV9ewF5geeC9QtaFzxfaLaQt/DAwjs2FJsAmy02HTYfbO1shbYNtpN2+nZxdvvshphUZhCzmHnVHm3vZr/e/qz9WwdbB5HDKYffHBmOKY51jhOLjBbxFtUsGnXSdWI7HXaSLKYvjlt8aLHEWceZ7Vzt/MhFz4XrctRl3NXENdn1hOszN0s3oVuT22uWA2stq90dcfdyL3Tv8VDyCPOo9HjoqeuZ6FnvOe1l47Xaq90b7e3nvdN7yEfTh+NT6zPta+e71rfTj+S31K/S75G/qb/Qvy0ADvAN2BUwvMRgiWBJSyAI9AncFfggyCgoM+jHYExwUHBV8OMQq5A1IV1LKUtjl9YtfRXqFloSej/MOEwc1hEuHx4TXhv+OsI9ojRCEmkRuTbyRpRaFD+qNRobHR59NHpmmceyPcvGYmxiCmIGlxstz11+bYXaitQV52LlY9mxp+PQcRFxdXHv2YHsavZMvE/8vvhpDouzl/OU68LdzZ3kOfFKeeMJTgmlCROJTom7EieTnJPKkqb4LH4l/3myd/LB5NcpgSnHUj6lRqQ2puHS4tLOCJQEKYLOdK303PS+DLOMggxJpkPmnsxpoZ/waBaUtTyrVUSVNjvdYmPxZvFI9uLsquw3OeE5p3MVcwW53StNV25bOb7Kc9W3q1GrOas71uis2bhmZK3r2sProHXx6zrW663PXz+2wWvD8Y2EjSkbf8qzzCvNe7kpYlNbvmb+hvzRzV6b6wvkCoQFQ1sctxzcitrK39qzbcG2im0fC7mF14ssi8qK3hdziq9/Y/VN+Teftids7ymxLTmwA7NDsGNwp/PO46WKpatKR3cF7GreTd9duPvlntg918oWlh3cS9gr3isp9y9vrdCv2FHxvjKpcqDKrapxn8a+bfte7+fu7z/gcqDhoObBooPvDvEP3Tnsdbi52rC67AjmSPaRxzXhNV3fMr+tPap2tOjoh2OCY5LjIcc7a+1qa+s06krq4Xpx/eSJmBO937l/19rAaDjcSGssOglOik8++T7u+8FTfqc6TjNPN/xg8MO+JkpTYTPUvLJ5uiWpRdIa1dp3xvdMR5tjW9OP5j8eO6tztuqc8rmS84Tz+ec/XVh1YaY9o33qYuLF0Y7YjvuXIi/d7gzu7Lnsd/nqFc8rl7pcuy5cdbp69prDtTPXmddbbtjeaO626W76yeanph7bnuabdjdbe+172/oW9Z3vd+6/eMv91pXbPrdvDCwZ6BsMG7wzFDMkucO9M3E39e7ze9n3Zu9vGEYPFz5QeFD2UONh9c8mPzdKbCXnRtxHuh8tfXR/lDP69JesX96P5T8mPy4b1x6vnbCeODvpOdn7ZNmTsacZT2enCn5V/HXfM+NnP/zm8lv3dOT02HPh80+/F79QfXHs5cKXHTNBMw9fpb2afV34RvXN8bfMt13vIt6Nz+a8x74v/2Dyoe2j38fhT2mfPn3V++BlHZI5n8P5qnn4O9s/1h9LqvYfSqAxEgAAMtVJREFUeJxdvduSZVlyHOYesdbe55zMrEt3Vd9nmhgMZjACKRKUCDOa0agHPsv0CTK+ST+lL9AD+cAHmSSDmWQygABFgRwSwmCAuXVPV3V1VeX1XPbeK8L1sPapbqi6Lbs6K/PkPusS4eHhHsU3vExBMBMBCABFQKAI9U9RFAEmBUAU+e6rBZkIUaLShP5tFCyxfp9MIoEkzi8qEhJECZCt39L/jBQRoIgs9vBvSrVUazCgIVyQQAEG0kAEzJACDSkzykC3gBkBGEE5ZYC5YDSIJNd3pqSQAMkkDQKBvgCUQTKSEGGAwcySJOC2GaJVVh5++t9zsjCnKAhgJpEQgSQ9KME4hoEeUl9oFxl9eWpClnV2RU0Lg1wwECE3IdOyZGSZq6I0Wl0kwKUErZWUGZAi4QBpCSMAt0Hlzf/4L4v86aMlIUtICiEjAWR/lypIobh7Ke4GpkCRAABIACFISBIJiEIkGK6EABq9EAHMDchMkZZ9NwmpEKBl3zHQGhIkCWU2bmPPIjSlEEpGKoTI6C+QUNpCwIPen4g0iFifr58mCJLWzYYAS6ZJzP5VwVKspVlGKqMfs37Q+kuJgJgmMPqJJEnQiIsxizWaSeV8ZKRUioJShgVFTpJWvPQzh/OrvrsMkKggZInsByMDISgKYLlYrZHRsLSGVH+RJAAYRBNAuAhTf/00IkkwjIUqZlKK/SoCxkRKApKmdAMNTtCs310aJUMAZL+QEkuCpDwBKRRLc4ulkdWsimOCMcUyt7Y+msB1D/pP7sdKBNcrBOQMlCygQRIMaMaUQEggEgT7LzN39/MDEqTgXPcqREHWowUj52WJktLGFelN5dgqiupmO8f+xIVKmPjtWVlfE7L16Kz/oRlLkkbBmDAiAgDZTwoB0QEzGuBm/Ut5DhQEEgJdkqi+/limwzFYSuVSHLIqo5dTGXwswO3t0Za+8h4i+oL1lTQAhuR6jASlqwAsISEt++mkZ1900xqgaG4kzYxM+/Z9EzDBRJ6f0FLzdJoNoMIqqkUZzFiqTZPXcsFNvTvOU1LRX4Ds1x/nbe2fIXo0BApFLwoxmZAkVziaZ4/6lJuR64f1BfpFtH5+QEBKihIYS9qQDWQszS92E8umWHJjivulbLbPnzzc358yEMn+zectBkgIRkIygkRLFqS8NJZkkkFTyjMomiXIhPXw4u4k4ViDYM9dUI8L/Ww2xRKRgMKrKE2+I1QdwGCc24N83D26290/nJT9pPQdPv9LiVg/1/8pALzRJQOQBokQre+yQAjmRjMzMwLssQAJUhSFlCUJIamAFcmMtK1LsDIYT+Vq1LFd7gxQc15srt7eH6cmrUv47V357rM6QKiINLiERNAJKEHrycQl0Jw0MyPNAFCG/uT9MhMmCQBSzrKI24jR67iplsnigGUbtuXIyzBX06Xlrgz7/bRkg2W/dH2n1utBAkamIVFIM5PSIRNE0STJ0JMu3YwgjbY+YL8bWvFIf9OuREYDYF69uA3jUN0zkCqtpQG7ChgLpFPR+DjH4X6ZfUmAYNJAnc+g+vOBpKFARlOYJAnWoyi9Q6F+l8x6LISdMQgTVJ4zMixhmfOcQPo41nEcx6E4FYaMZYqCbSnVWibrshhzfHwsww2LTdkhyrvdBS3Z0z0hopBBUklTkvr2TqmHY6Ljrv6IguhImfBuT6gkmG1agizjZrPZbIahmpur0KY2p8kMhVPGnDjmJau5V96fErMkMm3dG3pq/b1JAAp7qIHANSuSJuZ6GPqnzYykyXrI9xRFZkcgFqRyOZwAlLrZbeowllI4mNVqvIgMM04hVMV+2vHhcgQGq7TCk5pEGEjQdN64NSuJLJLYD7pIBc2Q/S6ox04S7kYaSQBplFkPLujwAkTG4QCy1M2mluok5e4++mCeCYHjKTPMhn0gD7ttpI0tzd3n6Yyi1XEY11QgKAuKWMwVljCmLPuJIAMUleVd/FzTpRMgUz0BWIAApcNDo42DO2HmpZiVfsGKQ8zMoQYasR1PVtohMQdsTC91nxBEZMeI5+MoQDCokKKFiZJFjx+w1Jon/ByNVwjfz3D2AkM96wNCnk4RWyfFWry4wZxQMyWNMNI75ms21FOeDoxozurjaDzOffEoOc6YSiLpyYJ+W0gJfs4OK2j+FjqvwSkIZV+y9T2qB2s1cnQoWauPTsINNJekJPvBVoUMxm3sdSJCFTFewaIteb7IK5pd/28hCjIpE2FYlClATK3hRucYb0opaaTUL3nPpBLTJCWrrCBZSKcZnHQ3t14WZI/tBrktFY2yydCQzbYX7XhYUSyY7yDmeceK9QpTgs4I/tus00/Hu/Rra1jpX9cjmARyPrSEV2/FylBoNK8sxVj6TwOE6FWcM2VIq0uZUObFx81aT6xwLc1y/T+RKKD1U7YmLJ0L4DVhfPtLhYa0c117LpghxXI4xjhYystgMKK6u5m59YBqlAhlerKokbAyV5/G1hZYsfOqiIZkxxHo9XJJs7Xa7LgJ6mnsvJg8F7E0Is16jbO+WwmwVDs8HAdSzdyRoLt5FqeRFItI+Jp7TLFCveFktqAdTwkj1iPlkiHSIa73pgBpZK53dd3aPIcinre3v2oPQN9dWALQ6e5AIrJjRWUMDitGK0VwA1JiuAsBCEbkxk8SnUvLRn8HZ6ReLvWXTgjFJLI/7LtM950vI767y4SY9u2md9zRHvYaCpp52dRaDBR8KCSZBUbB1VDhCQWFMLMsA2QOjGherP9kdjB1TqIiYSV1jorM/gMDsPM1WgOO2fnYWUf6mT1/Ksl2vD8ZGUqvYxVrqe4IFJpoME9YuggQ1iGLCJaoUbwMWqoZTe/e+xoiKEmm0lHEd5dpDXPr/vVl6uCn0yFIGdjfJyG1u4c2QBmlVC+1Zy3rYHEs6UY40AEta4hK0sK9eVbBMFW3PKN/vjtPImEo7GTWd3/p73wxROuFTC+SFFAY14MBtIdDwCjJhk11L8XJZjRfasl0g5EuKmkJ2iKT0qUqgnTnaXdcVrJrzavsS5aRKAKQa1W/FkDr8ymJ9SIa0UmrfijX7+/Z+nBzd3KTMcuw3bAMtbaBNKN5WWt+EC6ZijJrylOypEcFzGy32bQ5FUD6yuhZEhQKWIAETe8oCZJccYyteJk9iaxvz1ZahR1zx93bvbbGVKnDxUbjYA4UK85KlrqWluZBAJkurXycRBZzUxmHDaflHQAmAKQTJqqg0zHrDVZ25kbvlkkAYVb83TUDoLR+OoVlf4wClmzVaq0ctAAopRIAjDBPeZGyQIxkZH+jES0kGVV8pGfkuZztVQWSYEEB6CChjmBI9cK554ke2kDnCm364ZWDkiOVS0uBRQuslnEDWls2BbRiWqsZ0j1VTUmHqDCd061JRKigRIR6+SpZP2RJSAWUkEGzWMmlNWATYr7jZkBbA6NkpCAYUtIcQqk97iOyWo5eB3MrNptDzqRbP76eCSNjIQWTp6SU3ORbLkv7O5GkYyyUjiAowfJ8iVc+0eCiGWFMCEwTIbiQnUDMzPm4wKs1wM3iNFQzH9xKpbI4yLQOgUTrZzqBDL1LTYk6DPLdeDz9nQfsWYkskJtJgXcAH2cgA0BOmYFImBFnNESgQ9rlcJjkRonm261ZLdWqA+7rNiF9gILOVNIVyARSsCBBM7NWmb57fHOOu1jDLzJS5czZ4Fzp9mdkDzNK9sd2NxK+pmtIQohx+/pughdv4jAOtW4uRhQXyyDSOpdpvcTqyEKBdcNU2EwkaMXSd5fbY2839INoChKOQutXuwOGNcohV3qRgjuNhLL0q6M1MSqodvM64LWSMI4ltanFNmxe2UAt7klaQ3VbM5JlA8CiTLo3ZQJOopWrbZm/k6/OpEjpWOtM+8Goc+bjijxA0N0dEOC5pmyZpbQEaNUDkOJU3MumuidqEs2VYGKR24pstXgmkrBIdoAOEG2y1DlkrusFmuhE6by4pXqx9m0xovNlgjlxXmishAyIpAQTa0VkzEkbTnd1rG4cSmR0LpIpdzEMQCpTkCLZ0oSV4JKyuQ8Xdfr2gpjI/oA9YaE/Hla4CoiylPFd2sjOf3YUnVg7SgaO1U5LU4Zv5geQKJ7uopmYylJgHuhgnqYUTYowsJ/NMJZ6dNhYPYGEQ0ZBSTWhIOO8UuvTo//puxK11/RnxnulTMDo8chryaktYu4NpwWG9niACFiYAVn7HTcGKUtEM6qlvK+DCRSLRUutNedKvPRkX5Kk8l0QPF8UA2G9gwVzS/EdnO3XJxmIZeIwlHnKgJPHODFxehIXRgJFMkW20WkCUsgkCc0pobezskPl1GmHyF4xiitXEx5UoafQ73SvncC+iYSwolWu+5zo/Y2ebJjHbx5sMFsmksVtsHYzPVw+u3+sq0pHaZQ5qwdNWlKEo0UqQwQUmS3SDRTmxWS58h6iiUojHEUouVZMa4TM7+L8Dg3W60+dKz0CYFy/Wi5GjywZzlqH4nmTmxdPPzx871lpZqVlLf1IpyQFkXO2RIgmKCJEU1uabQDFuxjdj5RgQCGNyozvPJKk/Dt1gZ+Zo28DPQXON5OXHY8EYKU4SyXe3I/3r18d7T1SyGxpaDA2UzqUbVkoKeiSokFmbW5ZtmjT8o5W6GECIDqzQFhPjyuoFQ3flniAGWG9Q5voSIHMNs+wzWDhHmaXmxhHd7u4Ppa7+1I+f7wLZsuNmlStWUJN1rITVWpsS8tUSrmgAMux9ajbCe8ejIMFaGvmE1fiDYS+s+c4PyyAWAEhSfF0irH6sGyniZcjLgeUzdXzm6/e0N58fVlg1pYBOuZgKbEwJVldBIFLxhRGQ2SGlak83AWRa7+uBxZS7R2zALAXeKLeUSWdoUR2WnFd/778itP1NAw+XPjktnvv1hRDm/3qB3/w9s+ODzev9PHImQVUhkANpkp5a4wmCtHW0rGFFx74sKRg39JBoqBSStIlqJ9iJTpJQYKJFQRyTSMg9a6RDD7cZPXh4mIbD6erdr9hbJ6Oy9dffPiPfvCvb24uH7+pj1iqp1LNimB0Wzq1lNkEuugp0iIaynFes+6aeDutmUVrI6pnr+9wR9/59Y5ePTPTgjLvZ6SNmwvk3TTu43AaH148/cknf/Wff/Yv/vkfv3r0gPdb3Y6+j5iNreZcOyWf5t4kSQU9tyoadVjATH7nZEGZLIZ813bsHYhvuZkz+HpXJpt6ewcEpmPAd5e7YdgcHkqpm+V5vHh5/6NP57/9V//8x//+q/HTpxi3m2neN5/LcCy0UlJesMAcIbpFpmUL87RpnysC4PkeQ0wWIDJXZmuFEu86aOd2jfXmFM+rDAA+HUXfXOwuqrfrnDYf+mVON1dvf/HZB7/983+4fRFvx9/dXYp5Ch0eNojdo0f0ysEXCaA0JE1tOUYdo+1ndFQFnPUSUc1UACv/v8J9BV3fbnAvHLWWMTJKbA9Hug8X1Ta7fPS2PNpdvWftqu3ef3P19Obr3cuv7z///ZFpOsz7+7d3p6U+//0nvtFYUrQQmRHC3FqO23m6a/oOHug1k3qfhAnSYt1JWp7fhkSSRtFAk/qHvs+Y75qSlAm8fH4a6qXjyU8O9fn4J19uNvdXnMdNnAZbHl4tD7dvX+3Jl2++9/SJsPVh60xggaLNy2w+2PG0QgX2anatH01FWkSL86N3xvRdFS9olcLIsdZTCRlyv0/JBmvepuGjt/Sd7vP5J8N4+/HdfpsfbX79ZPzGh/byizd5c31QyTx9tf/o8Xu43Ty1MXvCyiVDlsPmbWbHMJ3d4Ln+QCEsz0hGK7g6xyKeeZDOyfYwLiag+W4PyUwZi2P3FAQvcDM9HrbP4ueXH+3+oD68/OyQv/rLhwVzVquR83K6Q2yKLykle2dmWQLYoglaWUyuBXmPKEUkmTxjclAMrXFQPcCo8zdGdZAJqN29mUB3nAqMMY3x2Vcg0G5t5OXT0/NXP/38g0++/8u3X9zcH7IAQhm9bLc67XfbYzVDEyFoOVQby7JEr4WMvR43dCINBSs0Q/YEwu/cj45s++H99gOIbG+vQdWBmW3Bwu2L+e99UZTelO2Nlj/mH/39px8cX5T3r99WKwikX3rUAYG3+dwrgpIyGMswisdTpFEErdNYCaMYgQJKS0YPQIl3afp8BlfOC+BazkEG7G8C6bUYLcOSfPSrP/yvf360iJyX+eZu96M/fH+r7dVXzy4vEJ7J3eb59w9/efvU9Pj4FrlxoynRom7rrIdTrjKmZIKUTFHSHEVANCgzE1hlPe9Cc9qKfFY+KQ0IgTocQhh3QzHRK8IuL/7z55+8bDNwuH+93330e48vtpo39kX5/Leqxerl40v88MM/P1z5WE9Hb5thqA30oYzg9PbUtTM9w3XG3MJAFEJzSKEIrs0FnqlCrp11ca3ulZQJqWWBsV5cjJTLbCjL9MGXv0wNuHtzq8tH3/tgNFCY+LsqLzXsLh9/8HT6m/J7v1629fHrbEfbulI059x4ultkaSEYw0Hra9U7Q8DSpEAmU5mgx3c2d2VS3y39er8rRR/KOAz1oo5ldJyGTx+u717fL3zWytNnl5vq8yJdfXp4/cWtbS7u6ycf8H8bL/desMv7y2qIgGJWi/zqIVIiEtnRfgeibkIR2jQjRQQzQ5ZtDUV8V9JrVUr5+twsF5uDm9fBh5G7Wgu5G/3Ddnrzzau7GC4+fjoUz9a246UNzz6Y+PFfffOz3/6j7/2DP7M2FmJpmxGRkdEmNxxf7SPI1pNYgCbQEkpTEXKaIdGkTDIBkXEGjrnW8lrJzF664+rTOPq4qTRycbqVoZRmj8fDV/vvf/zoyaNi1uZ2NZby8v493z35+u30sz/5Z//4OU6x43BbNrXwkHMecojjq/spV4BCJej9p2TajGK0aVbns5VcW2FYq0+d+0lYJWDrH5ZPjr+ybc00Y6WDxRDK/Te/fvnpR0+fPN5d1tYiLq/miqO8XP3Ocjc//dOHz3/d9s9jKp9earFmbFm87W9aNkiOBA0ooptCTG1VlLnMglHWu4NUp476noLI1LknprVnJRh86KwEzRs9E5h4+3///P3PrnbbYSxSy1KuXrTtcMfjmx///hd88tP/8JBowPEHP243b7FNznaRfJ+ng3p0CAtaY2eBmRKLkPMiWC+TqIQF13RsK0zsbR7i/AkAmqwwaUELZ6YaGF9/8WrzwaNhrMNoLVNaPvjy8P4DTqm3z/7LeLj8+O10tdxf4/kll5aSxBIXT5++/SaVQgoJ1d4YMQTYUAi2BplTMK67SnTdGCXQO63Ob8s8ATGxRIDudCJzYU5v//pre/50W4dxU0HRUs+evf7xk3kzY9MeLrY/+eyXv53n219+FrG7Wo7TsszaXo359m5uSjEMhDU6klRA5ijIYCMTnaLlKvcVBYT1FtEaqtc8DhGYZgjRlKnTplB5PHz11Yv7R483ZSzboQQQWeA/+fftw3iYAsgY3ysx/eZ6/ubj48EGjyXSN2Odf/7TF1Mgu+gzrTaUlMmAVlAktLau0loNmUTSlEw7dw6JNOTKfEk8NOdKt1sUKu5fvnz5zWnaPr7kbtwUmyOAOD764c/+6Fn44tLel5zGD/ZfHubDfru0KcCLnR1f/OzFMSApPLogMcPM05GVKHBLmWRGSZQQ2XlzqldYCSmsi3EZkQiJtzGYl6JspRLK6TAd39wDr97/eNwNVZkJLVOr38+//tyu5wnZ5ridPn3y5pvD3ekUMTeFuMzt/noKpARkqrekElSXc7YiWud605CUI2EIRLJ4QlDGrIijpqk1cFmETHCSIwzFUiQYzXn7MGfsjz6wWE6nJDJux/FHX/xtwSlOx9OkzUf16fbL17cP94+2F8d9pM/E9SHW/n0mKaUxmSgBJb0QMqaRSOOZnEMSWAAqoJyRWtocLSQLdIGuZyo6AhfaMU53p5YZy2E+Hreb08OSIMcXUfn5e7+4Oz7Mpg8eFw9evPrFzavL7ZPNo2NkHco3bw5LZ2t7lMiCpCLhSJAF0ZlIgTJ4J9pS6Fp65kK1lBS9HE2kTGk0wkqtBkVprc0PJ9bJdHzzZldtnk5BBAd7cTWWR3//1e3tNOyu6sQl7AdPbr95fsXHw3CAFb+5acjcnNIByzRLhwREpzgLkGkd3J+byJlKoFOOpFJCZm90I+lQdiWkimVs3I/zJkPLJFsY13+Lh+vHBaFdWOb19ZWlv797Pu9tKLZ4Lo8//vr6YZ7vtxcPrdjtr+6TQpZZHUl33bghXAJRzAxdqZe9vZUBKdH7zqvYK4XeoERXponoXcdW4fv9BtmsDmML5/7Xp/eev/e4LMuTzaadDtePajEbzWxCekaGP/GXn3y4VX00LcPyi18dJGIiaSlK7h33McxgKtHlytaziJQtjAKDMMoURp37ZEkXUsZc8Svrdjzclq003V1cLnBguYs3L59s2yGe/fDReDne3l8WuNIrlobW5sar7fXXPx6G6u/f6MXP7lMSOufvCVPX+5JsSaAQnZTP3keGaNaTLUEiv6XDOqRcy6m0yFRyO7w5XM52e/d28eIDqoL76Zur9mBfvf3J7z87vT0eikMgS8zZ2jLHMMRpvCi+s8Nv//KrkwWtS4TYG4KdrSKcmSgEy5LqqumEqSqIVO8inEso4tuyHY2UEZlmA48n13x8eZgjy3ZXN2U62qD3cBivdj/83vHpPM8KC0VaaTNimgPKaXKcLseLN18uNK31WlF2c4kY3ruy/ZJYb8ud8xnO+tm1rAO7CUEhOM7ehyRrGWtr1h70cHz86Ob1vB3xvXo42AYfNTx/rz4jHz201gJLuocPbV4ic2p+ur5/lMtw8YSo6STEZlq9MkJYEoaQq3RkRU8CcjYoSPTiyJArTu01e5eRGkOkS2VXyzBhur+9H6/G73/4MF0/+2watvePPnh8vxsuuZRBj+8zpiK1ZgzT0vL00Ep8/eYi5rF8+NlNmAIZNEQHm9mjYdccsACEpQO9neiZYO+lAbBe5XWcSqGf4S7lVLaoxSpPr18/XLS7D5/+8OGzT48P9WF+9KzGc1kxVl2p5AxDMCNbEu2w1+Cv3nxoi/zR7/3mPrKHCSAJk8y6jajrJArkKaOqNyrMVpNSyrhqHtMIV2DtQSoIuCESYCt1O5RiD8fXv3n84ebjD+5v6ytBRtWH9+bYchclawhZ59A0m3nby3a6OVzEIcunn/wNEjBGGkgFlc6OlJFIFTIF9aYuqCBFZXJt0SnTKEGWqVXAF4YwxLwc96JfZdnet/v9IXPzi/m/u/gbPHo8HDHtmXPZhG1nQIKmiIw5Gpe55OXVm3urROx+5+WDRNBXE1pX00JL6S3cotb8neC3W0h6H4nqvSpaCtJKv2VvfCrIdjgd3YuNj7Wpl1/v6/TQ/s9H//Tz6h+UZUJ7PPk2hWHJ5kuK1lIMm47BcvXkm+vdkbDN86d7z8zMlGXfvrVb6Kvews5SgFwLj66p4VptGkMCM3EWbuHsozkdNmalolxyv/vJdby3/L9f/au3f/jhZspPn/wq3huS0apZTE4k0HJK5XQMjeWKMjSDP/7g9RTsWLWTCoLB6EzCjEWZRarIjqrB7CokIhNgCawN5ETJd8o3CcHT8eC+cWlcji8ev3+yz3/0F//h//rrYajDJ7/3eYt5oo7bUY6ElohQC8X8MGkzPPvAHfIalx//YrIe5Dp0t0aapUovJgt8CDC7ZwVEpqGLEbVWSx1JAwQcOAtcKbXjdpzcjJnD4cXxd56E/YsfvLy93z/wzV//6B9s94tFMlPMTGaDktlO+xyvHj+9rVVWNsDzx9dNMEXAEOZcWUnSAEOhG8yVAgxFvZeyKvGyA4bOCVoXnq+0kiHZHjabMqYrh4Bfx6ff2/kPfnid83h38+Wf/M0/fT6cqie4SG4RiAzk/HBo26unw7QtYaVw8+EPfhMpRTJXGT6YfSmSUoHSTIJDNMZZdtJpGdFSyi4FsrNSvN9kBXA61sWKg7FLu/nmxQ+fvY/txjc6/O7n//Z//clm976rxUKmcolo0HL7esLOj1/cfDS0Yubj1WdXd1KyKww7620uV8/IRYzSiVUjAh22CHKY0lrXgKVFL9IFl9RjPJTHXQtrQy1udkh89Wr8/LNH+XhZFv3g2Yvjb+b3v/fMRSiyTVOkZXu4uS/5i9/k7vfNQTPzZx9/KTkkAyF4YhW/FYoqXcjRVybO3PlcClNYKzlk+tpZUYcPvXZmPFzAvI5uUes4xTzd/vRXz58/f28Yt/nBJ+3NH/+6jLvBl+ZxaPPto8sNry521y8eFB/ePLPenLz6nZ/eSYw1PkTvpEdhwIACMEQYevkDUWqzDEqS7EJ7EwiVEFdxCFMub/P944vL4oNps2nzsizPrtvx7enhcrfZtak8++d/2hZDANlO893+48eP4vLjP/jqL352o9OxOReCZfjo/dvujyMhGcLkPVyIKAJqGGgriZ/FTvBohUwxovfFaKs7EkqmREuXiP3b3eW4wUh/nEtqOjyKCFsmIL2O9ukfvdACMqaHm9tvPiuD51b8/MN/+J/+Yn9XFiyGIjz58Jdh2YXQQqJShjZ00FXAfj3YoZUMS4qYchQtI7vXj9RZ2k2ci1OW1vbX26FYlDAfR8d+H6eDKC4kG/DR9jaKa3n79fWdPapaqstm/8GHP/iT5pkxp2S7Z6Ulqa7f8X4/K7tyrgDpJlPQzSYZWhK0XLwmYBb5jm5dmRkHFD3GE8f72425g7RxHGJ4ytPtvhWvXhkwWXXidPPVl3f54yeH6tVNJcL+4JOAHZcNLVE+2J7WJvRqPWZ3/HiDFUJr6WYRALJLVMo8GSK7R6xT1UZmD+AgM0uVIU/3FxfjPHBMR8SgyuHidt9ABFOOhiXb3auXr+YPPr66v6E4cMjwLC1gGc0ke/b8TkA/eBJNzoQVCsoiWTcVIiXPVZ1GljgNHZ5CICy7aETZRUtUmlEzp5tx3E2e8vbggz+2Wp7uHpSJZrG0mFseX3/5zfHJRx+cLt5yXi6HjblFWabYSjQ0vP/9Xyq16iR6X9BIpydVAJj3OpgupKmlecK5hHu/xk4A9BTUC4ckFe6Aq93XUtGLq1M89o0Rw1WcAtnQdIzj8fqrr99cfPR89/Ip7k5TXpYKZxZOS1qezLT50X98y26VQ5LZ9ZZIiCx07x3tBBNAygKQwXNZxgFMMHuksdaFQdk9OXSHcGgPZvFUVVMeltSjLYuN83iKXDyneT6+ffX1dXv/0w/x4S/fu324n33oRcUAmxdZKa5Pf3CT7LoVGCEmLZvNmSoAvYmk0ro3W0W9QNESQUOAEj07pEWuagJpx5A0n0zLsuzGpd2k16Idmnr4XE7T8fb+1evb/aPPntb9B+UV94drs+qyQnev8zS3Unnx+794Te8eZ0BGS1gqkVagpXu85FzboNYkGFhQvPX8YwS7GdUcFglKcxkUTi0T2rx/vsXldHw07bNYRCa1tPm4v767/fp6wuWV7cvb8boW7X8Wg8bNOBaaj9Rh5uCffva2Ex70Tm8QMlh6FMu1jirZpbNmWuc9qJQIkJArClOCzAKWCrgt2GS4cz+flliWx4+PdzgdFnEuaorTMu1v3t483Nwc4R99/3Iq7fEjwbRsRFcuctKGuWqeNpe/94v7jl9SNMJgSDeYlY5bk8WWtautJqrfpehrTsGT6pdpFXtGaVEBtcqHeSH2RxyOw7xMIjwMDe3+1cu394fjEnzv956FsQ4WKLRwp7yQ4SgXlnVu/skHx/SugzHKqEShIVHSzhlwJYiQMifoWhIs0bGB9e4PGh2NVjKFuZoZtrXeTjpxvquxxX64XC4HFs7L2y9//c0+RbJ+ctHKqDK4mHMAcNAskZblIvJ4wKMPv2poMsg9DR3RNCWL0UIyBDsLawkzs0hKJoXYO+sd4qoY5UqTQacysPjFZvTbubA9uA73Prx3ejqMwzJf//a3rxcJMA4XlowLDk4l56lxoVFRCLIMDafF39tNc0l4dFaUhoE0yyKEm4wRXY0NmkW8UwAJRJopTaC17JqKoCXVOGgsGsp283XAzDynpuPd46Fu5/3tfYwKMGlxd7u72kTtRrvTjKxEo3lJuCVZWhvcyiwkkKUDmS4DKN1OEb3dn+HeQVZvwsMzCfPocwoWM8ml8ISJ0+kZqgF1d39YNi6l2SZPp7fuZsg2JyErGdurQYd2qrUMWu4fOMJpHLwSVoKAjZPo7nP0K+xEUBQLSy/a0mRp82LukcqVWhKSFu7K4pDJQFh3aMvEOG2sODD99q+PPFYrRbxUJs1pzMhAScE++Sc/atiLoD0sWny3WaLINiXhhkCme6GijmjBFdmpG3lY0iw71wtBnWBfCWACVI2+3JSaE5YoQtJlytgYzfm3/26P0SZfaql7De4m5LJEC2Ty4sOffC/BZhhGU+Ql05vMGIORLSXY2NzVCgZCHmjWw7UvqUJFt+doNU6KFqsr1xNoZ40NuzWVKA01CTKncchi37ymIxtDOW9bQSoC2Vo007L7Xi28L5dHN5KxRMqwRPFRbRncYsnOJwyFs7tbKLyAQnZ9aOmhpYcYMcMhCR4SGCDS5K2n6m5FL9/aXpbhQnzx5fDp1/uyyKW8d3rZWsLqoMzl4vPHNzm5nQ5lU7LJ6CRkbmOoDUbrs1zSqklMN2tDipB1fYwKskva6BFQVMteYLLIkKmOtEs2mJIqZJIJ0bPM3Po3v37RuD1wo0xYKCOeP1MxxXJw2hN7Oow6LFZjGgqNUpJlczFOSxdoAGKEvIAKmA1xotJdXQZaqOj8dbdPYOXSAbG03n4CPGVC7cy1Z0O32kRcHR7sdOOTFUcOjJwWXz78o1Muh4eH0y4hjhfbPKTKMLTA4E6h1s0Iqy5FJpG5qBaIMiWtjBMcaWRpVJGVIAVFUW8dSqt2Zuka4HXeAtDNYd6lPu5LSWxvh9HnOS1ZN0XHkAD/L/b76+Kv7j5vt+F5xJJLlFp2i/xy44WboYI1zGigZWvmi5EiFIT5ZkEf4lOAIpaWtGwsNFsEJGwB2GmulEM2e2cT0gDEIu/tk2W2obZGbiuKWyZFk88XA04PL77e1c2EyYYW95GjDxfVHlnWYYQBJjmEEulW6rRq2gwKsDI8emsJBZxEZAgzaIgxuxwPDOuU9OophaA0Cm0hRaRluw3a3KwOlj7qsDSlbXdjbsrpb/4qv4fcxB5twpfzZhiGuX1eWr18tBmsAGkFmWah3iDKLiFXyuHWWUzRCuTyTFJMes2gSy5196P1Byxd3FUFuEdAMEuhXScZS+KQdtoiFvH9j7ZvXn3zyf4vvsxNHfj2fppy3h/8ZK7D4+t4+gwmOjNpJlpnzGkGBQEomFCxJMhmVCHMW1dLwZSRzsTKxLqHBahEAjTQ0zutScqSubBIytwtufM3DvzBP37+xZ+9+eqT3/zcx20eLvTFKVtvCuxn2/+2fHpZgbZxJwQF0kpDIWw1PkKEAsXVJEoqPdowQZnHSk5KSJQI73RWPxwOuUCxm0kBcEbsH07mLNxOLcc/+m937fR+u72/fthueH96/epucWYRPK2gnR5OflEiZhaCZKbRHGQA66AWM4GZ5kqUZirQOPVgJAtZRDe9J9S6TD6hgIvWeWAgFrMw9Xlsp9/8Yt5m81ruFP7pp8st/t5/dfFi2Twk7+JwpAOF3UkrLV8//uT5uCyEr7Ut08yiC0qyMx8gkM1LU6KxgFOqMxkNoqIKIBwNIEoYOzXdDVurpTiLEoCW5Wd/+nYzs9aNprTT/3L9T662P37/zRdv83ACEFFIyTO7NTbu/6Y8/zSWOaMbo9EEKY2+CnesW3+Q5kPz9DP+77phkcygYIyAWULMlGgKCRkgmMEUAkbx6z//41eMSWYFIcX9//E//Rv+IF5++fJW2RaZw5JKdP9hAvPN28m3FzUE0fucr15USKvMbj2H4aUwVZIpwJyNHgKQ3sl+pPfZWMwoBNg5NwrhCLkS+fJfX7OUpcHLSUY1vnnz8//mg79+8bZ5muSCB6rSlqoE0kq9/+b9R2M0N0iiA2LRaitcTdVMIxTVkygwm0W3xj6sS5KpsU8WMws6mPJkaeGw3vRZfZ6xLCwXbDmVmAMi6Pjmf/48Xh/6UAuASYV3HUxSME1Nsm6xgyW753VRKUr2AG6Q3IA0kIU0F9CCEJjeUsreUE9DbyQT9NbVciSTfdQKxBKu7TYWnGwWgFK9DstXl8vcnVkiZUCCitJdNvPEqlbtLMLrcpTMWlcVfud4GYYUJQOrUa1JULKsbR0YYdajt3VesZFKsMNFMBOpbIrZPr3icjcP9cmjwmRA+3A6QV8/qNO4BEkc3x4bzd2UMHdmEqGe6SXrPTuqmBgJFShar+NB8yZfKiEzJiwAh4eYknkfoZct3/kNuDRUOzz+9M0BvtOjdq2mBuUigytBi04BgQgwXeJ8uB+H7qdwQGYu75TM2RDZIQkt08AiLmDCwIRFApk1V97NEoykxGQJ0QHPTEcCzBBh4SX3Vx+9mkfHYamlzTUyveldmzn7ce7eWIo43F5ummmdyULrg6DK2F2csG5OIvoAtUICmTRJjjT1FlivjuSWTPOUHJmy8m4yUkoMEjYM8oerZ9cCvBtjfNaQodX2RvYKowMCxFTqcVoGTxbIgMxeUJbRWverpGsVH5NkERyrpx5g0C2qJQpbr/ZMBKP3mpEM64CfvbND1Msc2/Hq2e1cBoNqWyKL4QBYitatkGsAEZnTPv3wSECfmanoG2X1QqJZ32Gie6+6ZqH3QNIYxOqGkOTRiQZL9umFURI0ZRYlkaZun/FL0dp0NV5jwzdXm3a/FCWXGb1ypVava5fltPl4/7zMexYCSvPMrsOply7Rs4eghNiNuaVn2HRTpmGdtkRpWdUVEjOHRrrIdLUmdpbbunImjUrMFx/H8aPCYtvNMi8sSxJnRy3I6KFennd3x8eCTAmk09maxMKLcTFkkSQGk95bS2U1kZASg6CXuW0aZZaEh2hnJWEABqY6Bdeb47nhm6GEjrnb2fvvffLl9EG8ufF4sxzMuk6pAUAobDV0xsPry10u5jT0KQQ1ac13tSc7druN0lxwFlNAMGbCiOa2ThC1jnJBEoz1ty412Pr2IbisHa3S49HdYfn49EvVcH/yqG7r7TpaJFf5/zpGKdPQFiWh3sg1WWkWzS82Zm59SIdAoMjWMaYELFLybg5VpCcS1pU1bKDSgDBLz+xDEbt6q8GO8mSxY1nK14fTJv+f+cnuy/ewEA4qavd6wHLFa7nkvCwSnUh3duxrBXWUOWw12WA1WKNAZWE2EMhVq5Uild6HxaLMkiPMKDMqkOlk9MkRwFwIQnNrE5f28rjPt9vj7XxPWlo6zvCpXxQiZrTTHNkVOV0j6ElEGQuTRq3jJ9Z4V9AyxegOZ1PQLJqn3CSkQ96VrbKSVDZwbQX127SILKDx1rLczQ8H4nBf5zBnV3qmRx8oRCg9M5e55P5iF1bIPv7IS6bbOBDy3m8ijW4tlSiIBOGA5LIGGk3WuSyZTGlp6xReQzYZgmQmvGuJw5eA2zTm9dxYLFCxoEJIdDdnN8J127dj2d9czadT8YALLtDDxVKHKI50BF0kFXIzFlNarKYWNjnSImWZRg8xEZZMiOkpy7Vrgm8NoQhrbMSSp1DsODsSQ+msxrvb9O6qIKb93XvzfjTAugQBBhlZwI5u1DUopNGjCGlniWi2gpRx6X1hmSCkIZGGsH7VIUfXgNtKwMqbOZc5oO1uYUreBzOey0P0EUqla6Ujpv1uM7mvLirBasuYl6FvCdVnuhbBqCJ4C3bheHYFtWcWpRR95AtilcivyM770D+IQgS6m5axiOk7MyhbIS0ZAvpQgC7+shBlOh6X/aNlWYp3cWo3FLe3r7vYqefe7KiQKpTkZ4cJ10ZJG8j+wkna+ThayyT6QJx1bFOPtUmLJhi3pYlodXBZJ5ws7dxpW9cd092wvdqOtTqM6FMMa7v/+S28j0ImEzpPcSukt37FCAtnuiMj4ZnGjKBQWmc9TKuPv3smJMK6o9VSjca6ARKJUghr2RWckICkdecbJEy342a7nWpZJzzATKdf/m0SycQ6vsJWZ06BAog0z4AZWCFYa1VphExKuAkIhHvLFAwGtu4BpvViO2AGvyDAJYq79+kNWuViPE8pJ0zZ5rtXw+hePKwApGL+7V9cZ4eAwYI0rrPvsqCLAr0z//DSVFt213EEeaa5uociGxl93HQvEcmgAlARNq7WCBYnVlNwz0FcA7VgKdMyHW42m3G3lCJR8Ggv/u2XQDpX/z+hSMtGsEBkQ2XQMmhd36ZgIq1reERvhJNypLgOzXNIlrQQoXA2bscwMMNLKYGus+m+kDR05W40EkQux9Ph/mqXaQ5PxfWf/1UYGGSyl2mkQIOhrFbZXk65YyFpMW9dPSJ1ghXZPTt9gm0CiG4sF/tqycZNWiYD46CmMySBJTtVtTb9OrEx3x/b6Vj7iVne/vSnezuXvb1fTuscIAw6Dw0Trc//NXel23pSMzu6SeSSLH3Gkrk7RFt7xwjUDRJCRh1NZt3LTie6Wim7dq03d3OJ6WGa5iWVhO7/6k9uXIRgXVhS3YsVmgEsgOvbMeqtz4iwXPrxLi0Ywa4fVsrZJXpkv2/oQgbCPY0WCAzKNMmQdEav/iCoVwC9m6DjMB1nZYuSOP76T79ikiUoykmzdaNDVAHT1qAGX3VbJFvtemZ16wH7nHG6hQudTqSlyTPXgjdVhWxuQVcXzFqClibZGm3Q55V6Pn007bO1NqctL/78Z81kQgmCtEQnbkxBsAhRUlay8d3cPhINabS2OJVdE7eO2+z8pmeALImulIRTYYxYULKToS3dlyRl7MWTPEVh4HL6/H9Y/veX86lNjjK9+k8/XWozE8wWUGBoHWFsRis9livSvh0C6CX6NmkNzBZMz+geYON5Mg4cmVR49WzmIaWbiepTFxdYWqdOLNGjeh2WLHd/8ernF1xam2N58/P/+HpcK76KllqV0OzURhbAFwBi7RiB3lgWU3pq6ZoespsF13EgzHSwj5tKIAFnZ5UQKG6SkHD0SY+rVWq1FJahLPDjH7/vWce5LPP1r//2hUoDjOJSTN5XnXSjGlQk0ULFEIBEhJc5FXNB/4sH0iDaanJCH9ZKE3vkQSZL7fJCxWJrMzesu4ABgN6twTCJg59odmhP8uVnh9cP99e/vY4tuufR+999IfPOL3ihWFbHCNhW366VlkZEAt8O/aCICFJgku6dKlPXFLsiSYUWOQXA3NG0zs6BR5cHQeTgXk8JTnf/7Cc/v35zeHg4ZPGknRuG/UioM9eAofOGMO/PYrISC3pRDcnWnOpUCjTZqh7t0BwK0bpsXFqyFFIi3KInAgLedXOZmfBqfRK2vf3eJ//uLqfjDHMw6Uh1f6SZ9cZ/d/3/fyZ5r0VfAigaAAAAAElFTkSuQmCC",
  perls: "data:image/png;base64,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",
  hillman: "data:image/png;base64,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",
};

function hexToRgbObj(hex) {
  const clean = (hex || "#4a3020").replace("#", "");
  return {
    r: parseInt(clean.slice(0,2), 16) || 74,
    g: parseInt(clean.slice(2,4), 16) || 48,
    b: parseInt(clean.slice(4,6), 16) || 32,
  };
}

const HEIDEGGER_PORTRAIT_URL = "data:image/png;base64,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";

function DuotonePortrait({ analystId, imageUrl, shadowColor, hiColor, fallbackLetter, size = 44 }) {
  const canvasRef = useRef(null);
  const url = imageUrl || PORTRAIT_DATA_URLS[analystId];
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !url) return;
    const ctx = canvas.getContext("2d");
    canvas.width = size * 2;
    canvas.height = size * 2;
    const img = new Image();
    img.onload = () => {
      const s = Math.min(img.width, img.height);
      const sx = (img.width - s) / 2;
      const sy = 0;
      ctx.drawImage(img, sx, sy, s, s, 0, 0, size * 2, size * 2);
      try {
        const imageData = ctx.getImageData(0, 0, size * 2, size * 2);
        const data = imageData.data;
        const shadow = hexToRgbObj(shadowColor);
        const hi = hiColor ? hexToRgbObj(hiColor) : { r: 232, g: 220, b: 195 };
        for (let i = 0; i < data.length; i += 4) {
          const lum = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114) / 255;
          data[i]   = Math.round(shadow.r + (hi.r - shadow.r) * lum);
          data[i+1] = Math.round(shadow.g + (hi.g - shadow.g) * lum);
          data[i+2] = Math.round(shadow.b + (hi.b - shadow.b) * lum);
        }
        ctx.putImageData(imageData, 0, 0);
      } catch (e) {
        ctx.filter = "grayscale(1) contrast(1.2)";
        ctx.drawImage(img, sx, sy, s, s, 0, 0, size * 2, size * 2);
        ctx.filter = "none";
      }
    };
    img.onerror = () => setFailed(true);
    img.src = url;
  }, [analystId, imageUrl, shadowColor, hiColor, size, url]);

  if (failed) return (
    <div style={{width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(232,220,195,0.7)",fontFamily:"Georgia,serif",fontSize:size*0.38,fontWeight:700}}>
      {(fallbackLetter || analystId?.[0] || "?").toUpperCase()}
    </div>
  );

  return (
    <canvas ref={canvasRef} style={{display:"block",width:size,height:size,imageRendering:"crisp-edges"}}/>
  );
}

function AnalystBadge({ analyst, selected, onClick, locked }) {
  return (
    <button onClick={locked?undefined:onClick} disabled={locked} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"10px 14px",borderRadius:12,border:selected?`1.5px solid ${analyst.accent}`:"1.5px solid rgba(255,255,255,0.1)",background:selected?`rgba(${hexToRgb(analyst.accent)},0.12)`:"rgba(255,255,255,0.03)",cursor:locked?"not-allowed":"pointer",opacity:locked?0.4:1,transition:"all 0.2s ease",minWidth:80,flex:"1 1 0",position:"relative"}}>
      {locked && <div style={{position:"absolute",top:6,right:8,fontSize:10}}>🔒</div>}
      <div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${analyst.color},${analyst.accent})`,overflow:"hidden",display:"flex",alignItems:"flex-end",justifyContent:"center",boxShadow:selected?`0 0 12px rgba(${hexToRgb(analyst.accent)},0.4)`:"none",flexShrink:0}}>
        <DuotonePortrait analystId={analyst.id} shadowColor={analyst.color} size={44}/>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:600,color:selected?analyst.accent:"rgba(255,255,255,0.7)",fontFamily:"Inter,sans-serif",lineHeight:1.2}}>{analyst.name.split(" ").pop()}</div>
        <div style={{fontSize:9,color:"rgba(255,255,255,0.35)",fontFamily:"Inter,sans-serif",marginTop:2}}>{analyst.school}</div>
      </div>
    </button>
  );
}


function JournalEntry({ entry, onSelect, selected }) {
  const date=new Date(entry.date);
  const formatted=date.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  const preview=entry.text.length>80?entry.text.slice(0,80)+"…":entry.text;
  return (
    <button onClick={()=>onSelect(entry)} style={{width:"100%",textAlign:"left",background:selected?"rgba(196,181,232,0.12)":"rgba(255,255,255,0.03)",border:selected?"1px solid rgba(196,181,232,0.35)":"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px 14px",cursor:"pointer",transition:"all 0.2s",marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <span style={{fontSize:12,fontWeight:600,color:"#C4B5E8",fontFamily:"Playfair Display,serif",fontStyle:"italic"}}>{entry.title||"Untitled Dream"}</span>
        <span style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"Inter,sans-serif"}}>{formatted}</span>
      </div>
      <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.45)",fontFamily:"Inter,sans-serif",lineHeight:1.5}}>{preview}</p>
    </button>
  );
}

function DreamApp({ savedEntries, setSavedEntries, tier, chosenAnalystId, setChosenAnalystId }) {
  const [entryStep, setEntryStep] = useState("choose"); // "choose" (pick an analyst first) | "main"
  const [currentEntry, setCurrentEntry] = useState(null);
  const [title, setTitle] = useState("");
  const [dreamText, setDreamText] = useState("");
  const [selectedAnalyst, setSelectedAnalyst] = useState(() => ANALYSTS.find(a=>a.id===chosenAnalystId) || ANALYSTS[0]);
  const [interpretation, setInterpretation] = useState("");
  const [interpretError, setInterpretError] = useState(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [dreamView, setDreamView] = useState("write");
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);
  const [eraseConfirm, setEraseConfirm] = useState(null); // entry id pending erase
  const textareaRef = useRef(null);

  // Build analyst memory context from all saved entries
  function buildMemoryContext(analystId, excludeEntryId) {
    const MAX_MEMORY_ENTRIES = 8; // bounds input-token growth for long-tenured users — see cost note
    const prior = savedEntries
      .filter(e => e.id !== excludeEntryId && e.interpretations?.[analystId])
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, MAX_MEMORY_ENTRIES)
      .reverse(); // chronological order reads better than most-recent-first
    if (!prior.length) return "";
    const lines = prior.map(e => {
      const d = new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return `— ${d}: "${e.title}"\nDream: ${e.text}\nYour interpretation: ${e.interpretations[analystId]}`;
    });
    const note = savedEntries.filter(e => e.id !== excludeEntryId && e.interpretations?.[analystId]).length > MAX_MEMORY_ENTRIES
      ? ` (most recent ${MAX_MEMORY_ENTRIES} of a longer history)` : "";
    return `\n\nFor context, you have previously interpreted this dreamer's entries${note}:\n\n${lines.join("\n\n")}\n\nDraw on these where relevant — note recurring symbols, patterns, or developments — but keep the focus on the new dream.`;
  }

  const handleSave = () => {
    if (!dreamText.trim()) return;
    const entry = {
      id: currentEntry?.id || Date.now().toString(),
      title: title.trim() || "Untitled Dream",
      text: dreamText,
      date: currentEntry?.date || new Date().toISOString(),
      interpretations: currentEntry?.interpretations || {},
    };
    const existing = savedEntries.findIndex(e => e.id === entry.id);
    const updated = existing >= 0
      ? savedEntries.map((e, i) => i === existing ? entry : e)
      : [entry, ...savedEntries];
    setSavedEntries(updated);
    setCurrentEntry(entry);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1500);
  };

  const handleErase = (entryId) => {
    const updated = savedEntries.filter(e => e.id !== entryId);
    setSavedEntries(updated);
    if (currentEntry?.id === entryId) {
      setCurrentEntry(null); setTitle(""); setDreamText("");
      setInterpretation(""); setShowInterpretation(false);
    }
    setEraseConfirm(null);
  };

  const handleNew = () => {
    if (isInterpreting) return; // don't let a mid-flight interpretation land on the wrong entry
    setCurrentEntry(null); setTitle(""); setDreamText("");
    setInterpretation(""); setInterpretError(null); setShowInterpretation(false); setDreamView("write");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleSelectEntry = (entry) => {
    if (isInterpreting) return; // same reason — the in-flight response is tied to the entry that was open when it started
    setCurrentEntry(entry); setTitle(entry.title); setDreamText(entry.text);
    setInterpretation(entry.interpretations?.[selectedAnalyst.id] || "");
    setInterpretError(null);
    setShowInterpretation(false); setDreamView("write");
  };

  const handleInterpret = async () => {
    if (!dreamText.trim() || isInterpreting) return;
    if (currentEntry?.interpretations?.[selectedAnalyst.id]) {
      setInterpretation(currentEntry.interpretations[selectedAnalyst.id]);
      setInterpretError(null);
      setShowInterpretation(true); return;
    }
    setIsInterpreting(true); setShowInterpretation(true); setInterpretation(""); setInterpretError(null);
    try {
      const memory = buildMemoryContext(selectedAnalyst.id, currentEntry?.id);
      const systemPrompt = selectedAnalyst.persona + memory;
      const userContent = `Please interpret this dream journal entry:\n\nTitle: "${title || "Untitled Dream"}"\n\n${dreamText}`;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: systemPrompt, messages: [{ role: "user", content: userContent }] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `API error ${response.status}`);
      const text = data.content?.map(b => b.text || "").join("") || "";
      if (!text.trim()) throw new Error("The analyst returned no interpretation.");
      setInterpretation(text);
      if (currentEntry) {
        const updatedEntry = { ...currentEntry, interpretations: { ...currentEntry.interpretations, [selectedAnalyst.id]: text } };
        setSavedEntries(savedEntries.map(e => e.id === currentEntry.id ? updatedEntry : e));
        setCurrentEntry(updatedEntry);
      }
    } catch (err) {
      console.error("Dream interpretation error:", err);
      setInterpretError(err.message || "The connection to this analyst could not be reached.");
    }
    setIsInterpreting(false);
  };

  const isAnalystLocked = (analyst) =>
    analyst.locked || (tier < 3 && !!chosenAnalystId && analyst.id !== chosenAnalystId);

  const handleAnalystChange = (analyst) => {
    if (isInterpreting) return; // same race-condition guard as entry-switching
    if (isAnalystLocked(analyst)) return;
    setSelectedAnalyst(analyst);
    setInterpretError(null);
    if (currentEntry?.interpretations?.[analyst.id]) {
      setInterpretation(currentEntry.interpretations[analyst.id]);
    } else { setInterpretation(""); setShowInterpretation(false); }
  };

  const handleChooseAnalyst = (analyst) => {
    if (isAnalystLocked(analyst)) return;
    setSelectedAnalyst(analyst);
    setEntryStep("main");
    // Tier 2 locks in whichever analyst is picked first; Tier 3 never locks.
    if (tier === 2 && !chosenAnalystId && setChosenAnalystId) setChosenAnalystId(analyst.id);
  };

  const wordCount = dreamText.trim().split(/\s+/).filter(Boolean).length;
  const hasPriorMemory = (analystId) => savedEntries.some(e => e.id !== currentEntry?.id && e.interpretations?.[analystId]);

  return (
    <>
      <style>{`
        @keyframes dmTwinkle { 0%,100%{opacity:var(--base-op,0.3)} 50%{opacity:0.05} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 20px rgba(196,181,232,0.15)} 50%{box-shadow:0 0 40px rgba(196,181,232,0.3)} }
        .dream-ta{background:transparent;border:none;outline:none;resize:none;width:100%;color:rgba(255,255,255,0.88);font-family:'Playfair Display',serif;font-size:17px;line-height:1.85;min-height:220px;caret-color:#C4B5E8;}
        .dream-ta::placeholder{color:rgba(255,255,255,0.2);font-style:italic;}
        .title-in{background:transparent;border:none;outline:none;width:100%;color:rgba(255,255,255,0.9);font-family:'Playfair Display',serif;font-size:22px;font-weight:600;caret-color:#C4B5E8;}
        .title-in::placeholder{color:rgba(255,255,255,0.2);font-style:italic;}
        .scr::-webkit-scrollbar{width:4px} .scr::-webkit-scrollbar-track{background:transparent} .scr::-webkit-scrollbar-thumb{background:rgba(196,181,232,0.2);border-radius:2px}
        .intp-btn{transition:all 0.25s ease} .intp-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(196,181,232,0.25)} @media(max-width:480px){.dream-ta{font-size:15px!important;min-height:160px!important}.title-in{font-size:18px!important}}
      `}</style>
      <NebulaBackground/>
      <StarField/>
      <div style={{position:"relative",zIndex:1,minHeight:"calc(100vh - 52px)",display:"flex",flexDirection:"column",fontFamily:"Inter,sans-serif"}}>
        <header style={{padding:"14px 16px 0",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div>
            <h1 style={{fontFamily:"Playfair Display,serif",fontSize:22,fontWeight:700,color:"white",letterSpacing:"-0.01em"}}>✦ DreamMeaning</h1>
            <p style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2,fontStyle:"italic"}}>A journal for the unconscious</p>
          </div>
          {entryStep==="main" && (
            <div style={{display:"flex",gap:6}}>
              {["write","journal"].map(v=>(
                <button key={v} onClick={()=>setDreamView(v)} style={{padding:"7px 16px",borderRadius:20,border:"1px solid rgba(255,255,255,0.12)",background:dreamView===v?"rgba(196,181,232,0.15)":"transparent",color:dreamView===v?"#C4B5E8":"rgba(255,255,255,0.4)",fontSize:12,fontWeight:500,cursor:"pointer",textTransform:"capitalize"}}>
                  {v==="write"?"✏ Write":`☽ Journal${savedEntries.length>0?` (${savedEntries.length})`:""}`}
                </button>
              ))}
            </div>
          )}
        </header>
        <main style={{flex:1,padding:"16px 12px 28px",maxWidth:entryStep==="choose"?820:680,margin:"0 auto",width:"100%"}}>
          {entryStep==="choose" ? (
            <div style={{animation:"fadeUp 0.4s ease"}}>
              <div style={{textAlign:"center",marginBottom:28}}>
                <h2 style={{fontFamily:"Playfair Display,serif",fontSize:24,fontStyle:"italic",color:"rgba(255,255,255,0.9)",marginBottom:8}}>Choose Your Analyst</h2>
                <p style={{fontSize:13,color:"rgba(255,255,255,0.4)",maxWidth:480,margin:"0 auto",lineHeight:1.7}}>Five founding voices of dream psychology, each reading the unconscious in a fundamentally different way. Pick whichever school or style speaks to you — you can revisit this choice from the journal at any time.</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:16}}>
                {ANALYSTS.map(a=>{
                  const locked = isAnalystLocked(a);
                  const isChosen = tier<3 && chosenAnalystId===a.id;
                  return (
                  <button key={a.id} onClick={()=>handleChooseAnalyst(a)} disabled={locked} style={{textAlign:"left",padding:"20px",borderRadius:16,border:isChosen?`1px solid ${a.accent}`:`1px solid rgba(${hexToRgb(a.accent)},0.22)`,background:"rgba(13,10,30,0.55)",backdropFilter:"blur(14px)",cursor:locked?"not-allowed":"pointer",opacity:locked?0.4:1,transition:"all 0.2s ease",display:"flex",flexDirection:"column",gap:12}}
                    onMouseEnter={e=>{if(!locked){e.currentTarget.style.borderColor=`rgba(${hexToRgb(a.accent)},0.5)`;e.currentTarget.style.transform="translateY(-2px)";}}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=`rgba(${hexToRgb(a.accent)},0.22)`;e.currentTarget.style.transform="translateY(0)";}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${a.color},${a.accent})`,overflow:"hidden",display:"flex",alignItems:"flex-end",justifyContent:"center",flexShrink:0}}>
                        <DuotonePortrait analystId={a.id} shadowColor={a.color} size={52}/>
                      </div>
                      <div>
                        <div style={{fontFamily:"Playfair Display,serif",fontSize:16,fontWeight:600,color:a.accent}}>{a.name}</div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontStyle:"italic"}}>{a.years}</div>
                      </div>
                    </div>
                    <div style={{display:"inline-block",fontSize:10,letterSpacing:"0.06em",textTransform:"uppercase",color:a.accent,background:`rgba(${hexToRgb(a.accent)},0.12)`,padding:"3px 10px",borderRadius:10,alignSelf:"flex-start"}}>{a.school}</div>
                    <p style={{fontSize:12.5,color:"rgba(255,255,255,0.55)",lineHeight:1.7,fontFamily:"Inter,sans-serif",margin:0}}>{a.intro}</p>
                    <div style={{fontSize:11,color:locked?"rgba(255,255,255,0.3)":a.accent,fontWeight:600,marginTop:"auto",paddingTop:4}}>
                      {isChosen ? "✓ Your Analyst" : locked ? (a.locked ? "🔒 Premium" : "🔒 Locked — choose one analyst on Free") : `Begin with ${a.name.split(" ").pop()} →`}
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>
          ) : dreamView==="journal" ? (
            <div style={{animation:"fadeUp 0.3s ease"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <h2 style={{fontFamily:"Playfair Display,serif",fontSize:18,color:"rgba(255,255,255,0.8)",fontStyle:"italic"}}>Your Dreams</h2>
                <button onClick={handleNew} disabled={isInterpreting} style={{padding:"7px 14px",borderRadius:20,border:"1px solid rgba(196,181,232,0.3)",background:"rgba(196,181,232,0.1)",color:"#C4B5E8",fontSize:12,cursor:isInterpreting?"not-allowed":"pointer",opacity:isInterpreting?0.4:1}}>+ New Dream</button>
              </div>
              {isInterpreting && (
                <div style={{fontSize:11,color:"rgba(196,181,232,0.5)",fontStyle:"italic",marginBottom:12,textAlign:"center"}}>An interpretation is in progress — entries are locked until it finishes.</div>
              )}
              {savedEntries.length===0 ? (
                <div style={{textAlign:"center",padding:"60px 0",color:"rgba(255,255,255,0.25)"}}>
                  <div style={{fontSize:40,marginBottom:12}}>☽</div>
                  <p style={{fontFamily:"Playfair Display,serif",fontStyle:"italic",fontSize:15}}>No dreams recorded yet</p>
                  <p style={{fontSize:12,marginTop:6}}>Begin writing to capture your first dream</p>
                </div>
              ) : (
                <div className="scr" style={{maxHeight:"calc(100vh - 240px)",overflowY:"auto",opacity:isInterpreting?0.5:1,pointerEvents:isInterpreting?"none":"auto",transition:"opacity 0.2s"}}>
                  {savedEntries.map(entry=>(
                    <div key={entry.id} style={{position:"relative",marginBottom:8}}>
                      <JournalEntry entry={entry} selected={currentEntry?.id===entry.id} onSelect={handleSelectEntry}/>
                      {eraseConfirm===entry.id ? (
                        <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:-4,marginBottom:4,padding:"6px 8px",background:"rgba(180,60,60,0.1)",borderRadius:"0 0 10px 10px",border:"1px solid rgba(180,60,60,0.2)",borderTop:"none"}}>
                          <span style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontStyle:"italic",alignSelf:"center"}}>Erase this dream?</span>
                          <button onClick={()=>handleErase(entry.id)} style={{padding:"4px 12px",borderRadius:12,border:"1px solid rgba(180,60,60,0.5)",background:"rgba(180,60,60,0.2)",color:"#E88",fontSize:11,cursor:"pointer"}}>Erase</button>
                          <button onClick={()=>setEraseConfirm(null)} style={{padding:"4px 12px",borderRadius:12,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"rgba(255,255,255,0.4)",fontSize:11,cursor:"pointer"}}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={()=>setEraseConfirm(entry.id)} style={{position:"absolute",top:10,right:10,background:"transparent",border:"none",color:"rgba(255,255,255,0.2)",fontSize:14,cursor:"pointer",lineHeight:1,padding:"2px 6px",borderRadius:6,transition:"color 0.15s"}}
                          onMouseEnter={e=>e.target.style.color="rgba(220,100,100,0.7)"}
                          onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.2)"}>✕</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{animation:"fadeUp 0.3s ease"}}>
              <div style={{background:"rgba(13,10,30,0.65)",backdropFilter:"blur(20px)",border:"1px solid rgba(196,181,232,0.15)",borderRadius:20,padding:"24px 24px 20px",marginBottom:16,animation:"pulseGlow 6s ease-in-out infinite"}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontStyle:"italic",marginBottom:12,letterSpacing:"0.05em"}}>{new Date(currentEntry?.date||Date.now()).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
                <input className="title-in" placeholder="Name this dream…" value={title} onChange={e=>setTitle(e.target.value)}/>
                <div style={{height:1,background:"rgba(196,181,232,0.12)",margin:"14px 0"}}/>
                <textarea ref={textareaRef} className="dream-ta scr" placeholder="Describe your dream… Where were you? Who was there? What happened? What did you feel?" value={dreamText} onChange={e=>setDreamText(e.target.value)} rows={10}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.2)",fontStyle:"italic"}}>{wordCount>0?`${wordCount} word${wordCount!==1?"s":""}`:""}</span>
                  <div style={{display:"flex",gap:8}}>
                    {currentEntry && (
                      <button onClick={()=>setEraseConfirm(currentEntry.id)} style={{padding:"6px 14px",borderRadius:16,border:"1px solid rgba(180,60,60,0.3)",background:"rgba(180,60,60,0.08)",color:"rgba(220,100,100,0.7)",fontSize:12,cursor:"pointer",transition:"all 0.2s"}}
                        onMouseEnter={e=>{e.target.style.borderColor="rgba(180,60,60,0.6)";e.target.style.color="#E88";}}
                        onMouseLeave={e=>{e.target.style.borderColor="rgba(180,60,60,0.3)";e.target.style.color="rgba(220,100,100,0.7)";}}>
                        Erase
                      </button>
                    )}
                    <button onClick={handleSave} disabled={!dreamText.trim()} style={{padding:"6px 16px",borderRadius:16,border:"1px solid rgba(196,181,232,0.25)",background:saveFlash?"rgba(196,181,232,0.25)":"rgba(196,181,232,0.08)",color:saveFlash?"#C4B5E8":"rgba(196,181,232,0.6)",fontSize:12,cursor:dreamText.trim()?"pointer":"not-allowed",transition:"all 0.3s"}}>
                      {saveFlash?"✓ Saved":"Save"}
                    </button>
                  </div>
                </div>
                {eraseConfirm===currentEntry?.id && (
                  <div style={{marginTop:12,padding:"10px 14px",borderRadius:12,background:"rgba(180,60,60,0.1)",border:"1px solid rgba(180,60,60,0.25)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontStyle:"italic"}}>Erase this dream permanently?</span>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>handleErase(currentEntry.id)} style={{padding:"5px 14px",borderRadius:12,border:"1px solid rgba(180,60,60,0.5)",background:"rgba(180,60,60,0.2)",color:"#E88",fontSize:12,cursor:"pointer"}}>Erase</button>
                      <button onClick={()=>setEraseConfirm(null)} style={{padding:"5px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer"}}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
              <div style={{background:"rgba(13,10,30,0.55)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:"20px"}}>
                <div style={{marginBottom:14}}>
                  <h3 style={{fontFamily:"Playfair Display,serif",fontSize:14,color:"rgba(255,255,255,0.6)",fontStyle:"italic",marginBottom:10}}>Choose your analyst</h3>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {ANALYSTS.map(a=><AnalystBadge key={a.id} analyst={a} selected={selectedAnalyst.id===a.id} onClick={()=>handleAnalystChange(a)} locked={isAnalystLocked(a)}/>)}
                  </div>
                </div>
                <div style={{padding:"10px 14px",borderRadius:10,background:`rgba(${hexToRgb(selectedAnalyst.accent)},0.07)`,border:`1px solid rgba(${hexToRgb(selectedAnalyst.accent)},0.15)`,marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <span style={{fontFamily:"Playfair Display,serif",fontSize:13,fontWeight:600,color:selectedAnalyst.accent}}>{selectedAnalyst.name}</span>
                      <span style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginLeft:8,fontStyle:"italic"}}>{selectedAnalyst.years}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      {hasPriorMemory(selectedAnalyst.id) && (
                        <span title="This analyst remembers your previous dreams" style={{fontSize:9,color:selectedAnalyst.accent,opacity:0.7,letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:"Inter,sans-serif"}}>◈ memory</span>
                      )}
                      <span style={{fontSize:10,color:"rgba(255,255,255,0.35)",fontFamily:"Inter,sans-serif",background:"rgba(255,255,255,0.06)",padding:"3px 8px",borderRadius:10}}>{selectedAnalyst.school}</span>
                    </div>
                  </div>
                </div>
                <button className="intp-btn" onClick={handleInterpret} disabled={!dreamText.trim()||isInterpreting} style={{width:"100%",padding:"13px",borderRadius:14,border:"none",background:dreamText.trim()?`linear-gradient(135deg,${selectedAnalyst.color},${selectedAnalyst.accent})`:"rgba(255,255,255,0.06)",color:dreamText.trim()?"white":"rgba(255,255,255,0.25)",fontSize:14,fontWeight:600,fontFamily:"Playfair Display,serif",cursor:dreamText.trim()&&!isInterpreting?"pointer":"not-allowed",letterSpacing:"0.02em"}}>
                  {isInterpreting?"Interpreting…":currentEntry?.interpretations?.[selectedAnalyst.id]?`View ${selectedAnalyst.name.split(" ").pop()}'s Interpretation`:`Interpret with ${selectedAnalyst.name.split(" ").pop()}`}
                </button>
                {showInterpretation&&(
                  <div style={{marginTop:16,padding:"18px 20px",borderRadius:14,background:interpretError?"rgba(200,90,90,0.07)":`rgba(${hexToRgb(selectedAnalyst.accent)},0.05)`,border:interpretError?"1px solid rgba(200,90,90,0.25)":`1px solid rgba(${hexToRgb(selectedAnalyst.accent)},0.18)`,animation:"fadeUp 0.4s ease"}}>
                    <div style={{fontSize:11,color:interpretError?"#D89090":selectedAnalyst.accent,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12,opacity:0.8}}>{interpretError?"✕ Interpretation Failed":`✦ ${selectedAnalyst.name} · ${selectedAnalyst.school}`}</div>
                    {isInterpreting?(
                      <div style={{display:"flex",gap:8,alignItems:"center",padding:"8px 0"}}>
                        {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:selectedAnalyst.accent,opacity:0.6,animation:`dmTwinkle 1.2s ease-in-out infinite`,animationDelay:`${i*0.2}s`}}/>)}
                      </div>
                    ):interpretError?(
                      <div>
                        <div style={{fontSize:13,color:"rgba(255,255,255,0.55)",fontFamily:"Inter,sans-serif",lineHeight:1.6,marginBottom:14}}>{interpretError}</div>
                        <button onClick={handleInterpret} style={{padding:"7px 18px",borderRadius:14,border:"1px solid rgba(200,90,90,0.4)",background:"rgba(200,90,90,0.12)",color:"#E8A0A0",fontSize:12,fontFamily:"Inter,sans-serif",cursor:"pointer"}}>Try Again</button>
                      </div>
                    ):(
                      <div style={{fontFamily:"Playfair Display,serif",fontSize:15,lineHeight:1.8,color:"rgba(255,255,255,0.82)",fontStyle:"italic",whiteSpace:"pre-wrap"}}>{interpretation}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// DASEIN
// ═══════════════════════════════════════════════════════════

const DASEIN_PALETTE = {
  void:"#0D0D0E", ground:"#141416", stone:"#1E1E22", ash:"#2A2A30",
  mist:"#4A4A56", fog:"#7A7A8C", pale:"#B8B8CC", light:"#E8E8F0",
  flare:"#C4A882", amber:"#8B6914",
};

const DASEIN_SYSTEM = `You are the voice of Dasein — a philosophical companion grounded in Heidegger's existential analytic. You speak to the user about their existence, their thrownness (the situation they find themselves already in), their projections (what they are moving toward), and their authentic vs. inauthentic choices.

Your style: spare, probing, honest. No therapy-speak. No affirmations. You ask questions that unsettle in a generative way. You use plain language but speak from depth. You reference the structures of existence — care, temporality, being-toward-death, the they-self, authenticity — but never pedantically. You help the user hear themselves.

The user has shared their current moment with you: their situation (thrownness), what they're moving toward (projection), and one thing they've been avoiding (the uncanny). Respond in 2–4 sentences that surface something true. End with one question that opens rather than closes.

Keep responses under 120 words. Never use bullet points. Never be cheery or motivational. Be still and serious.`;

const DSECTIONS = [
  { id:"thrownness", label:"Where you find yourself",  heidegger:"Geworfenheit",     prompt:"Describe your situation right now — not what you want it to be, what it actually is.", placeholder:"The circumstances I didn't choose but inhabit…" },
  { id:"projection", label:"What you're moving toward", heidegger:"Entwurf",          prompt:"What possibility are you projecting yourself into? Not a goal — a direction.",          placeholder:"I find myself moving toward…" },
  { id:"uncanny",    label:"What calls you back",       heidegger:"Unheimlichkeit",   prompt:"What have you been avoiding that keeps surfacing? The thing that makes you feel not-at-home.", placeholder:"Something I keep turning away from…" },
];

function BreathingOrb({ active }) {
  return (
    <div style={{width:48,height:48,borderRadius:"50%",background:active?`radial-gradient(circle at 40% 40%,${DASEIN_PALETTE.flare}44,${DASEIN_PALETTE.amber}22,transparent)`:`radial-gradient(circle at 40% 40%,${DASEIN_PALETTE.mist}33,transparent)`,border:`1px solid ${active?DASEIN_PALETTE.flare+"44":DASEIN_PALETTE.ash}`,animation:active?"daseinBreathe 3s ease-in-out infinite":"none",flexShrink:0}}/>
  );
}

function TypedText({ text, onDone }) {
  const [displayed,setDisplayed]=useState("");
  const [idx,setIdx]=useState(0);
  useEffect(()=>{ setDisplayed("");setIdx(0); },[text]);
  useEffect(()=>{
    if (!text||idx>=text.length) { if (idx>=text.length&&onDone) onDone(); return; }
    const t=setTimeout(()=>{ setDisplayed(d=>d+text[idx]); setIdx(i=>i+1); },18);
    return()=>clearTimeout(t);
  },[idx,text]);
  return (
    <span style={{color:DASEIN_PALETTE.pale,fontFamily:"'Georgia',serif",fontSize:15,lineHeight:1.8}}>
      {displayed}
      {idx<(text?.length||0)&&<span style={{opacity:0.5,animation:"daseinBlink 1s step-end infinite"}}>|</span>}
    </span>
  );
}

function DaseinApp({ savedSessions, setSavedSessions, tier }) {
  const [step, setStep] = useState("intro");
  const [preAboutStep, setPreAboutStep] = useState("intro");
  const [answers, setAnswers] = useState({ thrownness:"", projection:"", uncanny:"" });
  const [currentSection, setCurrentSection] = useState(0);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [viewMode, setViewMode] = useState("current"); // "current" | "archive"
  const [eraseConfirm, setEraseConfirm] = useState(null);
  const [saveFlash, setSaveFlash] = useState(false);
  const textareaRef = useRef(null);
  const currentField = DSECTIONS[currentSection];

  function buildMemoryContext() {
    if (!savedSessions.length) return "";
    const MAX_MEMORY_SESSIONS = 8; // bounds input-token growth for long-tenured users — see cost note
    const recent = [...savedSessions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, MAX_MEMORY_SESSIONS)
      .reverse(); // chronological order reads better than most-recent-first
    const lines = recent.map(s => {
      const d = new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return `— ${d}\nThrownness: ${s.answers.thrownness}\nProjection: ${s.answers.projection}\nUncanny: ${s.answers.uncanny}\nYour response: ${s.response}`;
    });
    const note = savedSessions.length > MAX_MEMORY_SESSIONS ? ` (most recent ${MAX_MEMORY_SESSIONS} of a longer history)` : "";
    return `\n\nFor context, you have previously spoken with this person. Their prior sessions${note}:\n\n${lines.join("\n\n")}\n\nNotice what has shifted, what persists, what has deepened or remained unaddressed. Let this inform but not dominate your response to the present moment.`;
  }

  function handleNext() {
    if (!answers[currentField.id].trim()) return;
    if (currentSection < DSECTIONS.length - 1) { setCurrentSection(s => s+1); }
    else { callClaude(); }
  }

  function handleBack() { if (currentSection > 0) setCurrentSection(s => s-1); }

  async function callClaude() {
    setStep("voice"); setLoading(true); setResponse(""); setTypingDone(false); setError(null);
    const memory = buildMemoryContext();
    const systemPrompt = DASEIN_SYSTEM + memory;
    const userMessage = `My thrownness (where I find myself): ${answers.thrownness}\n\nMy projection (what I'm moving toward): ${answers.projection}\n\nMy uncanny (what calls me back): ${answers.uncanny}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "anthropic-version":"2023-06-01",
          "anthropic-dangerous-direct-browser-access":"true",
        },
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, system:systemPrompt, messages:[{role:"user",content:userMessage}] }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text||"").join("") || "";
      setResponse(text);
      // auto-assign a session id for later saving
      setSessionId(Date.now().toString());
    } catch { setError("The voice could not be reached."); }
    setLoading(false);
  }

  function handleSave() {
    if (!response || !sessionId) return;
    const session = {
      id: sessionId,
      date: new Date().toISOString(),
      answers: { ...answers },
      response,
    };
    // avoid duplicate saves
    if (savedSessions.find(s => s.id === sessionId)) { setSaveFlash(true); setTimeout(()=>setSaveFlash(false),1500); return; }
    setSavedSessions([session, ...savedSessions]);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1500);
  }

  function handleErase(id) {
    setSavedSessions(savedSessions.filter(s => s.id !== id));
    setEraseConfirm(null);
  }

  function handleReset() {
    setStep("intro"); setAnswers({thrownness:"",projection:"",uncanny:""});
    setCurrentSection(0); setResponse(""); setTypingDone(false); setError(null);
    setSessionId(null); setSaveFlash(false);
  }

  const currentAnswered = answers[currentField.id]?.trim().length > 0;
  const progress = ((currentSection + (currentAnswered ? 1 : 0)) / DSECTIONS.length) * 100;

  return (
    <div style={{minHeight:"calc(100vh - 52px)",background:DASEIN_PALETTE.void,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Georgia',serif",padding:"24px 14px"}}>
      <style>{`
        @keyframes daseinBreathe { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.15);opacity:1} }
        @keyframes daseinBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes daseinFade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .d-textarea:focus{outline:none}
        .d-textarea::placeholder{color:${DASEIN_PALETTE.mist}}
        .d-textarea{resize:none} @media(max-width:480px){.d-textarea{font-size:13px!important;padding:12px!important}}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:${DASEIN_PALETTE.ash};border-radius:2px}
      `}</style>
      <div style={{width:"100%",maxWidth:520,animation:"daseinFade 0.6s ease"}}>
        <div style={{marginBottom:28,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <div style={{fontSize:11,letterSpacing:"0.3em",color:DASEIN_PALETTE.mist,textTransform:"uppercase",fontFamily:"sans-serif"}}>Da — sein — Care</div>
          <div style={{fontSize:11,letterSpacing:"0.15em",color:DASEIN_PALETTE.ash,fontFamily:"sans-serif"}}>being · there · care</div>
          {savedSessions.length > 0 && (
            <div style={{display:"flex",gap:8,marginTop:4}}>
              {["current","archive"].map(m=>(
                <button key={m} onClick={()=>setViewMode(m)} style={{background:"transparent",border:`1px solid ${viewMode===m?DASEIN_PALETTE.flare+"66":DASEIN_PALETTE.ash}`,color:viewMode===m?DASEIN_PALETTE.flare:DASEIN_PALETTE.mist,fontFamily:"sans-serif",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",padding:"5px 14px",cursor:"pointer",transition:"all 0.2s"}}>
                  {m==="archive"?`archive (${savedSessions.length})`:m}
                </button>
              ))}
            </div>
          )}
        </div>

        {viewMode==="archive" ? (
          <div style={{animation:"daseinFade 0.4s ease"}}>
            {savedSessions.map(s=>{
              const d = new Date(s.date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"});
              return (
                <div key={s.id} style={{marginBottom:24,padding:"18px 20px",background:DASEIN_PALETTE.ground,border:`1px solid ${DASEIN_PALETTE.ash}`,position:"relative"}}>
                  <div style={{fontSize:10,color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",letterSpacing:"0.15em",marginBottom:14}}>{d}</div>
                  {DSECTIONS.map(sec=>(
                    <div key={sec.id} style={{marginBottom:12}}>
                      <div style={{fontSize:9,color:DASEIN_PALETTE.ash,fontFamily:"sans-serif",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:3}}>{sec.heidegger}</div>
                      <div style={{color:DASEIN_PALETTE.fog,fontSize:12,lineHeight:1.7,fontStyle:"italic"}}>{s.answers[sec.id]}</div>
                    </div>
                  ))}
                  <div style={{height:1,background:DASEIN_PALETTE.ash,margin:"14px 0"}}/>
                  <div style={{color:DASEIN_PALETTE.pale,fontSize:13,lineHeight:1.75,fontStyle:"italic"}}>{s.response}</div>
                  {eraseConfirm===s.id ? (
                    <div style={{display:"flex",gap:8,alignItems:"center",marginTop:14}}>
                      <span style={{fontSize:11,color:DASEIN_PALETTE.mist,fontStyle:"italic",flex:1}}>Erase this session?</span>
                      <button onClick={()=>handleErase(s.id)} style={{background:"transparent",border:`1px solid ${DASEIN_PALETTE.mist}`,color:DASEIN_PALETTE.fog,fontFamily:"sans-serif",fontSize:10,letterSpacing:"0.1em",padding:"4px 12px",cursor:"pointer"}}>Erase</button>
                      <button onClick={()=>setEraseConfirm(null)} style={{background:"transparent",border:"none",color:DASEIN_PALETTE.ash,fontFamily:"sans-serif",fontSize:10,cursor:"pointer"}}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={()=>setEraseConfirm(s.id)} style={{position:"absolute",top:12,right:14,background:"transparent",border:"none",color:DASEIN_PALETTE.ash,fontSize:13,cursor:"pointer",transition:"color 0.15s"}}
                      onMouseEnter={e=>e.target.style.color=DASEIN_PALETTE.mist}
                      onMouseLeave={e=>e.target.style.color=DASEIN_PALETTE.ash}>✕</button>
                  )}
                </div>
              );
            })}
            <button onClick={()=>setViewMode("current")} style={{background:"transparent",border:"none",color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",fontSize:11,letterSpacing:"0.2em",cursor:"pointer",textTransform:"uppercase"}}>← return</button>
          </div>
        ) : (
          <>
            {step==="intro" && (
              <div style={{animation:"daseinFade 0.5s ease"}}>
                {savedSessions.length > 0 && (
                  <div style={{marginBottom:24,padding:"14px 16px",background:DASEIN_PALETTE.ground,border:`1px solid ${DASEIN_PALETTE.ash}`}}>
                    <div style={{fontSize:10,color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>◈ memory active</div>
                    <div style={{fontSize:12,color:DASEIN_PALETTE.fog,fontStyle:"italic",lineHeight:1.6}}>Heidegger remembers {savedSessions.length} previous session{savedSessions.length!==1?"s":""}. What has shifted will be heard.</div>
                  </div>
                )}
                <p style={{color:DASEIN_PALETTE.pale,fontSize:17,lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>You are always already somewhere.</p>
                <p style={{color:DASEIN_PALETTE.fog,fontSize:14,lineHeight:1.8,marginBottom:12}}>Not the version of yourself you plan to be. The one who woke up this morning with a particular weight, moving toward something, turning away from something else.</p>
                <p style={{color:DASEIN_PALETTE.fog,fontSize:14,lineHeight:1.8,marginBottom:40}}>This asks three questions. Answer honestly. Then listen.</p>
                {tier<3 && savedSessions.length>=1 ? (
                  <div style={{border:`1px solid ${DASEIN_PALETTE.ash}`,padding:"14px 20px",display:"inline-block"}}>
                    <div style={{color:DASEIN_PALETTE.mist,fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",fontFamily:"sans-serif"}}>🔒 Unlimited Sessions — Premium</div>
                    <div style={{color:DASEIN_PALETTE.fog,fontSize:12,marginTop:6,fontStyle:"italic"}}>Your one free session is on record below.</div>
                  </div>
                ) : (
                  <button onClick={()=>setStep("gather")} style={{background:"transparent",border:`1px solid ${DASEIN_PALETTE.flare}66`,color:DASEIN_PALETTE.flare,fontFamily:"'Georgia',serif",fontSize:13,letterSpacing:"0.1em",padding:"12px 28px",cursor:"pointer",transition:"all 0.2s"}}
                    onMouseEnter={e=>{e.target.style.background=DASEIN_PALETTE.flare+"11";e.target.style.borderColor=DASEIN_PALETTE.flare;}}
                    onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.borderColor=DASEIN_PALETTE.flare+"66";}}>
                    Begin
                  </button>
                )}
              </div>
            )}

            {step==="gather" && (
              <div style={{animation:"daseinFade 0.4s ease"}}>
                <div style={{height:1,background:DASEIN_PALETTE.ash,marginBottom:40,position:"relative"}}>
                  <div style={{height:1,background:DASEIN_PALETTE.flare+"88",width:`${progress}%`,transition:"width 0.4s ease"}}/>
                </div>
                <div style={{marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                  <span style={{fontSize:10,letterSpacing:"0.25em",color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",textTransform:"uppercase"}}>{currentField.heidegger}</span>
                  <span style={{fontSize:10,color:DASEIN_PALETTE.ash,fontFamily:"sans-serif"}}>{currentSection+1} / {DSECTIONS.length}</span>
                </div>
                <div style={{color:DASEIN_PALETTE.light,fontSize:18,lineHeight:1.6,marginBottom:8,fontStyle:"italic"}}>{currentField.label}</div>
                <div style={{color:DASEIN_PALETTE.fog,fontSize:13,lineHeight:1.7,marginBottom:24,fontFamily:"sans-serif"}}>{currentField.prompt}</div>
                <textarea ref={textareaRef} autoFocus className="d-textarea" value={answers[currentField.id]}
                  onChange={e=>setAnswers(a=>({...a,[currentField.id]:e.target.value}))}
                  placeholder={currentField.placeholder} rows={5}
                  style={{width:"100%",background:DASEIN_PALETTE.ground,border:`1px solid ${DASEIN_PALETTE.ash}`,color:DASEIN_PALETTE.pale,fontFamily:"'Georgia',serif",fontSize:14,lineHeight:1.8,padding:"16px",boxSizing:"border-box",transition:"border-color 0.2s"}}
                  onFocus={e=>e.target.style.borderColor=DASEIN_PALETTE.flare+"55"}
                  onBlur={e=>e.target.style.borderColor=DASEIN_PALETTE.ash}
                  onKeyDown={e=>{if(e.key==="Enter"&&e.metaKey) handleNext();}}
                />
                <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
                  {currentSection>0?(<button onClick={handleBack} style={{background:"transparent",border:"none",color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",fontSize:12,cursor:"pointer",letterSpacing:"0.1em"}}>← back</button>):<span/>}
                  <button onClick={handleNext} disabled={!answers[currentField.id].trim()} style={{background:"transparent",border:`1px solid ${answers[currentField.id].trim()?DASEIN_PALETTE.flare+"66":DASEIN_PALETTE.ash}`,color:answers[currentField.id].trim()?DASEIN_PALETTE.flare:DASEIN_PALETTE.mist,fontFamily:"'Georgia',serif",fontSize:13,letterSpacing:"0.1em",padding:"10px 24px",cursor:answers[currentField.id].trim()?"pointer":"default",transition:"all 0.2s"}}>
                    {currentSection<DSECTIONS.length-1?"continue":"listen"}
                  </button>
                </div>
              </div>
            )}

            {step==="voice" && (
              <div style={{animation:"daseinFade 0.5s ease"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:20,marginBottom:32}}>
                  <BreathingOrb active={loading||(!typingDone&&response)}/>
                  <div style={{flex:1}}>
                    {loading&&<div style={{color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",fontSize:12,letterSpacing:"0.15em",paddingTop:14}}>listening…</div>}
                    {error&&<div style={{color:DASEIN_PALETTE.fog,fontFamily:"sans-serif",fontSize:13}}>{error}</div>}
                    {response&&!loading&&<TypedText text={response} onDone={()=>setTypingDone(true)}/>}
                  </div>
                </div>
                {typingDone && (
                  <div style={{animation:"daseinFade 0.8s ease",marginTop:40,borderTop:`1px solid ${DASEIN_PALETTE.ash}`,paddingTop:28}}>
                    <div style={{fontSize:10,letterSpacing:"0.2em",color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",marginBottom:20,textTransform:"uppercase"}}>what you brought</div>
                    {DSECTIONS.map(s=>(
                      <div key={s.id} style={{marginBottom:16}}>
                        <div style={{fontSize:10,color:DASEIN_PALETTE.ash,fontFamily:"sans-serif",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:4}}>{s.heidegger}</div>
                        <div style={{color:DASEIN_PALETTE.fog,fontSize:13,lineHeight:1.7,fontStyle:"italic"}}>{answers[s.id]}</div>
                      </div>
                    ))}
                    <div style={{display:"flex",gap:12,marginTop:28,alignItems:"center",flexWrap:"wrap"}}>
                      <button onClick={handleSave} style={{background:"transparent",border:`1px solid ${saveFlash?DASEIN_PALETTE.flare:DASEIN_PALETTE.flare+"55"}`,color:saveFlash?DASEIN_PALETTE.flare:DASEIN_PALETTE.flare+"88",fontFamily:"sans-serif",fontSize:11,letterSpacing:"0.15em",cursor:"pointer",textTransform:"uppercase",padding:"8px 20px",transition:"all 0.3s"}}>
                        {saveFlash?"✓ Saved":"Save Session"}
                      </button>
                      <button onClick={handleReset} style={{background:"transparent",border:"none",color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",fontSize:11,letterSpacing:"0.2em",cursor:"pointer",textTransform:"uppercase",padding:0}}>return to ground</button>
                    </div>
                    <div style={{marginTop:18,paddingTop:18,borderTop:`1px dashed ${DASEIN_PALETTE.ash}`}}>
                      {tier>=3 ? (
                        <button onClick={()=>{setPreAboutStep("voice"); setStep("about");}} style={{background:"transparent",border:`1px solid ${DASEIN_PALETTE.flare}55`,color:DASEIN_PALETTE.flare,fontFamily:"sans-serif",fontSize:11,letterSpacing:"0.1em",cursor:"pointer",padding:"8px 16px",borderRadius:4}}>Understand the philosophy behind this →</button>
                      ) : (
                        <div style={{color:DASEIN_PALETTE.mist,fontSize:11,letterSpacing:"0.1em",fontFamily:"sans-serif",fontStyle:"italic"}}>🔒 Understand the philosophy behind this — Premium</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {step==="about" && tier>=3 && (
              <div style={{animation:"daseinFade 0.5s ease"}}>
                <button onClick={()=>setStep(preAboutStep)} style={{background:"none",border:"none",color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",fontSize:11,letterSpacing:"0.15em",cursor:"pointer",padding:0,marginBottom:32,textTransform:"uppercase"}}>← Back</button>

                <div style={{display:"flex",gap:20,alignItems:"center",marginBottom:32}}>
                  <div style={{width:96,height:96,borderRadius:"50%",overflow:"hidden",border:`1px solid ${DASEIN_PALETTE.ash}`,flexShrink:0,background:DASEIN_PALETTE.ground}}>
                    <DuotonePortrait imageUrl={HEIDEGGER_PORTRAIT_URL} shadowColor={DASEIN_PALETTE.void} hiColor={DASEIN_PALETTE.flare} fallbackLetter="H" size={96}/>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Georgia',serif",fontSize:20,color:DASEIN_PALETTE.light,fontStyle:"italic"}}>Martin Heidegger</div>
                    <div style={{fontSize:11,color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",letterSpacing:"0.1em",marginTop:4}}>1889 – 1976 · German Philosopher</div>
                  </div>
                </div>

                <p style={{color:DASEIN_PALETTE.pale,fontSize:14,lineHeight:1.85,marginBottom:18}}>Heidegger is the central figure of 20th-century existential phenomenology. His 1927 work <em>Being and Time</em> begins from a single, deceptively simple accusation: that philosophy had spent millennia asking about particular <em>beings</em> — objects, minds, God, nature — while forgetting to ask the more basic question of what it means <em>to be</em> at all.</p>
                <p style={{color:DASEIN_PALETTE.fog,fontSize:13.5,lineHeight:1.8,marginBottom:18}}>He rejected the idea that we are detached minds observing a world of objects from the outside. Instead, we are always already <em>in</em> the world — entangled, involved, using things before we ever theorize about them. Heidegger's word for the entity that we ourselves are is <strong style={{color:DASEIN_PALETTE.light,fontWeight:600}}>Dasein</strong> — literally "being-there." What distinguishes Dasein from a rock or a hammer is that its own existence is always an issue for it: it cares (<em>Sorge</em>) about what it is and what it's becoming.</p>

                <div style={{height:1,background:DASEIN_PALETTE.ash,margin:"32px 0"}}/>
                <div style={{fontSize:10,letterSpacing:"0.2em",color:DASEIN_PALETTE.mist,fontFamily:"sans-serif",textTransform:"uppercase",marginBottom:20}}>The three concepts this asks about</div>

                <div style={{marginBottom:26}}>
                  <div style={{fontSize:11,color:DASEIN_PALETTE.flare,fontFamily:"sans-serif",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>Geworfenheit — Thrownness</div>
                  <p style={{color:DASEIN_PALETTE.fog,fontSize:13,lineHeight:1.8}}>You always find yourself already <em>in</em> a situation — a body, a language, a family, a history — that you never chose and can't get behind. Thrownness isn't a problem to solve; it's the basic fact of existing at all. The first question asks you to describe this honestly: not the situation you wish you were in, but the one you're actually standing in.</p>
                </div>

                <div style={{marginBottom:26}}>
                  <div style={{fontSize:11,color:DASEIN_PALETTE.flare,fontFamily:"sans-serif",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>Entwurf — Projection</div>
                  <p style={{color:DASEIN_PALETTE.fog,fontSize:13,lineHeight:1.8}}>Dasein never just sits inside its thrownness — it's always pressing forward into possibilities, understanding itself in terms of what it's not yet but is moving toward. This isn't calculated planning; it's the basic shape of existing at all. The second question asks what you're projecting yourself toward — not a five-year plan, a direction.</p>
                </div>

                <div style={{marginBottom:26}}>
                  <div style={{fontSize:11,color:DASEIN_PALETTE.flare,fontFamily:"sans-serif",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>Unheimlichkeit — Uncanniness</div>
                  <p style={{color:DASEIN_PALETTE.fog,fontSize:13,lineHeight:1.8}}>Ordinarily we're absorbed in the familiar — what Heidegger calls average everydayness, run by <em>das Man</em> ("the they," the anonymous crowd whose norms we borrow so we don't have to decide for ourselves). Sometimes the ground shifts: anxiety strips the familiar away and existence itself feels not-at-home. Heidegger treats this not as a malfunction but as the moment authentic possibility becomes visible. The third question asks what you've been avoiding — the thing that keeps surfacing and won't stay quiet.</p>
                </div>

                <div style={{height:1,background:DASEIN_PALETTE.ash,margin:"32px 0"}}/>
                <p style={{color:DASEIN_PALETTE.mist,fontSize:12,lineHeight:1.8,fontStyle:"italic"}}>A note on honesty: DaseinCare borrows Heidegger's questions, not his answers. <em>Being and Time</em> resists being flattened into a self-help framework, and this tool doesn't claim to replicate the philosophy — only to borrow its sharpest instrument: three questions built to cut through the noise of daily deliberation to what Heidegger called facticity.</p>
              </div>
            )}
          </>
        )}

        <div style={{marginTop:64,textAlign:"center"}}>
          <div style={{width:1,height:24,background:DASEIN_PALETTE.ash,margin:"0 auto 16px"}}/>
          <div style={{fontSize:10,letterSpacing:"0.15em",color:DASEIN_PALETTE.ash,fontFamily:"sans-serif"}}>Das Sein des Daseins ist die Sorge</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ROOT — INTRASELF
// ═══════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════
// ACCOUNT — sign in / sign up + profile
// ═══════════════════════════════════════════════════════════
// Connects to the Express/SQLite backend — POST /api/signup, POST /api/signin, and
// GET /api/me (all returning { token, user } or the rehydrated user + saved content).
// BACKEND_URL assumes the backend is running locally on port 3001; change this once
// it's deployed somewhere real. Everything past auth — avatar edits, tier changes,
// chosenAnalystId, and the NJTA report / dream entries / dasein sessions — now syncs
// to the backend too (see apiRequest below and its call sites in the root component),
// with local state + localStorage still updated immediately so the UI never waits on
// the network; the sync to the server happens in the background.
const BACKEND_URL = "https://intraselfbackend-production.up.railway.app/api";

// Thin fetch wrapper for authenticated calls: attaches the Bearer token, JSON-encodes
// the body, and throws on non-2xx so callers can .catch() a single error path. Sync
// calls from updateUser/dream-entries/dasein-sessions are fire-and-forget — local state
// is already the source of truth for the UI, so a failed background sync is logged
// rather than surfaced as a blocking error (the change just won't have reached the
// server yet; it'll get overwritten on next successful sync from that same local edit).
async function apiRequest(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request to ${path} failed (${res.status}).`);
  return data;
}

function AuthPage({ onAuth, onCancel }) {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [accountName, setAccountName] = useState("");
  const [handle, setHandle] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width:"100%", background:"#0D0D14", border:"1px solid #2A2A38", borderRadius:8,
    color:"#E8E0D0", padding:"12px 14px", fontSize:14, fontFamily:"sans-serif",
    marginBottom:14, boxSizing:"border-box",
  };
  const labelStyle = { fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:"#5A5A6A", fontFamily:"sans-serif", marginBottom:6, display:"block" };

  const handleSubmit = async () => {
    setError("");
    if (mode === "signup" && (!accountName.trim() || !handle.trim() || !email.trim() || !password)) {
      setError("Account name, handle, email, and password are required.");
      return;
    }
    if (mode === "signin" && (!email.trim() || !password)) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "signup" : "signin";
      const body = mode === "signup"
        ? { accountName: accountName.trim(), handle: handle.trim().replace(/^@/, ""), email: email.trim(), password, dob: dob || null }
        : { email: email.trim(), password };

      const res = await fetch(`${BACKEND_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `${mode === "signup" ? "Sign up" : "Sign in"} failed.`);

      onAuth(data.user, data.token);
    } catch (err) {
      if (err instanceof TypeError) {
        // fetch throws a plain TypeError ("Failed to fetch" / "NetworkError...") when the
        // server can't be reached at all — worth a clearer message than the raw error text.
        setError(`Can't reach the server at ${BACKEND_URL}. Is the backend running?`);
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#08080F", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 24px", fontFamily:"Georgia, serif" }}>
      <div style={{ width:"100%", maxWidth:380 }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ fontSize:34, letterSpacing:"0.12em", color:"#E8E0D0", fontStyle:"italic" }}>IntraSelf<span style={{ fontSize:14, verticalAlign:"super", letterSpacing:0, opacity:0.4 }}>™</span></div>
        </div>

        <div style={{ display:"flex", gap:6, marginBottom:28, justifyContent:"center", fontFamily:"sans-serif" }}>
          {[{id:"signin",label:"Sign In"},{id:"signup",label:"Sign Up"}].map(m=>(
            <button key={m.id} onClick={()=>{setMode(m.id); setError("");}} style={{ padding:"8px 20px", borderRadius:20, border:`1px solid ${mode===m.id?"#C8A84B":"#2A2A38"}`, background:mode===m.id?"#C8A84B18":"transparent", color:mode===m.id?"#C8A84B":"#5A5A6A", fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" }}>{m.label}</button>
          ))}
        </div>

        {mode==="signup" && (
          <>
            <label style={labelStyle}>Account Name</label>
            <input style={inputStyle} value={accountName} onChange={e=>setAccountName(e.target.value)} placeholder="Jane Doe"/>
            <label style={labelStyle}>Handle</label>
            <input style={inputStyle} value={handle} onChange={e=>setHandle(e.target.value)} placeholder="@janedoe"/>
            <label style={labelStyle}>Date of Birth <span style={{opacity:0.5,textTransform:"none"}}>(optional)</span></label>
            <input type="date" style={inputStyle} value={dob} onChange={e=>setDob(e.target.value)}/>
          </>
        )}
        <label style={labelStyle}>Email</label>
        <input type="email" style={inputStyle} value={email} onChange={e=>setEmail(e.target.value)} placeholder="jane@example.com"/>
        <label style={labelStyle}>Password</label>
        <input type="password" style={inputStyle} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/>

        {error && <div style={{ color:"#D89090", fontSize:12, fontFamily:"sans-serif", marginBottom:14 }}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading} style={{ width:"100%", background:"linear-gradient(135deg,#C8A84B,#A88A30)", border:"none", color:"#0A0A14", padding:"13px 0", fontSize:13, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"Inter,sans-serif", fontWeight:600, borderRadius:8, cursor:loading?"wait":"pointer", opacity:loading?0.7:1, marginTop:6 }}>
          {loading ? "Please wait…" : (mode==="signup" ? "Create Account" : "Sign In")}
        </button>
        <button onClick={onCancel} style={{ width:"100%", background:"none", border:"none", color:"#4A4A5A", padding:"14px 0 0", fontSize:12, fontFamily:"sans-serif", cursor:"pointer" }}>← Back</button>
      </div>
    </div>
  );
}

const AVATAR_PRESETS = [
  "linear-gradient(135deg,#C8A84B,#5C4033)",
  "linear-gradient(135deg,#B83235,#5A1A1A)",
  "linear-gradient(135deg,#3E84AC,#1A3A4A)",
  "linear-gradient(135deg,#5A7A5A,#1A2A1A)",
  "linear-gradient(135deg,#6A4A7A,#2A1A2A)",
  "linear-gradient(135deg,#8A8A9A,#2A2A32)",
];

function AccountProfile({ user, tier, onLogout, onBack, onUpdateUser, onUpgradeClick, onCancelPremium, njtaReport, dreamEntries, daseinSessions }) {
  const [cancelConfirm, setCancelConfirm] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const fileInputRef = useRef(null);
  const preferredAnalyst = getPreferredAnalyst(dreamEntries);
  const daseinSummary = getDaseinPracticeSummary(daseinSessions);
  const joined = new Date(user.joinedDate).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" });
  const dobDisplay = user.dob ? new Date(user.dob + "T00:00:00").toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }) : null;
  const avatarGradient = user.avatarPreset || AVATAR_PRESETS[0];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateUser({ avatarImage: reader.result, avatarPreset: null });
      setEditingAvatar(false);
    };
    reader.readAsDataURL(file);
  };

  const rowStyle = { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderBottom:"1px solid #1C1C28" };
  const labelStyle = { fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4A4A5A", fontFamily:"sans-serif" };
  const valueStyle = { fontSize:14, color:"#D8D0C0", fontFamily:"sans-serif" };

  return (
    <div style={{ minHeight:"100vh", background:"#08080F", padding:"48px 24px", fontFamily:"Georgia, serif" }}>
      <div style={{ maxWidth:520, margin:"0 auto" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:"#5A5A6A", fontSize:12, fontFamily:"sans-serif", cursor:"pointer", marginBottom:28, padding:0 }}>← Home</button>

        <div style={{ textAlign:"center", marginBottom:editingAvatar?12:36 }}>
          <div style={{ position:"relative", width:72, height:72, margin:"0 auto 16px" }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background: user.avatarImage ? "none" : avatarGradient, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:"#0A0A14", fontFamily:"Georgia,serif" }}>
              {user.avatarImage
                ? <img src={user.avatarImage} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                : (user.accountName?.[0]?.toUpperCase() || "?")}
            </div>
            <button onClick={()=>setEditingAvatar(v=>!v)} title="Edit avatar" style={{ position:"absolute", bottom:-2, right:-2, width:24, height:24, borderRadius:"50%", background:"#1A1A24", border:"1px solid #3A3A48", color:"#C8A84B", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>✎</button>
          </div>

          {editingAvatar && (
            <div style={{ background:"#0D0D14", border:"1px solid #22222E", borderRadius:10, padding:"16px", marginBottom:24, textAlign:"left" }}>
              <div style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:"#4A4A5A", fontFamily:"sans-serif", marginBottom:10 }}>Choose a color</div>
              <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
                {AVATAR_PRESETS.map((g,i)=>(
                  <button key={i} onClick={()=>onUpdateUser({ avatarPreset:g, avatarImage:null })} style={{ width:30, height:30, borderRadius:"50%", background:g, border: (!user.avatarImage && avatarGradient===g) ? "2px solid #E8E0D0" : "2px solid transparent", cursor:"pointer", padding:0 }}/>
                ))}
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display:"none" }}/>
                <button onClick={()=>fileInputRef.current?.click()} style={{ background:"transparent", border:"1px solid #2A2A38", color:"#C8A84B", fontFamily:"sans-serif", fontSize:11, letterSpacing:"0.08em", padding:"7px 14px", borderRadius:6, cursor:"pointer" }}>Upload Photo</button>
                {user.avatarImage && (
                  <button onClick={()=>onUpdateUser({ avatarImage:null })} style={{ background:"none", border:"none", color:"#5A5A6A", fontFamily:"sans-serif", fontSize:11, cursor:"pointer" }}>Remove Photo</button>
                )}
                <button onClick={()=>setEditingAvatar(false)} style={{ background:"none", border:"none", color:"#4A4A5A", fontFamily:"sans-serif", fontSize:11, cursor:"pointer", marginLeft:"auto" }}>Done</button>
              </div>
            </div>
          )}

          <div style={{ fontSize:22, color:"#E8E0D0", fontStyle:"italic" }}>{user.accountName}</div>
          <div style={{ fontSize:13, color:"#5A5A6A", fontFamily:"sans-serif", marginTop:2 }}>@{user.handle}</div>

          <div style={{ marginTop:14, display:"flex", justifyContent:"center", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"sans-serif", padding:"4px 12px", borderRadius:12, color: tier>=3?"#C8A84B":"#7A8AA0", border:`1px solid ${tier>=3?"#C8A84B55":"#3A3A48"}`, background: tier>=3?"#C8A84B12":"transparent" }}>
              {tier>=3 ? "★ Premium" : "Free"}
            </span>
            {tier<3 && (
              <button onClick={onUpgradeClick} style={{ background:"none", border:"none", color:"#C8A84B", fontFamily:"sans-serif", fontSize:11, cursor:"pointer", padding:0, textDecoration:"underline", textUnderlineOffset:"3px" }}>Upgrade to Premium</button>
            )}
            {tier>=3 && !cancelConfirm && (
              <button onClick={()=>setCancelConfirm(true)} style={{ background:"none", border:"none", color:"#6A6A7A", fontFamily:"sans-serif", fontSize:11, cursor:"pointer", padding:0, textDecoration:"underline", textUnderlineOffset:"3px" }}>Cancel Premium</button>
            )}
          </div>

          {tier>=3 && user.billingPlan && !cancelConfirm && (
            <div style={{ fontSize:11, color:"#4A4A5A", fontFamily:"sans-serif", marginTop:8 }}>
              {user.billingPlan==="annual" ? "$59/year" : "$6.99/month"} plan
            </div>
          )}

          {cancelConfirm && (
            <div style={{ marginTop:16, background:"#0D0D14", border:"1px solid #2A2A38", borderRadius:10, padding:"16px 18px", textAlign:"left" }}>
              <div style={{ fontSize:12, color:"#B8B0A0", fontFamily:"sans-serif", lineHeight:1.6, marginBottom:12 }}>
                Are you sure? You'll lose unlimited retakes and Explanatory Pages on NJTA, access to all five DreamMeaning analysts, and unlimited DaseinCare sessions — immediately, back to the Free tier.
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={()=>{onCancelPremium(); setCancelConfirm(false);}} style={{ background:"transparent", border:"1px solid #D8908866", color:"#D89088", padding:"8px 18px", fontFamily:"sans-serif", fontSize:11, letterSpacing:"0.05em", cursor:"pointer", borderRadius:6 }}>Yes, Cancel</button>
                <button onClick={()=>setCancelConfirm(false)} style={{ background:"transparent", border:"1px solid #2A2A38", color:"#5A5A6A", padding:"8px 18px", fontFamily:"sans-serif", fontSize:11, letterSpacing:"0.05em", cursor:"pointer", borderRadius:6 }}>Keep Premium</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#3A3A4A", fontFamily:"sans-serif", textTransform:"uppercase", marginBottom:8 }}>Account</div>
        <div style={rowStyle}><span style={labelStyle}>Account Name</span><span style={valueStyle}>{user.accountName}</span></div>
        <div style={rowStyle}><span style={labelStyle}>Handle</span><span style={valueStyle}>@{user.handle}</span></div>
        {dobDisplay && <div style={rowStyle}><span style={labelStyle}>Date of Birth</span><span style={valueStyle}>{dobDisplay}</span></div>}
        <div style={rowStyle}><span style={labelStyle}>Joined</span><span style={valueStyle}>{joined}</span></div>

        <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#3A3A4A", fontFamily:"sans-serif", textTransform:"uppercase", margin:"32px 0 8px" }}>Practice</div>

        <div style={rowStyle}>
          <span style={labelStyle}>Psychical Type (NJTA)</span>
          <span style={valueStyle}>
            {njtaReport ? <span style={{color:ALL_TYPES[njtaReport.typeName]?.color}}>{njtaReport.typeName} · {njtaReport.process}</span> : <span style={{color:"#3A3A4A",fontStyle:"italic"}}>Not yet taken</span>}
          </span>
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Preferred Analyst (DreamMeaning)</span>
          <span style={valueStyle}>
            {preferredAnalyst ? <span style={{color:preferredAnalyst.accent}}>{preferredAnalyst.name}</span> : <span style={{color:"#3A3A4A",fontStyle:"italic"}}>No dreams interpreted yet</span>}
          </span>
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Practice (DaseinCare)</span>
          <span style={valueStyle}>
            {daseinSummary ? `${daseinSummary.count} session${daseinSummary.count===1?"":"s"} since ${daseinSummary.since}` : <span style={{color:"#3A3A4A",fontStyle:"italic"}}>No sessions yet</span>}
          </span>
        </div>

        <button onClick={onLogout} style={{ marginTop:40, background:"transparent", border:"1px solid #2A2A38", color:"#5A5A6A", padding:"10px 24px", fontFamily:"Inter,sans-serif", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", borderRadius:6, cursor:"pointer" }}>Sign Out</button>

        <div style={{ marginTop:48, paddingTop:24, borderTop:"1px solid #1C1C28", textAlign:"center" }}>
          <div style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:"#3A3A48", fontFamily:"sans-serif", marginBottom:10 }}>About</div>
          <div style={{ fontSize:11, color:"#4A4A5A", fontFamily:"sans-serif", marginBottom:6 }}>IntraSelf™ · Version {APP_VERSION}</div>
          <div style={{ fontSize:11, color:"#4A4A5A", fontFamily:"sans-serif", marginBottom:6 }}>
            <a href="https://intraself.net/terms" target="_blank" rel="noopener noreferrer" style={{color:"#4A4A5A", textDecoration:"underline", textUnderlineOffset:"2px"}}>intraself.net/terms</a>
            {" · "}
            <a href="https://intraself.net/privacy" target="_blank" rel="noopener noreferrer" style={{color:"#4A4A5A", textDecoration:"underline", textUnderlineOffset:"2px"}}>intraself.net/privacy</a>
          </div>
          <div style={{ fontSize:11, color:"#4A4A5A", fontFamily:"sans-serif", marginBottom:10 }}>
            <a href="mailto:support@intraself.net" style={{color:"#4A4A5A", textDecoration:"none"}}>support@intraself.net</a>
          </div>
          <div style={{ fontSize:10, color:"#2A2A38", fontFamily:"sans-serif" }}>© 2026 Psychical Arts LLC. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAYMENT — upgrade to Premium
// ═══════════════════════════════════════════════════════════
// Redirects to Stripe's hosted Checkout page rather than collecting card details
// directly — no card data ever touches this app's frontend or backend. Tier is only
// ever granted by the backend's Stripe webhook once payment is actually confirmed,
// not by anything that happens in this component.

const PREMIUM_FEATURES = [
  { app:"NJTA",        items:["Unlimited retakes", "Full access to Explanatory Pages"] },
  { app:"DreamMeaning", items:["All five analysts, not just one"] },
  { app:"DaseinCare",  items:["Unlimited sessions", "Access to the Understanding page"] },
];

function PaymentPage({ onCancel, authToken }) {
  const [plan, setPlan] = useState("annual"); // "monthly" | "annual"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const MONTHLY_PRICE = 6.99;
  const ANNUAL_PRICE = 59;
  const annualEquivalentMonthly = (ANNUAL_PRICE / 12).toFixed(2);
  const savingsPct = Math.round((1 - ANNUAL_PRICE / (MONTHLY_PRICE * 12)) * 100);

  const handleCheckout = async () => {
    setError(""); setLoading(true);
    try {
      const data = await apiRequest("/create-checkout-session", { method: "POST", body: { plan }, token: authToken });
      window.location.href = data.url; // hand off to Stripe's hosted checkout page
    } catch (err) {
      setError(err.message || "Could not start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#08080F", display:"flex", flexDirection:"column", alignItems:"center", padding:"48px 24px", fontFamily:"Georgia, serif" }}>
      <div style={{ width:"100%", maxWidth:420 }}>
        <button onClick={onCancel} style={{ background:"none", border:"none", color:"#5A5A6A", fontSize:12, fontFamily:"sans-serif", cursor:"pointer", marginBottom:24, padding:0 }}>← Back to Profile</button>

        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#C8A84B", fontFamily:"sans-serif", marginBottom:8 }}>★ Upgrade</div>
          <div style={{ fontSize:26, color:"#E8E0D0", fontStyle:"italic" }}>Premium</div>
        </div>

        <div style={{ display:"flex", gap:10, marginBottom:24 }}>
          <button onClick={()=>setPlan("annual")} style={{ flex:1, textAlign:"left", padding:"14px 16px", borderRadius:10, border:`1.5px solid ${plan==="annual"?"#C8A84B":"#2A2A38"}`, background: plan==="annual"?"#C8A84B12":"transparent", cursor:"pointer" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
              <span style={{ fontFamily:"sans-serif", fontSize:13, fontWeight:600, color: plan==="annual"?"#C8A84B":"#8A8A9A" }}>Annual</span>
              <span style={{ fontFamily:"sans-serif", fontSize:9, letterSpacing:"0.05em", color:"#7AAA7A", background:"#7AAA7A18", padding:"2px 6px", borderRadius:6 }}>SAVE {savingsPct}%</span>
            </div>
            <div style={{ fontFamily:"sans-serif", fontSize:20, color:"#E8E0D0", marginTop:6 }}>${ANNUAL_PRICE}<span style={{ fontSize:11, color:"#5A5A6A" }}>/year</span></div>
            <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#5A5A6A", marginTop:2 }}>≈ ${annualEquivalentMonthly}/month</div>
          </button>
          <button onClick={()=>setPlan("monthly")} style={{ flex:1, textAlign:"left", padding:"14px 16px", borderRadius:10, border:`1.5px solid ${plan==="monthly"?"#C8A84B":"#2A2A38"}`, background: plan==="monthly"?"#C8A84B12":"transparent", cursor:"pointer" }}>
            <span style={{ fontFamily:"sans-serif", fontSize:13, fontWeight:600, color: plan==="monthly"?"#C8A84B":"#8A8A9A" }}>Monthly</span>
            <div style={{ fontFamily:"sans-serif", fontSize:20, color:"#E8E0D0", marginTop:6 }}>${MONTHLY_PRICE}<span style={{ fontSize:11, color:"#5A5A6A" }}>/month</span></div>
            <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#5A5A6A", marginTop:2 }}>billed monthly</div>
          </button>
        </div>

        <div style={{ background:"#0D0D14", border:"1px solid #22222E", borderRadius:10, padding:"16px 18px", marginBottom:24 }}>
          {PREMIUM_FEATURES.map(group => (
            <div key={group.app} style={{ marginBottom:10 }}>
              <div style={{ fontFamily:"sans-serif", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4A4A5A", marginBottom:4 }}>{group.app}</div>
              {group.items.map(item => (
                <div key={item} style={{ fontFamily:"sans-serif", fontSize:12.5, color:"#B8B0A0", display:"flex", gap:8, marginBottom:3 }}>
                  <span style={{ color:"#C8A84B" }}>✓</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {error && <div style={{ color:"#D89090", fontSize:12, fontFamily:"sans-serif", marginBottom:14 }}>{error}</div>}

        <button onClick={handleCheckout} disabled={loading} style={{ width:"100%", background:"linear-gradient(135deg,#C8A84B,#A88A30)", border:"none", color:"#0A0A14", padding:"14px 0", fontSize:13, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"Inter,sans-serif", fontWeight:600, borderRadius:8, cursor:loading?"wait":"pointer", opacity:loading?0.7:1, marginTop:6 }}>
          {loading ? "Redirecting…" : "Continue to Secure Checkout"}
        </button>
        <div style={{ textAlign:"center", fontSize:10, color:"#3A3A48", fontFamily:"sans-serif", marginTop:14 }}>You'll be taken to Stripe's secure checkout to complete payment.</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SESSION — persists the signed-in user (and token) across reloads
// ═══════════════════════════════════════════════════════════
// Same pattern as the legal-acceptance storage below: wrapped in try/catch so a
// sandbox that blocks localStorage just fails to persist rather than crashing.
// NOTE: this trusts whatever's in storage — there's no backend "verify this token
// is still valid" call yet, so a token revoked or expired server-side would still
// look "signed in" here until the next real API call fails. Fine for now; a real
// launch would want a lightweight /api/me check on load to confirm the session.
const SESSION_STORAGE_KEY = "intraself_session";

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveSession(token, user) {
  try { localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ token, user })); }
  catch { /* storage unavailable — session just won't persist across reloads */ }
}
function clearSession() {
  try { localStorage.removeItem(SESSION_STORAGE_KEY); }
  catch { /* nothing to clean up if storage was never available */ }
}

// ═══════════════════════════════════════════════════════════
// LEGAL — disclaimer + terms, shown once before any app content
// ═══════════════════════════════════════════════════════════
// Persisted via localStorage (wrapped in try/catch — some sandboxed preview environments
// block storage APIs, in which case this just re-shows every load, which is a safe
// fallback rather than a crash). The key is versioned so bumping LEGAL_VERSION forces
// everyone to re-accept if the terms materially change later.
const LEGAL_VERSION = "v1";
const LEGAL_STORAGE_KEY = `intraself_legal_accepted_${LEGAL_VERSION}`;

function readLegalAccepted() {
  try { return localStorage.getItem(LEGAL_STORAGE_KEY) === "true"; }
  catch { return false; }
}
function writeLegalAccepted() {
  try { localStorage.setItem(LEGAL_STORAGE_KEY, "true"); }
  catch { /* storage unavailable — acceptance just won't persist across reloads */ }
}

function LegalModal({ onAgree }) {
  const [checked, setChecked] = useState(false);
  const [declined, setDeclined] = useState(false);

  const sectionTitle = { fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#C8A84B", fontFamily:"sans-serif", marginBottom:10, marginTop:22 };
  const bodyText = { fontSize:13, lineHeight:1.75, color:"#B8B0A0", fontFamily:"sans-serif", marginBottom:2 };

  if (declined) {
    return (
      <div style={{ minHeight:"100vh", background:"#08080F", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px 24px", fontFamily:"Georgia, serif", textAlign:"center" }}>
        <div style={{ fontSize:20, color:"#E8E0D0", fontStyle:"italic", marginBottom:14 }}>IntraSelf requires agreement to continue</div>
        <p style={{ fontSize:13, color:"#7A7A8A", fontFamily:"sans-serif", lineHeight:1.7, maxWidth:380, marginBottom:24 }}>
          You've declined the Disclaimer and Terms & Conditions. The App can't be used without agreeing to them.
        </p>
        <button onClick={()=>setDeclined(false)} style={{ background:"transparent", border:"1px solid #C8A84B66", color:"#C8A84B", padding:"10px 24px", fontFamily:"sans-serif", fontSize:12, letterSpacing:"0.08em", borderRadius:6, cursor:"pointer" }}>Review Again</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#08080F", display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 20px", fontFamily:"Georgia, serif" }}>
      <div style={{ width:"100%", maxWidth:520, maxHeight:"88vh", display:"flex", flexDirection:"column", background:"#0D0D14", border:"1px solid #22222E", borderRadius:14 }}>
        <div style={{ padding:"28px 30px 0" }}>
          <div style={{ fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"#5A5A6A", fontFamily:"sans-serif", marginBottom:6 }}>Before you continue</div>
          <div style={{ fontSize:22, color:"#E8E0D0", fontStyle:"italic" }}>Disclaimer & Terms</div>
        </div>

        <div className="scr" style={{ flex:1, overflowY:"auto", padding:"6px 30px 6px" }}>
          <div style={sectionTitle}>Disclaimer</div>
          <p style={bodyText}>IntraSelf — including NJTA, DreamMeaning, and DaseinCare — is provided for entertainment, self-reflection, and educational purposes only. It is not a substitute for professional mental health diagnosis, treatment, or advice.</p>
          <p style={bodyText}>If you are experiencing a mental health crisis, please contact a licensed professional or emergency services in your area.</p>

          <div style={sectionTitle}>Terms & Conditions</div>
          <p style={bodyText}><strong style={{color:"#C8C0B0"}}>Intellectual property.</strong> All content, code, methodology, and design of IntraSelf — including the NJTA assessment framework, the DreamMeaning analyst personas and interpretive frameworks, and the DaseinCare philosophical content — are the property of Psychical Arts LLC and protected by copyright. No part of the App may be reproduced, distributed, reverse-engineered, or repurposed without express written permission.</p>
          <p style={bodyText}><strong style={{color:"#C8C0B0"}}>No warranty.</strong> IntraSelf is provided "as is." We do not guarantee the accuracy, completeness, or reliability of any assessment result, interpretation, or reflection generated by the App.</p>
          <p style={bodyText}><strong style={{color:"#C8C0B0"}}>Limitation of liability.</strong> To the fullest extent permitted by law, Psychical Arts LLC is not liable for indirect, incidental, or consequential damages arising from your use of the App.</p>
          <p style={{...bodyText, marginBottom:20}}>Full Terms of Service and Privacy Policy are available at <a href="https://intraself.net/terms" target="_blank" rel="noopener noreferrer" style={{color:"#8A7A50"}}>intraself.net/terms</a> and <a href="https://intraself.net/privacy" target="_blank" rel="noopener noreferrer" style={{color:"#8A7A50"}}>intraself.net/privacy</a>.</p>
        </div>

        <div style={{ padding:"16px 30px 26px", borderTop:"1px solid #1C1C28" }}>
          <label style={{ display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer", marginBottom:18 }}>
            <input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} style={{ marginTop:3, cursor:"pointer" }}/>
            <span style={{ fontSize:12.5, color:"#9A9890", fontFamily:"sans-serif", lineHeight:1.6 }}>I have read and agree to the Disclaimer and Terms & Conditions above.</span>
          </label>
          <div style={{ display:"flex", gap:10 }}>
            <button
              onClick={()=>{ if (checked) { writeLegalAccepted(); onAgree(); } }}
              disabled={!checked}
              style={{ flex:1, background: checked ? "linear-gradient(135deg,#C8A84B,#A88A30)" : "#1C1C28", border:"none", color: checked ? "#0A0A14" : "#4A4A5A", padding:"13px 0", fontSize:12.5, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"Inter,sans-serif", fontWeight:600, borderRadius:8, cursor: checked ? "pointer" : "not-allowed" }}>
              I Agree — Continue
            </button>
            <button onClick={()=>setDeclined(true)} style={{ background:"transparent", border:"1px solid #2A2A38", color:"#5A5A6A", padding:"13px 20px", fontFamily:"sans-serif", fontSize:12.5, borderRadius:8, cursor:"pointer" }}>Decline</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Which user fields the backend's PATCH /api/account understands — used to diff
// old vs. new user objects so updateUser only sends what actually changed.
// Only avatar/chosenAnalystId round-trip through updateUser -> PATCH /api/account now —
// tier/billingPlan/subscribedAt are set directly from backend responses (checkout
// success, /api/me, /api/cancel-subscription), never diffed and PATCHed from here.
const ACCOUNT_SYNC_FIELDS = ["avatarPreset", "avatarImage", "chosenAnalystId"];

// Dream entries and dasein sessions are both arrays swapped wholesale by their app
// components (savedEntries.filter(...), [newEntry, ...savedEntries], etc.) rather than
// edited field-by-field, so syncing them means diffing the old array against the new
// one and firing the right PUT/POST/DELETE per row that actually changed — the app
// components themselves don't need to know the backend exists at all.
function syncDreamEntries(prev, updated, token) {
  const prevMap = new Map(prev.map(e => [e.id, e]));
  const updatedMap = new Map(updated.map(e => [e.id, e]));
  for (const id of prevMap.keys()) {
    if (!updatedMap.has(id)) {
      apiRequest(`/dream-entries/${id}`, { method: "DELETE", token })
        .catch(err => console.error("Dream entry delete sync failed:", err.message));
    }
  }
  for (const [id, entry] of updatedMap) {
    const before = prevMap.get(id);
    if (!before || JSON.stringify(before) !== JSON.stringify(entry)) {
      apiRequest(`/dream-entries/${id}`, { method: "PUT", body: entry, token })
        .catch(err => console.error("Dream entry save sync failed:", err.message));
    }
  }
}

// Dasein sessions are write-once (saved after a completed reflection, never edited),
// so only additions and deletions need syncing — no update case.
function syncDaseinSessions(prev, updated, token) {
  const prevIds = new Set(prev.map(s => s.id));
  const updatedIds = new Set(updated.map(s => s.id));
  for (const id of prevIds) {
    if (!updatedIds.has(id)) {
      apiRequest(`/dasein-sessions/${id}`, { method: "DELETE", token })
        .catch(err => console.error("Dasein session delete sync failed:", err.message));
    }
  }
  for (const s of updated) {
    if (!prevIds.has(s.id)) {
      apiRequest("/dasein-sessions", { method: "POST", body: s, token })
        .catch(err => console.error("Dasein session save sync failed:", err.message));
    }
  }
}

export default function IntraSelf() {
  const [legalAccepted, setLegalAccepted] = useState(readLegalAccepted);
  const [active, setActive] = useState(null);
  const [dreamEntries, setDreamEntries] = useState([]);
  const [daseinSessions, setDaseinSessions] = useState([]);
  const [njtaReport, setNjtaReport] = useState(null); // { typeName, process } once an assessment has been completed

  // Account state — hydrated from localStorage on first load so a refresh doesn't
  // immediately sign someone out, then verified/refreshed against the backend below
  // (see the rehydration effect) — this is what actually confirms the session is
  // still valid server-side and pulls in anything saved from another device.
  const [currentUser, setCurrentUser] = useState(() => loadSession()?.user ?? null);
  const [authToken, setAuthToken] = useState(() => loadSession()?.token ?? null);
  const [accountView, setAccountView] = useState(null); // null | "auth" | "payment" | "profile"

  // Tier 1 = no account. Tier 2 = signed up (free). Tier 3 = premium subscriber.
  // currentUser.tier only exists once someone has upgraded past the free default.
  const tier = !currentUser ? 1 : (currentUser.tier || 2);

  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "viewport"; document.head.appendChild(meta); }
    meta.content = "width=device-width, initial-scale=1";
    document.body.style.margin = "0";
  }, []);

  // Rehydrates from the backend once on mount if a session token exists — confirms
  // the token is still valid server-side (rather than trusting localStorage forever,
  // per the old caveat above) and refreshes njtaReport/dreamEntries/daseinSessions
  // with whatever's actually saved. Runs silently in the background: the UI renders
  // immediately from local/cached state and updates in place if this returns something
  // different, so a slow or unreachable backend never blocks the app from opening.
  useEffect(() => {
    if (!authToken) return;
    let cancelled = false;
    apiRequest("/me", { token: authToken })
      .then(data => {
        if (cancelled) return;
        setCurrentUser(data.user);
        setNjtaReport(data.njtaReport);
        setDreamEntries(data.dreamEntries);
        setDaseinSessions(data.daseinSessions);
        saveSession(authToken, data.user);
      })
      .catch(err => {
        // Invalid/expired token or unreachable server — fall back to whatever was
        // cached locally rather than forcing a sign-out on a transient network blip.
        console.error("Session rehydration failed:", err.message);
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Single path for any change to the signed-in user — always keeps React state,
  // localStorage, and the backend in sync, whether the change came from auth, an
  // avatar edit, a tier upgrade/cancellation, or picking a DreamMeaning analyst.
  // Accepts either a partial update object or an updater function (same two shapes
  // setState itself accepts). The PATCH to /api/account only sends fields that
  // actually changed, computed against ACCOUNT_SYNC_FIELDS.
  const updateUser = (updater) => {
    setCurrentUser(u => {
      const updated = typeof updater === "function" ? updater(u) : { ...u, ...updater };
      saveSession(authToken, updated);
      if (authToken && u) {
        const diff = {};
        for (const f of ACCOUNT_SYNC_FIELDS) {
          if (updated?.[f] !== u?.[f]) diff[f] = updated[f];
        }
        if (Object.keys(diff).length) {
          apiRequest("/account", { method: "PATCH", body: diff, token: authToken })
            .catch(err => console.error("Account sync failed:", err.message));
        }
      }
      return updated;
    });
  };

  // Wraps setNjtaReport/setDreamEntries/setDaseinSessions so every app component
  // keeps calling its setter exactly as before, with the backend sync layered on
  // top rather than threaded through each component individually.
  const syncedSetNjtaReport = (report) => {
    setNjtaReport(report);
    if (authToken && report) {
      apiRequest("/njta-report", { method: "PUT", body: report, token: authToken })
        .catch(err => console.error("NJTA report sync failed:", err.message));
    }
  };
  const syncedSetDreamEntries = (updater) => {
    setDreamEntries(prev => {
      const updated = typeof updater === "function" ? updater(prev) : updater;
      if (authToken) syncDreamEntries(prev, updated, authToken);
      return updated;
    });
  };
  const syncedSetDaseinSessions = (updater) => {
    setDaseinSessions(prev => {
      const updated = typeof updater === "function" ? updater(prev) : updater;
      if (authToken) syncDaseinSessions(prev, updated, authToken);
      return updated;
    });
  };

  // Handles the redirect back from Stripe Checkout. On success, force-refreshes from
  // /api/me right away rather than waiting for the next natural rehydration — the
  // webhook that actually grants tier 3 fires around the same time as this redirect,
  // so there's a small race; a couple of quick retries covers the common case where
  // the webhook hasn't landed yet by the time this runs. Either way the query param
  // is stripped from the URL afterward so a refresh doesn't re-trigger this.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get("checkout");
    if (!checkout) return;
    window.history.replaceState({}, "", window.location.pathname);
    if (checkout !== "success" || !authToken) return;

    let attempt = 0;
    const tryRefresh = () => {
      apiRequest("/me", { token: authToken })
        .then(data => {
          setCurrentUser(data.user);
          setNjtaReport(data.njtaReport);
          setDreamEntries(data.dreamEntries);
          setDaseinSessions(data.daseinSessions);
          saveSession(authToken, data.user);
          setAccountView("profile");
          // Webhook may not have landed yet on the very first check — retry briefly.
          if (data.user.tier < 3 && attempt < 4) { attempt++; setTimeout(tryRefresh, 1500); }
        })
        .catch(err => console.error("Post-checkout refresh failed:", err.message));
    };
    tryRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cancels the actual Stripe subscription via the backend (which also downgrades the
  // DB row), then applies whatever it returns locally — replaces the old local-only
  // "just set tier back to 2" stub now that there's a real subscription to cancel.
  const cancelSubscription = async () => {
    if (!authToken) return;
    try {
      const data = await apiRequest("/cancel-subscription", { method: "POST", token: authToken });
      setCurrentUser(data.user);
      saveSession(authToken, data.user);
    } catch (err) {
      console.error("Cancellation failed:", err.message);
    }
  };

  const handleAuth = (user, token) => {
    setCurrentUser(user);
    setAuthToken(token);
    saveSession(token, user);
    setAccountView("profile");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    clearSession();
    setAccountView(null);
  };

  // DreamMeaning and DaseinCare both require an account (Tier 2+); NJTA is open to everyone.
  const handleSelect = (id) => {
    if ((id === "dream" || id === "dasein") && !currentUser) { setAccountView("auth"); return; }
    setActive(id);
  };

  if (!legalAccepted) return <LegalModal onAgree={()=>setLegalAccepted(true)}/>;

  if (accountView === "auth") return <AuthPage onAuth={handleAuth} onCancel={()=>setAccountView(null)}/>;
  if (accountView === "payment") return (
    <PaymentPage
      authToken={authToken}
      onCancel={()=>setAccountView("profile")}
    />
  );
  if (accountView === "profile" && currentUser) return (
    <AccountProfile
      user={currentUser}
      tier={tier}
      njtaReport={njtaReport}
      dreamEntries={dreamEntries}
      daseinSessions={daseinSessions}
      onLogout={handleLogout}
      onBack={()=>setAccountView(null)}
      onUpdateUser={(updates)=>updateUser(updates)}
      onUpgradeClick={()=>setAccountView("payment")}
      onCancelPremium={cancelSubscription}
    />
  );

  if (!active) return <HomePage onSelect={handleSelect} user={currentUser} onAccountClick={()=>setAccountView(currentUser ? "profile" : "auth")} />;
  return (
    <AppShell active={active} onHome={() => setActive(null)}>
      {active === "njta"   && <NJTAApp savedReport={njtaReport} setSavedReport={syncedSetNjtaReport} tier={tier} />}
      {active === "dream"  && <DreamApp savedEntries={dreamEntries} setSavedEntries={syncedSetDreamEntries} tier={tier} chosenAnalystId={currentUser?.chosenAnalystId} setChosenAnalystId={(id)=>updateUser(u=>u?{...u, chosenAnalystId:id}:u)} />}
      {active === "dasein" && <DaseinApp savedSessions={daseinSessions} setSavedSessions={syncedSetDaseinSessions} tier={tier} />}
    </AppShell>
  );
}
