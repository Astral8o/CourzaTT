/* global React, CourzaUI */
const { Icon, Logo, SectionHeader, CourseCard, InstitutionCard } = CourzaUI;

// ─────────────────────────────────────────────────────────────────
// Discover Page
// ─────────────────────────────────────────────────────────────────
const Discover = ({ setPage, density, initialCat, initialSearch }) => {
  const { COURSES, CATEGORIES } = window.CourzaData;
  const [search, setSearch] = React.useState(initialSearch || '');
  const [cat, setCat] = React.useState(initialCat || null);
  const [type, setType] = React.useState(null);
  const [delivery, setDelivery] = React.useState(null);
  const [sort, setSort] = React.useState('relevant');
  const [view, setView] = React.useState(density === 'compact' ? 'list' : 'wide');
  const [limit, setLimit] = React.useState(12);

  const types = Array.from(new Set(COURSES.map(c => c.type)));

  const parseCost = (cost) => {
    if (!cost) return Infinity;
    const n = parseFloat(cost.replace(/[^0-9.]/g, ''));
    return isNaN(n) ? Infinity : n;
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return Infinity;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? Infinity : d.getTime();
  };

  const filtered = COURSES.filter(c => {
    const q = search.toLowerCase();
    const matchQ = !q || c.title.toLowerCase().includes(q) || c.institutionName.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    return matchQ
      && (!cat || c.category === cat)
      && (!type || c.type === type)
      && (!delivery || c.delivery === delivery);
  });

  const sorted = sort === 'price'
    ? [...filtered].sort((a, b) => parseCost(a.cost) - parseCost(b.cost))
    : sort === 'date'
    ? [...filtered].sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate))
    : filtered;

  const displayed = sorted.slice(0, limit);
  const hasFilter = search || cat || type || delivery;
  const clear = () => { setSearch(''); setCat(null); setType(null); setDelivery(null); setLimit(12); };

  return (
    <div className="page-enter">
      <section style={{ paddingTop: 60, paddingBottom: 40 }}>
        <div className="container">
          <div className="eyebrow-num" data-num="N° 02" style={{ marginBottom: 24 }}>Course directory</div>
          <h1 className="display-1 serif" style={{ marginBottom: 24, maxWidth: 1100 }}>
            Discover <em className="display-italic"><span className="hl">programmes</span></em>.
          </h1>
          <p className="muted" style={{ fontSize: 20, maxWidth: 640, marginBottom: 40 }}>
            Find the right path among {COURSES.length} programmes from leading institutions across Trinidad &amp; Tobago.
          </p>

          {/* Search */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: 999, padding: 6, display: 'flex', alignItems: 'center', maxWidth: 720, gap: 4 }}>
            <Icon name="search" size={18} style={{ marginLeft: 18, color: 'var(--muted)' }}/>
            <input
              value={search} onChange={e => { setSearch(e.target.value); setLimit(12); }}
              placeholder="Search courses, degrees, or institutions…"
              style={{ flexGrow: 1, background: 'transparent', border: 'none', outline: 'none', padding: '14px 12px', fontSize: 15 }}
            />
            {search && <button onClick={() => setSearch('')} style={{ padding: '0 12px', color: 'var(--muted)' }}><Icon name="x" size={16}/></button>}
          </div>
        </div>
      </section>

      <section className="tight" style={{ borderTop: '1px solid var(--rule)' }}>
        <div className="container discover-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 64, alignItems: 'start' }}>
          {/* Sidebar Filters */}
          <aside className="discover-sidebar" style={{ position: 'sticky', top: 100 }}>
            <div className="flex items-center justify-between mb-6">
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)' }}>Refine</div>
              {hasFilter && <button onClick={clear} className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--rust)' }}>Reset all</button>}
            </div>

            <div style={{ marginBottom: 32 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Industry</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button onClick={() => setCat(null)} style={{ textAlign: 'left', fontSize: 14, padding: '6px 0', fontWeight: !cat ? 600 : 400, color: !cat ? 'var(--ink)' : 'var(--muted)' }}>All industries</button>
                {CATEGORIES.map(c => {
                  const name = typeof c === 'string' ? c : c.name;
                  const count = typeof c === 'string' ? COURSES.filter(x => x.category === name).length : c.count;
                  return (
                    <button key={name} onClick={() => { setCat(name === cat ? null : name); setLimit(12); }} style={{ textAlign: 'left', fontSize: 14, padding: '6px 0', fontWeight: cat === name ? 600 : 400, color: cat === name ? 'var(--emerald)' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{name}</span>
                      <span className="mono" style={{ fontSize: 10, opacity: 0.5 }}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Format</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Online', 'In-person', 'Hybrid'].map(d => (
                  <button key={d} onClick={() => setDelivery(d === delivery ? null : d)} className={`chip ${delivery === d ? 'active' : ''}`}>{d}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Credential</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button onClick={() => setType(null)} style={{ textAlign: 'left', fontSize: 14, padding: '6px 0', fontWeight: !type ? 600 : 400, color: !type ? 'var(--ink)' : 'var(--muted)' }}>All credentials</button>
                {types.map(t => (
                  <button key={t} onClick={() => { setType(t === type ? null : t); setLimit(12); }} style={{ textAlign: 'left', fontSize: 14, padding: '6px 0', fontWeight: type === t ? 600 : 400, color: type === t ? 'var(--emerald)' : 'var(--muted)' }}>{t}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-8" style={{ paddingBottom: 18, borderBottom: '1px solid var(--rule)' }}>
              <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
                <span style={{ color: 'var(--muted)' }}>Found </span>
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{filtered.length} programmes</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>View</div>
                <div style={{ display: 'inline-flex', border: '1px solid var(--rule)', borderRadius: 8, padding: 2, background: 'var(--card)' }}>
                  {[
                    { k: 'list', label: 'List' },
                    { k: 'wide', label: 'Detail' },
                    { k: 'grid', label: 'Grid' }
                  ].map(v => (
                    <button key={v.k} onClick={() => setView(v.k)} style={{ padding: '6px 14px', fontSize: 12, fontWeight: 500, borderRadius: 6, background: view === v.k ? 'var(--ink)' : 'transparent', color: view === v.k ? 'var(--paper)' : 'var(--ink-2)', transition: 'all 0.2s' }}>
                      {v.label}
                    </button>
                  ))}
                </div>
                <select value={sort} onChange={e => { setSort(e.target.value); setLimit(12); }} className="mono" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--ink)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 0', cursor: 'pointer' }}>
                  <option value="relevant">Most relevant</option>
                  <option value="price">Price: low to high</option>
                  <option value="date">Upcoming start</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="card text-center" style={{ padding: 64 }}>
                <Icon name="search" size={32} style={{ color: 'var(--muted)', marginBottom: 16 }}/>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 12 }}>No programmes found</h3>
                <p className="muted" style={{ marginBottom: 24, maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>We couldn't find anything matching your filters. Try adjusting your search.</p>
                <button onClick={clear} className="btn btn-primary">Clear all filters</button>
              </div>
            ) : (
              <div className="grid" style={{
                gridTemplateColumns: view === 'grid' ? 'repeat(2, 1fr)' : '1fr',
                gap: 'var(--gap-grid)'
              }}>
                {displayed.map(c => (
                  <CourseCard key={c.id} course={c} layout={view === 'wide' ? 'wide' : view === 'list' ? 'compact' : 'grid'} onClick={() => setPage(`course:${c.id}`)}/>
                ))}
              </div>
            )}

            {filtered.length > limit && (
              <div className="text-center mt-12">
                <button className="btn btn-ghost btn-lg" onClick={() => setLimit(l => l + 12)}>Show more <Icon name="arrow-down" size={14}/></button>
                <p className="mono muted mt-4" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Showing {Math.min(limit, filtered.length)} of {filtered.length}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Institutions Page
// ─────────────────────────────────────────────────────────────────
const Institutions = ({ setPage }) => {
  const { INSTITUTIONS } = window.CourzaData;
  const [search, setSearch] = React.useState('');
  const [type, setType] = React.useState(null);
  const types = ['Public', 'Private', 'Government', 'NGO', 'Technical', 'Other'];

  const filtered = INSTITUTIONS.filter(i =>
    (!search || i.name.toLowerCase().includes(search.toLowerCase())) &&
    (!type || i.type === type)
  );

  return (
    <div className="page-enter">
      <section style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div className="eyebrow-num" data-num="N° 03" style={{ marginBottom: 24 }}>Institutional network</div>
          <h1 className="display-1 serif" style={{ marginBottom: 24 }}>
            Our Caribbean <em className="display-italic"><span className="hl hl-emerald">institutions</span></em>.
          </h1>
          <p className="muted" style={{ fontSize: 20, maxWidth: 720, marginBottom: 40 }}>
            We bridge the gap between ambitious learners and the Caribbean's most prestigious universities, technical schools, and government training centres.
          </p>

          <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
            <div style={{ flexGrow: 1, maxWidth: 460, background: 'var(--card)', border: '1px solid var(--ink)', borderRadius: 999, padding: 6, display: 'flex', alignItems: 'center' }}>
              <Icon name="search" size={16} style={{ marginLeft: 16, color: 'var(--muted)' }}/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find an institution…" style={{ flexGrow: 1, background: 'transparent', border: 'none', outline: 'none', padding: '12px 14px', fontSize: 14 }}/>
            </div>
            <button onClick={() => setType(null)} className={`chip ${!type ? 'active' : ''}`}>All</button>
            {types.map(t => (
              <button key={t} onClick={() => setType(type === t ? null : t)} className={`chip ${type === t ? 'active' : ''}`}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="tight" style={{ borderTop: '1px solid var(--rule)' }}>
        <div className="container">
          {filtered.length > 0 ? (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-grid)' }}>
              {filtered.map(i => <InstitutionCard key={i.id} inst={i} onClick={() => setPage(`institution:${i.id}`)}/>)}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: 64 }}>
              <Icon name="search" size={32} style={{ color: 'var(--muted)', marginBottom: 16 }}/>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 12 }}>No matches found</h3>
              <p className="muted">We couldn't find any institutions matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Course Detail
// ─────────────────────────────────────────────────────────────────
const CourseDetail = ({ courseId, setPage }) => {
  const { COURSES, INSTITUTIONS } = window.CourzaData;
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return <div className="container" style={{ padding: 80 }}>Course not found.</div>;
  const inst = INSTITUTIONS.find(i => i.id === course.institutionId);
  const related = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);

  return (
    <div className="page-enter">
      <section style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="container">
          <button onClick={() => setPage('discover')} className="mono muted mb-8" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            ← Back to discover
          </button>
          <div className="course-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64 }}>
            <div>
              <div className="flex items-center gap-2 mb-6" style={{ flexWrap: 'wrap' }}>
                <span className="tag tag-emerald">{course.type}</span>
                <span className="tag">{course.category}</span>
                {course.featured && <span className="tag tag-amber"><Icon name="star" size={10}/> Featured</span>}
              </div>
              <h1 className="display-1 serif" style={{ marginBottom: 24 }}>{course.title}</h1>
              <p style={{ fontSize: 22, lineHeight: 1.45, color: 'var(--ink-2)', marginBottom: 32, maxWidth: 720 }}>
                {course.summary} Designed for learners ready to take the next step in their professional journey.
              </p>
              <div className="flex items-center gap-3 mb-8">
                <a href={getCourseURL(course)} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">Visit institution website <Icon name="external" size={14}/></a>
              </div>

              <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 32, marginTop: 32 }}>
                <div className="eyebrow mb-6">Programme details</div>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
                  {[
                    ['Begins', course.startDate, 'calendar'],
                    ['Apply by', course.deadline, 'clock'],
                    ['Format', course.delivery, 'globe'],
                    ['Location', course.location, 'map-pin'],
                    ['Credential', course.type, 'book'],
                    ['Cost', course.cost, 'tag']
                  ].map(([label, val, ic]) => (
                    <div key={label} style={{ borderLeft: '2px solid var(--rule-strong)', paddingLeft: 16 }}>
                      <div className="mono muted mb-2" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon name={ic} size={12}/> {label}
                      </div>
                      <div className="serif" style={{ fontSize: 20, fontWeight: 500 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <aside className="course-detail-aside" style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
              <div className="card" style={{ background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 12 }}>Cost</div>
                <div className="serif" style={{ fontSize: 44, fontWeight: 500, lineHeight: 1, marginBottom: 8 }}>{course.cost}</div>
                <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 24 }}>Final fees confirmed by the institution at enrolment.</p>
                <a href={getCourseURL(course)} target="_blank" rel="noreferrer" className="btn btn-amber full" style={{ justifyContent: 'center', textDecoration: 'none' }}>Apply via institution <Icon name="external" size={14}/></a>
              </div>

              {inst && (
                <div className="card mt-4">
                  <div className="eyebrow mb-4">Offered by</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: 'var(--paper-2)', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="serif" style={{ fontSize: 22, color: 'var(--emerald)' }}>{inst.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="serif" style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}>{inst.name}</div>
                      <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.12em', marginTop: 2 }}>{inst.type} · {inst.location}</div>
                    </div>
                  </div>
                  <p className="muted" style={{ fontSize: 13, marginBottom: 16 }}>{inst.summary}</p>
                  <button onClick={() => setPage(`institution:${inst.id}`)} className="btn btn-ghost btn-sm full" style={{ justifyContent: 'center' }}>View institution <Icon name="arrow-right" size={13}/></button>
                </div>
              )}
            </aside>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 96, paddingTop: 48, borderTop: '1px solid var(--rule)' }}>
              <SectionHeader num="N° 04" eyebrow="Related programmes" title={<>More in <em className="display-italic">{course.category}</em>.</>}/>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-grid)' }}>
                {related.map(c => <CourseCard key={c.id} course={c} onClick={() => setPage(`course:${c.id}`)}/>)}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Institution Detail
// ─────────────────────────────────────────────────────────────────
const InstitutionDetail = ({ instId, setPage }) => {
  const { INSTITUTIONS, COURSES } = window.CourzaData;
  const inst = INSTITUTIONS.find(i => i.id === instId);
  if (!inst) return <div className="container" style={{ padding: 80 }}>Institution not found.</div>;
  const courses = COURSES.filter(c => c.institutionId === inst.id);

  return (
    <div className="page-enter">
      <section style={{ paddingTop: 40, paddingBottom: 60 }}>
        <div className="container">
          <button onClick={() => setPage('institutions')} className="mono muted mb-8" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>← Back to institutions</button>
          <div className="inst-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'end', borderBottom: '1px solid var(--rule)', paddingBottom: 48 }}>
            <div>
              <div className="flex items-center gap-3 mb-6"><span className="tag tag-emerald">{inst.type}</span><span className="tag">Accredited</span></div>
              <h1 className="display-1 serif" style={{ marginBottom: 24 }}>{inst.name}</h1>
              <p style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: 720, marginBottom: 24 }}>{inst.summary}</p>
              <div className="flex items-center gap-3">
                <a href={inst.website} target="_blank" rel="noreferrer" className="btn btn-primary">Visit website <Icon name="external" size={14}/></a>
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              {[['Programmes', inst.courseCount], ['Location', inst.location], ['Type', inst.type], ['Website', inst.website ? new URL(inst.website).hostname : '—']].map(([k, v]) => (
                <div key={k}>
                  <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>{k}</div>
                  <div className="serif" style={{ fontSize: 26, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 64 }}>
            <SectionHeader num="N° 02" eyebrow="Their programmes" title={<>Currently offered at <em className="display-italic">{inst.name.split(' ')[0]}</em>.</>}/>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap-grid)' }}>
              {courses.map(c => <CourseCard key={c.id} course={c} onClick={() => setPage(`course:${c.id}`)}/>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// List Your Institution
// ─────────────────────────────────────────────────────────────────
const ListInstitution = ({ setPage }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [type, setType] = React.useState(null);
  const [error, setError] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const data = new FormData(e.target);
      data.append('_subject', 'New institution listing enquiry — CourzaTT');
      if (type) data.set('institution_type', type);
      const res = await fetch('https://formspree.io/f/mvzlzjje', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch {
      setError(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="page-enter">

      {/* PAGE HEADER — centered, concise */}
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="eyebrow-num" data-num="N° 04" style={{ marginBottom: 20 }}>For institutions</div>
          <h1 className="display-2 serif" style={{ marginBottom: 16 }}>
            List your <em className="display-italic"><span className="hl">institution</span></em>.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 32 }}>
            Join the growing directory of T&amp;T institutions. Reach learners actively searching for accredited programmes.
          </p>
          <button
            onClick={() => document.getElementById('promote-section').scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-ghost"
          >
            See promotion options <Icon name="arrow-down" size={14}/>
          </button>
        </div>
      </section>

      {/* MAIN — form left (focal point), context right */}
      <section style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div className="container list-form-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 64, alignItems: 'start' }}>

          {/* LEFT — form, the main event */}
          {!submitted ? (
            <form onSubmit={submit} className="card" style={{
              padding: 48,
              boxShadow: '0 24px 64px -20px rgba(14,26,23,0.18)',
              borderColor: 'var(--rule-strong)',
              background: 'var(--paper)',
            }}>
              <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Application form</div>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>Fill in your details and our team will be in touch within 2–3 business days.</p>
              </div>

              {[
                { label: 'Institution name', name: 'institution_name', placeholder: 'e.g. UWI Global Campus', type: 'text' },
                { label: 'Contact email', name: 'email', placeholder: 'e.g. admin@institution.edu.tt', type: 'email' },
                { label: 'Contact number', name: 'phone', placeholder: '+1 (868) 000-0000', type: 'tel' }
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 24 }}>
                  <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>{f.label}</label>
                  <input type={f.type} name={f.name} required placeholder={f.placeholder} className="input"/>
                </div>
              ))}

              <div style={{ marginBottom: 24 }}>
                <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>Institution type</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Public', 'Private', 'NGO', 'Technical', 'Other'].map(t => (
                    <button key={t} type="button" onClick={() => setType(t)} className={`chip ${type === t ? 'active' : ''}`}>{t}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 36 }}>
                <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>Brief description</label>
                <textarea name="message" required rows={4} placeholder="Tell learners about your institution…" className="input" style={{ resize: 'none' }}/>
              </div>

              <button type="submit" className="btn btn-primary btn-lg full" style={{ justifyContent: 'center' }} disabled={submitting}>
                {submitting ? 'Sending…' : <><span>Submit enquiry</span> <Icon name="send" size={15}/></>}
              </button>
              {error && <p className="mono muted text-center" style={{ fontSize: 11, marginTop: 12, color: 'var(--red, #c0392b)' }}>Something went wrong — please try again.</p>}
              <p className="mono muted text-center" style={{ fontSize: 10, letterSpacing: '0.1em', marginTop: 16, lineHeight: 1.5 }}>
                Your details will only be used to process your listing enquiry.
              </p>
            </form>
          ) : (
            <div className="card text-center" style={{ padding: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid var(--emerald)', background: 'rgba(31,95,74,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--emerald)' }}>
                <Icon name="check" size={32}/>
              </div>
              <h2 className="display-3 serif" style={{ marginBottom: 16 }}>Enquiry submitted</h2>
              <p className="muted" style={{ maxWidth: 320, marginBottom: 32 }}>Thank you for your interest in CourzaTT. Our team will review your application and reach out within 2–3 business days.</p>
              <button onClick={() => setSubmitted(false)} className="btn btn-ghost">Submit another →</button>
            </div>
          )}

          {/* RIGHT — context: image + benefits */}
          <div className="list-sticky-aside" style={{ position: 'sticky', top: 100 }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--rule)', marginBottom: 36, boxShadow: '0 8px 24px -8px rgba(14,26,23,0.10)' }}>
              <img src="https://i.ibb.co/DPy1t6Mh/courzattlistyourinstitution1.png" alt="Join CourzaTT" style={{ width: '100%', display: 'block' }}/>
            </div>

            <div style={{ marginBottom: 8 }} className="mono muted">
              <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Why list with us</span>
            </div>
            {[
              ['01', 'Reach active learners across T&T', 'Show up where intent already lives.'],
              ['02', 'Showcase programmes & workshops', 'Beautiful pages, no engineering needed.'],
              ['03', 'Direct traffic to your own website', 'We index — you enrol.'],
              ['04', 'Verified trust badge for your profile', 'A signal of accreditation that builds confidence.']
            ].map(([n, t, sub]) => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--rule)' }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--amber-2)', letterSpacing: '0.15em', paddingTop: 3 }}>{n}</span>
                <div>
                  <div className="serif" style={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>{t}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROMOTE SECTION */}
      <section id="promote-section" style={{ borderTop: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="container">
          <SectionHeader num="N° 05" eyebrow="Grow your reach" title={<>Promote your courses <em className="display-italic">on CourzaTT</em>.</>} sub="Reach people already looking for courses. We promote across the platform and beyond."/>

          <div style={{ display: 'flex', gap: 12, marginBottom: 64, flexWrap: 'wrap' }}>
            {['Homepage', 'Newsletter', 'Social media'].map(ch => (
              <div key={ch} className="card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', display: 'inline-block', flexShrink: 0 }}/>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{ch}</span>
              </div>
            ))}
          </div>

          <div className="promote-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32, alignItems: 'start', marginBottom: 80 }}>

            {/* Free listing */}
            <div className="card" style={{
              padding: 40, height: '100%',
              background: 'var(--emerald)',
              color: 'var(--paper)',
              borderColor: 'var(--emerald)',
              boxShadow: '0 20px 48px -16px rgba(31,95,74,0.35)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7 }}>Free listing</div>
                <span style={{ background: 'var(--amber)', color: 'var(--ink)', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999 }}>Always free</span>
              </div>
              <div className="serif" style={{ fontSize: 40, fontWeight: 500, marginBottom: 8, lineHeight: 1 }}>TTD 0</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 28, opacity: 0.8 }}>List your courses at no cost. They appear in search and category pages from day one.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {['Appears in search results', 'Listed in category pages', 'Institution profile page'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon name="check-circle" size={16} style={{ color: 'var(--amber)', flexShrink: 0 }}/>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-amber full" style={{ justifyContent: 'center', textDecoration: 'none' }}>
                Get listed free <Icon name="arrow-right" size={14}/>
              </a>
            </div>

            {/* Paid promotion */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>Paid promotion</div>
                <p style={{ fontSize: 15, color: 'var(--ink-2)' }}>Increase visibility with Homepage features, Newsletter placements, Social posts, and Featured badges. Starting from <strong>TTD 300 per week</strong>.</p>
              </div>
              <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {[
                  {
                    name: 'Starter', price: 'TTD 300',
                    features: ['Homepage feature, 7 days', '1 newsletter mention'],
                  },
                  {
                    name: 'Growth', price: 'TTD 700',
                    features: ['Homepage feature, 7 days', 'Newsletter feature', '2 social posts'],
                    highlight: true,
                  },
                  {
                    name: 'Premium', price: 'TTD 1,200',
                    features: ['Homepage feature, 14 days', 'Newsletter top placement', '4 social posts', 'Featured badge'],
                  },
                ].map(pkg => (
                  <div key={pkg.name} className="card" style={{
                    padding: 28,
                    background: pkg.highlight ? 'var(--ink)' : 'var(--card)',
                    color: pkg.highlight ? 'var(--paper)' : 'var(--ink)',
                    borderColor: pkg.highlight ? 'var(--ink)' : 'var(--rule)',
                    display: 'flex', flexDirection: 'column'
                  }}>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 10 }}>{pkg.name}</div>
                    <div className="serif" style={{ fontSize: 26, fontWeight: 500, marginBottom: 20 }}>{pkg.price}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1 }}>
                      {pkg.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <Icon name="check" size={13} style={{ color: pkg.highlight ? 'var(--amber)' : 'var(--emerald)', flexShrink: 0, marginTop: 2 }}/>
                          <span style={{ fontSize: 13, lineHeight: 1.4, opacity: 0.85 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setPage(`contact:partnership:${pkg.name} package enquiry`)} className={`btn ${pkg.highlight ? 'btn-amber' : 'btn-ghost'} btn-sm full`} style={{ justifyContent: 'center', marginTop: 24 }}>
                      Get started
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why list + CTA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, paddingTop: 48, borderTop: '1px solid var(--rule)' }}>
            <div>
              <div className="mono muted mb-6" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Why list with CourzaTT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {['Targeted local audience', 'One place for discovery', 'Multi-channel exposure', 'Listings are always free'].map((b, i) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--rule)' }}>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--amber-2)', letterSpacing: '0.15em', minWidth: 28 }}>{String(i+1).padStart(2,'0')}</span>
                    <span style={{ fontSize: 16, fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 48, background: 'var(--emerald)', color: 'var(--paper)', borderColor: 'var(--emerald)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 16 }}>Get started</div>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}>Submit your institution and course details.</h3>
                <p style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.6, marginBottom: 32 }}>Or contact us directly to promote your courses.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-amber" style={{ justifyContent: 'center', textDecoration: 'none' }}>
                  List your institution <Icon name="arrow-right" size={14}/>
                </a>
                <a href="mailto:support@courza.tt" className="btn btn-ghost" style={{ justifyContent: 'center', textDecoration: 'none', color: 'var(--paper)', borderColor: 'rgba(244,239,227,0.3)' }}>
                  Contact us <Icon name="mail" size={14}/>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Contact Page
// ─────────────────────────────────────────────────────────────────
const ContactPage = ({ setPage, initialSubject, initialNote }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const data = new FormData(e.target);
      data.append('_subject', `CourzaTT contact: ${e.target.subject.value}`);
      const res = await fetch('https://formspree.io/f/mvzlzjje', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setSubmitted(true);
      else setError(true);
    } catch {
      setError(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="page-enter">

      {/* PAGE HEADER */}
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <div className="eyebrow-num" data-num="N° 05" style={{ marginBottom: 20 }}>Get in touch</div>
          <h1 className="display-2 serif" style={{ marginBottom: 16 }}>
            How can we <em className="display-italic"><span className="hl">help</span></em>?
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            Questions about a course, a listing, or the platform — we're here.
          </p>
        </div>
      </section>

      {/* FORM + CONTACT INFO */}
      <section style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'start' }}>

          {/* LEFT — contact info */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 24 }}>Contact details</div>

            {[
              { icon: 'mail', label: 'Email', value: 'support@courza.tt', href: 'mailto:support@courza.tt' },
              { icon: 'map-pin', label: 'Location', value: 'Port of Spain, Trinidad & Tobago', href: null },
              { icon: 'clock', label: 'Response time', value: 'Within 2–3 business days', href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--rule)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--rule-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
                  <Icon name={icon} size={17}/>
                </div>
                <div>
                  <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  {href
                    ? <a href={href} style={{ fontSize: 15, fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'var(--rule-strong)' }}>{value}</a>
                    : <div style={{ fontSize: 15, fontWeight: 500 }}>{value}</div>
                  }
                </div>
              </div>
            ))}

            <div className="card" style={{ marginTop: 32, padding: 28, background: 'var(--paper-2)' }}>
              <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Looking to list?</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 16 }}>If you're an institution wanting to list your courses, use the dedicated listing page.</p>
              <button onClick={() => setPage('list')} className="btn btn-ghost btn-sm">
                List your institution <Icon name="arrow-right" size={13}/>
              </button>
            </div>
          </div>

          {/* RIGHT — form */}
          {!submitted ? (
            <form onSubmit={submit} className="card" style={{ padding: 48, boxShadow: '0 24px 64px -20px rgba(14,26,23,0.14)', borderColor: 'var(--rule-strong)' }}>
              <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Send a message</div>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>Fill in the form and we'll get back to you as soon as possible.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <div>
                  <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>Your name</label>
                  <input name="name" type="text" required placeholder="e.g. Jordan Smith" className="input"/>
                </div>
                <div>
                  <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>Email address</label>
                  <input name="email" type="email" required placeholder="you@example.com" className="input"/>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>Subject</label>
                <select name="subject" required className="input" style={{ cursor: 'pointer' }} defaultValue={initialSubject || ''}>
                  <option value="">Select a topic…</option>
                  <option value="General inquiry">General inquiry</option>
                  <option value="Course listing help">Course listing help</option>
                  <option value="Technical issue">Technical issue</option>
                  <option value="Partnership & advertising">Partnership &amp; advertising</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: 36 }}>
                <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>Message</label>
                <textarea name="message" required rows={5} placeholder="Tell us how we can help…" className="input" style={{ resize: 'none' }} defaultValue={initialNote || ''}/>
              </div>

              <button type="submit" className="btn btn-primary btn-lg full" style={{ justifyContent: 'center' }} disabled={submitting}>
                {submitting ? 'Sending…' : <><span>Send message</span> <Icon name="send" size={15}/></>}
              </button>
              {error && <p className="mono muted text-center" style={{ fontSize: 11, marginTop: 12, color: 'var(--red, #c0392b)' }}>Something went wrong — please try again.</p>}
            </form>
          ) : (
            <div className="card text-center" style={{ padding: 72, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid var(--emerald)', background: 'rgba(31,95,74,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--emerald)' }}>
                <Icon name="check" size={32}/>
              </div>
              <h2 className="display-3 serif" style={{ marginBottom: 16 }}>Message sent</h2>
              <p className="muted" style={{ maxWidth: 320, marginBottom: 32, lineHeight: 1.6 }}>Thanks for reaching out. Our team will get back to you within 2–3 business days.</p>
              <button onClick={() => setPage('home')} className="btn btn-ghost">Back to home →</button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Privacy Policy Page
// ─────────────────────────────────────────────────────────────────
const PrivacyPage = ({ setPage }) => (
  <div className="page-enter">
    <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="eyebrow-num" data-num="N° 06" style={{ marginBottom: 20 }}>Legal</div>
        <h1 className="display-2 serif" style={{ marginBottom: 16 }}>Privacy <em className="display-italic">Policy</em>.</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)' }}>Last updated: May 2026</p>
      </div>
    </section>
    <section style={{ paddingTop: 64, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 720 }}>
        {[
          {
            title: 'What we collect',
            body: 'When you sign up for our newsletter, submit an institution listing enquiry, or contact us, we collect the information you provide — typically your name, email address, and any message content. We do not collect data passively beyond standard web server logs.'
          },
          {
            title: 'How we use it',
            body: 'We use your information solely to respond to your enquiry, process your listing, or send you the newsletter you signed up for. We do not sell, rent, or share your personal data with third parties for marketing purposes.'
          },
          {
            title: 'Third-party services',
            body: 'Form submissions are processed via Formspree. Email delivery may be handled by a third-party provider. These services operate under their own privacy policies and are used only to fulfil the purpose for which you submitted your information.'
          },
          {
            title: 'Data retention',
            body: 'We retain your information for as long as necessary to fulfil the purpose it was collected for. You may request deletion of your data at any time by contacting us.'
          },
          {
            title: 'Your rights',
            body: 'Under Trinidad & Tobago\'s Data Protection Act, you have the right to access, correct, or request deletion of personal data we hold about you. To exercise these rights, contact us at support@courza.tt.'
          },
          {
            title: 'Contact',
            body: 'Questions about this policy? Reach us at support@courza.tt or through the Contact page.'
          }
        ].map(({ title, body }) => (
          <div key={title} style={{ paddingBottom: 40, marginBottom: 40, borderBottom: '1px solid var(--rule)' }}>
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 16 }}>{title}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)' }}>{body}</p>
          </div>
        ))}
        <button onClick={() => setPage('home')} className="btn btn-ghost">← Back to home</button>
      </div>
    </section>
  </div>
);

window.CourzaPages = window.CourzaPages || {};
Object.assign(window.CourzaPages, { Discover, Institutions, CourseDetail, InstitutionDetail, ListInstitution, ContactPage, PrivacyPage });
