import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../services/supabase';

const POPUP_WIDTH_DESKTOP = 378;
const POPUP_WIDTH_MOBILE = 252;
const MARGIN = 272; // LINE 버튼(48px) + 간격(224px)


const Popup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [appear, setAppear] = useState(false);
  const [image, setImage] = useState('');
  const [dontShow, setDontShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [initialized, setInitialized] = useState(false);

  const dragging = useRef(false);
  const startOffset = useRef({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  const isMobile = () => window.innerWidth < 768;

  useEffect(() => {
    const hideUntil = localStorage.getItem('popup_hide_until');
    if (hideUntil && new Date().getTime() < parseInt(hideUntil)) return;

    supabase
      .from('popup_settings')
      .select('active, image_url')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (data?.active && data?.image_url) {
          setImage(data.image_url);
          setVisible(true);
        }
      })
      .catch(() => {});
  }, []);

  // 우측 초기 위치 설정 후 fade-in
  useEffect(() => {
    if (visible && !initialized) {
      const w = isMobile() ? POPUP_WIDTH_MOBILE : POPUP_WIDTH_DESKTOP;
      const h = popupRef.current?.offsetHeight || 350;
      setPos({
        x: window.innerWidth - w - MARGIN,
        y: Math.max(MARGIN, (window.innerHeight - h) / 2),
      });
      setInitialized(true);
      setTimeout(() => setAppear(true), 50);
    }
  }, [visible, initialized]);

  const handleClose = () => {
    if (dontShow) {
      const tomorrow = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem('popup_hide_until', String(tomorrow));
    }
    setAppear(false);
    setTimeout(() => setVisible(false), 300);
  };

  // 마우스 드래그
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - startOffset.current.x, y: e.clientY - startOffset.current.y });
  }, []);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  // 터치 드래그
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    dragging.current = true;
    startOffset.current = { x: t.clientX - pos.x, y: t.clientY - pos.y };
  };

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!dragging.current) return;
    const t = e.touches[0];
    setPos({ x: t.clientX - startOffset.current.x, y: t.clientY - startOffset.current.y });
  }, []);

  const onTouchEnd = useCallback(() => { dragging.current = false; }, []);

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

  const mobile = isMobile();
  const popupWidth = mobile ? POPUP_WIDTH_MOBILE : POPUP_WIDTH_DESKTOP;

  if (mobile) {
    return (
      <div
        ref={popupRef}
        className="fixed z-[90] bg-white overflow-hidden shadow-2xl"
        style={{
          left: '50%',
          top: '50%',
          transform: appear ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.96)',
          width: popupWidth,
          opacity: appear ? 1 : 0,
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <img src={image} alt="공지 팝업" className="w-full object-contain select-none" draggable={false} />
        <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 border-t border-gray-100">
          <label className="flex items-center gap-1.5 text-[11px] text-gray-500 cursor-pointer select-none">
            <input type="checkbox" checked={dontShow} onChange={(e) => setDontShow(e.target.checked)} className="w-3 h-3 accent-violet-500" />
            이 창을 하루동안 열지 않습니다
          </label>
          <button onClick={handleClose} className="text-[11px] text-gray-500 hover:text-gray-800 font-semibold transition-colors cursor-pointer ml-2 shrink-0">
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={popupRef}
      className="fixed z-[90] bg-white overflow-hidden shadow-2xl"
      style={{
        left: pos.x,
        top: pos.y,
        width: popupWidth,
        opacity: appear ? 1 : 0,
        transform: appear ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        cursor: dragging.current ? 'grabbing' : 'auto',
      }}
    >
      <img
        src={image}
        alt="공지 팝업"
        className="w-full object-contain cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        draggable={false}
      />

      <div
        className="flex items-center justify-between px-3 py-2.5 bg-gray-50 border-t border-gray-100 cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <label
          className="flex items-center gap-1.5 text-[11px] text-gray-500 cursor-pointer select-none"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={dontShow}
            onChange={(e) => setDontShow(e.target.checked)}
            className="w-3 h-3 accent-violet-500"
          />
          이 창을 하루동안 열지 않습니다
        </label>
        <button
          onClick={handleClose}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="text-[11px] text-gray-500 hover:text-gray-800 font-semibold transition-colors cursor-pointer ml-2 shrink-0"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Popup;
