import { useState, useEffect } from 'react';

export default function ForensicMap() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const worldNodes = [
      { x: 25, y: 35, label: 'NA-NODE-01', risk: 'LOW' },
      { x: 45, y: 40, label: 'EU-NODE-04', risk: 'HIGH' },
      { x: 75, y: 55, label: 'AS-NODE-09', risk: 'MEDIUM' },
      { x: 35, y: 75, label: 'SA-NODE-02', risk: 'LOW' },
      { x: 65, y: 80, label: 'AU-NODE-03', risk: 'MEDIUM' }
    ];
    setNodes(worldNodes);
  }, []);

  return (
    <div className="w-full h-full relative bg-surface-container-lowest/50 rounded-xl overflow-hidden border border-white/5 neural-bg">
      {/* Simulated Map SVG Background */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 400" fill="none" stroke="currentColor">
        <path d="M150 100 Q 200 80, 250 120 T 350 100 T 450 140 T 550 110 T 650 130" strokeWidth="2" />
        <path d="M100 200 Q 200 220, 300 180 T 500 210 T 700 190" strokeWidth="2" />
        <circle cx="400" cy="200" r="150" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Global Threat Nodes */}
      {nodes.map((node, i) => (
        <div 
          key={i}
          className="map-node animate-ping-node group cursor-help"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[6px] font-bold border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            <span className={node.risk === 'HIGH' ? 'text-error' : 'text-primary'}>
              {node.label} [{node.risk}]
            </span>
          </div>
        </div>
      ))}

      {/* Map Stats HUD */}
      <div className="absolute top-4 right-4 text-right font-mono text-[8px] text-outline-variant space-y-1">
        <div>GLOBAL_THREAT_INDEX: <span className="text-error">0.42</span></div>
        <div>ACTIVE_NODES: 5</div>
        <div>SCAN_INTERVAL: 1.2s</div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Live Global Forensics</span>
      </div>
    </div>
  );
}
