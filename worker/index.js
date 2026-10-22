// Cloudflare Worker: serves the static site in dist/ and handles the contact form.
// Secrets (wrangler secret put): RESEND_API_KEY, SUPABASE_ANON_KEY, LEAD_TO. Vars live in wrangler.jsonc.

const FIELDS = { name: 120, email: 200, website: 300, phone: 40, service: 80, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/api/contact') return contact(request, env);
    return env.ASSETS.fetch(request);
  },
};

async function contact(request, env) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  let form;
  try {
    form = await request.formData();
  } catch {
    return go(request, '/contact/?error=invalid#form');
  }
  // Honeypot: the "company" field is hidden from people, so only bots fill it in. Pretend it worked.
  if (form.get('company')) return go(request, '/thank-you/');

  const lead = {};
  for (const [key, max] of Object.entries(FIELDS)) lead[key] = String(form.get(key) || '').trim().slice(0, max);
  if (!lead.name || !EMAIL.test(lead.email)) return go(request, '/contact/?error=invalid#form');

  const [saved, sent] = await Promise.allSettled([save(lead, request, env), notify(lead, env)]);
  for (const r of [saved, sent]) if (r.status === 'rejected') console.error(r.reason);
  // One working channel is enough to keep the lead.
  if (saved.status === 'rejected' && sent.status === 'rejected') return go(request, '/contact/?error=send#form');
  return go(request, '/thank-you/');
}

async function save(lead, request, env) {
  const res = await fetch(env.SUPABASE_URL + '/rest/v1/leads', {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + env.SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ ...lead, page: request.headers.get('Referer'), user_agent: request.headers.get('User-Agent') }),
  });
  if (!res.ok) throw new Error('Supabase ' + res.status + ': ' + (await res.text()));
}

async function notify(lead, env) {
  const oneLine = (s) => s.replace(/[\r\n]+/g, ' ');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.LEAD_FROM,
      to: [env.LEAD_TO],
      reply_to: lead.email,
      subject: oneLine('New website lead: ' + lead.name + (lead.service ? ' (' + lead.service + ')' : '')),
      text: [
        'Name: ' + lead.name,
        'Email: ' + lead.email,
        'Phone: ' + (lead.phone || '-'),
        'Website: ' + (lead.website || '-'),
        'Service: ' + (lead.service || '-'),
        '',
        lead.message || '(no message)',
      ].join('\n'),
    }),
  });
  if (!res.ok) throw new Error('Resend ' + res.status + ': ' + (await res.text()));
}

function go(request, path) {
  return Response.redirect(new URL(path, request.url).toString(), 303);
}
