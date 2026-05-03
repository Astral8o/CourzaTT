/* CourzaTT — Supabase data loader
 * Fetches live courses and institutions, merges into window.CourzaData.
 * Falls back silently to static data.js if Supabase is unreachable.
 */
(function () {
  const URL  = 'https://lvvfclktjcghqxauohli.supabase.co/rest/v1';
  const KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dmZjbGt0amNnaHF4YXVvaGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDkyNDksImV4cCI6MjA4OTYyNTI0OX0.NzmpYGJyAMw9_ucjp_nSJocBcN91Oj2hwQhC7zHGdR8';
  const HDR  = { apikey: KEY, Authorization: 'Bearer ' + KEY };

  function toCourse(r) {
    return {
      id:              r.id,
      title:           r.title,
      institutionId:   r.institution_id,
      institutionName: r.institution_name,
      summary:         r.summary,
      type:            r.type,
      category:        r.category,
      cost:            r.cost,
      startDate:       r.start_date,
      deadline:        r.deadline,
      delivery:        r.delivery,
      location:        r.location,
      // website intentionally omitted — data.js is the authoritative source
      featured:        r.featured,
    };
  }

  function toInstitution(r) {
    return {
      id:          r.id,
      name:        r.name,
      summary:     r.summary,
      type:        r.type,
      // website intentionally omitted — data.js is the authoritative source
      location:    r.location,
      courseCount: r.course_count,
    };
  }

  window.CourzaDataReady = (async function load() {
    try {
      const [cRes, iRes] = await Promise.all([
        fetch(URL + '/courza_courses?select=*&order=id', { headers: HDR }),
        fetch(URL + '/courza_institutions?select=*&order=id', { headers: HDR }),
      ]);
      if (!cRes.ok || !iRes.ok) throw new Error('HTTP ' + cRes.status);
      const [courses, institutions] = await Promise.all([cRes.json(), iRes.json()]);
      // Merge Supabase data over static data — websites are preserved from data.js
      // because toCourse/toInstitution deliberately exclude the website field.
      const staticCoursesByTitle = (window.CourzaData?.COURSES || []).reduce((m, c) => { m[c.title] = c; return m; }, {});
      const staticInstById = (window.CourzaData?.INSTITUTIONS || []).reduce((m, i) => { m[i.id] = i; return m; }, {});
      window.CourzaData = Object.assign({}, window.CourzaData, {
        COURSES: courses.map(r => {
          const c = toCourse(r);
          const staticC = staticCoursesByTitle[c.title];
          if (staticC) {
            // Always use data.js for structural fields — Supabase only provides live cost/date updates
            c.id             = staticC.id;
            c.website        = staticC.website;
            c.category       = staticC.category;
            c.institutionId  = staticC.institutionId;
            c.institutionName = staticC.institutionName;
            c.featured       = staticC.featured;
          }
          return c;
        }),
        INSTITUTIONS: institutions.map(r => {
          const c = toInstitution(r);
          const staticI = staticInstById[c.id];
          if (staticI) c.website = staticI.website;
          return c;
        }),
      });
    } catch (err) {
      console.warn('[CourzaTT] Supabase unavailable — using static data.', err.message);
    }
  })();
})();
