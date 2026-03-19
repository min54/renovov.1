import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VIDEOS = [
  { id: 'n0hrNhLeE8o', title: '"위고비 했더니... 5년 늙어 보인다고요?" 다이어트 부작용' },
  { id: 'Z9p3mnQ8P2c', title: '손에서 피나는 진짜 이유? 건조 아닙니다. #손톱뜯기' },
  { id: '6faDBtJBVU4', title: '"앞머리 왜 비는지 아세요? 당신 손 때문입니다." #앞머리탈모' },
  { id: 'DkK3tJoRGcU', title: '"여드름 폭탄의 진짜 원인 (지금도 만지고 있죠?)"' },
  { id: '2TvVRQWir1M', title: '한일커플 결혼하는 고객을 위한 선물 준비했어요' },
  { id: 'EfZkKMabjn8', title: '"모공 안 보이는 남자피부 비결? 이거 하나면 끝!"' },
];

const VISIBLE = 4;
const INTERVAL = 3000;

const YoutubeSection: React.FC = () => {
  const { t } = useLanguage();
  const [startIndex, setStartIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setStartIndex(i => (i + 1 >= VIDEOS.length - VISIBLE + 1 ? 0 : i + 1));
    }, INTERVAL);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const prev = () => {
    setStartIndex(i => (i - 1 < 0 ? VIDEOS.length - VISIBLE : i - 1));
    resetTimer();
  };

  const next = () => {
    setStartIndex(i => (i + 1 >= VIDEOS.length - VISIBLE + 1 ? 0 : i + 1));
    resetTimer();
  };

  const visibleVideos = VIDEOS.slice(startIndex, startIndex + VISIBLE);
  const isMobile = () => window.innerWidth < 768;

  const handleVideoClick = (videoId: string) => {
    if (isMobile()) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    } else {
      setPlayingId(playingId === videoId ? null : videoId);
    }
  };

  return (
    <section className="relative bg-slate-950 py-24 overflow-hidden">
      {/* 배경 글로우 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col items-center text-center">
        {/* 라벨 */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full mb-6">
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></span>
          <span className="text-violet-300 text-sm font-semibold tracking-widest uppercase">{t.youtube.label}</span>
        </div>

        {/* 타이틀 */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {t.youtube.title1}<br />
          <span className="text-violet-400">{t.youtube.title2}</span>
        </h2>
        <p className="text-slate-400 text-lg mb-12 max-w-xl font-light">
          {t.youtube.desc}
        </p>

        {/* 메인 유튜브 영상 */}
        <div className="w-full rounded-3xl overflow-hidden shadow-2xl shadow-violet-900/40 border border-white/10 mb-16">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/oTrm1VWFrhA?rel=0&modestbranding=1"
              title="레노보홍 피부과 소개"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* 인기동영상 섹션 */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white tracking-tight">
              <span className="text-violet-400">{t.youtube.popular}</span>
            </h3>
            <div className="flex gap-2">
              <button onClick={prev} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-violet-500 hover:border-violet-500 transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-violet-500 hover:border-violet-500 transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* 카드 슬라이더 */}
          <div className="grid grid-cols-4 gap-3">
            {visibleVideos.map((video) => (
              <div key={video.id} className="flex flex-col gap-2 text-left group cursor-pointer" onClick={() => handleVideoClick(video.id)}>
                {/* 썸네일 또는 플레이어 */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/40 transition-transform group-hover:scale-[1.03]" style={{ paddingBottom: '56.25%' }}>
                  {playingId === video.id ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* 오버레이 */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all"></div>
                      {/* 플레이 버튼 */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/90 group-hover:bg-violet-500 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                          <Play size={16} className="text-slate-900 group-hover:text-white ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* 제목 */}
                <p className="text-white/80 text-xs font-medium leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors px-0.5">
                  {video.title}
                </p>
              </div>
            ))}
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-6">
            {VIDEOS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setStartIndex(Math.min(idx, VIDEOS.length - VISIBLE)); resetTimer(); }}
                className={`h-1.5 rounded-full transition-all ${
                  idx >= startIndex && idx < startIndex + VISIBLE
                    ? 'bg-violet-400 w-5'
                    : 'bg-white/20 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeSection;
