import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const body = req.body || {};
    const {
      name,
      email,
      phone,
      sport,
      enquiryType,
      message,
      preferredTiming,
      attendanceType,
      numberOfAttendees,
      friendReferral,
      referralMobile,
      referralEmail,
      institution,
    } = body;

    if (!name || !email || !phone || !sport || !enquiryType || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          name: !name ? 'required' : 'ok',
          email: !email ? 'required' : 'ok',
          phone: !phone ? 'required' : 'ok',
          sport: !sport ? 'required' : 'ok',
          enquiryType: !enquiryType ? 'required' : 'ok',
          message: !message ? 'required' : 'ok',
        },
      });
    }

    // Log the registration data
    console.log(
      '[REGISTRATION]',
      JSON.stringify({
        name,
        email,
        phone,
        sport,
        enquiryType,
        message,
        preferredTiming,
        attendanceType,
        numberOfAttendees,
        friendReferral,
        referralMobile,
        referralEmail,
        institution,
        timestamp: new Date().toISOString(),
      })
    );

    return res.status(200).json({
      success: true,
      message: 'Registration saved successfully',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[REGISTRATION ERROR]', errorMessage, error);
    return res.status(500).json({ error: 'Internal server error', details: errorMessage });
  }
}
