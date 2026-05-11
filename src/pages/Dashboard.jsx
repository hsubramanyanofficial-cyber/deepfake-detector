import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ForensicMap from '../components/ForensicMap';

export default function Dashboard() {
  const navigate = useNavigate();
  const { recentScans, isLoading } = useAuth();
  
  const fakesCount = recentScans.filter(s => s.status === 'Synthetic').length;

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-8 py-12 flex flex-col gap-10">

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-headline font-bold text-on-surface">Dashboard</h1>
          <p className="text-on-surface-variant mt-2 font-light">Overview of your recent forensic analyses and system metrics.</p>
        </div>
        <button 
          onClick={() => navigate('/detect')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-on-primary font-bold shadow-lg shadow-primary-container/20 hover:-translate-y-0.5 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          New Scan
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 perspective-1000">
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 rotate-3d active-3d hover:glow-primary transition-all animate-enter-3d">
          <div className="flex justify-between">
            <span className="text-outline-variant font-bold text-xs tracking-widest uppercase">Total Scans</span>
            <span className="material-symbols-outlined text-primary">data_usage</span>
          </div>
          <div className="text-4xl font-headline font-bold text-on-surface">{recentScans.length}</div>
        </div>
        
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 rotate-3d active-3d hover:glow-error transition-all animate-enter-3d-delayed">
          <div className="flex justify-between">
            <span className="text-outline-variant font-bold text-xs tracking-widest uppercase">Fakes Detected</span>
            <span className="material-symbols-outlined text-error">gavel</span>
          </div>
          <div className="text-4xl font-headline font-bold text-error">{fakesCount}</div>
        </div>



        <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 rotate-3d active-3d hover:glow-primary transition-all animate-enter-3d-more-delayed">
          <div className="flex justify-between">
            <span className="text-outline-variant font-bold text-xs tracking-widest uppercase">System Status</span>
            <span className="material-symbols-outlined text-[#4ADE80]">health_and_safety</span>
          </div>
          <div className="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
            Operational
          </div>
        </div>
      </div>

      {/* Recent Scans Table */}
      <div className="glass-card rounded-2xl overflow-hidden relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center relative z-10">
          <h3 className="font-headline font-bold text-lg">Recent Analysis Logs</h3>
          {isLoading && <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest/50 text-on-surface-variant text-xs uppercase tracking-wider font-mono">
                <th className="p-4 pl-6 font-medium">ID</th>
                <th className="p-4 font-medium">File Name</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Score</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentScans.map((scan) => (
                <tr key={scan.id} className="border-b border-outline-variant/5 hover:bg-surface-container-highest/30 transition-colors cursor-pointer" onClick={() => navigate('/result', { state: { fileData: { name: scan.file, isFake: scan.status === 'Synthetic', score: scan.score } } })}>
                  <td className="p-4 pl-6 text-outline-variant font-mono">#{scan.id}</td>
                  <td className="p-4 font-medium text-on-surface truncate max-w-[200px]">{scan.file}</td>
                  <td className="p-4 text-on-surface-variant font-light">{scan.date}</td>
                  <td className="p-4 text-outline-variant">
                    <span className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-[16px]">{scan.type === 'Video' ? 'movie' : scan.type === 'Audio' ? 'graphic_eq' : 'image'}</span>
                       {scan.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${scan.status === 'Synthetic' ? 'bg-error/15 text-error' : 'bg-primary/15 text-primary'}`}>
                      {scan.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-sm text-on-surface">{scan.score}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advanced Features Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* API Management */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-6 animate-enter-3d">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">key</span>
              API Management
            </h3>
          </div>
          <p className="text-on-surface-variant text-sm font-light">
            Integrate Sentinel's forensic engine into your own infrastructure via our REST API.
          </p>
          <div className="bg-surface-container-lowest/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
            <div className="font-mono text-xs text-outline-variant">
              sk_live_••••••••••••••••4f2a
            </div>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <span className="material-symbols-outlined text-lg">content_copy</span>
            </button>
          </div>
          <button className="w-full py-3 border border-outline-variant/30 rounded-xl text-sm font-bold hover:bg-surface-container transition-colors">
            Generate New API Key
          </button>
        </div>

        {/* Global Forensics Map */}
        <div className="glass-card rounded-2xl p-4 h-[400px] lg:h-auto animate-enter-3d-delayed">
           <ForensicMap />
        </div>

        {/* System Intelligence */}
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-6 animate-enter-3d-more-delayed">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">insights</span>
              Model Tuning
            </h3>
          </div>
          <p className="text-on-surface-variant text-sm font-light">
            Current Model: <span className="font-bold text-on-surface">Sentinel-v4.2</span>
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline-variant">Spatial Consistency</span>
              <span className="text-primary font-bold">99.8%</span>
            </div>
            <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[99.8%]"></div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline-variant">Temporal Accuracy</span>
              <span className="text-primary font-bold">98.4%</span>
            </div>
            <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[98.4%]"></div>
            </div>
          </div>
          <button className="w-full py-3 bg-surface-container-highest text-on-surface rounded-xl text-sm font-bold hover:bg-outline-variant/20 transition-colors">
            Configure Training
          </button>
        </div>
      </div>
    </main>
  );
}
