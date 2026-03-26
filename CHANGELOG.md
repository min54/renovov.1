# Changelog

## 2026-03-26

### 🌐 다국어 자동 감지
- 브라우저 언어가 일본어(`ja`)인 경우 자동으로 JP 화면 표시
- 기본값: 한국어(KR)

### 🗄️ Supabase 연동
- 문의 폼 제출 시 `contact_submissions` 테이블에 자동 저장
- 팝업 이미지 Supabase Storage(`popup-images` 버킷) 연동
- 어드민 대시보드 → 문의내역 / 팝업관리 Supabase 실시간 연동

### 📧 이메일 알림
- 문의 접수 시 아래 2개 이메일로 동시 발송 (Resend 사용)
  - `belleamie1122@naver.com`
  - `kataroteno@gmail.com`
- 발신 주소: `noreply@renovoh.net`
- Resend 도메인 인증 완료 (`renovoh.net` Verified)
- Netlify DNS에 DKIM / SPF / DMARC 레코드 추가

### 🛠️ 어드민 페이지 개편
- 대시보드: 전체 문의 수 / 미확인 / 오늘 문의 / 팝업 상태 표시
- 문의내역: 목록 조회 / 읽음 처리 / 삭제
- 팝업관리: 이미지 업로드 / 노출 on·off / 삭제

### 📦 기타
- `renovov.1` 레포가 Netlify(`renovoh.net`) 연결 레포임을 확인
- Supabase 프로젝트: `stfuqqtjlwpztnsqhsrq` (bella / Singapore)
