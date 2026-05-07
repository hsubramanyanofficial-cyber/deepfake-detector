import { memo } from 'react';

const ResultCard = memo(function ResultCard({
  title,
  score,
  isFake,
  details
}) {
  const colorClass = isFake ? 'text-error border-error/50 bg-error/10' : 'text-primary border-primary/50 bg-primary/10';
  const icon = isFake ? 'warning' : 'verified_user';

  return (
    <div className={`p-6 rounded-2xl border ${isFake ? 'border-error/20' : 'border-primary/20'} bg-surface-container-low flex flex-col gap-6`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-headline font-bold text-on-surface">{title}</h3>
          <p className="text-sm text-on-surface-variant font-mono">Confidence Score Analysis</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        </div>
      </div>

      <div className="flex items-end gap-3 border-b border-outline-variant/20 pb-6">
        <span className={`text-6xl font-headline font-bold leading-none ${isFake ? 'text-error' : 'text-primary'}`}>
          {score}%
        </span>
        <span className="text-on-surface-variant font-bold uppercase tracking-widest text-sm mb-1">
          {isFake ? 'Synthetic' : 'Authentic'}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold text-outline-variant uppercase tracking-widest">Forensic Breakdown</h4>
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between items-center bg-surface-container rounded-lg p-3">
            <span className="text-sm font-medium text-on-surface">{detail.label}</span>
            <div className="flex items-center gap-3">
               <span className="text-xs font-mono text-outline-variant">{detail.value}%</span>
              <div className="w-16 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${detail.alert ? 'bg-error' : 'bg-primary'}`} 
                  style={{ width: `${detail.value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ResultCard;
