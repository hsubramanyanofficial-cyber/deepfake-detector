import { useNavigate, useLocation } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import ForensicTopology from '../components/ForensicTopology';

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const fileData = location.state?.fileData || { name: 'sample_video.mp4', isFake: true, score: 98.4, type: 'Video', anomalies: [{ location: '00:14 - 00:18', description: 'Lip sync desynchronization detected' }] };

  const getForensicDetails = (type, isFake) => {
    switch (type) {
      case 'Image':
        return [
          { label: 'Facial Blending Artifacts', value: isFake ? 96 : 2, alert: isFake },
          { label: 'Lighting/Shadow Consistency', value: isFake ? 85 : 4, alert: isFake },
          { label: 'Skin Texture Variance', value: isFake ? 92 : 3, alert: isFake },
          { label: 'Background Distortion', value: isFake ? 88 : 5, alert: isFake }
        ];
      case 'Document':
        return [
          { label: 'Metadata Forgery', value: isFake ? 98 : 1, alert: isFake },
          { label: 'Font Kerning Anomalies', value: isFake ? 82 : 2, alert: isFake },
          { label: 'Hidden Layer Manipulations', value: isFake ? 94 : 0, alert: isFake },
          { label: 'Digital Signature Validity', value: isFake ? 12 : 99, alert: isFake }
        ];
      case 'Audio':
        return [
          { label: 'Spectral Consistency', value: isFake ? 89 : 3, alert: isFake },
          { label: 'Pitch Variance', value: isFake ? 91 : 4, alert: isFake },
          { label: 'Background Noise Continuity', value: isFake ? 85 : 5, alert: isFake }
        ];
      case 'Video':
      default:
        return [
          { label: 'Facial Blending Artifacts', value: isFake ? 96 : 2, alert: isFake },
          { label: 'Temporal Consistency', value: isFake ? 89 : 5, alert: isFake },
          { label: 'Lip Sync Anomalies', value: isFake ? 93 : 1, alert: isFake },
          { label: 'Skin Texture Variance', value: isFake ? 92 : 4, alert: isFake }
        ];
    }
  };

  const currentDetails = getForensicDetails(fileData.type, fileData.isFake);

  const handleExport = () => {
    window.print();
  };

  return (
    <>
      {/* Native Browser Print Template */}
      {/* Professional Forensic Report Template (PDF Export) */}
      <div className="hidden print:block print-report-container w-full bg-white text-[#1a1a1a] font-sans p-0">
        <div className="w-full mx-auto p-[5%] border-[1vw] border-double border-indigo-50/50 flex flex-col relative overflow-hidden min-h-screen">
          
          {/* Header Section */}
          <div className="flex justify-between items-center border-b-2 border-indigo-900 pb-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-900 rounded-xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-4xl">shield</span>
              </div>
              <div>
                <h1 className="text-3xl font-black text-indigo-900 tracking-tighter uppercase">Sentinel AI</h1>
                <p className="text-[10px] font-bold text-indigo-900/60 uppercase tracking-[0.3em]">Digital Forensic Laboratory</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Forensic Analysis Report</h2>
              <div className="text-[10px] text-gray-400 font-mono mt-1 space-y-0.5">
                <p>GEN_ID: {Math.floor(10000 + Math.random() * 90000)}</p>
                <p>TS_STAMP: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="flex-grow">
            
            {/* Target Media Asset Section */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="col-span-2">
                <h3 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-2">Subject Media Asset</h3>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <p className="font-mono text-lg font-bold text-gray-800 break-all">{fileData.name}</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-mono">SHA-256: 4f8e...9d2a (Biometric Hash Verified)</p>
                </div>
              </div>
              <div className="col-span-1">
                <h3 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-2">Asset Type</h3>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                   <p className="text-xl font-bold text-gray-800">{fileData.type}</p>
                </div>
              </div>
            </div>

            {/* Verdict Section */}
            <div className="flex gap-8 mb-12">
              <div className={`flex-1 border-2 p-8 rounded-2xl flex flex-col items-center justify-center text-center ${fileData.isFake ? 'border-red-200 bg-red-50/30' : 'border-indigo-200 bg-indigo-50/30'}`}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60">Final Forensic Verdict</h3>
                <div className={`text-5xl font-black tracking-tighter ${fileData.isFake ? 'text-red-700' : 'text-indigo-700'}`}>
                  {fileData.isFake ? 'SYNTHETIC' : 'AUTHENTIC'}
                </div>
              </div>
              <div className="flex-1 border-2 border-gray-100 p-8 rounded-2xl flex flex-col items-center justify-center text-center bg-gray-50/30">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60">Confidence Score</h3>
                <div className="text-5xl font-black text-gray-900 tracking-tighter">{fileData.score}%</div>
              </div>
            </div>

            {/* Diagnostic Data */}
            <div className="mb-12">
              <h3 className="text-[10px] font-black text-indigo-900 uppercase tracking-[0.3em] mb-6 border-l-4 border-indigo-900 pl-4">Diagnostic Vector Analysis</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-left">Vector Variable</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-center border-l border-white/20">Metric</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-right border-l border-white/20">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {currentDetails.map((detail, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="p-4 font-bold text-gray-800">{detail.label}</td>
                      <td className="p-4 text-center font-mono text-gray-600 border-l border-gray-100">{detail.value}%</td>
                      <td className="p-4 text-right border-l border-gray-100">
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${detail.alert ? 'bg-red-50 text-red-700 border-red-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                          {detail.alert ? 'CRITICAL_VAR' : 'SECURE_VAR'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Anomalies Log if synthetic */}
            {fileData.isFake && fileData.anomalies && fileData.anomalies.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[10px] font-black text-red-900 uppercase tracking-[0.3em] mb-6 border-l-4 border-red-900 pl-4">Spatial/Temporal Anomaly Log</h3>
                <table className="w-full border-collapse bg-red-50/20">
                  <thead>
                    <tr className="border-b border-red-100">
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-left text-red-900">Marker ID</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-left border-l border-red-100 text-red-900">Observed Discrepancy</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {fileData.anomalies.map((anomaly, idx) => (
                      <tr key={idx} className="border-b border-red-50">
                        <td className="p-4 font-mono text-red-700 font-black">{anomaly.location}</td>
                        <td className="p-4 text-red-900 border-l border-red-50">{anomaly.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Verification Seal & Signature */}
          <div className="mt-auto border-t-2 border-gray-100 pt-12 flex justify-between items-end">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border-2 border-indigo-900 rounded-full flex items-center justify-center opacity-50">
                  <span className="material-symbols-outlined text-indigo-900 text-2xl">verified</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-indigo-900/60 uppercase">Sentinel Security Protocol</p>
                  <p className="text-xs font-mono text-gray-400">CERT: {Math.random().toString(36).substring(7).toUpperCase()}-DFX</p>
                </div>
              </div>
            </div>
            
            <div className="text-center w-64">
              <div className="h-16 mb-2 border-b border-gray-400 flex items-end justify-center">
                 <p className="font-serif text-3xl text-gray-300 italic opacity-40">Digital Signature</p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Head Forensic Analyst</p>
            </div>
          </div>

          {/* Suble Watermark */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-[0.03]">
             <h4 className="text-[140px] font-black border-[10px] border-indigo-900 px-12 text-indigo-900">OFFICIAL</h4>
          </div>
        </div>
      </div>

      {/* Primary Display UI */}
      <main className="print:hidden flex-grow max-w-7xl w-full mx-auto px-8 py-12 flex flex-col gap-12 bg-transparent relative z-10 animate-enter-3d">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <span className={`font-headline tracking-[0.2em] text-xs uppercase font-bold ${fileData.isFake ? 'text-error' : 'text-primary'}`}>
              Analysis Complete
            </span>
            <h1 className="text-5xl font-headline font-bold tracking-tighter text-on-surface">Forensic Report</h1>
            <p className="text-on-surface-variant max-w-2xl font-light">
              File: <span className="font-mono text-on-surface">{fileData.name}</span>
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/detect')}
              className="px-6 py-3 rounded-xl border border-outline-variant/30 text-on-surface font-medium hover:bg-surface-container transition-colors cursor-pointer"
            >
              New Analysis
            </button>
            <button 
              onClick={handleExport}
              className="px-6 py-3 rounded-xl gradient-bg text-on-primary font-bold shadow-lg shadow-primary-container/20 cursor-pointer flex items-center justify-center min-w-[140px]"
            >
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <ResultCard 
              title="Overall Assessment" 
              isFake={fileData.isFake} 
              score={fileData.score} 
              details={currentDetails}
            />

            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
              <h4 className="text-sm font-bold text-outline-variant uppercase tracking-widest mb-4">Metadata Summary</h4>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Resolution</span>
                  <span className="text-on-surface">1920x1080</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Codec</span>
                  <span className="text-on-surface">H.264</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-on-surface-variant">Duration</span>
                  <span className="text-on-surface">00:00:45</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 h-80 relative overflow-hidden group flex flex-col justify-between">
              <div className="flex justify-between z-10 relative">
                <h3 className="font-headline text-lg font-bold">Deepfake Topology</h3>
                <span className="material-symbols-outlined text-outline-variant">analytics</span>
              </div>
              
              <div className="absolute inset-0 top-16 bottom-16 px-6 py-4 flex items-center justify-center">
                 <div className="w-full h-full relative rounded-lg overflow-hidden">
                   <ForensicTopology isFake={fileData.isFake} type={fileData.type} />
                 </div>
              </div>

              <div className="z-10 relative text-xs text-on-surface-variant font-mono">
                Heatmap generated using Spatial Variance AI Layer.
              </div>
            </div>
            
            {fileData.isFake && fileData.anomalies && fileData.anomalies.length > 0 && (
              <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 flex flex-col gap-4">
                <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-4">
                  <span className="material-symbols-outlined text-primary">my_location</span>
                  <h3 className="font-headline text-lg font-bold">Detected Anomalies Log</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {fileData.anomalies.map((anomaly, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-2 md:gap-4 p-4 bg-surface-container-highest rounded-lg border border-outline-variant/5">
                      <div className="font-mono text-error font-bold text-sm min-w-[160px]">
                        {anomaly.location}
                      </div>
                      <div className="text-sm text-on-surface">
                        {anomaly.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {fileData.isFake && (
              <div className="bg-error/10 border border-error/20 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error">gavel</span>
                  <h3 className="font-headline text-lg font-bold text-error">Conclusion</h3>
                </div>
                <p className="text-on-surface leading-relaxed text-sm">
                  This media file exhibits significant signs of manipulation. Our models detected high variance in facial blending boundaries and temporal inconsistencies indicative of a face-swap architecture.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
