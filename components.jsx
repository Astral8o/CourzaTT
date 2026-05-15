/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────────
// Inline SVG icons (Lucide-style stroke icons)
// ─────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, stroke = 1.6, className = "", style }) => {
  const s = size;
  const common = {
    width: s, height: s, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
    className, style
  };
  switch (name) {
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'arrow-right': return <svg {...common}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-up-right': return <svg {...common}><path d="M7 17 17 7M7 7h10v10"/></svg>;
    case 'arrow-down': return <svg {...common}><path d="M12 5v14M5 12l7 7 7-7"/></svg>;
    case 'plus': return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus': return <svg {...common}><path d="M5 12h14"/></svg>;
    case 'x': return <svg {...common}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'menu': return <svg {...common}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'heart': return <svg {...common}><path d="M19 14c1.5-1.5 2-3.5 2-5a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 0-9 0c0 1.5.5 3.5 2 5l7 7Z"/></svg>;
    case 'bookmark': return <svg {...common}><path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>;
    case 'calendar': return <svg {...common}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case 'clock': return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
    case 'map-pin': return <svg {...common}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'globe': return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/></svg>;
    case 'book': return <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5Z"/><path d="M4 19.5V22h16"/></svg>;
    case 'check': return <svg {...common}><path d="M20 6 9 17l-5-5"/></svg>;
    case 'check-circle': return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'compass': return <svg {...common}><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/></svg>;
    case 'sparkles': return <svg {...common}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2"/></svg>;
    case 'filter': return <svg {...common}><path d="M22 3H2l8 9.5V19l4 2v-8.5z"/></svg>;
    case 'share': return <svg {...common}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>;
    case 'send': return <svg {...common}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>;
    case 'chevron-down': return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chevron-right': return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
    case 'external': return <svg {...common}><path d="M15 3h6v6M10 14 21 3M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"/></svg>;
    case 'leaf': return <svg {...common}><path d="M11 20A7 7 0 0 1 4 13c0-7 9-9 17-9 0 9-2 16-9 16Z"/><path d="M4 13c5-1 8-4 9-9"/></svg>;
    case 'wrench': return <svg {...common}><path d="M14.7 6.3a4 4 0 1 0 4 4l-9 9a2.83 2.83 0 0 1-4-4l9-9z"/></svg>;
    case 'palette': return <svg {...common}><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 1 0 8 16c0-1-1-2-2-2h-2a2 2 0 0 1-2-2 2 2 0 0 0-2-2h-1a2 2 0 0 1 0-4h2a4 4 0 0 0 4-4 6 6 0 0 0-5-2"/></svg>;
    case 'cpu': return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>;
    case 'briefcase': return <svg {...common}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20"/></svg>;
    case 'chef-hat': return <svg {...common}><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><path d="M6 17h12"/></svg>;
    case 'instagram': return <svg {...common}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/><path d="M17.5 6.5h.01"/></svg>;
    case 'linkedin': return <svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
    case 'youtube': return <svg {...common}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>;
    case 'mail': return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>;
    case 'tag': return <svg {...common}><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.6-7.6V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1"/></svg>;
    case 'sliders': return <svg {...common}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>;
    case 'building': return <svg {...common}><path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18z"/><path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 22v-4h6v4"/></svg>;
    case 'star': return <svg {...common}><polygon points="12 2 15 9 22 10 17 15 18 22 12 19 6 22 7 15 2 10 9 9"/></svg>;
    default: return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>;
  }
};

// ─────────────────────────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────────────────────────
const Logo = ({ size = 'md', onClick }) => {
  const dims = { sm: 28, md: 34, lg: 44 }[size];
  const text = { sm: 18, md: 22, lg: 28 }[size];
  return (
    <div onClick={onClick} className="flex items-center gap-3" style={{ cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}>
      <svg width={dims} height={dims} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
        <circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--ink)" strokeWidth="1"/>
        <path d="M28 12 C 24 9, 16 9, 12 16 C 8 23, 14 31, 22 30" stroke="var(--ink)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
        <circle cx="28" cy="20" r="3.5" fill="var(--amber)" stroke="var(--ink)" strokeWidth="1.2"/>
      </svg>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
        <span className="serif" style={{ fontSize: text, fontWeight: 500, letterSpacing: '-0.025em', color: 'var(--ink)' }}>Courza</span>
        <span className="mono" style={{ fontSize: text * 0.5, fontWeight: 500, color: 'var(--emerald)', marginLeft: 4, transform: 'translateY(-3px)' }}>TT</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Compass ornament — used in hero
// ─────────────────────────────────────────────────────────────────
const CompassRose = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block' }}>
    <g className="rotate-slow" style={{ transformOrigin: '100px 100px' }}>
      <circle cx="100" cy="100" r="98" fill="none" stroke="var(--ink)" strokeWidth="0.5" strokeDasharray="2 4"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="var(--rule-strong)" strokeWidth="0.5"/>
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i * 6) * Math.PI / 180;
        const isMajor = i % 5 === 0;
        const r1 = 80;
        const r2 = isMajor ? 88 : 84;
        return <line key={i} x1={100 + r1*Math.cos(a)} y1={100 + r1*Math.sin(a)} x2={100 + r2*Math.cos(a)} y2={100 + r2*Math.sin(a)} stroke="var(--ink)" strokeWidth={isMajor ? 0.8 : 0.4}/>;
      })}
    </g>
    <g style={{ transformOrigin: '100px 100px' }}>
      <circle cx="100" cy="100" r="50" fill="none" stroke="var(--ink)" strokeWidth="0.6"/>
      <path d="M100 50 L106 100 L100 150 L94 100 Z" fill="var(--ink)" opacity="0.85"/>
      <path d="M50 100 L100 94 L150 100 L100 106 Z" fill="none" stroke="var(--ink)" strokeWidth="0.6"/>
      <circle cx="100" cy="100" r="4" fill="var(--amber)" stroke="var(--ink)" strokeWidth="0.8"/>
      <text x="100" y="42" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--ink)" letterSpacing="2">N</text>
      <text x="100" y="166" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--ink)" letterSpacing="2">S</text>
      <text x="38" y="103" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--ink)" letterSpacing="2">W</text>
      <text x="162" y="103" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--ink)" letterSpacing="2">E</text>
    </g>
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Section Header — numbered editorial style
// ─────────────────────────────────────────────────────────────────
const SectionHeader = ({ num, eyebrow, title, sub, align = 'left', kicker }) => (
  <div style={{ textAlign: align, marginBottom: 56, maxWidth: align === 'center' ? 720 : 'none', marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
    <div className="eyebrow-num" data-num={num} style={{ marginBottom: 24 }}>{eyebrow}</div>
    <h2 className="display-2 serif" style={{ marginBottom: sub ? 16 : 0 }}>
      {title}
    </h2>
    {sub && <p className="muted" style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 620, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>{sub}</p>}
  </div>
);

// ─────────────────────────────────────────────────────────────────
// Course Card — three densities
// ─────────────────────────────────────────────────────────────────
const getCourseURL = (course) => {
  if (course.website) return course.website;
  const inst = (window.CourzaData?.INSTITUTIONS || []).find(i => i.id === course.institutionId);
  return inst?.website || '#';
};

const VisitCTA = ({ url, size = 'md' }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="btn btn-primary"
    style={size === 'sm'
      ? { padding: '10px 16px', fontSize: 12 }
      : { padding: '12px 20px', fontSize: 13 }}
  >
    Visit website <Icon name="external" size={13}/>
  </a>
);

const CourseCard = ({ course, layout = 'grid', onClick, density = 'comfortable' }) => {
  const isWide = layout === 'wide';
  const url = getCourseURL(course);
  const _now = new Date(); _now.setHours(0, 0, 0, 0);
  const isClosed = course.startDate && new Date(course.startDate) <= _now;

  if (layout === 'compact') {
    // Minimal row — for compact density
    return (
      <div className="card" style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto auto', gap: 20, alignItems: 'center', textAlign: 'left', width: '100%', padding: '20px 24px' }}>
        <div style={{ width: 56, height: 56, borderRadius: 8, background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--rule)' }}>
          <span className="serif" style={{ fontSize: 22, color: 'var(--emerald)' }}>{course.institutionName.charAt(0)}</span>
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="flex items-center gap-3 mb-2" style={{ flexWrap: 'wrap' }}>
            <span className="tag tag-emerald">{course.type}</span>
            {isClosed && <span className="tag" style={{ background: 'var(--paper-2)', color: 'var(--muted)', borderColor: 'var(--rule)' }}>Registration closed</span>}
            <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>{course.institutionName}</span>
          </div>
          <h3 className="course-title" style={{ fontSize: 18, lineHeight: 1.2 }}>{course.title}</h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Cost</div>
          <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>{course.cost}</div>
        </div>
        <VisitCTA url={url} size="sm"/>
      </div>
    );
  }

  if (isWide) {
    return (
      <div className="card course-card-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 32, alignItems: 'stretch', textAlign: 'left', width: '100%' }}>
        <div>
          <div className="flex items-center gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
            <span className="tag tag-emerald">{course.type}</span>
            <span className="tag">{course.category}</span>
            {isClosed && <span className="tag" style={{ background: 'var(--paper-2)', color: 'var(--muted)', borderColor: 'var(--rule)' }}>Registration closed</span>}
          </div>
          <h3 className="course-title" style={{ fontSize: 26, lineHeight: 1.15, marginBottom: 12 }}>{course.title}</h3>
          <p className="muted" style={{ fontSize: 15, marginBottom: 20, maxWidth: 640 }}>{course.summary}</p>
          <div className="flex items-center gap-6 mb-4" style={{ flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}><Icon name="building" size={12} style={{ display: 'inline', marginRight: 6, marginBottom: -2 }}/>{course.institutionName}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}><Icon name="map-pin" size={12} style={{ display: 'inline', marginRight: 6, marginBottom: -2 }}/>{course.location}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}><Icon name="globe" size={12} style={{ display: 'inline', marginRight: 6, marginBottom: -2 }}/>{course.delivery}</span>
          </div>
          {course.tags && course.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {course.tags.map(tag => (
                <button key={tag} onClick={e => { e.stopPropagation(); window.location.hash = 'discover:tag:' + tag; }} className="chip" style={{ fontSize: 11, padding: '3px 10px', cursor: 'pointer' }}>{tag}</button>
              ))}
            </div>
          )}
          <VisitCTA url={url}/>
        </div>
        <div className="course-card-wide-sidebar" style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="mono muted mb-2" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Begins</div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>{course.startDate}</div>
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
            <div className="mono muted mb-2" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Cost</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{course.cost}</div>
          </div>
        </div>
      </div>
    );
  }

  // Default — grid card
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%', height: '100%' }}>
      <div className="flex items-center gap-2 mb-6" style={{ flexWrap: 'wrap' }}>
        <span className="tag tag-emerald">{course.type}</span>
        {course.featured && <span className="tag tag-amber"><Icon name="star" size={10} /> Featured</span>}
        {isClosed && <span className="tag" style={{ background: 'var(--paper-2)', color: 'var(--muted)', borderColor: 'var(--rule)' }}>Registration closed</span>}
      </div>
      <div className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{course.institutionName}</div>
      <h3 className="course-title" style={{ fontSize: 24, lineHeight: 1.15, marginBottom: 12, minHeight: 60 }}>{course.title}</h3>
      <p className="muted" style={{ fontSize: 14.5, marginBottom: 16, lineHeight: 1.55, flexGrow: 1 }}>{course.summary}</p>

      {course.tags && course.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {course.tags.slice(0, 3).map(tag => (
            <button key={tag} onClick={e => { e.stopPropagation(); window.location.hash = 'discover:tag:' + tag; }} className="chip" style={{ fontSize: 11, padding: '3px 10px', cursor: 'pointer' }}>{tag}</button>
          ))}
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        <div>
          <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Begins</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{course.startDate}</div>
        </div>
        <div>
          <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Format</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{course.delivery}</div>
        </div>
        <div>
          <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Location</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{course.location}</div>
        </div>
        <div>
          <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Cost</div>
          <div className="serif" style={{ fontSize: 16, fontWeight: 500 }}>{course.cost}</div>
        </div>
      </div>
      <div>
        <VisitCTA url={url}/>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Institution Card
// ─────────────────────────────────────────────────────────────────
const InstitutionCard = ({ inst, onClick }) => (
  <button onClick={onClick} className="card card-hover" style={{ textAlign: 'left', width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div className="flex items-start justify-between mb-6">
      <div style={{ width: 64, height: 64, borderRadius: 12, background: 'var(--paper-2)', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span className="serif" style={{ fontSize: 30, fontWeight: 500, color: 'var(--emerald)', lineHeight: 1 }}>{inst.name.charAt(0)}</span>
        <div style={{ position: 'absolute', bottom: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: 'var(--amber)', border: '2px solid var(--paper)' }} />
      </div>
      <span className="tag">{inst.type}</span>
    </div>
    <h3 className="course-title" style={{ fontSize: 24, lineHeight: 1.15, marginBottom: 12 }}>{inst.name}</h3>
    <p className="muted" style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 24, flexGrow: 1 }}>{inst.summary}</p>
    <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>Programmes</div>
        <div className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{inst.courseCount}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>Location</div>
        <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>{inst.location || '—'}</div>
      </div>
    </div>
  </button>
);

// ─────────────────────────────────────────────────────────────────
// FAQ Accordion
// ─────────────────────────────────────────────────────────────────
const FAQItem = ({ q, idx, isOpen, onToggle }) => (
  <div style={{ borderBottom: '1px solid var(--rule)' }}>
    <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0', textAlign: 'left', gap: 24 }}>
      <div className="flex items-center gap-6">
        <span className="mono muted" style={{ fontSize: 11, letterSpacing: '0.15em', minWidth: 28 }}>{String(idx + 1).padStart(2, '0')}</span>
        <span className="serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.3 }}>{q.question}</span>
      </div>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s', background: isOpen ? 'var(--ink)' : 'transparent', color: isOpen ? 'var(--paper)' : 'var(--ink)' }}>
        <Icon name={isOpen ? 'minus' : 'plus'} size={16}/>
      </div>
    </button>
    <div style={{ overflow: 'hidden', maxHeight: isOpen ? 600 : 0, transition: 'max-height 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), padding 0.3s' }}>
      <div style={{ padding: '0 0 32px 60px', maxWidth: 720 }}>
        <p className="muted" style={{ fontSize: 16.5, lineHeight: 1.65 }}>{q.answer}</p>
        {q.bullets && (
          <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {q.bullets.map((b, i) => (
              <li key={i} className="muted" style={{ fontSize: 15.5, lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ color: 'var(--amber)', marginTop: 6, flexShrink: 0 }}>—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

window.CourzaUI = { Icon, Logo, CompassRose, SectionHeader, CourseCard, InstitutionCard, FAQItem };
