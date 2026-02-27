import React, { useState, useEffect, useRef, useCallback } from 'react';

const Popup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const [dontShow, setDontShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);

  const dragging = useRef(false);
  const startOffset = useRef({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

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

  // 팝업 중앙 초기 위치 설정
  useEffect(() => {
    if (visible && !initialized && popupRef.current) {
      const w = popupRef.current.offsetWidth || 320;
      const h = popupRef.current.offsetHeight || 400;
      setPos({
        x: Math.max(0, (window.innerWidth - w) / 2),
        y: Math.max(0, (window.innerHeight - h) / 2),
      });
      setInitialized(true);
    }
  }, [visible, initialized]);

  const handleClose = () => {
    if (dontShow) {
      const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem('popup_hide_until', String(tomorrow));
    }
    setVisible(false);
  };

  // 마우스 드래그
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;
    const newX = e.clientX - startOffset.current.x;
    const newY = e.clientY - startOffset.current.y;
    setPos({ x: newX, y: newY });
  }, []);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // 터치 드래그 (모바일)
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragging.current = true;
    startOffset.current = { x: touch.clientX - pos.x, y: touch.clientY - pos.y };
  };

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!dragging.current) return;
    const touch = e.touches[0];
    const newX = touch.clientX - startOffset.current.x;
    const newY = touch.clientY - startOffset.current.y;
    setPos({ x: newX, y: newY });
  }, []);

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  if (!visible || !image) return null;

  return (
    <div
      ref={popupRef}
      className="fixed z-[90] bg-white rounded-2xl overflow-hidden shadow-2xl"
      style={{
        left: pos.x,
        top: pos.y,
        width: 'min(320px, 90vw)',
        cursor: dragging.current ? 'grabbing' : 'auto',
      }}
    >
      {/* 드래그 핸들 */}
      <div
        className="flex items-center justify-center py-2 bg-slate-800 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className="flex gap-1">
          <span className="w-6 h-0.5 bg-white/40 rounded-full" />
          <span className="w-6 h-0.5 bg-white/40 rounded-full" />
          <span className="w-6 h-0.5 bg-white/40 rounded-full" />
        </div>
      </div>

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
  );
};

export default Popup;
