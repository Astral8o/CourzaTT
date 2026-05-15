/* global React, CourzaUI */
const { Icon, Logo, SectionHeader, CourseCard, InstitutionCard } = CourzaUI;

// ─────────────────────────────────────────────────────────────────
// Discover Page
// ─────────────────────────────────────────────────────────────────
const Discover = ({ setPage, density, initialCat, initialSearch, initialTag }) => {
  const { COURSES, CATEGORIES } = window.CourzaData;
  const [search, setSearch] = React.useState(initialSearch || '');
  const [cat, setCat] = React.useState(initialCat || null);
  const [activeTag, setActiveTag] = React.useState(initialTag || null);
  const [type, setType] = React.useState(null);
  const [delivery, setDelivery] = React.useState(null);
  const [sort, setSort] = React.useState('relevant');
  const [view, setView] = React.useState(density === 'compact' ? 'list' : 'wide');
  const [limit, setLimit] = React.useState(12);

  const types = Array.from(new Set(COURSES.map(c => c.type)));
  const allTags = Array.from(new Set(COURSES.flatMap(c => c.tags || []))).sort();

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
      && (!delivery || c.delivery === delivery)
      && (!activeTag || (c.tags && c.tags.includes(activeTag)));
  });

  const _now = new Date(); _now.setHours(0, 0, 0, 0);
  const isClosed = c => c.deadline && new Date(c.deadline) < _now;

  const sorted = sort === 'price'
    ? [...filtered].sort((a, b) => parseCost(a.cost) - parseCost(b.cost))
    : sort === 'date'
    ? [...filtered].sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate))
    : [...filtered].sort((a, b) => (isClosed(a) ? 1 : 0) - (isClosed(b) ? 1 : 0));

  const displayed = sorted.slice(0, limit);
  const hasFilter = search || cat || type || delivery || activeTag;
  const clear = () => { setSearch(''); setCat(null); setActiveTag(null); setType(null); setDelivery(null); setLimit(12); };

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

            <div style={{ marginBottom: 32 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Credential</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button onClick={() => setType(null)} style={{ textAlign: 'left', fontSize: 14, padding: '6px 0', fontWeight: !type ? 600 : 400, color: !type ? 'var(--ink)' : 'var(--muted)' }}>All credentials</button>
                {types.map(t => (
                  <button key={t} onClick={() => { setType(t === type ? null : t); setLimit(12); }} style={{ textAlign: 'left', fontSize: 14, padding: '6px 0', fontWeight: type === t ? 600 : 400, color: type === t ? 'var(--emerald)' : 'var(--muted)' }}>{t}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {allTags.map(tag => (
                  <button key={tag} onClick={() => { setActiveTag(tag === activeTag ? null : tag); setLimit(12); }} className={`chip ${activeTag === tag ? 'active' : ''}`} style={{ fontSize: 11, padding: '3px 10px' }}>{tag}</button>
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

            {activeTag && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '10px 16px', background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 10 }}>
              <Icon name="tag" size={13} style={{ color: 'var(--emerald)' }}/>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Skill:</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{activeTag}</span>
              <button onClick={() => setActiveTag(null)} style={{ marginLeft: 'auto', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="x" size={13}/></button>
            </div>
          )}

          {filtered.length === 0 ? (
              <div className="card text-center" style={{ padding: 64 }}>
                <Icon name="search" size={32} style={{ color: 'var(--muted)', marginBottom: 16 }}/>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 12 }}>No programmes found</h3>
                <p className="muted" style={{ marginBottom: 24, maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>We couldn't find anything matching your filters. Try adjusting your search.</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={clear} className="btn btn-primary">Clear all filters</button>
                </div>
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
            <div className="grid institutions-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-grid)' }}>
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
              <div className="grid cards-grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-grid)' }}>
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
            <div className="grid cards-grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap-grid)' }}>
              {courses.map(c => <CourseCard key={c.id} course={c} onClick={() => setPage(`course:${c.id}`)}/>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// List Your Institution — helpers (top-level to prevent remount)
// ─────────────────────────────────────────────────────────────────
const ListField = ({ label, value, onChange, placeholder, type = 'text', required, showErrors, as, hint, rows = 4 }) => {
  const missing = required && showErrors && !value.trim();
  return (
    <div style={{ marginBottom: 24 }}>
      <label className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
        {label}{required && <span style={{ color: 'var(--amber-2)', marginLeft: 3 }}>*</span>}
      </label>
      {hint && <p className="muted" style={{ fontSize: 12, marginBottom: 8, lineHeight: 1.4 }}>{hint}</p>}
      {as === 'textarea'
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className="input" style={{ resize: 'none', borderColor: missing ? 'var(--red, #c0392b)' : undefined }}/>
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="input" style={{ borderColor: missing ? 'var(--red, #c0392b)' : undefined }}/>
      }
      {missing && <span style={{ fontSize: 11, color: 'var(--red, #c0392b)', display: 'block', marginTop: 4 }}>This field is required</span>}
    </div>
  );
};

const INST_CATS = ['Business & Entrepreneurship', 'Technology & Digital', 'Hospitality & Culinary', 'Creative Arts & Design', 'Technical Trades', 'Health & Medical', 'Finance & Accounting', 'Personal Development', 'Other'];
const TT_REGIONS = ['Port of Spain', 'San Fernando', 'Arima', 'Chaguanas', 'Point Fortin', 'Scarborough (Tobago)', 'Nationwide', 'Online only'];
const LIST_STEPS = ['Institution basics', 'About you', 'Contact & location', 'Your courses', 'Boost visibility', 'Review & submit'];

// ─────────────────────────────────────────────────────────────────
// List Institution Modal — 6-step guided pop-out
// ─────────────────────────────────────────────────────────────────
const ListInstitutionModal = ({ onClose }) => {
  const [step, setStep] = React.useState(1);
  const [showErrors, setShowErrors] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [form, setForm] = React.useState({
    institutionName: '', category: '', tagline: '',
    description: '', whoFor: '', teachingStyle: '', learningFormat: '',
    region: '', website: '', instagram: '', whatsapp: '', email: '',
    wantsPromotion: null,
    courseList: '',
  });

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const isStepValid = () => {
    if (step === 1) return form.institutionName.trim() && form.category;
    if (step === 2) return form.description.trim();
    if (step === 3) return form.email.trim();
    return true;
  };
  const tryNext = () => {
    if (!isStepValid()) { setShowErrors(true); return; }
    setShowErrors(false); setStep(s => s + 1);
  };
  const goBack = () => { setStep(s => s - 1); setShowErrors(false); };

  const handleSubmit = async () => {
    setSubmitting(true); setError(false);
    try {
      const payload = new FormData();
      payload.append('_subject', `New institution profile — CourzaTT: ${form.institutionName}`);
      [['institution_name', form.institutionName], ['category', form.category], ['tagline', form.tagline],
       ['description', form.description], ['who_for', form.whoFor], ['teaching_style', form.teachingStyle],
       ['learning_format', form.learningFormat], ['region', form.region], ['website', form.website],
       ['instagram', form.instagram], ['whatsapp', form.whatsapp], ['email', form.email],
       ['wants_promotion', form.wantsPromotion ? 'Yes — please reach out' : 'No'],
       ['course_list', form.courseList],
      ].forEach(([k, v]) => payload.append(k, v));
      const res = await fetch('https://formspree.io/f/mvzlzjje', { method: 'POST', body: payload, headers: { Accept: 'application/json' } });
      if (res.ok) setSubmitted(true); else setError(true);
    } catch { setError(true); }
    setSubmitting(false);
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(14,26,23,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: 'var(--paper)', borderRadius: 16, width: '100%', maxWidth: 660, maxHeight: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px -20px rgba(14,26,23,0.4)' }}>

        {/* Modal header */}
        <div style={{ padding: '18px 28px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 8 }}>
              {LIST_STEPS.map((s, i) => (
                <React.Fragment key={i}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: step > i+1 ? 'var(--emerald)' : step === i+1 ? 'var(--ink)' : 'var(--paper-2)', border: `1px solid ${step > i+1 ? 'var(--emerald)' : step === i+1 ? 'var(--ink)' : 'var(--rule)'}`, color: step >= i+1 ? 'var(--paper)' : 'var(--muted)', fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 600, transition: 'all 0.2s' }}>
                    {step > i+1 ? <Icon name="check" size={10}/> : i+1}
                  </div>
                  {i < LIST_STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: step > i+1 ? 'var(--emerald)' : 'var(--rule)', transition: 'background 0.3s', minWidth: 8 }}/>}
                </React.Fragment>
              ))}
            </div>
            <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Step {step} of {LIST_STEPS.length} — {LIST_STEPS[step - 1]}
            </div>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', flexShrink: 0 }}>
            <Icon name="x" size={16}/>
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ padding: '28px 28px 0', overflowY: 'auto', flexGrow: 1 }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid var(--emerald)', background: 'rgba(31,95,74,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: 'var(--emerald)', marginLeft: 'auto', marginRight: 'auto' }}>
                <Icon name="check" size={28}/>
              </div>
              <h2 className="serif" style={{ fontSize: 26, fontWeight: 500, marginBottom: 12 }}>You're on the <em className="display-italic"><span className="hl">list</span></em>.</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 28 }}>
                Our team will review your profile and reach out within 2–3 business days.{form.wantsPromotion && " We'll also be in touch about your promotion add-on."}
              </p>
              <button onClick={onClose} className="btn btn-primary">Done <Icon name="check" size={14}/></button>
            </div>
          ) : (
            <>
              {step === 1 && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>Let's start with the basics</h2>
                    <p className="muted" style={{ fontSize: 14 }}>Tell us who you are — just the essentials.</p>
                  </div>
                  <ListField label="Institution name" required value={form.institutionName} onChange={v => update('institutionName', v)} placeholder="e.g. Caribbean Institute of Technology" showErrors={showErrors}/>
                  <div style={{ marginBottom: 24 }}>
                    <label className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Category<span style={{ color: 'var(--amber-2)', marginLeft: 3 }}>*</span></label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {INST_CATS.map(c => <button key={c} type="button" onClick={() => update('category', c)} className={`chip ${form.category === c ? 'active' : ''}`}>{c}</button>)}
                    </div>
                    {showErrors && !form.category && <span style={{ fontSize: 11, color: 'var(--red, #c0392b)', display: 'block', marginTop: 8 }}>Please select a category</span>}
                  </div>
                  <ListField label="Tagline" value={form.tagline} onChange={v => update('tagline', v)} placeholder="e.g. Practical training for the modern workforce" hint="Optional — one line that captures your mission."/>
                </>
              )}
              {step === 2 && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>About your institution</h2>
                    <p className="muted" style={{ fontSize: 14 }}>This is your story. Learners will read this to decide if you're the right fit.</p>
                  </div>
                  <ListField label="About the institution" required as="textarea" rows={4} value={form.description} onChange={v => update('description', v)} placeholder="What do you offer? What makes your programmes different?" showErrors={showErrors}/>
                  <ListField label="Who are your courses for?" value={form.whoFor} onChange={v => update('whoFor', v)} placeholder="e.g. Working adults, school leavers, small business owners…" hint="Optional"/>
                  <div style={{ marginBottom: 24 }}>
                    <label className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Teaching style</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {['Hands-on', 'Theory & practice', 'Self-paced', 'Instructor-led', 'Mentorship-based'].map(s => <button key={s} type="button" onClick={() => update('teachingStyle', form.teachingStyle === s ? '' : s)} className={`chip ${form.teachingStyle === s ? 'active' : ''}`}>{s}</button>)}
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Learning format</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {['In-person', 'Online', 'Hybrid', 'Weekends', 'Evenings'].map(f => <button key={f} type="button" onClick={() => update('learningFormat', form.learningFormat === f ? '' : f)} className={`chip ${form.learningFormat === f ? 'active' : ''}`}>{f}</button>)}
                    </div>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>Contact & location</h2>
                    <p className="muted" style={{ fontSize: 14 }}>How can learners (and our team) reach you?</p>
                  </div>
                  <ListField label="Contact email" required type="email" value={form.email} onChange={v => update('email', v)} placeholder="admin@yourinstitution.tt" showErrors={showErrors}/>
                  <div style={{ marginBottom: 24 }}>
                    <label className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Region in Trinidad &amp; Tobago</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {TT_REGIONS.map(r => <button key={r} type="button" onClick={() => update('region', form.region === r ? '' : r)} className={`chip ${form.region === r ? 'active' : ''}`}>{r}</button>)}
                    </div>
                  </div>
                  <ListField label="Website" value={form.website} onChange={v => update('website', v)} placeholder="https://yourinstitution.tt"/>
                  <ListField label="Instagram" value={form.instagram} onChange={v => update('instagram', v)} placeholder="@yourhandle"/>
                  <ListField label="WhatsApp" value={form.whatsapp} onChange={v => update('whatsapp', v)} placeholder="+1 (868) 000-0000" type="tel"/>
                </>
              )}
              {step === 4 && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>What courses do you offer?</h2>
                    <p className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>List your current programmes, paste a link to your course page, or share whatever you have — our team will take it from there and list everything properly.</p>
                  </div>
                  <ListField
                    label="Your courses"
                    as="textarea"
                    rows={7}
                    value={form.courseList}
                    onChange={v => update('courseList', v)}
                    placeholder={"e.g.\n– Professional Baking Certificate · TTD 2,500 · 8 weeks\n– Food Safety & Hygiene · TTD 800 · 2 days\n\nOr just paste a link: https://yourinstitution.tt/courses"}
                  />
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', background: 'var(--paper-2)', borderRadius: 10, border: '1px solid var(--rule)', marginTop: 4 }}>
                    <Icon name="info" size={14} style={{ color: 'var(--muted)', flexShrink: 0, marginTop: 1 }}/>
                    <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, margin: 0 }}>No fixed format needed. A rough list, a screenshot description, a WhatsApp catalogue link — anything works. We'll follow up if we need more detail.</p>
                  </div>
                </>
              )}
              {step === 5 && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>Want to boost your visibility?</h2>
                    <p className="muted" style={{ fontSize: 14 }}>Your free listing reaches everyone browsing CourzaTT. Promotion amplifies that for a specific intake cycle.</p>
                  </div>
                  <div style={{ background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>Promotion add-on</span>
                      <span style={{ background: 'var(--ink)', color: 'var(--paper)', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999 }}>One-time · per intake</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                      {['Featured on homepage & discovery feeds', 'Social media post about your courses', 'Newsletter mention to our subscribers', 'Priority placement in browsing surfaces'].map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Icon name="check-circle" size={14} style={{ color: 'var(--emerald)', flexShrink: 0 }}/>
                          <span style={{ fontSize: 14 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <p className="muted" style={{ fontSize: 12, lineHeight: 1.5 }}>Not a subscription. Our team will reach out with pricing after you submit.</p>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <button type="button" onClick={() => update('wantsPromotion', true)} className={`btn ${form.wantsPromotion === true ? 'btn-primary' : 'btn-ghost'}`} style={{ flexGrow: 1, justifyContent: 'center' }}>
                      {form.wantsPromotion === true ? <Icon name="check" size={14}/> : <Icon name="star" size={14}/>} Yes, I'm interested
                    </button>
                    <button type="button" onClick={() => update('wantsPromotion', false)} className="btn btn-ghost" style={{ flexGrow: 1, justifyContent: 'center', opacity: form.wantsPromotion === false ? 0.45 : 1 }}>
                      No thanks, just list me
                    </button>
                  </div>
                </>
              )}
              {step === 6 && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 4 }}>Review your profile</h2>
                    <p className="muted" style={{ fontSize: 14 }}>Our team reviews every listing before it goes live.</p>
                  </div>
                  <div style={{ background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, marginBottom: 12 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span className="tag tag-emerald">{form.category || 'Category'}</span>
                      {form.region && <span className="tag">{form.region}</span>}
                    </div>
                    <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{form.institutionName || 'Your Institution'}</h3>
                    {form.tagline && <p className="muted" style={{ fontSize: 14, fontStyle: 'italic', marginBottom: 10 }}>{form.tagline}</p>}
                    {form.description && <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 12 }}>{form.description}</p>}
                    <div className="flex items-center gap-4" style={{ flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid var(--rule)' }}>
                      {form.website && <span className="mono muted" style={{ fontSize: 11 }}><Icon name="globe" size={11} style={{ display: 'inline', marginRight: 4, marginBottom: -1 }}/>{form.website}</span>}
                      {form.instagram && <span className="mono muted" style={{ fontSize: 11 }}><Icon name="instagram" size={11} style={{ display: 'inline', marginRight: 4, marginBottom: -1 }}/>{form.instagram}</span>}
                      {form.whatsapp && <span className="mono muted" style={{ fontSize: 11 }}><Icon name="phone" size={11} style={{ display: 'inline', marginRight: 4, marginBottom: -1 }}/>{form.whatsapp}</span>}
                    </div>
                  </div>
                  {form.courseList && (
                    <div style={{ background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: 12, padding: '14px 20px', marginBottom: 10 }}>
                      <span className="mono muted" style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Courses submitted</span>
                      <p style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>{form.courseList}</p>
                    </div>
                  )}
                  {form.wantsPromotion && (
                    <div style={{ marginTop: 12, padding: '10px 16px', background: 'rgba(232,163,61,0.1)', border: '1px solid var(--amber)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon name="star" size={13} style={{ color: 'var(--amber-2)', flexShrink: 0 }}/>
                      <span style={{ fontSize: 13 }}>Promotion add-on requested — our team will be in touch.</span>
                    </div>
                  )}
                </>
              )}
              <div style={{ height: 28 }}/>
            </>
          )}
        </div>

        {/* Footer nav */}
        {!submitted && (
          <div style={{ padding: '16px 28px', borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, background: 'var(--paper)' }}>
            {step > 1 ? <button onClick={goBack} className="btn btn-ghost"><Icon name="arrow-left" size={14}/> Back</button> : <div/>}
            {error && <p className="mono" style={{ fontSize: 11, color: 'var(--red, #c0392b)' }}>Something went wrong</p>}
            {step < LIST_STEPS.length
              ? <button onClick={tryNext} className="btn btn-primary">Continue <Icon name="arrow-right" size={14}/></button>
              : <button onClick={handleSubmit} className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting…' : <><span>Submit profile</span> <Icon name="send" size={14}/></>}</button>
            }
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// List Institution Page — info + benefits (modal launched from CTA)
// ─────────────────────────────────────────────────────────────────
const ListInstitution = ({ setPage, onListInstitution }) => {
  return (
    <div className="page-enter">

      {/* PAGE HEADER */}
      <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="eyebrow-num" data-num="N° 04" style={{ marginBottom: 20 }}>For institutions</div>
          <h1 className="display-2 serif" style={{ marginBottom: 16 }}>
            Build your <em className="display-italic"><span className="hl">profile</span></em>.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 32 }}>
            Create your institution's presence on CourzaTT — free, permanent, and fully integrated into our discovery platform.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onListInstitution && onListInstitution()} className="btn btn-primary">
              Get started — it's free <Icon name="arrow-right" size={14}/>
            </button>
            <button onClick={() => document.getElementById('promote-section').scrollIntoView({ behavior: 'smooth' })} className="btn btn-ghost">
              See promotion options <Icon name="arrow-down" size={14}/>
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ paddingTop: 64, paddingBottom: 80, borderBottom: '1px solid var(--rule)' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--rule)', marginBottom: 56, boxShadow: '0 8px 24px -8px rgba(14,26,23,0.10)', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            <img src="https://i.ibb.co/DPy1t6Mh/courzattlistyourinstitution1.png" alt="Join CourzaTT" style={{ width: '100%', display: 'block' }}/>
          </div>

          <SectionHeader num="N° 04.1" eyebrow="Why list with us" title={<>Reach learners <em className="display-italic">already looking</em>.</>} sub="CourzaTT is where T&T goes to find accredited courses. Your free profile puts you in front of that intent."/>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, marginTop: 48 }}>
            {[
              { num: '01', title: 'Reach active learners across T&T', sub: 'Show up where intent already lives.' },
              { num: '02', title: 'Showcase programmes & workshops', sub: 'Beautiful pages, no engineering needed.' },
              { num: '03', title: 'Direct traffic to your own website', sub: 'We index — you enrol.' },
              { num: '04', title: 'Verified trust badge for your profile', sub: 'A signal of accreditation that builds confidence.' },
            ].map(({ num, title, sub }) => (
              <div key={num} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 16, padding: '24px 0', borderTop: '1px solid var(--rule)' }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--amber-2)', letterSpacing: '0.15em', paddingTop: 3 }}>{num}</span>
                <div>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 500, marginBottom: 6 }}>{title}</div>
                  <div className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, textAlign: 'center' }}>
            <button onClick={() => onListInstitution && onListInstitution()} className="btn btn-primary btn-lg">
              Build your free profile <Icon name="arrow-right" size={14}/>
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ paddingTop: 64, paddingBottom: 80, borderBottom: '1px solid var(--rule)' }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <SectionHeader num="N° 04.2" eyebrow="The process" title={<>Six steps to your <em className="display-italic">profile</em>.</>} sub="The whole thing takes about 10 minutes. Here's exactly what to expect."/>

          <div style={{ marginTop: 56, position: 'relative' }}>
            {/* Vertical connector line */}
            <div style={{ position: 'absolute', left: 19, top: 40, bottom: 40, width: 1, background: 'var(--rule)', zIndex: 0 }}/>

            {[
              { num: '01', label: 'Institution basics', icon: 'building-2', desc: 'Name, category, and a one-line tagline. You already know this.' },
              { num: '02', label: 'About your institution', icon: 'file-text', desc: 'What you offer, who it\'s for, and how you teach. A short paragraph is plenty.' },
              { num: '03', label: 'Contact & location', icon: 'map-pin', desc: 'Your email, region, website, and social handles — so learners can reach you directly.' },
              { num: '04', label: 'Your courses', icon: 'book-open', desc: 'A list, a link, a description — any format works. Our team structures everything.' },
              { num: '05', label: 'Boost visibility', icon: 'trending-up', desc: 'Interested in a promotion add-on? Let us know here. Completely optional, no commitment.' },
              { num: '06', label: 'Review & submit', icon: 'check-circle', desc: 'Check everything looks right, then send it off. We publish within 2–3 business days.' },
            ].map(({ num, label, icon, desc }, i) => (
              <div key={num} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 24, marginBottom: 8, position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: i === 0 ? 'var(--emerald)' : 'var(--paper)', border: `1px solid ${i === 0 ? 'var(--emerald)' : 'var(--rule-strong)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="mono" style={{ fontSize: 10, fontWeight: 600, color: i === 0 ? 'var(--paper)' : 'var(--amber-2)', letterSpacing: '0.1em' }}>{num}</span>
                  </div>
                </div>
                <div className="card" style={{ padding: '20px 24px', marginBottom: 12, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <Icon name={icon} size={14} style={{ color: 'var(--amber-2)', flexShrink: 0 }}/>
                      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</span>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink)', margin: 0, fontWeight: 400 }}>{desc}</p>
                  </div>
                  {num === '06' && (
                    <span style={{ background: 'var(--emerald)', color: 'var(--paper)', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>Done</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, padding: '20px 28px', background: 'var(--paper-2)', borderRadius: 12, border: '1px solid var(--rule)' }}>
            <Icon name="clock" size={18} style={{ color: 'var(--muted)', flexShrink: 0 }}/>
            <p className="muted" style={{ fontSize: 14, margin: 0 }}>Most institutions complete the full profile in under 10 minutes. You can close and reopen at any time — your progress is not saved, so have your details handy.</p>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button onClick={() => onListInstitution && onListInstitution()} className="btn btn-primary btn-lg">
              Start your profile <Icon name="arrow-right" size={14}/>
            </button>
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

          <div className="promote-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 32, alignItems: 'stretch', marginBottom: 80 }}>

            {/* Free listing */}
            <div className="card" style={{ padding: 40, background: 'var(--emerald)', color: 'var(--paper)', borderColor: 'var(--emerald)', boxShadow: '0 20px 48px -16px rgba(31,95,74,0.35)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7 }}>Free listing</div>
                <span style={{ background: 'var(--amber)', color: 'var(--ink)', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999 }}>Always free</span>
              </div>
              <div className="serif" style={{ fontSize: 40, fontWeight: 500, marginBottom: 8, lineHeight: 1 }}>TTD 0</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 28, opacity: 0.8 }}>List your institution and up to 3 courses at no cost. Fully part of the discovery ecosystem from day one.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {['Appears in search & browsing', 'Institution profile page', 'Full course catalogue', 'Discovery-first placement'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon name="check-circle" size={16} style={{ color: 'var(--amber)', flexShrink: 0 }}/>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onListInstitution && onListInstitution()} className="btn btn-amber full" style={{ justifyContent: 'center' }}>
                Build your profile free <Icon name="arrow-right" size={14}/>
              </button>
            </div>

            {/* Single promotion add-on */}
            <div className="card" style={{ padding: 40, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Promotion add-on</div>
                <span style={{ background: 'var(--ink)', color: 'var(--paper)', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999 }}>One-time · per intake</span>
              </div>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 28 }}>Boost visibility for a specific course cycle. Not a subscription — institutions choose to promote again when they launch a new intake.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32, flexGrow: 1 }}>
                {[['Featured placement', 'Homepage and discovery feeds for your intake period'], ['Social media post', 'Dedicated post promoting your courses to our audience'], ['Newsletter inclusion', 'Mentioned to our subscriber list'], ['Priority browsing', 'Highlighted cards in category and tag feeds'], ['Institution spotlight', 'Increased visibility across all platform surfaces']].map(([title, desc]) => (
                  <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Icon name="check" size={13} style={{ color: 'var(--emerald)', flexShrink: 0, marginTop: 2 }}/>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                      <div className="muted" style={{ fontSize: 12, lineHeight: 1.4 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setPage('contact:partnership:Promotion add-on enquiry')} className="btn btn-primary btn-lg full" style={{ justifyContent: 'center' }}>
                Get in touch about promotion <Icon name="arrow-right" size={14}/>
              </button>
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
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}>Build your profile and reach learners across T&amp;T.</h3>
                <p style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.6, marginBottom: 32 }}>Free, permanent, and fully integrated into the CourzaTT discovery ecosystem.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button onClick={() => onListInstitution && onListInstitution()} className="btn btn-amber" style={{ justifyContent: 'center' }}>
                  Build your profile <Icon name="arrow-right" size={14}/>
                </button>
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
        <div className="container contact-layout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'start' }}>

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

              <div className="contact-name-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
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
// Online Guides Page
// ─────────────────────────────────────────────────────────────────
const OnlineGuides = ({ setPage }) => {
  const { ONLINE_GUIDES } = window.CourzaData;
  const [filter, setFilter] = React.useState('all');

  const free = ONLINE_GUIDES.filter(g => g.free);
  const paid = ONLINE_GUIDES.filter(g => !g.free);
  const displayed = filter === 'free' ? free : filter === 'paid' ? paid : ONLINE_GUIDES;

  const platformColors = {
    'Coursera': 'var(--ink)',
    'Google Digital Garage': 'var(--emerald)',
    'HubSpot Academy': 'var(--rust)',
    'Meta Blueprint': 'var(--ink)',
    'Semrush Academy': 'var(--emerald)',
  };

  return (
    <div className="page-enter">

      {/* HEADER */}
      <section style={{ paddingTop: 64, paddingBottom: 64, borderBottom: '1px solid var(--rule)' }}>
        <div className="container">
          <div className="eyebrow-num" data-num="N° 07" style={{ marginBottom: 24 }}>Online learning</div>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'end' }}>
            <div>
              <h1 className="display-1 serif" style={{ marginBottom: 24 }}>
                Global skills.<br/><em className="display-italic" style={{ color: 'var(--emerald)' }}>T&T ambition.</em>
              </h1>
              <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 560 }}>
                Nine globally recognised certifications — most of them free — handpicked to complement your local qualifications and open doors beyond the island.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'end', paddingBottom: 8 }}>
              {[
                { num: '5', label: 'Fully free courses', color: 'var(--emerald)' },
                { num: '4', label: 'Paid with free trial or audit access', color: 'var(--ink)' },
                { num: '9', label: 'Certificates included', color: 'var(--amber-2)' },
              ].map(({ num, label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 16, borderBottom: '1px solid var(--rule)' }}>
                  <span className="serif" style={{ fontSize: 40, fontWeight: 500, color, lineHeight: 1, minWidth: 48 }}>{num}</span>
                  <span style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.4 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section>
        <div className="container">
          {/* Filter tabs */}
          <div className="flex items-center gap-3" style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '1px solid var(--rule)' }}>
            <span className="mono muted" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginRight: 8 }}>Show</span>
            {[
              { key: 'all', label: `All (${ONLINE_GUIDES.length})` },
              { key: 'free', label: `Free (${free.length})` },
              { key: 'paid', label: `Paid / Audit (${paid.length})` },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{
                padding: '8px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                background: filter === f.key ? 'var(--ink)' : 'var(--card)',
                color: filter === f.key ? 'var(--paper)' : 'var(--ink-2)',
                border: `1px solid ${filter === f.key ? 'var(--ink)' : 'var(--rule)'}`,
                transition: 'all 0.2s',
              }}>{f.label}</button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="cards-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--gap-grid)' }}>
            {displayed.map((g) => (
              <div key={g.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                {/* Top accent bar */}
                <div style={{ height: 3, background: g.free ? 'var(--emerald)' : 'var(--ink)', flexShrink: 0 }}/>
                <div style={{ padding: 32, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

                  {/* Header row */}
                  <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
                    <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
                      <span className="tag" style={{ fontSize: 10 }}>{g.skill}</span>
                      <span className="mono" style={{ fontSize: 10, color: platformColors[g.platform] || 'var(--ink-2)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{g.platform}</span>
                    </div>
                    <span style={{
                      fontSize: 10, fontFamily: 'var(--font-mono, JetBrains Mono, monospace)', fontWeight: 700,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: 999,
                      background: g.free ? 'var(--emerald)' : 'var(--paper-2)',
                      color: g.free ? 'var(--paper)' : 'var(--ink-2)',
                      border: g.free ? 'none' : '1px solid var(--rule)',
                      whiteSpace: 'nowrap',
                    }}>{g.free ? 'Free' : g.cost}</span>
                  </div>

                  {/* Title + provider */}
                  <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>{g.provider}</div>
                  <h3 className="course-title" style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 16 }}>{g.title}</h3>

                  {/* Pitch */}
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', flexGrow: 1, marginBottom: 24 }}>{g.pitch}</p>

                  {/* Meta row */}
                  <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 20, marginBottom: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Duration</div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{g.duration}</div>
                      </div>
                      <div>
                        <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Access</div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{g.freeAccess}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <div className="mono muted" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Good for</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)' }}>{g.roles}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a href={g.url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ justifyContent: 'center', textDecoration: 'none' }}>
                    Start learning <Icon name="external" size={13}/>
                  </a>
                  {g.certificate && (
                    <div className="flex items-center gap-2 justify-center" style={{ marginTop: 12 }}>
                      <Icon name="check-circle" size={12} style={{ color: 'var(--emerald)' }}/>
                      <span className="mono muted" style={{ fontSize: 10, letterSpacing: '0.1em' }}>Certificate included</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="card" style={{ marginTop: 64, padding: 40, background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 12 }}>Already certified? List your institution.</div>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, marginBottom: 8 }}>Looking for programmes right here in T&T?</h3>
              <p style={{ fontSize: 15, opacity: 0.7, lineHeight: 1.6 }}>Browse our full directory of accredited courses from local institutions — in-person, online, and hybrid.</p>
            </div>
            <button onClick={() => setPage('discover')} className="btn btn-amber" style={{ whiteSpace: 'nowrap' }}>
              Browse local courses <Icon name="arrow-right" size={14}/>
            </button>
          </div>
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
Object.assign(window.CourzaPages, { Discover, Institutions, CourseDetail, InstitutionDetail, ListInstitution, ListInstitutionModal, ContactPage, PrivacyPage, OnlineGuides });
