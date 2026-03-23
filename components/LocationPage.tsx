import React from 'react';
import { MapPin, Clock, Train, Bus, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

interface Props {
  onBack: () => void;
}

const LocationPage: React.FC<Props> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white pt-20">

      {/* 상단 헤더 */}
      <div className="bg-[#fafafa] border-b border-violet-100 py-12">
        <div className="container mx-auto px-10 max-w-6xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-500 transition-colors mb-6"
          >
            <ChevronLeft size={16} />
            홈으로
          </button>
          <FadeIn>
            <span className="text-[10px] font-bold text-violet-500 tracking-[0.4em] uppercase block mb-3">Location</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t.contact.title}
            </h1>
            <p className="text-base text-slate-500 font-light">{t.contact.subtitle}</p>
          </FadeIn>
        </div>
      </div>

      {/* 구글 지도 */}
      <FadeIn direction="none">
        <div className="w-full" style={{ height: '480px' }}>
          <iframe
            title="Renovo Hongdae Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325.3473297234865!2d126.91987588346038!3d37.55459106661126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98db6f673a47%3A0x9e8f6a696992a768!2z7ISc7Jq47Yq567OE7IucIOuniO2PrOq1rCDslpHtmZTroZwgMTIzIDXsuLU!5e0!3m2!1sko!2skr!4v1772121855697!5m2!1sko!2skr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </FadeIn>

      {/* 정보 섹션 */}
      <div className="container mx-auto px-10 max-w-6xl py-20">
        <div className="grid md:grid-cols-3 gap-10">

          {/* 주소 */}
          <FadeIn delay={0}>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{t.contact.addressTitle}</h3>
                <p className="text-slate-500 text-base leading-relaxed">{t.contact.address}</p>
              </div>
            </div>
          </FadeIn>

          {/* 진료 시간 */}
          <FadeIn delay={100}>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{t.contact.hoursTitle}</h3>
                <div className="space-y-1 text-base text-slate-500">
                  <p>{t.contact.hours1}</p>
                  <p>{t.contact.hours2}</p>
                  <p>{t.contact.saturday}</p>
                  <p className="text-red-400">{t.contact.sunday}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 찾아오는 길 */}
          <FadeIn delay={200}>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                  <Train className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">지하철</h3>
                  <p className="text-slate-500 text-base">2호선 홍대입구역 9번 출구<br />도보 3분</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                  <Bus className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">버스</h3>
                  <p className="text-slate-500 text-base">홍대입구역 정류장 하차<br />도보 5분</p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>

    </div>
  );
};

export default LocationPage;
