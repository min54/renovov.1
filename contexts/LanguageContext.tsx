import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../constants/translations';

type Language = 'KR' | 'EN' | 'JP';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.KR;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getServiceOverrides(): Record<string, { title: string; desc: string }> {
    try {
        const saved = localStorage.getItem('serviceItems');
        return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const browserLang = navigator.language || '';
        if (browserLang.startsWith('ja')) return 'JP';
        return 'KR';
    });
    const [serviceOverrides, setServiceOverrides] = useState(getServiceOverrides);

    useEffect(() => {
        const handler = () => setServiceOverrides(getServiceOverrides());
        window.addEventListener('storage', handler);
        window.addEventListener('serviceItemsUpdated', handler);
        return () => {
            window.removeEventListener('storage', handler);
            window.removeEventListener('serviceItemsUpdated', handler);
        };
    }, []);

    const base = translations[language];
    const mergedItems = language === 'KR'
        ? Object.fromEntries(
            Object.entries(base.services.items).map(([key, item]) => [
                key,
                serviceOverrides[key] ? { ...item, ...serviceOverrides[key] } : item
            ])
          )
        : base.services.items;

    const t = {
        ...base,
        services: {
            ...base.services,
            items: mergedItems as typeof base.services.items
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
