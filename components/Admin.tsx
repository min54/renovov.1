import React, { useState, useRef } from 'react';
import { X, Upload, Eye, EyeOff, Trash2 } from 'lucide-react';

const ADMIN_ID = '1';
const ADMIN_PW = '1';

const Admin: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [popupImage, setPopupImage] = useState<string>(localStorage.getItem('popup_image') || '');
  const [popupActive, setPopupActive] = useState(localStorage.getItem('popup_active') === 'true');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('아이디 또는 비밀번호가 틀렸습니다.');
    }
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

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-slate-800 text-sm">관리자 페이지</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {!loggedIn ? (
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <p className="text-xs text-slate-400 text-center mb-2">관리자 로그인</p>
            <div>
              <label className="text-xs text-slate-500 mb-1 block font-medium">아이디</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block font-medium">비밀번호</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-violet-600 transition-colors"
            >
              로그인
            </button>
          </form>
        ) : (
          <div className="p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-700">팝업 이미지 관리</h3>
                {popupImage && (
                  <button
                    onClick={togglePopup}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                      popupActive
                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {popupActive ? <Eye size={12} /> : <EyeOff size={12} />}
                    {popupActive ? '표시 중' : '숨김'}
                  </button>
                )}
              </div>

              {popupImage && (
                <div className="mb-4 relative">
                  <img
                    src={popupImage}
                    alt="popup preview"
                    className="w-full rounded-xl border border-gray-100 object-contain max-h-52"
                  />
                  <button
                    onClick={deleteImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-violet-200 rounded-xl py-7 flex flex-col items-center gap-2 text-violet-400 hover:border-violet-400 hover:bg-violet-50 transition-all"
              >
                <Upload size={22} />
                <span className="text-xs font-semibold">
                  {popupImage ? '이미지 교체하기' : '팝업 이미지 업로드'}
                </span>
                <span className="text-[10px] text-slate-400">JPG, PNG, GIF · 최대 5MB</span>
              </button>
            </div>

            {popupImage && (
              <p className="text-[10px] text-slate-400 text-center">
                이미지 업로드 시 팝업이 자동으로 활성화됩니다
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
