/* global React, CourzaUI */
const { Icon, Logo, CompassRose, SectionHeader, CourseCard, InstitutionCard, FAQItem } = CourzaUI;

// ─────────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────────
const Nav = ({ activePage, setPage }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navigate = (id) => { setMenuOpen(false); setPage(id); };

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'institutions', label: 'Institutions' },
    { id: 'list', label: 'List your institution' },
  ];

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(244,239,227,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
        transition: 'all 0.3s'
      }}>
        <div className="container nav-inner flex items-center justify-between" style={{ padding: '20px 32px' }}>
          <Logo size="md" onClick={() => navigate('home')} />
          <div className="flex items-center gap-8 hide-mobile">
            {links.map(l => (
              <button key={l.id} onClick={() => navigate(l.id)} style={{
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
            <button className="btn btn-ghost btn-sm hide-mobile" onClick={() => navigate('discover')}>
              <Icon name="search" size={14}/> Search
            </button>
            <button className="btn btn-primary btn-sm hide-mobile" onClick={() => navigate('list')}>
              List institution <Icon name="arrow-up-right" size={14}/>
            </button>
            <button className="show-mobile" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid var(--rule-strong)', background: 'var(--card)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={menuOpen ? 'x' : 'menu'} size={18}/>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between" style={{ padding: '20px 20px', borderBottom: '1px solid var(--rule)' }}>
          <Logo size="md" onClick={() => navigate('home')}/>
          <button onClick={() => setMenuOpen(false)} style={{ width: 44, height: 44, borderRadius: 8, border: '1px solid var(--rule-strong)', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={18}/>
          </button>
        </div>
        <div style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => navigate(l.id)} style={{
              textAlign: 'left', padding: '18px 16px', borderRadius: 10,
              fontSize: 22, fontFamily: 'var(--font-serif, Newsreader, Georgia, serif)', fontWeight: 400,
              background: activePage === l.id ? 'var(--paper-2)' : 'transparent',
              color: activePage === l.id ? 'var(--emerald)' : 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px solid var(--rule)'
            }}>
              {l.label}
              {activePage === l.id && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }}/>}
            </button>
          ))}
        </div>
        <div style={{ padding: '24px 20px', borderTop: '1px solid var(--rule)' }}>
          <button className="btn btn-primary full" style={{ justifyContent: 'center' }} onClick={() => navigate('list')}>
            List your institution <Icon name="arrow-up-right" size={14}/>
          </button>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => {
  const [nlState, setNlState] = React.useState('idle');

  const submitNewsletter = async (e) => {
    e.preventDefault();
    setNlState('submitting');
    try {
      const data = new FormData(e.target);
      data.append('_subject', 'New newsletter signup — CourzaTT');
      const res = await fetch('https://formspree.io/f/mvzlzjje', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setNlState(res.ok ? 'done' : 'error');
    } catch {
      setNlState('error');
    }
  };

  return (
    <footer style={{ borderTop: '1px solid var(--ink)', background: 'var(--paper-2)', marginTop: 80 }}>
      <div className="container" style={{ padding: '80px 32px 32px' }}>
        <div className="grid footer-grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: 64, marginBottom: 80 }}>
          <div>
            <Logo size="lg" onClick={() => setPage('home')}/>
            <p className="muted" style={{ marginTop: 24, maxWidth: 360, fontSize: 16, lineHeight: 1.6 }}>
              The hub for discovering your next milestone. Bridging the gap between learners and institutions across Trinidad &amp; Tobago.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <a href="https://www.instagram.com/courzatt?igsh=cjB4bjg4NTY4cnc5" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--rule-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="instagram" size={15}/></a>
              <a href="https://www.linkedin.com/in/courza-trinidad-tobago-053b88407/" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--rule-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="linkedin" size={15}/></a>
              <a href="#" style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--rule-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="youtube" size={15}/></a>
            </div>
          </div>
          <div>
            <div className="mono muted mb-6" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Directory</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><button onClick={() => setPage('discover')} style={{ fontSize: 15 }}>Courses</button></li>
              <li><button onClick={() => setPage('institutions')} style={{ fontSize: 15 }}>Institutions</button></li>
              <li><button onClick={() => setPage('guides')} style={{ fontSize: 15 }}>Online guides</button></li>
              <li><button onClick={() => setPage('list')} style={{ fontSize: 15 }}>Partner with us</button></li>
            </ul>
          </div>
          <div>
            <div className="mono muted mb-6" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Support</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><button onClick={() => { setPage('home'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 120); }} style={{ fontSize: 15 }}>FAQs</button></li>
              <li><button onClick={() => setPage('contact')} style={{ fontSize: 15 }}>Contact</button></li>
              <li><button onClick={() => setPage('privacy')} style={{ fontSize: 15 }}>Privacy</button></li>
            </ul>
          </div>
          <div>
            <div className="mono muted mb-6" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Newsletter</div>
            <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>Get the latest course guides and institutional updates.</p>
            {nlState === 'done' ? (
              <p className="mono" style={{ fontSize: 13, color: 'var(--emerald)', letterSpacing: '0.05em' }}>You're in — we'll be in touch.</p>
            ) : (
              <>
                <form onSubmit={submitNewsletter} className="newsletter-form" style={{ display: 'flex', gap: 8, background: 'var(--card)', border: '1px solid var(--rule)', borderRadius: 999, padding: 6 }}>
                  <input name="email" type="email" required className="input" placeholder="you@example.com" style={{ border: 'none', background: 'transparent', padding: '8px 14px', fontSize: 14 }}/>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={nlState === 'submitting'}>
                    {nlState === 'submitting' ? '…' : 'Join'}
                  </button>
                </form>
                {nlState === 'error' && <p className="mono muted" style={{ fontSize: 11, marginTop: 8 }}>Something went wrong — try again.</p>}
              </>
            )}
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
};

// ─────────────────────────────────────────────────────────────────
// Submit Course Modal
// ─────────────────────────────────────────────────────────────────
const BLANK_COURSE = () => ({ title: '', category: '', type: '', delivery: '', location: '', cost: '', deadline: '', startDate: '', summary: '' });
const CATEGORIES_LIST = ['Technology & Digital', 'Business & Entrepreneurship', 'Hospitality & Culinary', 'Health & Medical', 'Personal Development', 'Creative Arts & Design', 'Technical Trades', 'Finance & Accounting', 'Law & Governance', 'Agriculture & Environment', 'Communication & Media'];
const TYPES_LIST = ['Short Course', 'Workshop', 'Certification', 'Diploma', 'Degree', 'Professional Development'];

const ModalField = ({ label, value, onChange, type = 'text', placeholder = '', required = true, showError = false }) => {
  const missing = showError && required && !value;
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: missing ? 'var(--rust)' : 'var(--muted)', marginBottom: 8 }}>
        {label}{required && <span style={{ color: 'var(--rust)', marginLeft: 4 }}>*</span>}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        style={{ width: '100%', background: 'var(--paper)', border: `1px solid ${missing ? 'var(--rust)' : 'var(--rule)'}`, borderRadius: 10, padding: '12px 16px', fontSize: 15, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = missing ? 'var(--rust)' : 'var(--ink)'}
        onBlur={e => e.target.style.borderColor = missing ? 'var(--rust)' : 'var(--rule)'}
      />
      {missing && <p style={{ fontSize: 12, color: 'var(--rust)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>This field is required</p>}
    </div>
  );
};

const ModalSelect = ({ label, value, onChange, options, placeholder = 'Select…', required = true, showError = false }) => {
  const missing = showError && required && !value;
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: missing ? 'var(--rust)' : 'var(--muted)', marginBottom: 8 }}>
        {label}{required && <span style={{ color: 'var(--rust)', marginLeft: 4 }}>*</span>}
      </label>
      <select
        value={value} onChange={e => onChange(e.target.value)} required={required}
        style={{ width: '100%', background: 'var(--paper)', border: `1px solid ${missing ? 'var(--rust)' : 'var(--rule)'}`, borderRadius: 10, padding: '12px 16px', fontSize: 15, outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = missing ? 'var(--rust)' : 'var(--ink)'}
        onBlur={e => e.target.style.borderColor = missing ? 'var(--rust)' : 'var(--rule)'}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {missing && <p style={{ fontSize: 12, color: 'var(--rust)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>Please select an option</p>}
    </div>
  );
};

const SubmitCourseModal = ({ onClose }) => {
  const [step, setStep] = React.useState(0);
  const [contact, setContact] = React.useState({ name: '', institution: '', email: '', phone: '' });
  const [courses, setCourses] = React.useState([BLANK_COURSE()]);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);
  const [showErrors, setShowErrors] = React.useState(false);

  const totalCourseSteps = courses.length;
  const totalSteps = 1 + totalCourseSteps + 1;
  const progress = step === 0 ? 1 : step <= totalCourseSteps ? step + 1 : totalSteps;

  const updateCourse = (idx, field, val) => {
    setCourses(prev => prev.map((c, i) => i === idx ? { ...c, [field]: val } : c));
  };

  const addCourse = () => {
    const c = courses[step - 1];
    if (!c.title || !c.category || !c.delivery) { setShowErrors(true); return; }
    if (courses.length < 3) setCourses(prev => [...prev, BLANK_COURSE()]);
    setShowErrors(false);
    setStep(s => s + 1);
  };

  const removeCourse = (idx) => {
    setCourses(prev => prev.filter((_, i) => i !== idx));
    setStep(s => Math.min(s, courses.length - 1));
  };

  const contactValid = contact.name && contact.institution && contact.email;
  const courseValid = (c) => c.title && c.category && c.delivery;

  const tryNext = () => {
    if (step === 0 && !contactValid) { setShowErrors(true); return; }
    if (step >= 1 && step <= totalCourseSteps && !courseValid(courses[step - 1])) { setShowErrors(true); return; }
    setShowErrors(false);
    setStep(s => s + 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(false);
    try {
      const courseText = courses.map((c, i) => `
--- Course ${i + 1} ---
Title: ${c.title}
Category: ${c.category}
Type: ${c.type}
Delivery: ${c.delivery}
Location: ${c.location}
Cost: ${c.cost}
Registration deadline: ${c.deadline}
Start date: ${c.startDate}
Description: ${c.summary}
`.trim()).join('\n\n');

      const body = new FormData();
      body.append('_subject', `New course submission — CourzaTT (${courses.length} course${courses.length > 1 ? 's' : ''})`);
      body.append('name', contact.name);
      body.append('email', contact.email);
      body.append('institution', contact.institution);
      body.append('phone', contact.phone || 'Not provided');
      body.append('message', courseText);

      const res = await fetch('https://formspree.io/f/mvzlzjje', {
        method: 'POST', body,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setStep(5);
      else setSubmitError(true);
    } catch { setSubmitError(true); }
    setSubmitting(false);
  };

  const onBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div onClick={onBackdrop} style={{ position: 'fixed', inset: 0, background: 'rgba(14,26,23,0.6)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: 'var(--card)', border: '1px solid var(--rule-strong)', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 80px -20px rgba(14,26,23,0.4)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>
              {step === 5 ? 'Submitted' : `Step ${Math.min(progress, totalSteps)} of ${totalSteps}`}
            </div>
            <div className="serif" style={{ fontSize: 20, fontWeight: 500 }}>
              {step === 0 && 'Your details'}
              {step >= 1 && step <= totalCourseSteps && `Course ${step} of ${totalCourseSteps}`}
              {step === totalCourseSteps + 1 && 'Review & submit'}
              {step === 5 && 'All done!'}
            </div>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', flexShrink: 0 }}>
            <Icon name="x" size={16}/>
          </button>
        </div>

        {/* Progress bar */}
        {step < 5 && (
          <div style={{ height: 3, background: 'var(--rule)', flexShrink: 0 }}>
            <div style={{ height: '100%', background: 'var(--emerald)', width: `${(progress / totalSteps) * 100}%`, transition: 'width 0.4s ease', borderRadius: 2 }}/>
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '28px 32px', overflowY: 'auto', flexGrow: 1 }}>

          {/* Step 0 — Contact */}
          {step === 0 && (
            <div>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 28 }}>
                Tell us who you are. We'll follow up within 2–3 business days once your courses are reviewed.
              </p>
              <ModalField label="Your name" value={contact.name} onChange={v => setContact(p => ({ ...p, name: v }))} placeholder="e.g. Jordan Smith" showError={showErrors}/>
              <ModalField label="Institution / Organisation" value={contact.institution} onChange={v => setContact(p => ({ ...p, institution: v }))} placeholder="e.g. CTS College" showError={showErrors}/>
              <ModalField label="Email address" type="email" value={contact.email} onChange={v => setContact(p => ({ ...p, email: v }))} placeholder="you@example.com" showError={showErrors}/>
              <ModalField label="Phone number" type="tel" value={contact.phone} onChange={v => setContact(p => ({ ...p, phone: v }))} placeholder="+1 (868) 000-0000" required={false} showError={showErrors}/>
            </div>
          )}

          {/* Steps 1–3 — Course detail */}
          {step >= 1 && step <= totalCourseSteps && (() => {
            const idx = step - 1;
            const c = courses[idx];
            return (
              <div>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 28 }}>
                  Fill in what you know — the more detail, the better chance of being listed.
                </p>
                <ModalField label="Course title" value={c.title} onChange={v => updateCourse(idx, 'title', v)} placeholder="e.g. Introduction to Cybersecurity" showError={showErrors}/>
                <ModalSelect label="Category" value={c.category} onChange={v => updateCourse(idx, 'category', v)} options={CATEGORIES_LIST} placeholder="Select a category…" showError={showErrors}/>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <ModalSelect label="Type" value={c.type} onChange={v => updateCourse(idx, 'type', v)} options={TYPES_LIST} placeholder="e.g. Short Course" required={false} showError={showErrors}/>
                  <ModalSelect label="Delivery" value={c.delivery} onChange={v => updateCourse(idx, 'delivery', v)} options={['Online', 'In-person', 'Hybrid']} placeholder="Format…" showError={showErrors}/>
                </div>
                <ModalField label="Location" value={c.location} onChange={v => updateCourse(idx, 'location', v)} placeholder="e.g. Port of Spain / Online" required={false} showError={showErrors}/>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <ModalField label="Registration deadline" type="date" value={c.deadline} onChange={v => updateCourse(idx, 'deadline', v)} required={false} showError={showErrors}/>
                  <ModalField label="Start date" type="date" value={c.startDate} onChange={v => updateCourse(idx, 'startDate', v)} required={false} showError={showErrors}/>
                </div>
                <ModalField label="Cost (TTD)" value={c.cost} onChange={v => updateCourse(idx, 'cost', v)} placeholder="e.g. $1,500.00 or Free" required={false} showError={showErrors}/>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Short description</label>
                  <textarea value={c.summary} onChange={e => updateCourse(idx, 'summary', e.target.value)} rows={3} placeholder="Brief overview of what the course covers…" style={{ width: '100%', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 10, padding: '12px 16px', fontSize: 15, outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                    onBlur={e => e.target.style.borderColor = 'var(--rule)'}
                  />
                </div>
                {idx > 0 && (
                  <button onClick={() => removeCourse(idx)} style={{ fontSize: 13, color: 'var(--rust)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <Icon name="x" size={13}/> Remove this course
                  </button>
                )}
              </div>
            );
          })()}

          {/* Review step */}
          {step === totalCourseSteps + 1 && (
            <div>
              <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Submitted by</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{contact.name}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{contact.institution} · {contact.email}</div>
              </div>
              {courses.map((c, i) => (
                <div key={i} style={{ marginBottom: 16, padding: 18, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber-2)', marginBottom: 6 }}>Course {i + 1}</div>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{c.title || '—'}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{[c.category, c.type, c.delivery].filter(Boolean).join(' · ')}</div>
                  {c.startDate && <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Starts {c.startDate}</div>}
                </div>
              ))}
              {submitError && <p style={{ fontSize: 13, color: 'var(--rust)', marginTop: 12 }}>Something went wrong — please try again.</p>}
            </div>
          )}

          {/* Done */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(31,95,74,0.1)', border: '1px solid var(--emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--emerald)' }}>
                <Icon name="check" size={28}/>
              </div>
              <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, marginBottom: 12 }}>Submission received</h3>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 340, margin: '0 auto 32px' }}>
                Thanks, {contact.name.split(' ')[0]}! We'll review your course{courses.length > 1 ? 's' : ''} and get back to you at <strong>{contact.email}</strong> within 2–3 business days.
              </p>
              <button onClick={onClose} className="btn btn-primary">Close</button>
            </div>
          )}
        </div>

        {/* Footer nav */}
        {step < 5 && (
          <div style={{ padding: '20px 32px', borderTop: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 12 }}>
            <button onClick={() => { setShowErrors(false); setStep(s => Math.max(0, s - 1)); }} className="btn btn-ghost btn-sm" style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>
              ← Back
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {step === totalCourseSteps && step < 3 && (
                <button onClick={addCourse} className="btn btn-ghost btn-sm" style={{ borderColor: 'var(--emerald)', color: 'var(--emerald)' }}>
                  + Add another course
                </button>
              )}
              {(step === 0 || (step >= 1 && step <= totalCourseSteps)) && (
                <button onClick={tryNext} className="btn btn-primary btn-sm">
                  {step === totalCourseSteps ? 'Review →' : 'Next →'}
                </button>
              )}
              {step === totalCourseSteps + 1 && (
                <button onClick={submit} className="btn btn-primary btn-sm" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit courses'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────────────────────────
const Home = ({ setPage }) => {
  const { COURSES, CATEGORIES, FAQS, BLOG_POSTS } = window.CourzaData;
  const courseByTitle = COURSES.reduce((m, c) => { m[c.title.toLowerCase()] = c; return m; }, {});
  const [activeFAQ, setActiveFAQ] = React.useState(0);
  const [openIdx, setOpenIdx] = React.useState(0);
  const [searchQ, setSearchQ] = React.useState('');
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);
  const featuredIds = ['c118', 'c012', 'c113'];
  const featured = featuredIds.map(id => COURSES.find(c => c.id === id)).filter(Boolean);

  const trendingTags = ['CompTIA Security+', 'Project Management', 'AI Literacy', 'Solar Power', 'Pastry Arts', 'Public Speaking'];

  const catIcons = {
    'Business & Entrepreneurship': 'briefcase',
    'Technology & Digital': 'cpu',
    'Hospitality & Culinary': 'chef-hat',
    'Personal Development': 'sparkles',
    'Creative Arts & Design': 'palette',
    'Technical Trades': 'wrench',
    'Professional Development': 'star',
    'Business': 'building',
    'Health & Medical': 'heart',
    'Finance & Accounting': 'sliders',
    'Law & Governance': 'bookmark',
    'Agriculture & Environment': 'leaf',
    'Communication & Media': 'globe',
    'Soft Skills': 'compass',
    'Technology': 'filter',
    'Engineering & Construction': 'map-pin',
  };
  const catTones = {
    'Business & Entrepreneurship': 'emerald',
    'Technology & Digital': 'ink',
    'Hospitality & Culinary': 'amber',
    'Personal Development': 'emerald',
    'Creative Arts & Design': 'amber',
    'Technical Trades': '',
    'Professional Development': '',
    'Business': 'ink',
    'Health & Medical': '',
    'Finance & Accounting': 'emerald',
    'Law & Governance': '',
    'Agriculture & Environment': 'emerald',
    'Communication & Media': '',
    'Soft Skills': 'amber',
    'Technology': '',
    'Engineering & Construction': '',
  };
  const categoryShowcase = CATEGORIES.map(c => {
    const name = typeof c === 'string' ? c : c.name;
    return {
      name,
      count: COURSES.filter(x => x.category === name).length,
      icon: catIcons[name] || 'book',
      tone: catTones[name] || '',
    };
  });

  return (
  <>
    <div className="page-enter">
      {/* HERO */}
      <section style={{ paddingTop: 60, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="eyebrow-num rise rise-1" data-num="N° 01" style={{ marginBottom: 32 }}>An almanac of learning · Trinidad &amp; Tobago</div>
              <h1 className="display-1 serif rise rise-2" style={{ marginBottom: 32 }}>
                Learning skills for <em className="display-italic">a <span className="ul-grow">better you</span>.</em>
              </h1>
              <p className="rise rise-3 muted" style={{ fontSize: 20, lineHeight: 1.55, maxWidth: 540, marginBottom: 40 }}>
                The #1 all-in-one platform to discover courses, training, and skills opportunities across Trinidad &amp; Tobago.
              </p>
              <div className="rise rise-3" style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: 999, padding: 6, display: 'flex', alignItems: 'center', maxWidth: 580, gap: 4 }}>
                <Icon name="search" size={18} style={{ marginLeft: 18, color: 'var(--muted)' }}/>
                <input
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && setPage(searchQ.trim() ? `discover:search:${searchQ.trim()}` : 'discover')}
                  placeholder="Search courses, skills, or institutions…"
                  style={{ flexGrow: 1, background: 'transparent', border: 'none', outline: 'none', padding: '14px 12px', fontSize: 15 }}
                />
                <button className="btn btn-amber" onClick={() => setPage(searchQ.trim() ? `discover:search:${searchQ.trim()}` : 'discover')} style={{ padding: '12px 24px' }}>
                  Search <Icon name="arrow-right" size={14}/>
                </button>
              </div>
              <div className="rise rise-4 flex items-center gap-3 mt-8" style={{ flexWrap: 'wrap' }}>
                <span className="mono muted" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginRight: 4 }}>Trending →</span>
                {trendingTags.map(t => (
                  <button key={t} className="chip" onClick={() => setPage(`discover:search:${t}`)}>{t}</button>
                ))}
              </div>
              <div className="rise rise-4 mt-8">
                <button
                  onClick={() => document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-amber"
                  style={{ padding: '12px 28px' }}
                >
                  Learn more <Icon name="arrow-down" size={14}/>
                </button>
              </div>
            </div>

            <div className="hero-visual" style={{ position: 'relative', height: 560 }}>
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
                  <div className="serif" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1 }}>{COURSES.length}</div>
                  <div style={{ paddingBottom: 6 }}>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--emerald)' }}>{CATEGORIES.length} categories</div>
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
                <span key={`${k}-${i}`} className="serif marquee-item" style={{ fontSize: 30, fontWeight: 400, opacity: 0.85, fontStyle: i % 2 ? 'italic' : 'normal' }}>
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
          <SectionHeader num="N° 02" eyebrow="Browse by field" title={<>Explore <em className="display-italic"><span className="hl">top categories</span></em>.</>} sub={`${CATEGORIES.length} disciplines, mapped to T&T's evolving labour market — from sustainable agriculture to data science.`}/>
          <div className="grid category-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap-grid)' }}>
            {categoryShowcase.slice(0, 4).map((c) => (
              <button key={c.name} onClick={() => setPage(`discover:${c.name}`)} className="card card-hover" style={{
                textAlign: 'left',
                background: c.tone === 'ink' ? 'var(--ink)' : c.tone === 'amber' ? 'var(--amber)' : c.tone === 'emerald' ? 'var(--emerald)' : 'var(--card)',
                color: c.tone === 'ink' || c.tone === 'emerald' ? 'var(--paper)' : 'var(--ink)',
                borderColor: c.tone === 'ink' ? 'var(--ink)' : c.tone === 'amber' ? 'var(--amber-2)' : c.tone === 'emerald' ? 'var(--emerald)' : 'var(--rule)',
                minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
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
          <div className="text-center" style={{ marginTop: 40 }}>
            <button onClick={() => setPage('discover')} className="btn btn-amber">
              View all {categoryShowcase.length} categories <Icon name="arrow-up-right" size={14}/>
            </button>
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
            <button className="btn btn-amber" onClick={() => setPage('discover')}>All courses <Icon name="arrow-up-right" size={14}/></button>
          </div>
          <div className="grid cards-grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-grid)' }}>
            {featured.map(c => <CourseCard key={c.id} course={c} onClick={() => setPage(`course:${c.id}`)}/>)}
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section>
        <div className="container">
          <div className="flex items-end justify-between mb-12" style={{ flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div className="eyebrow-num" data-num="N° 04" style={{ marginBottom: 24 }}>Field notes</div>
              <h2 className="display-2 serif">Course <em className="display-italic">guides &amp; reading</em>.</h2>
            </div>
            <p className="muted" style={{ fontSize: 16, maxWidth: 360, lineHeight: 1.6 }}>Practical reading for learners weighing their next move.</p>
          </div>

          {/* Row 1: Featured article + Online Guides — co-features of equal weight */}
          <div className="guides-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--gap-grid)', alignItems: 'stretch', marginBottom: 'var(--gap-grid)' }}>

            {/* FEATURED — first post */}
            {(() => {
              const p = BLOG_POSTS[0];
              return (
                <article className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 280, overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src="https://i.ibb.co/jvcCcRDg/Courza-Blogsectioniamge1.png"
                      alt="Course guides and reading"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 35%, rgba(14,26,23,0.55) 100%)' }}/>
                    <div style={{ position: 'absolute', bottom: 18, left: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ background: 'var(--amber)', color: 'var(--ink)', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999 }}>{p.topic}</span>
                      <span style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--paper)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', padding: '5px 10px', borderRadius: 999 }}>{p.readTime} read</span>
                    </div>
                  </div>
                  <div style={{ padding: '36px 40px 40px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 className="course-title" style={{ fontSize: 26, lineHeight: 1.18, marginBottom: 14 }}>{p.title}</h3>
                    <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 28 }}>{p.excerpt}</p>
                    <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 22, marginTop: 'auto' }}>
                      <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Featured courses</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {p.courses.slice(0, 3).map((c, ci) => {
                          const match = courseByTitle[c.name.toLowerCase()];
                          return (
                            <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--amber)', flexShrink: 0 }}/>
                              {match
                                ? <button onClick={() => setPage(`course:${match.id}`)} style={{ fontSize: 14, fontWeight: 600, textAlign: 'left', textDecoration: 'underline', textDecorationColor: 'var(--rule-strong)', textUnderlineOffset: 3 }} onMouseEnter={e => e.currentTarget.style.color='var(--emerald)'} onMouseLeave={e => e.currentTarget.style.color=''}>{c.name}</button>
                                : <span style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</span>
                              }
                            </div>
                          );
                        })}
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ marginTop: 24, alignSelf: 'flex-start' }} onClick={() => setPage('guides')}>
                        Explore all <Icon name="arrow-up-right" size={13}/>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })()}

            {/* ONLINE GUIDES — co-feature, right column, full height */}
            <article className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
              {/* Amber top accent bar */}
              <div style={{ height: 4, background: 'var(--amber)', flexShrink: 0 }}/>
              <div style={{ padding: '36px 36px 40px', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
                {/* Ghost typographic number — editorial texture */}
                <div aria-hidden="true" style={{ position: 'absolute', top: -10, right: 20, fontSize: 160, fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: 1, color: 'rgba(244,239,227,0.05)', letterSpacing: '-0.04em', pointerEvents: 'none', userSelect: 'none' }}>9</div>
                {/* Badge row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, position: 'relative' }}>
                  <span style={{ background: 'var(--amber)', color: 'var(--ink)', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999 }}>Online Guides</span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', opacity: 0.4 }}>Global · Free &amp; Paid</span>
                </div>
                {/* Headline */}
                <h3 className="course-title" style={{ fontSize: 30, lineHeight: 1.12, marginBottom: 18, position: 'relative' }}>Global Skills.<br/>T&T Ambition.</h3>
                <p style={{ fontSize: 15, color: 'rgba(244,239,227,0.62)', lineHeight: 1.7, marginBottom: 32, position: 'relative' }}>Nine globally recognised certifications — most of them free — to complement your local qualifications and open doors well beyond the island.</p>
                {/* Divider + platform list */}
                <div style={{ borderTop: '1px solid rgba(244,239,227,0.1)', paddingTop: 24, marginTop: 'auto', position: 'relative' }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.38, marginBottom: 16 }}>Includes free certifications from</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                    {['Google Digital Garage', 'HubSpot Academy', 'Meta Blueprint'].map((platform, pi) => (
                      <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--amber)', flexShrink: 0 }}/>
                        <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.82 }}>{platform}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-amber" style={{ fontSize: 13 }} onClick={() => setPage('guides')}>
                    Browse online guides <Icon name="arrow-up-right" size={13}/>
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Row 2: Supporting articles — compact horizontal strips */}
          <div className="guides-bottom-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap-grid)' }}>
            {BLOG_POSTS.slice(1).map((p, i) => {
              const accent = i === 0 ? 'var(--emerald)' : 'var(--ink)';
              return (
                <article key={p.id} className="card" style={{ display: 'flex', flexDirection: 'row', padding: 0, overflow: 'hidden', alignItems: 'stretch' }}>
                  {/* Left accent stripe */}
                  <div style={{ width: 4, background: accent, flexShrink: 0 }}/>
                  <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span className="chip" style={{ fontSize: 10 }}>{p.topic}</span>
                      <span className="mono muted" style={{ fontSize: 10, letterSpacing: '0.12em' }}>{p.readTime} read</span>
                    </div>
                    <h3 className="course-title" style={{ fontSize: 18, lineHeight: 1.22, marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 18 }}>{p.excerpt}</p>
                    <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 14, marginTop: 'auto' }}>
                      <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Featured courses</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                        {p.courses.slice(0, 2).map((c, ci) => {
                          const match = courseByTitle[c.name.toLowerCase()];
                          return (
                            <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent, flexShrink: 0 }}/>
                              {match
                                ? <button onClick={() => setPage(`course:${match.id}`)} style={{ fontSize: 13, fontWeight: 600, textAlign: 'left', textDecoration: 'underline', textDecorationColor: 'var(--rule-strong)', textUnderlineOffset: 3 }} onMouseEnter={e => e.currentTarget.style.color='var(--emerald)'} onMouseLeave={e => e.currentTarget.style.color=''}>{c.name}</button>
                                : <span style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</span>
                              }
                            </div>
                          );
                        })}
                      </div>
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }} onClick={() => setPage('guides')}>
                        Explore all <Icon name="arrow-up-right" size={12}/>
                      </button>
                    </div>
                  </div>
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
          <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 80 }}>
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
                <button className="btn btn-amber btn-sm" onClick={() => setPage('contact')}>Contact support <Icon name="arrow-right" size={13}/></button>
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

      {/* SUBMIT A COURSE — banner */}
      <section style={{ background: 'var(--emerald)', color: 'var(--paper)', overflow: 'hidden', position: 'relative' }}>
        {/* Decorative number watermark */}
        <div aria-hidden="true" style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontFamily: 'Newsreader, Georgia, serif', fontSize: 'clamp(160px, 22vw, 280px)', fontWeight: 500, lineHeight: 1, color: 'rgba(255,255,255,0.06)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em' }}>+</div>
        <div className="container submit-banner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.65, marginBottom: 16 }}>Know a course we're missing?</div>
            <h2 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Submit a course.<br/>
              <em className="display-italic" style={{ opacity: 0.75 }}>Help a learner find their path.</em>
            </h2>
            <p style={{ fontSize: 16, opacity: 0.75, lineHeight: 1.6, maxWidth: 460 }}>
              Know of a local course or training programme not yet listed? Submit it and we'll review it for the directory — free of charge, always.
            </p>
          </div>
          <div className="submit-banner-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, flexShrink: 0 }}>
            <button onClick={() => setShowSubmitModal(true)} className="btn btn-lg" style={{ background: 'var(--amber)', color: 'var(--ink)', border: 'none', whiteSpace: 'nowrap', fontWeight: 600 }}>
              Submit a course <Icon name="arrow-up-right" size={16}/>
            </button>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.12em', opacity: 0.55, textTransform: 'uppercase' }}>Up to 3 courses · Free · 2 min</div>
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
    {showSubmitModal && <SubmitCourseModal onClose={() => setShowSubmitModal(false)}/>}
  </>
  );
};

window.CourzaPages = window.CourzaPages || {};
Object.assign(window.CourzaPages, { Nav, Footer, Home, SubmitCourseModal });
