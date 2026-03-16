import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "./blogData.js";

function getPublishedPosts() {
  const today = new Date().toISOString().split("T")[0];
  return BLOG_POSTS
    .filter(p => p.publishDate <= today)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

function BlogNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "/#services" },
    { label: "Packages", href: "/#packages" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Book", href: "/#book" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(218,165,32,0.15)",
      transition: "all 0.4s ease",
      padding: "0 clamp(16px,4vw,48px)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#DAA520", letterSpacing: -1 }}>TBP</span>
          <span className="nav-brand-text" style={{ fontSize: 13, fontFamily: "'Space Mono', monospace", color: "#aaa", letterSpacing: 2, textTransform: "uppercase" }}>The Booth Plug</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desktop">
          {links.map(l => (
            l.href.startsWith("/") && !l.href.includes("#")
              ? <Link key={l.label} to={l.href} style={{ color: l.label === "Blog" ? "#DAA520" : "#ccc", textDecoration: "none", fontSize: 13, fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.2s" }}>{l.label}</Link>
              : <a key={l.label} href={l.href} style={{ color: "#ccc", textDecoration: "none", fontSize: 13, fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.2s" }}>{l.label}</a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: "#DAA520", fontSize: 28, cursor: "pointer" }} className="nav-toggle">{"\u2630"}</button>
      </div>
      {open && (
        <div style={{ padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 16 }} className="nav-mobile">
          {links.map(l => (
            l.href.startsWith("/") && !l.href.includes("#")
              ? <Link key={l.label} to={l.href} onClick={() => setOpen(false)} style={{ color: "#ccc", textDecoration: "none", fontSize: 15, fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 0" }}>{l.label}</Link>
              : <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ color: "#ccc", textDecoration: "none", fontSize: 15, fontFamily: "'Space Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 0" }}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function BlogFooter() {
  return (
    <footer style={{
      padding: "60px clamp(20px,5vw,60px) 32px",
      background: "#080808", borderTop: "1px solid rgba(218,165,32,0.1)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444" }}>
            {"\u00A9"} 2026 The Booth Plug. All rights reserved.
          </span>
          <Link to="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#DAA520", textDecoration: "none" }}>
            {"\u2190"} Back to Home
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const posts = getPublishedPosts();
  const categories = ["All", ...new Set(posts.map(p => p.category))];
  const filtered = selectedCategory === "All" ? posts : posts.filter(p => p.category === selectedCategory);

  useEffect(() => {
    document.title = "Blog | The Booth Plug - DFW Photo Booth Rental";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        ::selection { background: rgba(218,165,32,0.3); color: #fff; }
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
      <BlogNav />

      <section style={{ padding: "120px clamp(20px,5vw,60px) 60px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 3, textTransform: "uppercase" }}>The Blog</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,56px)", color: "#fff", marginTop: 12, letterSpacing: -1 }}>
              Plugged <span style={{ color: "#DAA520" }}>In</span>
            </h1>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#666", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
              Insights on photo booths, DFW events, and making your next event unforgettable.
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                padding: "6px 16px",
                background: selectedCategory === cat ? "rgba(218,165,32,0.15)" : "rgba(255,255,255,0.03)",
                border: selectedCategory === cat ? "1px solid rgba(218,165,32,0.4)" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: 100, cursor: "pointer",
                fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1,
                color: selectedCategory === cat ? "#DAA520" : "#888",
                textTransform: "uppercase",
              }}>{cat}</button>
            ))}
          </div>

          {/* Posts grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {filtered.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: "none" }}>
                <article style={{
                  padding: 28, background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)", borderRadius: 4,
                  display: "flex", flexDirection: "column", height: "100%",
                  transition: "border-color 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span style={{
                      padding: "3px 10px", background: "rgba(218,165,32,0.1)",
                      fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#DAA520",
                      letterSpacing: 1, textTransform: "uppercase", borderRadius: 2,
                    }}>{post.category}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555" }}>{post.readTime} read</span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff",
                    lineHeight: 1.35, marginBottom: 12, flex: 1,
                  }}>{post.title}</h2>
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

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#555", padding: 60 }}>
              No posts in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px clamp(20px,5vw,60px)", background: "#0d0d0d", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,4vw,40px)", color: "#fff", marginBottom: 12 }}>
          Ready to <span style={{ color: "#DAA520" }}>Book?</span>
        </h2>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#666", marginBottom: 24 }}>
          DFW's go-to photo booth for weddings, corporate events, and parties.
        </p>
        <a href="/#book" style={{
          padding: "16px 36px", background: "#DAA520", color: "#0a0a0a",
          fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
          textDecoration: "none", letterSpacing: 2, textTransform: "uppercase",
          borderRadius: 2,
        }}>Book Your Date</a>
      </section>

      <BlogFooter />
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const published = getPublishedPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} | The Booth Plug`;
    }
  }, [slug, post]);

  if (!post) {
    return (
      <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #0a0a0a; }
          @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-toggle { display: block !important; } .nav-brand-text { display: none; } }
          @media (min-width: 769px) { .nav-mobile { display: none !important; } }
        `}</style>
        <BlogNav />
        <div style={{ padding: "160px 20px 100px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#DAA520", marginBottom: 16 }}>Post Not Found</h1>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#888", marginBottom: 32 }}>This post doesn't exist or hasn't been published yet.</p>
          <Link to="/blog" style={{ color: "#DAA520", fontFamily: "'Space Mono', monospace", fontSize: 13, textDecoration: "none" }}>{"\u2190"} Back to Blog</Link>
        </div>
        <BlogFooter />
      </div>
    );
  }

  // Check if post is published
  const today = new Date().toISOString().split("T")[0];
  if (post.publishDate > today) {
    return (
      <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #0a0a0a; }
          @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-toggle { display: block !important; } .nav-brand-text { display: none; } }
          @media (min-width: 769px) { .nav-mobile { display: none !important; } }
        `}</style>
        <BlogNav />
        <div style={{ padding: "160px 20px 100px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#DAA520", marginBottom: 16 }}>Coming Soon</h1>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#888", marginBottom: 32 }}>This post hasn't been published yet. Check back soon!</p>
          <Link to="/blog" style={{ color: "#DAA520", fontFamily: "'Space Mono', monospace", fontSize: 13, textDecoration: "none" }}>{"\u2190"} Back to Blog</Link>
        </div>
        <BlogFooter />
      </div>
    );
  }

  // Get related posts (same category, exclude current)
  const related = published
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const formattedDate = new Date(post.publishDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        ::selection { background: rgba(218,165,32,0.3); color: #fff; }
        a:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: block !important; }
          .nav-brand-text { display: none; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
        .blog-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 28px);
          color: #fff;
          margin: 36px 0 16px;
          letter-spacing: -0.5px;
        }
        .blog-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 22px);
          color: #ddd;
          margin: 28px 0 12px;
        }
        .blog-content p {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: #aaa;
          line-height: 1.9;
          margin-bottom: 16px;
        }
        .blog-content ul, .blog-content ol {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: #aaa;
          line-height: 1.9;
          margin: 0 0 16px 20px;
          padding: 0;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content strong {
          color: #DAA520;
        }
      `}</style>
      <BlogNav />

      <article style={{ padding: "120px clamp(20px,5vw,60px) 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* Back link */}
          <Link to="/blog" style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#DAA520",
            textDecoration: "none", letterSpacing: 1, display: "inline-block", marginBottom: 32,
          }}>{"\u2190"} Back to Blog</Link>

          {/* Post header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{
                padding: "4px 12px", background: "rgba(218,165,32,0.1)",
                fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#DAA520",
                letterSpacing: 1, textTransform: "uppercase", borderRadius: 2,
              }}>{post.category}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555" }}>{post.readTime} read</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555" }}>{formattedDate}</span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              color: "#fff", lineHeight: 1.2, letterSpacing: -1,
            }}>{post.title}</h1>
          </div>

          {/* Post content */}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Keywords / Tags */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {post.keywords.map(kw => (
                <span key={kw} style={{
                  padding: "4px 10px", background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2,
                  fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555",
                }}>{kw}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 48, padding: 32,
            background: "rgba(218,165,32,0.05)",
            border: "1px solid rgba(218,165,32,0.15)",
            borderRadius: 4, textAlign: "center",
          }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#fff", marginBottom: 8 }}>
              Ready to Book <span style={{ color: "#DAA520" }}>The Booth Plug?</span>
            </h3>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#888", marginBottom: 20, lineHeight: 1.7 }}>
              DFW's go-to open-air DSLR photo booth for weddings, corporate events, parties, and brand activations.
            </p>
            <a href="/#book" style={{
              padding: "14px 32px", background: "#DAA520", color: "#0a0a0a",
              fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
              textDecoration: "none", letterSpacing: 2, textTransform: "uppercase",
              borderRadius: 2, display: "inline-block",
            }}>Book Your Date</a>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ padding: "60px clamp(20px,5vw,60px) 80px", background: "#0d0d0d" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#fff", marginBottom: 32, textAlign: "center" }}>
              Related <span style={{ color: "#DAA520" }}>Posts</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {related.map(rp => (
                <Link to={`/blog/${rp.slug}`} key={rp.id} style={{ textDecoration: "none" }}>
                  <article style={{
                    padding: 24, background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)", borderRadius: 4,
                  }}>
                    <span style={{
                      padding: "3px 10px", background: "rgba(218,165,32,0.1)",
                      fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#DAA520",
                      letterSpacing: 1, textTransform: "uppercase", borderRadius: 2,
                    }}>{rp.category}</span>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#fff",
                      lineHeight: 1.35, marginTop: 12, marginBottom: 8,
                    }}>{rp.title}</h3>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#DAA520", letterSpacing: 1 }}>Read {"\u2192"}</span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BlogFooter />
    </div>
  );
}
