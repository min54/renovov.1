import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  onOpenAdmin: () => void;
  onTreatmentSelect: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateLocation: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenAdmin, onTreatmentSelect, onNavigateHome, onNavigateLocation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about', isHome: true, isLocation: false },
    { name: t.nav.services, href: '#services', isHome: false, isLocation: false },
    { name: t.nav.contact, href: '#contact', isHome: false, isLocation: true },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-violet-500 shadow-lg py-2.5' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        <button onClick={onNavigateHome} className={`text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-white`}>
          RENOVO <span className={isScrolled ? 'text-violet-100' : 'text-violet-600'}>HONGDAE</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <div className="flex gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.href === '#services' && setServicesDropdownOpen(true)}
                onMouseLeave={() => link.href === '#services' && setServicesDropdownOpen(false)}
              >
                <a
                  href={link.isLocation ? undefined : link.href}
                  onClick={link.isHome ? onNavigateHome : link.isLocation ? onNavigateLocation : undefined}
                  className={`flex items-center gap-1 text-xs lg:text-sm font-medium transition-colors tracking-wide whitespace-nowrap py-2 text-white/90 hover:text-white cursor-pointer`}
                >
                  {link.name}
                  {link.href === '#services' && <ChevronDown size={14} className={`transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />}
                </a>

                {link.href === '#services' && (
                  <div className={`absolute left-0 mt-0 w-64 bg-white/95 backdrop-blur-xl border border-violet-100 rounded-2xl shadow-2xl transition-all duration-300 origin-top-left ${servicesDropdownOpen ? 'opacity-100 scale-100 translate-y-2 visible' : 'opacity-0 scale-95 translate-y-0 invisible'}`}>
                    <div className="p-4 grid gap-1">
                      {Object.entries(t.services.items).map(([key, item]: [string, any]) => (
                        <button
                          key={key}
                          onClick={() => { setServicesDropdownOpen(false); onTreatmentSelect(key); }}
                          className="px-4 py-2.5 rounded-xl text-xs text-slate-600 hover:text-violet-700 hover:bg-violet-50 transition-all flex flex-col text-left w-full"
                        >
                          <span className="font-bold text-[11px] text-violet-600 mb-0.5">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Language Switcher */}
          <div className={`flex items-center gap-2 border-l pl-6 h-4 border-white/20`}>
            {(['KR', 'EN', 'JP'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-all ${language === lang
                  ? 'bg-white text-violet-600 border-white'
                  : 'border-white/20 text-white/60 hover:border-white hover:text-white'
                  }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <a href="#reservation" className={`${isScrolled ? 'bg-white text-violet-600' : 'bg-violet-600 text-white'} px-5 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-all shadow-lg`}>
            {t.nav.book}
          </a>
          <a
            href="/admin"
            className="w-5 h-5 opacity-0 cursor-default"
            aria-hidden="true"
            tabIndex={-1}
          />

        </div>

        {/* 모바일: 전화 + 햄버거 */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="tel:0231414282"
            className="flex items-center gap-1.5 bg-violet-500 hover:bg-violet-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md active:scale-95 transition-all"
          >
            <Phone size={13} />
            전화
          </a>
          <button
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950 md:hidden flex flex-col">

          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
            <span className="text-white font-bold tracking-tighter text-lg">RENOVO <span className="text-violet-400">HONGDAE</span></span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* 언어 선택 */}
          <div className="px-6 py-4 border-b border-white/10">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-3">Language</p>
            <div className="flex gap-2">
              {(['KR', 'EN', 'JP'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                    language === lang
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* 시술 리스트 */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">{t.nav.services}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(t.services.items).map(([key, item]: [string, any]) => (
                <button
                  key={key}
                  onClick={() => { setMobileMenuOpen(false); onTreatmentSelect(key); }}
                  className="p-4 bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/40 rounded-2xl text-left transition-all active:scale-95"
                >
                  <span className="text-white text-[13px] font-semibold leading-snug line-clamp-2">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 하단 링크 */}
          <div className="px-6 py-5 border-t border-white/10 flex gap-3">
            <button
              onClick={() => { onNavigateHome(); setMobileMenuOpen(false); }}
              className="flex-1 py-3 rounded-2xl bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => { onNavigateLocation(); setMobileMenuOpen(false); }}
              className="flex-1 py-3 rounded-2xl bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {t.nav.contact}
            </button>
            <a
              href="#reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-3 rounded-2xl bg-violet-500 text-white text-sm font-bold text-center hover:bg-violet-600 transition-colors"
            >
              {t.nav.book}
            </a>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navigation;