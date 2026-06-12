import type { APIRoute } from 'astro';

const BASE_URL = 'https://client-directus.siliconpin.in';
const SITE_URL = 'https://rong-pencil.siliconpin.net';

export const get: APIRoute = async () => {
  try {
    const [artistsRes, studentsRes, teachersRes] = await Promise.all([
      fetch(`${BASE_URL}/items/artist?filter[status][_eq]=published`),
      fetch(`${BASE_URL}/items/students?filter[status][_eq]=published`),
      fetch(`${BASE_URL}/items/teacher?filter[status][_eq]=published`),
    ]);

    const [artistsData, studentsData, teachersData] = await Promise.all([
      artistsRes.json(),
      studentsRes.json(),
      teachersRes.json(),
    ]);

    const artists = artistsData.data || [];
    const students = studentsData.data || [];
    const teachers = teachersData.data || [];

    // Static pages
    const staticPages = [
      '',
      '/about',
      '/admission',
      '/contact',
      '/exhibition',
      '/gallery',
      '/painting',
      '/photography',
      '/sale',
      '/terms',
    ];

    // Artist routes
    const artistTypes = ['guest', 'junior', 'senior'];
    const artistTypePages = artistTypes.map(t => `/artist/${t}`);
    const artistProfilePages = artists.map(
      (a: any) => `/artist/${a.artist_type}/${a.id}`
    );

    // Student routes
    const studentTypes = ['junior', 'senior', 'adult'];
    const studentTypePages = studentTypes.map(t => `/student/${t}`);
    const studentProfilePages = students.map(
      (s: any) => `/student/${s.type || 'junior'}/${s.id}`
    );

    // Teacher routes
    const teacherTypes = ['school', 'community'];
    const teacherTypePages = teacherTypes.map(t => `/teacher/${t}`);
    const teacherProfilePages = teachers.map((t: any) => {
      const type = t.teacher_type ? t.teacher_type.replace('_teacher', '') : 'school';
      return `/teacher/${type}/${t.id}`;
    });

    const allPages = [
      ...staticPages,
      ...artistTypePages,
      ...artistProfilePages,
      ...studentTypePages,
      ...studentProfilePages,
      ...teacherTypePages,
      ...teacherProfilePages,
    ];

    // Remove duplicates
    const uniquePages = Array.from(new Set(allPages));

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePages
  .map(page => {
    // Determine priority and frequency
    let priority = '0.5';
    let changefreq = 'weekly';

    if (page === '') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (
      [
        '/about',
        '/admission',
        '/contact',
        '/exhibition',
        '/gallery',
        '/painting',
        '/photography',
        '/sale',
      ].includes(page)
    ) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (
      page.startsWith('/artist/') &&
      !page.split('/').filter(Boolean)[2]
    ) {
      // It's a list page like /artist/senior
      priority = '0.7';
    } else if (
      page.startsWith('/student/') &&
      !page.split('/').filter(Boolean)[2]
    ) {
      priority = '0.7';
    } else if (
      page.startsWith('/teacher/') &&
      !page.split('/').filter(Boolean)[2]
    ) {
      priority = '0.7';
    }

    return `  <url>
    <loc>${SITE_URL}${page}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    return new Response(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap.xml:', error);
    return new Response('Error generating sitemap', {
      status: 500,
    });
  }
};

// Export GET for modern Astro versions
export const GET = get;
