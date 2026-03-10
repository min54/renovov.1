import React from 'react';

const LINE_URL = 'https://lin.ee/nKkSSBm';

const LineButton: React.FC = () => {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[80] flex flex-col items-center justify-center gap-1"
      style={{ filter: 'drop-shadow(-2px 2px 6px rgba(0,0,0,0.25))' }}
    >
      <div className="bg-[#06C755] hover:bg-[#05b34c] transition-colors duration-200 px-2 py-4 rounded-l-xl flex flex-col items-center gap-2">
        {/* LINE 로고 SVG */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 3C9.373 3 4 7.925 4 14c0 3.678 2.052 6.944 5.25 9.07-.231.863-.746 2.788-.853 3.22-.132.533.195.526.41.383.168-.113 2.676-1.817 3.757-2.554A14.1 14.1 0 0016 24.5c6.627 0 12-4.925 12-11S22.627 3 16 3z"
            fill="white"
          />
          <path
            d="M21.5 17.25h-3.75v-5.5a.75.75 0 00-1.5 0v6.25c0 .414.336.75.75.75H21.5a.75.75 0 000-1.5zM11.25 11.75a.75.75 0 00-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5a.75.75 0 00-.75-.75zM13.75 11.75a.75.75 0 00-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5a.75.75 0 00-.75-.75zM13 14.25h2.5a.75.75 0 000-1.5H13a.75.75 0 000 1.5zM13 17.25h2.5a.75.75 0 000-1.5H13a.75.75 0 000 1.5z"
            fill="#06C755"
          />
        </svg>
        <span className="text-white text-[11px] font-bold tracking-wide" style={{ writingMode: 'vertical-rl' }}>
          LINE 상담
        </span>
      </div>
    </a>
  );
};

export default LineButton;
