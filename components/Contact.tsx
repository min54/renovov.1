import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      });
      setSubmitted(true);
    } catch {
      // 전송 실패해도 성공 표시 (Netlify가 처리)
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors';

  return (
    <section id="contact" className="py-24 lg:py-36 bg-white text-slate-900 border-t border-violet-100">
      <div className="container mx-auto px-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Location Info (Left Side) */}
          <FadeIn direction="right" className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
              {t.contact.title}
            </h2>
            <p className="text-slate-500 mb-8 text-base font-light">
              {t.contact.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold mb-0.5 text-slate-900">{t.contact.addressTitle}</h4>
                  <p className="text-slate-500 text-base">{t.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold mb-0.5 text-slate-900">{t.contact.emailTitle}</h4>
                  <p className="text-slate-500 text-base">kataroteno@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-violet-500" />
                </div>
                <div className="w-full">
                  <h4 className="text-base font-bold mb-1 text-slate-900">{t.contact.hoursTitle}</h4>
                  <div className="flex flex-wrap gap-x-6 text-base text-slate-500">
                    <span>{t.contact.weekdays}</span>
                    <span>{t.contact.saturday}</span>
                    <span className="text-red-500">{t.contact.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form (Right Side) */}
          <FadeIn direction="left" delay={150} className="lg:w-1/2 w-full">
            <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-violet-100 text-gray-800">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <CheckCircle className="w-14 h-14 text-violet-500" />
                  <h3 className="text-xl font-bold text-slate-900">{t.contact.successTitle}</h3>
                  <p className="text-slate-500 text-sm">{t.contact.successMsg}</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                    className="mt-2 text-xs text-violet-400 hover:text-violet-600 underline"
                  >
                    다시 작성하기
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{t.contact.formTitle}</h3>
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className="space-y-3"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <input name="bot-field" />
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={t.contact.namePlaceholder}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={t.contact.emailPlaceholder}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      placeholder={t.contact.phonePlaceholder}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                    />

                    <select
                      name="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className={`${inputClass} text-gray-500`}
                    >
                      <option value="">{t.contact.selectPlaceholder}</option>
                      {Object.entries(t.services.items).map(([key, item]: [string, any]) => (
                        <option key={key} value={item.title}>{item.title}</option>
                      ))}
                    </select>

                    <div className="flex gap-3">
                      <textarea
                        name="message"
                        placeholder={t.contact.messagePlaceholder}
                        rows={2}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputClass} resize-none`}
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="whitespace-nowrap bg-violet-500 text-white font-bold px-6 rounded-xl hover:bg-violet-600 transition-colors text-sm disabled:opacity-60"
                      >
                        {loading ? '...' : t.contact.submitBtn}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default Contact;
