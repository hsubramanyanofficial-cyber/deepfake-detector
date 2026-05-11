import { useState, useEffect } from 'react';

const LOG_LINES = [
  "Initializing Forensic Engine v4.2...",
  "Loading spatial weights [RESNET-101]",
  "Establishing secure memory buffer",
  "Target signature detected: SHA-256 verified",
  "Analyzing frequency domain artifacts",
  "Scanning facial topology mesh",
  "Detecting lip-sync desynchronization",
  "Cross-referencing metadata timestamps",
  "Spatial variance analysis in progress",
  "Checking for JPEG double compression",
  "Biometric consistency check: PASSED",
  "Neural link established with cluster 09",
  "Rendering topological heatmap...",
  "Anomaly detected at frame 1042",
  "Calculating confidence vector...",
  "Verification complete. Generating report."
];

export default function ForensicConsole() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const updated = [...prev, LOG_LINES[current % LOG_LINES.length]];
        return updated.length > 10 ? updated.slice(1) : updated;
      });
      current++;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-4 font-mono text-[10px] text-primary/70 h-full overflow-hidden relative">
      <div className="absolute top-2 right-4 flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
      </div>
      <div className="flex flex-col gap-1 log-stream">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="opacity-40">[{new Date().toLocaleTimeString()}]</span>
            <span className={log.includes('Anomaly') || log.includes('error') ? 'text-error font-bold' : ''}>
              {log}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
