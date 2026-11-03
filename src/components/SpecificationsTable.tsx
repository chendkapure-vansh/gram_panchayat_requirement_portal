import React from 'react';
import { ProductSpecification } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SpecificationsTableProps {
  specifications: ProductSpecification[];
  modelCode?: string;
  warranty?: string;
  warrantyEn?: string;
  makeInIndia?: boolean;
}

export const SpecificationsTable: React.FC<SpecificationsTableProps> = ({
  specifications,
  modelCode,
  warranty,
  warrantyEn,
  makeInIndia = true,
}) => {
  const { isMarathi, t } = useLanguage();

  if (!specifications || specifications.length === 0) {
    return (
      <div className="text-slate-500 text-sm italic py-2">
        {isMarathi ? 'तांत्रिक तपशील लवकरच जोडले जातील.' : 'Technical specifications will be updated shortly.'}
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm bg-white">
      <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 font-bold text-slate-800 text-sm flex items-center justify-between">
        <span>{t.specifications}</span>
        {modelCode && (
          <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">
            {modelCode}
          </span>
        )}
      </div>

      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <tbody>
          {/* Make in India status row */}
          <tr className="border-b border-slate-100 bg-emerald-50/40">
            <td className="py-2.5 px-4 font-semibold text-slate-700 w-1/3 sm:w-2/5">
              {isMarathi ? 'उत्पादन स्त्रोत' : 'Country of Origin'}
            </td>
            <td className="py-2.5 px-4 text-emerald-800 font-bold">
              {makeInIndia ? (isMarathi ? 'भारत (मेक इन इंडिया 🇮🇳)' : 'India (Make in India 🇮🇳)') : 'आयातित (Imported)'}
            </td>
          </tr>

          {/* Dynamic Brochure specifications */}
          {specifications.map((spec, index) => {
            const label = isMarathi ? spec.label : (spec.labelEn || spec.label);
            const value = isMarathi ? spec.value : (spec.valueEn || spec.value);
            const isEven = index % 2 === 0;

            return (
              <tr
                key={index}
                className={`border-b border-slate-100 last:border-0 ${isEven ? 'bg-white' : 'bg-slate-50/70'}`}
              >
                <td className="py-2.5 px-4 font-medium text-slate-600">
                  {label}
                </td>
                <td className="py-2.5 px-4 font-semibold text-slate-900">
                  {value}
                </td>
              </tr>
            );
          })}

          {/* Warranty row */}
          {(warranty || warrantyEn) && (
            <tr className="border-t border-slate-200 bg-amber-50/30">
              <td className="py-2.5 px-4 font-semibold text-slate-700">
                {t.warranty}
              </td>
              <td className="py-2.5 px-4 font-bold text-amber-900">
                {isMarathi ? (warranty || warrantyEn) : (warrantyEn || warranty)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
