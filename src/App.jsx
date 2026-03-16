import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { BLOG_POSTS } from "./blogData.js";
import { BlogList, BlogPostPage } from "./BlogPage.jsx";

emailjs.init("YOUR_PUBLIC_KEY");

const BRAND = {
  name: "The Booth Plug",
  tagline: "Your Plug for Scroll-Stopping Content",
  phone: "(682) 583-4011",
  email: "book@theboothplug.com",
  ig: "@theboothplug",
};

const PACKAGES = [
  {
    name: "The Pop-In",
    price: 299,
    hours: 1,
    tag: "Perfect for intimate gatherings",
    features: [
      "1 hour of booth time",
      "DSLR open-air setup",
      "Custom photo template",
      "Digital gallery (same night)",
      "Social media sharing station",
      "On-site attendant",
    ],
  },
  {
    name: "The Plug",
    price: 549,
    hours: 3,
    tag: "Our most popular package",
    popular: true,
    features: [
      "3 hours of booth time",
      "DSLR open-air setup",
      "Custom photo template",
      "Digital gallery (same night)",
      "Social media sharing station",
      "Props & backdrop included",
      "On-site attendant",
      "Boomerang / GIF mode",
      "Unlimited prints",
    ],
  },
  {
    name: "The Takeover",
    price: 849,
    hours: 5,
    tag: "For events that go all night",
    features: [
      "5 hours of booth time",
      "DSLR open-air setup",
      "Custom photo template",
      "Digital gallery (same night)",
      "Social media sharing station",
      "Premium props & backdrop",
      "On-site attendant",
      "Boomerang / GIF mode",
      "Unlimited prints",
      "Custom branded overlay",
      "Guest book prints",
      "Green screen option",
    ],
  },
];

const SERVICES = [
  { icon: "\u{1F48D}", title: "Weddings", desc: "Elegant setups that match your theme. Custom templates, guest books, and content your guests will actually post." },
  { icon: "\u{1F3E2}", title: "Corporate", desc: "Branded activations, lead capture, and content that extends your event's reach far beyond the venue." },
  { icon: "\u{1F382}", title: "Birthdays & Parties", desc: "Quincea\u00F1eras, sweet 16s, graduation parties \u2014 we bring the energy and the content." },
  { icon: "\u{1F680}", title: "Brand Activations", desc: "Pop-ups, product launches, and experiential marketing. Custom everything, data capture included." },
];

// Blog posts now imported from blogData.js

const FAQ = [
  { q: "How much space does the booth need?", a: "We need about 8\u00D78 feet for the full setup \u2014 camera, lighting, and backdrop. We can work with tighter spaces if needed." },
  { q: "Do you travel outside DFW?", a: "We cover the entire Dallas-Fort Worth metroplex at no extra charge \u2014 from Denton to Waxahachie, Weatherford to Rockwall. Travel outside DFW is available for a flat fee." },
  { q: "How fast do we get our photos?", a: "Same night. Every package includes a digital gallery delivered before you go to sleep. Prints are instant at the event." },
  { q: "Can you match our event theme or brand?", a: "Always. Every booking gets a custom photo template designed to match your colors, fonts, and vibe. Corporate clients get full branded overlays." },
  { q: "What\u2019s your cancellation policy?", a: "50% deposit holds your date. Full refund if cancelled 14+ days out. Inside 14 days, your deposit rolls to a future date within 6 months." },
  { q: "Do you provide props and backdrops?", a: "The Plug and Takeover packages include props and a backdrop. The Pop-In includes a standard white backdrop \u2014 upgrades available." },
];

// ─── COMPONENTS ──────────────────────────────────────────

function Nav({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Services", "Packages", "Gallery", "FAQ", "Blog", "Book"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(218,165,32,0.15)" : "none",
      transition: "all 0.4s ease",
      padding: "0 clamp(16px,4vw,48px)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#DAA520", letterSpacing: -1 }}>TBP</span>
          <span className="nav-brand-text" style={{ fontSize: 13, fontFamily: "'Space Mono', monospace", color: "#aaa", letterSpacing: 2, textTransform: "uppercase" }}>The Booth Plug</span>
        </a>
        {/* Desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desktop">
          {links.map(l => (
            l === "Blog"
              ? <Link key={l} to="/blog" style={{ color: "#ccc", textDecoration: "none", fontSize: 13, fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.2s" }}>{l}</Link>
              : <a key={l} href={`#${l.toLowerCase()}`} style={{ color: activeSection === l.toLowerCase() ? "#DAA520" : "#ccc", textDecoration: "none", fontSize: 13, fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.2s" }}>{l}</a>
          ))}
        </div>
        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{
          display: "none", background: "none", border: "none", color: "#DAA520", fontSize: 28, cursor: "pointer",
        }} className="nav-toggle">{"\u2630"}</button>
      </div>
      {open && (
        <div style={{ padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 16 }} className="nav-mobile">
          {links.map(l => (
            l === "Blog"
              ? <Link key={l} to="/blog" onClick={() => setOpen(false)} style={{ color: "#ccc", textDecoration: "none", fontSize: 15, fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 0" }}>{l}</Link>
              : <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ color: "#ccc", textDecoration: "none", fontSize: 15, fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 0" }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      textAlign: "center", padding: "120px clamp(20px,5vw,60px) 80px",
      background: "radial-gradient(ellipse at 50% 30%, rgba(218,165,32,0.08) 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #111 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(218,165,32,1) 1px, transparent 1px), linear-gradient(90deg, rgba(218,165,32,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div style={{
          display: "inline-block", padding: "6px 18px", marginBottom: 24,
          border: "1px solid rgba(218,165,32,0.3)", borderRadius: 100,
          fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3,
          textTransform: "uppercase", color: "#DAA520",
        }}>
          DFW's Go-To Photo Booth
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 900, color: "#fff", lineHeight: 1,
          marginBottom: 16, letterSpacing: -2,
        }}>
          THE BOOTH<br />
          <span style={{ color: "#DAA520" }}>PLUG</span>
        </h1>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: "clamp(13px, 1.5vw, 16px)",
          color: "#888", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7,
          letterSpacing: 0.5,
        }}>
          Open-air DSLR photo booth experiences for weddings, corporate events, parties & brand activations across Dallas-Fort Worth.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#book" style={{
            padding: "16px 36px", background: "#DAA520", color: "#0a0a0a",
            fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
            textDecoration: "none", letterSpacing: 2, textTransform: "uppercase",
            borderRadius: 2, transition: "all 0.2s",
          }}>Book Your Date</a>
          <a href="#packages" style={{
            padding: "16px 36px", background: "transparent", color: "#DAA520",
            fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
            textDecoration: "none", letterSpacing: 2, textTransform: "uppercase",
            borderRadius: 2, border: "1px solid rgba(218,165,32,0.4)",
            transition: "all 0.2s",
          }}>View Packages</a>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position: "relative", zIndex: 1, marginTop: 80, display: "flex", gap: "clamp(24px,4vw,60px)",
        flexWrap: "wrap", justifyContent: "center",
      }}>
        {[
          { num: "DSLR", label: "Studio-Grade Camera" },
          { num: "Same Night", label: "Digital Delivery" },
          { num: "100%", label: "Custom Templates" },
          { num: "DFW", label: "Based & Operated" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#DAA520", fontWeight: 700 }}>{s.num}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding: "100px clamp(20px,5vw,60px)", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 3, textTransform: "uppercase" }}>What We Do</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", color: "#fff", marginTop: 12, letterSpacing: -1 }}>
            Not Just Photos.<br /><span style={{ color: "#DAA520" }}>Content.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{
              padding: 32, background: "rgba(218,165,32,0.03)",
              border: "1px solid rgba(218,165,32,0.08)", borderRadius: 4,
              transition: "all 0.3s",
            }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#888", lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="packages" style={{ padding: "100px clamp(20px,5vw,60px)", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 3, textTransform: "uppercase" }}>Pricing</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", color: "#fff", marginTop: 12, letterSpacing: -1 }}>
            Pick Your <span style={{ color: "#DAA520" }}>Package</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, alignItems: "start" }}>
          {PACKAGES.map((pkg, i) => (
            <div key={i} style={{
              padding: 36, background: pkg.popular ? "rgba(218,165,32,0.06)" : "rgba(255,255,255,0.02)",
              border: pkg.popular ? "2px solid rgba(218,165,32,0.4)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: 4, position: "relative",
              transform: pkg.popular ? "scale(1.03)" : "none",
            }}>
              {pkg.popular && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "#DAA520", color: "#0a0a0a", padding: "4px 16px",
                  fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                  letterSpacing: 2, textTransform: "uppercase", borderRadius: 2,
                }}>Most Popular</div>
              )}
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#fff", marginBottom: 4 }}>{pkg.name}</h3>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#666", marginBottom: 20 }}>{pkg.tag}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: "#DAA520" }}>${pkg.price}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#666" }}>/ {pkg.hours}hr{pkg.hours > 1 ? "s" : ""}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {pkg.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#DAA520", fontSize: 14 }}>{"\u2713"}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#aaa" }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#book" style={{
                display: "block", textAlign: "center", padding: "14px 24px",
                background: pkg.popular ? "#DAA520" : "transparent",
                color: pkg.popular ? "#0a0a0a" : "#DAA520",
                border: pkg.popular ? "none" : "1px solid rgba(218,165,32,0.4)",
                fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
                textDecoration: "none", letterSpacing: 2, textTransform: "uppercase",
                borderRadius: 2,
              }}>Book Now</a>
            </div>
          ))}
        </div>
        <p style={{
          textAlign: "center", marginTop: 32,
          fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#555",
        }}>
          Need a custom quote for a large event or multi-day activation? <a href="#book" style={{ color: "#DAA520", textDecoration: "none" }}>Contact us</a>.
        </p>
      </div>
    </section>
  );
}

function Gallery() {
  const shots = [
    { bg: "linear-gradient(135deg, #1a1a2e, #16213e)", label: "Wedding \u2014 Highland Park" },
    { bg: "linear-gradient(135deg, #2d1b2e, #1a1a2e)", label: "Corporate \u2014 AT&T Stadium" },
    { bg: "linear-gradient(135deg, #1a2e1a, #1a1a2e)", label: "Birthday \u2014 Deep Ellum" },
    { bg: "linear-gradient(135deg, #2e2a1a, #1a1a2e)", label: "Quincea\u00F1era \u2014 Arlington" },
    { bg: "linear-gradient(135deg, #1a1a2e, #2e1a2a)", label: "Brand Activation \u2014 Uptown" },
    { bg: "linear-gradient(135deg, #1e2a1a, #2e2a1a)", label: "Graduation \u2014 Frisco" },
  ];

  return (
    <section id="gallery" style={{ padding: "100px clamp(20px,5vw,60px)", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 3, textTransform: "uppercase" }}>Our Work</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", color: "#fff", marginTop: 12, letterSpacing: -1 }}>
            The <span style={{ color: "#DAA520" }}>Gallery</span>
          </h2>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#666", marginTop: 12 }}>
            Real events. Real content. Your event is next.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {shots.map((s, i) => (
            <div key={i} style={{
              background: s.bg, borderRadius: 4, aspectRatio: "4/3",
              display: "flex", alignItems: "flex-end", padding: 20,
              position: "relative", overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0.15, fontFamily: "'Playfair Display', serif", fontSize: 60, color: "#DAA520",
              }}>
                {"\u{1F4F8}"}
              </div>
              <div style={{
                position: "relative", zIndex: 1, background: "rgba(0,0,0,0.6)",
                padding: "8px 14px", borderRadius: 2,
                fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ccc",
                letterSpacing: 1,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
        <p style={{
          textAlign: "center", marginTop: 32,
          fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#555",
          fontStyle: "italic",
        }}>
          Gallery photos update after every event — check back often.
        </p>
      </div>
    </section>
  );
}

function Blog() {
  const today = new Date().toISOString().split("T")[0];
  const published = BLOG_POSTS
    .filter(p => p.publishDate <= today)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .slice(0, 4);

  return (
    <section id="blog" style={{ padding: "100px clamp(20px,5vw,60px)", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 3, textTransform: "uppercase" }}>The Blog</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", color: "#fff", marginTop: 12, letterSpacing: -1 }}>
            Plugged <span style={{ color: "#DAA520" }}>In</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {published.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: "none", display: "block", cursor: "pointer" }}>
              <article style={{
                padding: 28, background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)", borderRadius: 4,
                display: "flex", flexDirection: "column", height: "100%",
                cursor: "pointer",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{
                    padding: "3px 10px", background: "rgba(218,165,32,0.1)",
                    fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#DAA520",
                    letterSpacing: 1, textTransform: "uppercase", borderRadius: 2,
                  }}>{post.category}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555" }}>{post.readTime} read</span>
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff",
                  lineHeight: 1.35, marginBottom: 12, flex: 1,
                }}>{post.title}</h3>
                <p style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#777",
                  lineHeight: 1.7, marginBottom: 16,
                }}>{post.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555" }}>
                    {new Date(post.publishDate + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520",
                    letterSpacing: 1,
                  }}>Read {"\u2192"}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/blog" style={{
            padding: "14px 32px", background: "transparent", color: "#DAA520",
            fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
            textDecoration: "none", letterSpacing: 2, textTransform: "uppercase",
            borderRadius: 2, border: "1px solid rgba(218,165,32,0.4)",
            display: "inline-block",
          }}>View All Posts</Link>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" style={{ padding: "100px clamp(20px,5vw,60px)", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 3, textTransform: "uppercase" }}>FAQ</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", color: "#fff", marginTop: 12, letterSpacing: -1 }}>
            Got <span style={{ color: "#DAA520" }}>Questions?</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4,
              overflow: "hidden",
            }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: "100%", padding: "18px 24px", display: "flex",
                  justifyContent: "space-between", alignItems: "center",
                  background: openIdx === i ? "rgba(218,165,32,0.05)" : "rgba(255,255,255,0.02)",
                  border: "none", cursor: "pointer", textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#ddd",
                  letterSpacing: 0.3, paddingRight: 16,
                }}>{item.q}</span>
                <span style={{ color: "#DAA520", fontSize: 18, flexShrink: 0, transition: "transform 0.2s", transform: openIdx === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openIdx === i && (
                <div style={{ padding: "0 24px 18px", background: "rgba(218,165,32,0.03)" }}>
                  <p style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#888",
                    lineHeight: 1.8, margin: 0,
                  }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", eventType: "", package: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, color: "#fff",
    fontFamily: "'Space Mono', monospace", fontSize: 13, outline: "none",
    boxSizing: "border-box",
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setStatus("sending");
    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        event_date: form.date,
        event_type: form.eventType,
        package_selected: form.package,
        message: form.message,
        to_emails: "book@theboothplug.com, adnaan.iqbal@gmail.com, adnaan@fencetastic.net",
      };
      await emailjs.send("service_theboothplug", "template_booking", templateParams);
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section id="book" style={{ padding: "100px clamp(20px,5vw,60px)", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{"\u26A1"}</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#DAA520", marginBottom: 12 }}>You're Plugged In!</h2>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#888", lineHeight: 1.7 }}>
            We got your inquiry. Expect to hear back within a few hours. Check your email for a confirmation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="book" style={{ padding: "100px clamp(20px,5vw,60px)", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 3, textTransform: "uppercase" }}>Book Now</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", color: "#fff", marginTop: 12, letterSpacing: -1 }}>
            Plug In Your <span style={{ color: "#DAA520" }}>Event</span>
          </h2>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#666", marginTop: 8 }}>
            Dates fill fast — especially weekends. Lock yours in now.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
            <input placeholder="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
          </div>
          <input placeholder="Email address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ ...inputStyle, colorScheme: "dark" }} />
            <select value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })} style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Event type</option>
              <option>Wedding</option>
              <option>Corporate Event</option>
              <option>Birthday / Party</option>
              <option>{`Quincea${"\u00F1"}era`}</option>
              <option>Brand Activation</option>
              <option>Other</option>
            </select>
          </div>
          <select value={form.package} onChange={e => setForm({ ...form, package: e.target.value })} style={{ ...inputStyle, appearance: "none" }}>
            <option value="">Select a package (optional)</option>
            <option>The Pop-In ($299 / 1hr)</option>
            <option>The Plug ($549 / 3hrs)</option>
            <option>The Takeover ($849 / 5hrs)</option>
            <option>Custom / Not Sure</option>
          </select>
          <textarea placeholder="Tell us about your event..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
          {status === "error" && (
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#ff4444", textAlign: "center" }}>
              Something went wrong. Please try again or email us directly at book@theboothplug.com
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={status === "sending"}
            style={{
              padding: "16px 32px", background: status === "sending" ? "#8B6914" : "#DAA520", color: "#0a0a0a",
              fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
              letterSpacing: 2, textTransform: "uppercase", border: "none",
              borderRadius: 2, cursor: status === "sending" ? "wait" : "pointer", transition: "all 0.2s",
              opacity: status === "sending" ? 0.7 : 1,
            }}
          >
            {status === "sending" ? "Sending..." : `Lock In My Date ${"\u26A1"}`}
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "60px clamp(20px,5vw,60px) 32px",
      background: "#080808", borderTop: "1px solid rgba(218,165,32,0.1)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#DAA520", fontWeight: 900, marginBottom: 12 }}>The Booth Plug</div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#666", lineHeight: 1.8 }}>
              Open-air DSLR photo booth rentals for Dallas-Fort Worth. Weddings, corporate, parties, brand activations.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Quick Links</h4>
            {["Services", "Packages", "Gallery", "FAQ", "Blog", "Book"].map(l => (
              l === "Blog"
                ? <Link key={l} to="/blog" style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#666", textDecoration: "none", marginBottom: 8 }}>{l}</Link>
                : <a key={l} href={`#${l.toLowerCase()}`} style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#666", textDecoration: "none", marginBottom: 8 }}>{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Service Areas</h4>
            {["Dallas", "Fort Worth", "Arlington", "Plano", "Frisco", "Irving", "McKinney", "Denton", "Grand Prairie", "Southlake"].map(c => (
              <span key={c} style={{
                display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "#555", marginRight: 8, marginBottom: 6,
              }}>{c} {"\u00B7"}</span>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#666", marginBottom: 8 }}>{BRAND.email}</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#666", marginBottom: 8 }}>{BRAND.phone}</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#DAA520" }}>Instagram: {BRAND.ig}</p>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444" }}>
            {"\u00A9"} 2026 The Booth Plug. All rights reserved.
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444" }}>
            Dallas-Fort Worth Photo Booth Rental
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ────────────────────────────────────────────

function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    document.title = "The Booth Plug | DFW Photo Booth Rental";
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        ::selection { background: rgba(218,165,32,0.3); color: #fff; }
        input::placeholder, textarea::placeholder, select { color: #555 !important; }
        input:focus, textarea:focus, select:focus { border-color: rgba(218,165,32,0.4) !important; }
        a:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: block !important; }
          .nav-brand-text { display: none; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
      <Nav activeSection={activeSection} />
      <Hero />
      <Services />
      <Packages />
      <Gallery />
      <FAQSection />
      <Blog />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
    </Routes>
  );
}
