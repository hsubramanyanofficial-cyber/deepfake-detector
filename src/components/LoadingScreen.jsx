import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing forensic engine...');

  useEffect(() => {
    const phases = [
      { time: 800, text: 'Extracting deep spatial features...' },
      { time: 2000, text: 'Isolating high-frequency noise vectors...' },
      { time: 3500, text: 'Cross-referencing face-swap topologies...' },
      { time: 5000, text: 'Evaluating lip sync and temporal latencies...' },
      { time: 6500, text: 'Generating precision bounding matrices...' },
      { time: 7500, text: 'Finalizing forensic report...' }
    ];

    let timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 1.25;
      });
    }, 100);

    const timeouts = phases.map(phase => 
      setTimeout(() => setStatus(phase.text), phase.time)
    );

    const completeTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 8000);

    return () => {
      clearInterval(timer);
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-surface-container-highest/90 backdrop-blur-xl rounded-xl overflow-hidden">
      {/* High-tech scanning visuals */}
      <div className="relative w-48 h-48 mb-12">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute inset-2 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>
        <div className="absolute inset-6 border-4 border-b-secondary border-t-transparent border-r-transparent border-l-transparent opacity-80 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
        <div className="absolute inset-0 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-6xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>troubleshoot</span>
        </div>
      </div>

      <div className="w-full max-w-md px-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-headline font-bold text-on-surface text-center">Processing Media</h2>
        <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/20">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-container transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]"></div>
          </div>
        </div>
        <div className="flex justify-between w-full text-xs font-mono text-outline-variant uppercase tracking-widest">
          <span>{status}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
