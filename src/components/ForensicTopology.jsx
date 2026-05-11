import { useState, useEffect } from 'react';

export default function ForensicTopology({ isFake, type }) {
  const [activeMarkers, setActiveMarkers] = useState([]);
  const [dataStreams, setDataStreams] = useState({ hex: [], binary: [] });
  
  // Generate random markers for synthetic results to simulate "detection nodes"
  useEffect(() => {
    if (isFake) {
      const markers = [
        { x: 35, y: 42, size: 80, label: 'Pixel Inconsistency' },
        { x: 62, y: 55, size: 120, label: 'Frequency Mismatch' },
        { x: 48, y: 72, size: 60, label: 'Artifact Cluster' }
      ];
      setActiveMarkers(markers);
    }

    // Initialize static data streams
    setDataStreams({
      hex: Array.from({ length: 20 }).map(() => Math.random().toString(16).substring(2, 6)),
      binary: Array.from({ length: 15 }).map(() => Math.random().toString(2).substring(2, 6))
    });
  }, [isFake]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-surface-container-lowest topological-grid rounded-xl border border-white/5">
      {/* Neural Network Layer */}
      <div className="absolute inset-0 neural-bg animate-neural opacity-10"></div>
      
      {/* Dynamic Mesh Layer */}
      <div className="forensic-mesh animate-pulse-mesh opacity-20"></div>
      
      {/* Scanning Laser */}
      <div className="forensic-scan"></div>
      
      {/* Data Streams (Simulated binary/hex data) */}
      <div className="absolute left-4 top-1/4 h-1/2 w-8 data-stream hidden md:block opacity-30 select-none">
        {dataStreams.hex.map((val, i) => (
          <div key={i} className="mb-1">{val}</div>
        ))}
      </div>
      <div className="absolute right-4 top-1/3 h-1/3 w-8 data-stream hidden md:block opacity-30 text-right select-none">
        {dataStreams.binary.map((val, i) => (
          <div key={i} className="mb-1">{val}</div>
        ))}
      </div>

      {/* Forensic Markers */}
      {isFake && activeMarkers.map((marker, idx) => (
        <div 
          key={idx}
          className="absolute group z-40"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          {/* Pulsing Target */}
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border-2 border-error/50 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-error rounded-full shadow-[0_0_10px_rgba(255,82,82,0.8)]"></div>
            
            {/* HUD Label */}
            <div className="absolute top-4 left-4 bg-error/90 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-on-error uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/20 glitch-hover">
              {marker.label} [V-NODE {idx + 1}]
            </div>
            
            {/* Tracking Lines */}
            <div className="absolute h-px w-32 bg-gradient-to-r from-error/40 to-transparent top-0 left-2 origin-left rotate-45 opacity-20"></div>
          </div>
        </div>
      ))}

      {/* Central HUD Info */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-48 h-48 border-[1px] border-primary/10 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 border-[1px] border-primary/5 rounded-full animate-spin [animation-duration:10s]"></div>
          <div className="absolute inset-4 border-t-2 border-primary/40 rounded-full animate-spin [animation-duration:3s]"></div>
          
          <div className="text-center">
            <div className={`text-[10px] font-bold font-mono tracking-widest ${isFake ? 'text-error' : 'text-primary'}`}>
              {isFake ? 'DETECTION_HIGH' : 'SCAN_PASS'}
            </div>
            <div className="text-[8px] text-on-surface-variant font-mono opacity-50">
              {type?.toUpperCase() || 'VIDEO'}_LAYER_01
            </div>
          </div>
        </div>
      </div>
      
      {/* Metadata Readout */}
      <div className="absolute bottom-4 left-4 z-20 font-mono text-[9px] text-primary/60 space-y-1 bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/5">
        <div>LAT: 40.7128 N</div>
        <div>LNG: 74.0060 W</div>
        <div>SIG: ENCRYPTED</div>
      </div>
    </div>
  );
}
