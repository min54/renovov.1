import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const groups = [
  { label: 'Skin Booster', labelKr: '스킨 부스터', ids: ['1', '2', '3', '23'] },
  { label: 'Lifting',      labelKr: '리프팅',       ids: ['4', '5', '6', '7', '8'] },
  { label: 'Removal',      labelKr: '제거',          ids: ['9', '10'] },
  { label: 'Filler',       labelKr: '필러',          ids: ['11', '12', '13'] },
  { label: 'Botox',        labelKr: '보톡스',        ids: ['14', '15', '16', '17', '18'] },
  { label: 'Skin Care',    labelKr: '피부 관리',     ids: ['19', '20', '21', '22'] },
];

function getGroup(id: string) {
  return groups.find(g => g.ids.includes(id));
}

interface Props {
  id: string;
  onBack: () => void;
}

const TreatmentPage: React.FC<Props> = ({ id, onBack }) => {
  const { t } = useLanguage();
  const item = (t.services.items as any)[id];
  const group = getGroup(id);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero — 메인과 동일한 배경 */}
      <div className="relative min-h-[55vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/main_visual.jpg"
            alt="Renovo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full container mx-auto px-6 max-w-4xl pt-28 pb-16">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-10 text-sm group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            시술 안내
          </button>

          {group && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-white bg-violet-500/80 px-3 py-1 rounded-full tracking-widest uppercase">
                {group.labelKr}
              </span>
              <span className="text-[10px] text-white/50 tracking-widest uppercase">{group.label}</span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl mb-5">
            {item?.title}
          </h1>

          {item?.price && (
            <span className="inline-flex items-center bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
              {item.price}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 max-w-3xl py-14">
        {item?.desc ? (
          <div
            className="treatment-content"
            dangerouslySetInnerHTML={{ __html: item.desc }}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-sm">어드민에서 내용을 입력해주세요.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default TreatmentPage;
