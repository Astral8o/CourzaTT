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
      website:         r.website,
      featured:        r.featured,
    };
  }

  function toInstitution(r) {
    return {
      id:          r.id,
      name:        r.name,
      summary:     r.summary,
      type:        r.type,
      website:     r.website,
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
      window.CourzaData = Object.assign({}, window.CourzaData, {
        COURSES:      courses.map(toCourse),
        INSTITUTIONS: institutions.map(toInstitution),
      });
    } catch (err) {
      console.warn('[CourzaTT] Supabase unavailable — using static data.', err.message);
    }
  })();
})();
