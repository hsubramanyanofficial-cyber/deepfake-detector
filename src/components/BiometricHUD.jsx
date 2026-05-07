import { useState, useEffect } from 'react';

export default function BiometricHUD() {
  const [landmarks, setLandmarks] = useState([]);

  useEffect(() => {
    // Generate random biometric landmarks for simulation
    const points = Array.from({ length: 12 }).map(() => ({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      id: Math.random().toString(36).substring(7)
    }));
    setLandmarks(points);
  }, []);

  return (
    <div className="absolute inset-0 z-40 pointer-events-none">
      {/* Face Scan Oval */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 face-scan-overlay"></div>
      
      {/* Radar Pings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 radar-circle"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 radar-circle [animation-delay:1s]"></div>
      
      {/* Biometric Landmark Points */}
      {landmarks.map((point) => (
        <div 
          key={point.id}
          className="biometric-point"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          <div className="absolute -top-4 -left-4 text-[6px] font-mono text-primary opacity-50">
            P-{point.id.toUpperCase()}
          </div>
          {/* Tracking Lines connecting to center */}
          <div className="absolute h-[1px] bg-primary/20 origin-left" style={{ 
            width: '20px', 
            transform: `rotate(${Math.random() * 360}deg)` 
          }}></div>
        </div>
      ))}

      {/* Identity Label */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur-md border border-primary/40 px-3 py-1 rounded-full flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
        <span className="text-[8px] font-bold text-primary tracking-[0.2em] uppercase">Identity Analysis In-Progress</span>
      </div>
    </div>
  );
}
