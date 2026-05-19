import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, sport, enquiryType, message, preferredTiming, attendanceType, numberOfAttendees, friendReferral, referralMobile, referralEmail } = req.body || {};

    if (!name || !email || !phone || !sport || !enquiryType || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Log the enquiry (Vercel serverless cannot persist files to disk)
    console.log('[REGISTRATION]', JSON.stringify({ name, email, phone, sport, enquiryType, message, preferredTiming, attendanceType, numberOfAttendees, friendReferral, referralMobile, referralEmail, timestamp: new Date().toISOString() }));

    return res.status(200).json({ success: true, message: 'Registration saved successfully' });
  } catch (error) {
    console.error('[REGISTRATION ERROR]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
