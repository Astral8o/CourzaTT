/* CourzaTT — Supabase data loader
 * Fetches live courses and institutions, merges into window.CourzaData.
 * Falls back silently to static data.js if Supabase is unreachable.
 */
(function () {
  const URL  = 'https://lvvfclktjcghqxauohli.supabase.co/rest/v1';
  const KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dmZjbGt0amNnaHF4YXVvaGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDkyNDksImV4cCI6MjA4OTYyNTI0OX0.NzmpYGJyAMw9_ucjp_nSJocBcN91Oj2hwQhC7zHGdR8';
  const HDR  = { apikey: KEY, Authorization: 'Bearer ' + KEY };

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
      const iRes = await fetch(URL + '/courza_institutions?select=*&order=id', { headers: HDR });
      if (!iRes.ok) throw new Error('HTTP ' + iRes.status);
      const institutions = await iRes.json();
      // COURSES: data.js is the sole source of truth — Supabase course data has
      // quality issues (duplicates, wrong categories) so we don't use it.
      const staticInstById = (window.CourzaData?.INSTITUTIONS || []).reduce((m, i) => { m[i.id] = i; return m; }, {});
      window.CourzaData = Object.assign({}, window.CourzaData, {
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
