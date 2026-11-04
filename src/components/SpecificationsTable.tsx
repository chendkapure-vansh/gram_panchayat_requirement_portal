import React from 'react';
import { ProductSpecification } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SpecificationsTableProps {
  specifications: ProductSpecification[];
  modelCode?: string;
  warranty?: string;
  warrantyEn?: string;
}

export const SpecificationsTable: React.FC<SpecificationsTableProps> = ({
  specifications,
  modelCode,
  warranty,
  warrantyEn,
}) => {
  const { isMarathi, t } = useLanguage();

  if (!specifications || specifications.length === 0) {
    return (
      <div className="text-slate-500 text-sm italic py-2">
        {isMarathi ? 'तांत्रिक तपशील लवकरच जोडले जातील.' : 'Technical specifications will be updated shortly.'}
      </div>
    );
  }

  const warrantyDisplay = isMarathi ? warranty : (warrantyEn || warranty);

  return (
    <div className="overflow-hidden border border-slate-200 rounded shadow-none bg-white">
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
          {/* Dynamic specifications */}
          {specifications.map((spec, index) => {
            const label = isMarathi ? spec.label : (spec.labelEn || spec.label);
            const value = isMarathi ? spec.value : (spec.valueEn || spec.value);
            const isEven = index % 2 === 0;

            return (
              <tr
                key={index}
                className={`border-b border-slate-100 last:border-b-0 ${
                  isEven ? 'bg-white' : 'bg-slate-50/60'
                }`}
              >
                <td className="py-2.5 px-4 font-semibold text-slate-600 w-1/3 sm:w-2/5 border-r border-slate-100">
                  {label}
                </td>
                <td className="py-2.5 px-4 text-slate-900 font-medium">
                  {value}
                </td>
              </tr>
            );
          })}

          {warrantyDisplay && (
            <tr className="bg-amber-50/50 border-t border-slate-200">
              <td className="py-2.5 px-4 font-semibold text-amber-900 border-r border-slate-100">
                {t.warranty}
              </td>
              <td className="py-2.5 px-4 text-amber-950 font-medium">
                {warrantyDisplay}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
