exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, phone, service, message } = JSON.parse(event.body || '{}');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['kataroteno@gmail.com', 'belleamie1122@naver.com'],
        subject: `[벨아미리노보] 새 문의가 도착했습니다 - ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">새 문의가 도착했습니다</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 100px;">이름</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">이메일</td><td style="padding: 8px 0;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">연락처</td><td style="padding: 8px 0;">${phone || '-'}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">관심 시술</td><td style="padding: 8px 0;">${service || '-'}</td></tr>
              <tr><td style="padding: 8px 0; color: #666; vertical-align: top;">메시지</td><td style="padding: 8px 0;">${message || '-'}</td></tr>
            </table>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #aaa; font-size: 12px;">벨아미리노보 피부과 문의 알림</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { statusCode: 500, body: err };
    }

    return { statusCode: 200, body: 'OK' };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
