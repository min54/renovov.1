import React, { useState, useRef } from 'react';
import { Upload, Eye, EyeOff, Trash2, LogOut, Image, MessageSquare, LayoutDashboard } from 'lucide-react';

const ADMIN_ID = '1';
const ADMIN_PW = '1';

type Section = 'dashboard' | 'popup' | 'inquiries';

const AdminPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('admin_auth') === 'true');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [section, setSection] = useState<Section>('dashboard');

  const [popupImage, setPopupImage] = useState<string>(localStorage.getItem('popup_image') || '');
  const [popupActive, setPopupActive] = useState(localStorage.getItem('popup_active') === 'true');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      sessionStorage.setItem('admin_auth', 'true');
      setLoggedIn(true);
      setError('');
    } else {
      setError('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setLoggedIn(false);
    setId('');
    setPw('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPopupImage(dataUrl);
      localStorage.setItem('popup_image', dataUrl);
      localStorage.setItem('popup_active', 'true');
      localStorage.removeItem('popup_hide_until');
      setPopupActive(true);
    };
    reader.readAsDataURL(file);
  };

  const togglePopup = () => {
    const newVal = !popupActive;
    setPopupActive(newVal);
    localStorage.setItem('popup_active', String(newVal));
  };

  const deleteImage = () => {
    setPopupImage('');
    localStorage.removeItem('popup_image');
    localStorage.removeItem('popup_hide_until');
    localStorage.setItem('popup_active', 'false');
    setPopupActive(false);
  };

  /* ── 로그인 화면 ── */
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">RENOVO</h1>
            <p className="text-slate-400 text-sm mt-1">관리자 로그인</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">아이디</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">비밀번호</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-3 rounded-xl text-sm font-bold hover:bg-violet-600 transition-colors mt-2"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── 어드민 대시보드 ── */
  const navItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'popup', label: '팝업 관리', icon: Image },
    { id: 'inquiries', label: '문의 내역', icon: MessageSquare },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* 사이드바 */}
      <aside className="w-56 bg-slate-950 flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-white font-bold tracking-tight text-base">RENOVO</h1>
          <p className="text-white/30 text-[11px] mt-0.5">관리자 페이지</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                section === id
                  ? 'bg-violet-500 text-white'
                  : 'text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* 대시보드 */}
        {section === 'dashboard' && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">대시보드</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer hover:border-violet-200 transition-all"
                onClick={() => setSection('popup')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                    <Image size={18} className="text-violet-500" />
                  </div>
                  <span className="font-semibold text-slate-700">팝업 관리</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{popupImage ? (popupActive ? '표시 중' : '숨김') : '없음'}</p>
                <p className="text-xs text-slate-400 mt-1">현재 팝업 상태</p>
              </div>
              <div
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-pointer hover:border-violet-200 transition-all"
                onClick={() => setSection('inquiries')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                    <MessageSquare size={18} className="text-violet-500" />
                  </div>
                  <span className="font-semibold text-slate-700">문의 내역</span>
                </div>
                <p className="text-2xl font-bold text-slate-900">—</p>
                <p className="text-xs text-slate-400 mt-1">추후 연동 예정</p>
              </div>
            </div>
          </div>
        )}

        {/* 팝업 관리 */}
        {section === 'popup' && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">팝업 관리</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 max-w-xl">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-semibold text-slate-700">팝업 이미지</p>
                {popupImage && (
                  <button
                    onClick={togglePopup}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                      popupActive
                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {popupActive ? <Eye size={12} /> : <EyeOff size={12} />}
                    {popupActive ? '표시 중' : '숨김'}
                  </button>
                )}
              </div>

              {popupImage && (
                <div className="mb-5 relative">
                  <img
                    src={popupImage}
                    alt="popup preview"
                    className="w-full rounded-xl border border-gray-100 object-contain max-h-64"
                  />
                  <button
                    onClick={deleteImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )}

              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-violet-200 rounded-xl py-8 flex flex-col items-center gap-2 text-violet-400 hover:border-violet-400 hover:bg-violet-50 transition-all"
              >
                <Upload size={22} />
                <span className="text-sm font-semibold">{popupImage ? '이미지 교체하기' : '팝업 이미지 업로드'}</span>
                <span className="text-xs text-slate-400">JPG, PNG, GIF · 최대 5MB</span>
              </button>

              <p className="text-xs text-slate-400 text-center mt-4">
                업로드한 이미지는 홈 화면 팝업으로 자동 표시됩니다
              </p>
            </div>
          </div>
        )}

        {/* 문의 내역 */}
        {section === 'inquiries' && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">문의 내역</h2>
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 text-center">
              <MessageSquare size={36} className="text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Netlify API 연동 후 문의 내역이 표시됩니다</p>
              <p className="text-slate-300 text-xs mt-1">현재는 Netlify 대시보드에서 확인 가능합니다</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPage;
