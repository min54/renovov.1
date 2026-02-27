import React, { useState, useEffect } from 'react';

const Popup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    const active = localStorage.getItem('popup_active') === 'true';
    const img = localStorage.getItem('popup_image') || '';
    const hideUntil = localStorage.getItem('popup_hide_until');

    if (active && img) {
      if (hideUntil && new Date().getTime() < parseInt(hideUntil)) {
        return;
      }
      setImage(img);
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShow) {
      const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem('popup_hide_until', String(tomorrow));
    }
    setVisible(false);
  };

  if (!visible || !image) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm">
        <img src={image} alt="공지 팝업" className="w-full object-contain" />
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
          <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="w-3.5 h-3.5 accent-violet-500"
            />
            이 창을 하루동안 열지 않습니다
          </label>
          <button
            onClick={handleClose}
            className="text-xs text-gray-500 hover:text-gray-800 font-semibold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
