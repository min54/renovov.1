exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, phone, service, message, website, _ts } = JSON.parse(event.body || '{}');

  // 허니팟 체크: 봇이 채운 필드가 있으면 가짜 성공 반환
  if (website) {
    return { statusCode: 200, body: 'OK' };
  }

  // 시간 체크: 제출까지 3초 미만이면 봇으로 판단
  if (_ts && Date.now() - _ts < 3000) {
    return { statusCode: 200, body: 'OK' };
  }

  // 필수 필드 검증
  if (!name || !email) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // 스팸 패턴 감지: 이름이나 메시지가 의미없는 랜덤 문자열인지 체크
  const randomPattern = /^[a-zA-Z]{10,}$/;
  if (randomPattern.test(name) || (message && randomPattern.test(message))) {
    return { statusCode: 200, body: 'OK' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@renovoh.net',
        to: ['belleamie1122@naver.com', 'kataroteno@gmail.com'],
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
