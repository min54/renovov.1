import React from 'react';
import { Sparkles, Instagram, Youtube, MapPin, Phone, Printer, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white">

      {/* 상단: 주요 정보 그리드 */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 max-w-6xl py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* 브랜드 */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="bg-violet-500 p-1.5 rounded-lg shadow-lg shadow-violet-500/30">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">BELLE AMIE RENOVO</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                {t.footer.desc}
              </p>
              {/* 소셜 */}
              <div className="flex gap-3 pt-1">
                <a
                  href="https://www.instagram.com/renovo_clinic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-violet-500 hover:border-violet-500 hover:text-white transition-all"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://www.youtube.com/@%ED%94%BC%EB%B6%80%EB%8A%94%ED%99%8D%EB%B6%80%EB%B6%80"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-violet-500 hover:border-violet-500 hover:text-white transition-all"
                >
                  <Youtube size={15} />
                </a>
              </div>
            </div>

            {/* 오시는 길 */}
            <div className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400">Location</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-violet-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/60 text-sm leading-relaxed">{t.contact.address}</p>
                    <p className="text-white/35 text-xs mt-0.5">홍대입구역 8번 출구</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-violet-400 flex-shrink-0" />
                  <p className="text-white/60 text-sm">02) 3141-4282~3</p>
                </div>
                <div className="flex items-center gap-3">
                  <Printer size={15} className="text-violet-400 flex-shrink-0" />
                  <p className="text-white/60 text-sm">02) 3141-4289</p>
                </div>
              </div>
            </div>

            {/* 진료 시간 & 메뉴 */}
            <div className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400">Hours</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-violet-400 flex-shrink-0" />
                  <div className="text-sm text-white/60 space-y-1">
                    <p>{t.contact.weekdays}</p>
                    <p>{t.contact.saturday}</p>
                    <p className="text-white/30">{t.contact.sunday}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">Menu</h4>
                <div className="flex flex-col gap-2 text-sm text-white/50">
                  <a href="#about" className="hover:text-violet-300 transition-colors">{t.footer.menu.about}</a>
                  <a href="#services" className="hover:text-violet-300 transition-colors">{t.footer.menu.services}</a>
                  <a href="#contact" className="hover:text-violet-300 transition-colors">{t.footer.menu.contact}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 사업자 정보 */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl py-6">
          <div className="flex flex-col gap-1.5 text-[11px] text-white/25">
            <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
              <span className="text-white/40 font-semibold">벨아미리노보의원</span>
              <span className="text-white/10">|</span>
              <span>대표자 : 박태훈</span>
              <span className="text-white/10">|</span>
              <span>사업자등록번호 : 849-10-01039</span>
            </div>
            <p className="text-white/15">
              &copy; {new Date().getFullYear()} BELLE AMIE RENOVO. All rights reserved.
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
