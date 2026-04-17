import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const groupIds = [
  ['1', '2', '3', '23'],
  ['4', '24', '5', '6', '7', '8'],
  ['14', '15', '16', '17', '18'],
  ['11', '12', '13'],
  ['9', '10'],
  ['19', '20', '21', '22'],
];

interface Props {
  onTreatmentSelect: (id: string) => void;
}

const TreatmentList: React.FC<Props> = ({ onTreatmentSelect }) => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-16 lg:py-36 bg-[#fafafa]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10 max-w-6xl">

        {/* Header */}
        <FadeIn className="text-center mb-10 lg:mb-20">
          <span className="text-[10px] font-bold text-violet-500 tracking-[0.4em] uppercase">{t.services.badge}</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mt-3 mb-4 leading-tight">
            {t.services.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed font-light">
            {t.services.desc}
          </p>
        </FadeIn>

        {/* 리스트 */}
        <div className="flex flex-col divide-y divide-violet-100">
          {(t as any).serviceGroups.map((group: any, i: number) => {
            const items = groupIds[i].map((id) => ({
              id,
              ...(t.services.items as any)[id],
            }));

            return (
              <FadeIn key={group.label} delay={i * 80} direction="left">

                {/* 모바일: 세로 / 데스크탑: 가로 */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14 py-6 lg:py-9 gap-4">

                  {/* 카테고리명 */}
                  <div className="lg:w-44 lg:flex-shrink-0 flex lg:block items-center gap-3">
                    <p className="text-[10px] font-bold text-violet-400 tracking-[0.3em] uppercase hidden lg:block mb-1">
                      {group.label}
                    </p>
                    <p className="text-base lg:text-xl font-bold text-violet-600">{group.labelNative}</p>
                    <span className="lg:hidden text-[10px] font-bold text-violet-300 tracking-widest uppercase">{group.label}</span>
                  </div>

                  {/* 구분선 - 데스크탑만 */}
                  <div className="hidden lg:block w-px h-10 bg-violet-100 flex-shrink-0" />

                  {/* 시술 버튼 */}
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onTreatmentSelect(item.id)}
                        className="rounded-full px-4 py-2 lg:px-7 lg:py-3.5 border border-violet-100 bg-white
                          text-sm lg:text-base font-semibold text-slate-700
                          hover:bg-violet-500 hover:text-white hover:border-violet-500
                          transition-all duration-200"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>

                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TreatmentList;
