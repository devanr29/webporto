// Vercel serverless function — only runs on the deployed site (not `vite dev`).
// Proxies contact-form submissions to Formspree so the attempt and its result
// show up in Vercel's function logs (`vercel logs <deployment-url>`, or the
// Functions tab on the deployment in the Vercel dashboard).
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT
  const { name, email, message } = req.body || {}

  console.log('[api/contact] Incoming submission', {
    name,
    email,
    messageLength: message?.length ?? 0,
  })

  if (!endpoint) {
    console.error('[api/contact] FORMSPREE_ENDPOINT is not set in the Vercel project Environment Variables')
    return res.status(500).json({ error: 'Server is missing FORMSPREE_ENDPOINT' })
  }

  try {
    const formspreeRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
    const body = await formspreeRes.json().catch(() => null)

    console.log('[api/contact] Formspree response', {
      status: formspreeRes.status,
      ok: formspreeRes.ok,
      body,
    })

    return res.status(formspreeRes.status).json(body ?? { ok: formspreeRes.ok })
  } catch (err) {
    console.error('[api/contact] Forward to Formspree failed', err)
    return res.status(502).json({ error: 'Failed to reach Formspree' })
  }
}
