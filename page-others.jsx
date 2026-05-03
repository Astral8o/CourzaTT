/* global React, CourzaUI */
const { Icon, Logo, SectionHeader, CourseCard, InstitutionCard } = CourzaUI;

// ─────────────────────────────────────────────────────────────────
// Discover Page
// ─────────────────────────────────────────────────────────────────
const Discover = ({ setPage, density }) => {
  const { COURSES, CATEGORIES } = window.CourzaData;
  const [search, setSearch] = React.useState('');
  const [cat, setCat] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [delivery, setDelivery] = React.useState(null);
  const [view, setView] = React.useState(density === 'compact' ? 'list' : 'wide');
  const [limit, setLimit] = React.useState(12);

  const types = Array.from(new Set(COURSES.map(c => c.type)));

  const filtered = COURSES.filter(c => {
    const q = search.toLowerCase();
    const matchQ = !q || c.title.toLowerCase().includes(q) || c.institutionName.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    return matchQ
      && (!cat || c.category === cat)
      && (!type || c.type === type)
      && (!delivery || c.delivery === delivery);
  });

  const displayed = filtered.slice(0, limit);
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
            Find the right path among {COURSES.length} accredited options from leading institutions across Trinidad &amp; Tobago.
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
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 64, alignItems: 'start' }}>
          {/* Sidebar Filters */}
          <aside style={{ position: 'sticky', top: 100 }}>
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
                <select className="mono" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--ink)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 0', cursor: 'pointer' }}>
                  <option>Most relevant</option>
                  <option>Price: low to high</option>
                  <option>Upcoming start</option>
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
            Our Caribbean <em className="display-italic"><span className="hl hl-emerald">partners</span></em>.
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64 }}>
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
                <button className="btn btn-primary btn-lg">Visit institution website <Icon name="external" size={14}/></button>
                <button className="btn btn-ghost"><Icon name="bookmark" size={15}/> Save</button>
                <button className="btn btn-ghost"><Icon name="share" size={15}/> Share</button>
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

              <div style={{ marginTop: 48 }}>
                <div className="eyebrow mb-6">What you'll cover</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    'Foundational concepts grounded in Caribbean industry context.',
                    'Hands-on projects designed alongside leading regional employers.',
                    'A capstone aligned with your professional interests.',
                    'Mentorship from accredited faculty and industry practitioners.'
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-4" style={{ paddingBottom: 16, borderBottom: '1px solid var(--rule)' }}>
                      <span className="mono" style={{ fontSize: 11, color: 'var(--amber-2)', minWidth: 24, paddingTop: 4 }}>0{i+1}</span>
                      <span style={{ fontSize: 17, lineHeight: 1.5 }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
              <div className="card" style={{ background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 12 }}>Cost</div>
                <div className="serif" style={{ fontSize: 44, fontWeight: 500, lineHeight: 1, marginBottom: 8 }}>{course.cost}</div>
                <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 24 }}>Final fees confirmed by the institution at enrolment.</p>
                <button className="btn btn-amber full" style={{ justifyContent: 'center' }}>Apply via institution <Icon name="external" size={14}/></button>
                <button className="btn full mt-4" style={{ justifyContent: 'center', border: '1px solid var(--paper)', color: 'var(--paper)' }}>Save to wishlist</button>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'end', borderBottom: '1px solid var(--rule)', paddingBottom: 48 }}>
            <div>
              <div className="flex items-center gap-3 mb-6"><span className="tag tag-emerald">{inst.type}</span><span className="tag">Accredited</span></div>
              <h1 className="display-1 serif" style={{ marginBottom: 24 }}>{inst.name}</h1>
              <p style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: 720, marginBottom: 24 }}>{inst.summary}</p>
              <div className="flex items-center gap-3">
                <a href={inst.website} target="_blank" rel="noreferrer" className="btn btn-primary">Visit website <Icon name="external" size={14}/></a>
                <button className="btn btn-ghost"><Icon name="bookmark" size={15}/> Follow</button>
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
const ListInstitution = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [type, setType] = React.useState(null);

  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="page-enter">
      <section style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="eyebrow-num" data-num="N° 04" style={{ marginBottom: 24 }}>For institutions</div>
            <h1 className="display-1 serif" style={{ marginBottom: 28 }}>
              List your <em className="display-italic"><span className="hl">institution</span></em>.
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', marginBottom: 40 }}>
              Join the growing directory of T&amp;T institutions on CourzaTT. Reach learners who are actively searching for accredited programmes, professional workshops, and training opportunities.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 40 }}>
              {[
                ['01', 'Reach active learners across T&T', 'Show up where intent already lives.'],
                ['02', 'Showcase programmes & workshops', 'Beautiful pages, no engineering needed.'],
                ['03', 'Direct traffic to your own website', 'We index — you enrol.'],
                ['04', 'Verified trust badge for your profile', 'A signal of accreditation that builds confidence.']
              ].map(([n, t, sub]) => (
                <div key={n} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--rule)' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--amber-2)', letterSpacing: '0.15em', paddingTop: 4 }}>{n}</span>
                  <div>
                    <div className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>{t}</div>
                    <div className="muted" style={{ fontSize: 14 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--rule)', marginTop: 'auto' }}>
              <img src="https://i.ibb.co/DPy1t6Mh/courzattlistyourinstitution1.png" alt="Join CourzaTT as an institution" style={{ width: '100%', display: 'block' }}/>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={submit} className="card" style={{ padding: 40 }}>
              <div className="flex items-center justify-between mb-8">
                <div className="eyebrow">Application form</div>
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.15em' }}>Form_v1.0</div>
              </div>

              {[
                { label: 'Institution name', placeholder: 'e.g. UWI Global Campus', type: 'text' },
                { label: 'Contact email', placeholder: 'e.g. admin@institution.edu.tt', type: 'email' },
                { label: 'Contact number', placeholder: '+1 (868) 000-0000', type: 'tel' }
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 24 }}>
                  <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>{f.label}</label>
                  <input type={f.type} required placeholder={f.placeholder} className="input"/>
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

              <div style={{ marginBottom: 32 }}>
                <label className="mono muted mb-3" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block' }}>Brief description</label>
                <textarea required rows={4} placeholder="Tell learners about your institution…" className="input" style={{ resize: 'none' }}/>
              </div>

              <button type="submit" className="btn btn-primary btn-lg full" style={{ justifyContent: 'center' }}>
                Submit enquiry <Icon name="send" size={15}/>
              </button>
              <p className="mono muted text-center" style={{ fontSize: 10, letterSpacing: '0.1em', marginTop: 16, lineHeight: 1.5 }}>
                By submitting, you agree to our Terms of Service for Institutions and our Privacy Policy.
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
        </div>
      </section>
    </div>
  );
};

window.CourzaPages = window.CourzaPages || {};
Object.assign(window.CourzaPages, { Discover, Institutions, CourseDetail, InstitutionDetail, ListInstitution });
