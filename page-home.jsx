/* global React, CourzaUI */
const { Icon, Logo, CompassRose, SectionHeader, CourseCard, InstitutionCard, FAQItem } = CourzaUI;

// ─────────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────────
const Nav = ({ activePage, setPage }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'institutions', label: 'Institutions' },
    { id: 'list', label: 'List your institution' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(244,239,227,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'all 0.3s'
    }}>
      <div className="container flex items-center justify-between" style={{ padding: '20px 32px' }}>
        <Logo size="md" onClick={() => setPage('home')} />
        <div className="flex items-center gap-8 hide-mobile">
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{
              fontSize: 14, fontWeight: 500, color: 'var(--ink)',
              opacity: activePage === l.id ? 1 : 0.55,
              position: 'relative', padding: '4px 0',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = activePage === l.id ? 1 : 0.55}
            >
              {l.label}
              {activePage === l.id && <span style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'var(--amber)' }}/>}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-ghost btn-sm hide-mobile" onClick={() => setPage('discover')}>
            <Icon name="search" size={14}/> Search
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setPage('list')}>
            List institution <Icon name="arrow-up-right" size={14}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

// ─────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ borderTop: '1px solid var(--ink)', background: 'var(--paper-2)', marginTop: 80 }}>
    <div className="container" style={{ padding: '80px 32px 32px' }}>
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: 64, marginBottom: 80 }}>
        <div>
          <Logo size="lg" onClick={() => setPage('home')}/>
          <p className="muted" style={{ marginTop: 24, maxWidth: 360, fontSize: 16, lineHeight: 1.6 }}>
            The hub for discovering your next milestone. Bridging the gap between learners and institutions across Trinidad &amp; Tobago.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <a href="#" style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--rule-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="instagram" size={15}/></a>
            <a href="#" style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--rule-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="linkedin" size={15}/></a>
            <a href="#" style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--rule-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="twitter" size={15}/></a>
          </div>
        </div>
        <div>
          <div className="mono muted mb-6" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Directory</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><button onClick={() => setPage('discover')} style={{ fontSize: 15 }}>Courses</button></li>
            <li><button onClick={() => setPage('institutions')} style={{ fontSize: 15 }}>Institutions</button></li>
            <li><button onClick={() => setPage('list')} style={{ fontSize: 15 }}>Partner with us</button></li>
          </ul>
        </div>
        <div>
          <div className="mono muted mb-6" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Support</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li><button style={{ fontSize: 15 }}>FAQs</button></li>
            <li><button style={{ fontSize: 15 }}>Contact</button></li>
            <li><button style={{ fontSize: 15 }}>Privacy</button></li>
          </ul>
        </div>
        <div>
          <div className="mono muted mb-6" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Newsletter</div>
          <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>Get the latest course guides and institutional updates.</p>
          <div style={{ display: 'flex', gap: 8, background: 'var(--card)', border: '1px solid var(--rule)', borderRadius: 999, padding: 6 }}>
            <input className="input" placeholder="you@example.com" style={{ border: 'none', background: 'transparent', padding: '8px 14px', fontSize: 14 }}/>
            <button className="btn btn-primary btn-sm">Join</button>
          </div>
        </div>
      </div>
      <div className="hairline mb-6"/>
      <div className="flex items-center justify-between" style={{ fontSize: 13, color: 'var(--muted)' }}>
        <p>© 2026 CourzaTT Trinidad &amp; Tobago. All rights reserved.</p>
        <p className="mono" style={{ fontSize: 11, letterSpacing: '0.12em' }}>v1.0 — Port of Spain</p>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────────────────────────
const Home = ({ setPage }) => {
  const { COURSES, FAQS, BLOG_POSTS } = window.CourzaData;
  const courseByTitle = COURSES.reduce((m, c) => { m[c.title.toLowerCase()] = c; return m; }, {});
  const [activeFAQ, setActiveFAQ] = React.useState(0);
  const [openIdx, setOpenIdx] = React.useState(0);
  const [searchQ, setSearchQ] = React.useState('');
  const featured = COURSES.filter(c => c.featured).slice(0, 3);

  const trendingTags = ['CompTIA Security+', 'Project Management', 'AI Literacy', 'Solar Power', 'Pastry Arts', 'Public Speaking'];

  const catIcons = { 'Business & Entrepreneurship': 'briefcase', 'Technology & Digital': 'cpu', 'Hospitality & Culinary': 'chef-hat', 'Personal Development': 'sparkles' };
  const catTones = { 'Business & Entrepreneurship': 'emerald', 'Technology & Digital': 'ink', 'Hospitality & Culinary': 'amber', 'Personal Development': 'emerald' };
  const catNames = ['Business & Entrepreneurship', 'Technology & Digital', 'Hospitality & Culinary', 'Personal Development'];
  const categoryShowcase = catNames.map(name => ({
    name,
    count: COURSES.filter(c => c.category === name).length,
    icon: catIcons[name],
    tone: catTones[name],
  }));

  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ paddingTop: 60, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="eyebrow-num rise rise-1" data-num="N° 01" style={{ marginBottom: 32 }}>An almanac of learning · Trinidad &amp; Tobago</div>
              <h1 className="display-1 serif rise rise-2" style={{ marginBottom: 32 }}>
                Learning skills for <em className="display-italic">a <span className="ul-grow">better you</span>.</em>
              </h1>
              <p className="rise rise-3 muted" style={{ fontSize: 20, lineHeight: 1.55, maxWidth: 540, marginBottom: 40 }}>
                One place to discover programmes from public, private, and government institutions across Trinidad &amp; Tobago.
              </p>
              <div className="rise rise-3" style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: 999, padding: 6, display: 'flex', alignItems: 'center', maxWidth: 580, gap: 4 }}>
                <Icon name="search" size={18} style={{ marginLeft: 18, color: 'var(--muted)' }}/>
                <input
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search courses, skills, or institutions…"
                  style={{ flexGrow: 1, background: 'transparent', border: 'none', outline: 'none', padding: '14px 12px', fontSize: 15 }}
                />
                <button className="btn btn-primary" onClick={() => setPage('discover')} style={{ padding: '12px 24px' }}>
                  Search <Icon name="arrow-right" size={14}/>
                </button>
              </div>
              <div className="rise rise-4 flex items-center gap-3 mt-8" style={{ flexWrap: 'wrap' }}>
                <span className="mono muted" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginRight: 4 }}>Trending →</span>
                {trendingTags.map(t => (
                  <button key={t} className="chip" onClick={() => setPage('discover')}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', height: 560 }}>
              {/* Decorative compass */}
              <div style={{ position: 'absolute', top: -20, right: -40, opacity: 0.5, pointerEvents: 'none' }}>
                <CompassRose size={320}/>
              </div>
              {/* Hero photo */}
              <div className="rise rise-2" style={{
                position: 'absolute', top: 40, left: 40, right: 60, bottom: 40,
                borderRadius: 14, overflow: 'hidden',
                border: '1px solid var(--ink)',
                boxShadow: '0 30px 60px -20px rgba(14,26,23,0.25)'
              }}>
                <img src="https://i.ibb.co/VWKrpJ69/Courzaheroimage1.png" alt="Learner" referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.05) saturate(0.95)' }}/>
              </div>
              {/* Stat card overlay */}
              <div className="rise rise-3 card" style={{ position: 'absolute', bottom: 0, left: 0, padding: 22, background: 'var(--paper)', border: '1px solid var(--ink)', minWidth: 220, boxShadow: '0 16px 40px -12px rgba(14,26,23,0.18)' }}>
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>Programmes indexed</div>
                <div className="flex items-end gap-3">
                  <div className="serif" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1 }}>163</div>
                  <div style={{ paddingBottom: 6 }}>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--emerald)' }}>+12 this week</div>
                  </div>
                </div>
              </div>
              {/* Pill badge removed */}
              <div className="rise rise-4" style={{ display: 'none', position: 'absolute', top: 0, right: 60, background: 'var(--amber)', borderRadius: 999, padding: '8px 16px', border: '1px solid var(--ink)', transform: 'rotate(6deg)' }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Updated daily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE — institutions */}
      <section className="tight" style={{ borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)', padding: '28px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-12">
              {['UWI Global Campus', 'UTT', 'SBCS', 'COSTAATT', 'MIC Institute', 'NESC', 'YTEPP', 'ROYTEC', 'Cipriani College', 'School of Business'].map((n, i) => (
                <span key={`${k}-${i}`} className="serif" style={{ fontSize: 30, fontWeight: 400, opacity: 0.85, fontStyle: i % 2 ? 'italic' : 'normal' }}>
                  {n} <span className="mono" style={{ fontSize: 16, marginLeft: 16, color: 'var(--amber)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <div className="container">
          <SectionHeader num="N° 02" eyebrow="Browse by field" title={<>Explore <em className="display-italic"><span className="hl">top categories</span></em>.</>} sub="Sixteen disciplines, mapped to T&T's evolving labour market — from sustainable agriculture to data science."/>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap-grid)' }}>
            {categoryShowcase.map((c, i) => (
              <button key={c.name} onClick={() => setPage('discover')} className="card card-hover" style={{
                textAlign: 'left',
                background: c.tone === 'ink' ? 'var(--ink)' : c.tone === 'amber' ? 'var(--amber)' : c.tone === 'emerald' && i % 3 === 0 ? 'var(--emerald)' : 'var(--card)',
                color: c.tone === 'ink' || (c.tone === 'emerald' && i % 3 === 0) ? 'var(--paper)' : 'var(--ink)',
                borderColor: c.tone === 'ink' ? 'var(--ink)' : c.tone === 'amber' ? 'var(--amber-2)' : 'var(--rule)',
                minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, border: '1px solid currentColor', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={c.icon} size={20}/>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 8 }}>{c.count} programmes</div>
                  <div className="serif" style={{ fontSize: 22, lineHeight: 1.15, fontWeight: 500 }}>{c.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING COURSES */}
      <section style={{ borderTop: '1px solid var(--rule)' }}>
        <div className="container">
          <div className="flex items-end justify-between mb-12" style={{ flexWrap: 'wrap', gap: 24 }}>
            <div style={{ maxWidth: 640 }}>
              <div className="eyebrow-num" data-num="N° 03" style={{ marginBottom: 24 }}>This week's picks</div>
              <h2 className="display-2 serif">Trending <em className="display-italic"><span className="hl">courses</span></em>.</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => setPage('discover')}>All courses <Icon name="arrow-up-right" size={14}/></button>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-grid)' }}>
            {featured.map(c => <CourseCard key={c.id} course={c} onClick={() => setPage(`course:${c.id}`)}/>)}
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section>
        <div className="container">
          <SectionHeader num="N° 04" eyebrow="Field notes" title={<>Course <em className="display-italic">guides &amp; reading</em>.</>} sub="Practical reading for learners weighing their next move."/>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-grid)' }}>
            {BLOG_POSTS.map((p, i) => {
              const bgColors = ['var(--paper-2)', 'var(--ink)', 'var(--emerald)'];
              const textLight = i !== 0;
              return (
                <article key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ borderRadius: 8, background: bgColors[i], marginBottom: 20, padding: '20px 20px 16px', position: 'relative', overflow: 'hidden', border: '1px solid var(--rule)' }}>
                    <span className="mono" style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: textLight ? 'rgba(244,239,227,0.6)' : 'var(--muted)', marginBottom: 8 }}>{p.topic}</span>
                    <div className="serif" style={{ position: 'absolute', bottom: -14, right: 12, fontSize: 100, fontWeight: 400, color: textLight ? 'rgba(244,239,227,0.1)' : 'rgba(14,26,23,0.07)', lineHeight: 1, fontStyle: 'italic', pointerEvents: 'none' }}>0{i+1}</div>
                  </div>
                  <div className="mono muted mb-2" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{p.date}</div>
                  <h3 className="serif" style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.25, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>{p.excerpt}</p>
                  <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 14, marginBottom: p.footer ? 12 : 0 }}>
                    <div className="mono muted mb-2" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Courses to explore</div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {p.courses.map((c, ci) => {
                        const match = courseByTitle[c.name.toLowerCase()];
                        return (
                          <li key={ci} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 13 }}>
                            <span style={{ color: 'var(--emerald)', fontSize: 10, flexShrink: 0 }}>◆</span>
                            {match
                              ? <button onClick={() => setPage(`course:${match.id}`)} style={{ fontWeight: 600, textAlign: 'left', textDecoration: 'underline', textDecorationColor: 'var(--rule-strong)', textUnderlineOffset: 3, transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color='var(--emerald)'} onMouseLeave={e => e.currentTarget.style.color=''}>{c.name}</button>
                              : <span style={{ fontWeight: 500 }}>{c.name}</span>
                            }
                            {c.note && <span style={{ color: 'var(--muted)', fontSize: 12 }}>— {c.note}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {p.footer && <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginTop: 4, fontStyle: 'italic' }}>{p.footer}</p>}
                  <button className="btn btn-ghost" style={{ marginTop: 'auto', paddingTop: 16, alignSelf: 'flex-start', fontSize: 13 }} onClick={() => setPage('discover')}>Browse all <Icon name="arrow-up-right" size={13}/></button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ borderTop: '1px solid var(--rule)' }}>
        <div className="container">
          <SectionHeader num="N° 05" eyebrow="Common questions" title={<>Got <em className="display-italic">questions</em>?</>} sub="Everything you need to know about navigating your learning journey with CourzaTT."/>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 80 }}>
            <div>
              <div className="mono muted mb-4" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Topics</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {FAQS.map((cat, idx) => (
                  <button key={cat.title} onClick={() => { setActiveFAQ(idx); setOpenIdx(0); }} style={{
                    textAlign: 'left', padding: '14px 16px', borderRadius: 8,
                    background: activeFAQ === idx ? 'var(--ink)' : 'transparent',
                    color: activeFAQ === idx ? 'var(--paper)' : 'var(--ink)',
                    display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'all 0.2s'
                  }}>
                    <span className="mono" style={{ fontSize: 11, opacity: 0.6 }}>{String(idx+1).padStart(2,'0')}</span>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{cat.title}</span>
                  </button>
                ))}
              </div>
              <div className="card mt-8" style={{ background: 'var(--paper-2)', padding: 24 }}>
                <p className="serif" style={{ fontSize: 18, lineHeight: 1.4, marginBottom: 16 }}>Still stuck? Our team is on hand to help you find your path.</p>
                <button className="btn btn-amber btn-sm">Contact support <Icon name="arrow-right" size={13}/></button>
              </div>
            </div>
            <div>
              {FAQS[activeFAQ].questions.map((q, i) => (
                <FAQItem key={`${activeFAQ}-${i}`} q={q} idx={i} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', borderTop: '1px solid var(--ink)' }}>
        <div className="container text-center">
          <div className="eyebrow-num" data-num="N° 06" style={{ color: 'var(--paper)', justifyContent: 'center', display: 'inline-flex', marginBottom: 24 }}>Final word</div>
          <h2 className="display-2 serif" style={{ maxWidth: 880, margin: '0 auto 32px' }}>
            Your next chapter is <em className="display-italic" style={{ color: 'var(--amber)' }}>already listed</em>.
          </h2>
          <p style={{ fontSize: 18, opacity: 0.7, maxWidth: 540, margin: '0 auto 40px' }}>
            One directory. Every accredited programme. Built for the way Trinbagonians actually learn.
          </p>
          <div className="flex items-center gap-3 justify-center">
            <button className="btn btn-amber btn-lg" onClick={() => setPage('discover')}>Browse the directory <Icon name="arrow-right" size={14}/></button>
            <button className="btn btn-lg" onClick={() => setPage('list')} style={{ border: '1px solid var(--paper)', color: 'var(--paper)' }}>List your institution</button>
          </div>
        </div>
      </section>
    </div>
  );
};

window.CourzaPages = window.CourzaPages || {};
Object.assign(window.CourzaPages, { Nav, Footer, Home });
