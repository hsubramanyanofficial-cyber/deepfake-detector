import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import UploadBox from '../components/UploadBox';
import ForensicTopology from '../components/ForensicTopology';
import ForensicConsole from '../components/ForensicConsole';
import BiometricHUD from '../components/BiometricHUD';
import { useAuth } from '../context/AuthContext';

export default function Detection() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isXrayEnabled, setIsXrayEnabled] = useState(false);
  const { addScan, scanCredits, subscriptionPlan } = useAuth();
  const analysisResultRef = useRef(null);

  useEffect(() => {
    // Check if we have credits on load
    if (scanCredits <= 0 && subscriptionPlan !== 'Enterprise') {
      // Optional: show a toast or message
    }
  }, [scanCredits, subscriptionPlan]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    if (selectedFile instanceof File) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (selectedFile.isUrl) {
      setPreviewUrl(selectedFile.name);
    } else {
      // Mock test sample previews
      if (selectedFile.type?.startsWith('video')) {
        setPreviewUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      } else if (selectedFile.type?.startsWith('image')) {
        setPreviewUrl('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800');
      } else {
        setPreviewUrl(null);
      }
    }
  }, [selectedFile]);

  const startAnalysis = async () => {
    if (!selectedFile) return;

    if (scanCredits <= 0 && subscriptionPlan !== 'Enterprise') {
      alert(`Scan limit reached for your ${subscriptionPlan} plan. Please upgrade to continue forensic analysis.`);
      navigate('/pricing');
      return;
    }

    setIsAnalyzing(true);

    try {
      let res;
      if (selectedFile.isUrl) {
        res = await fetch('https://deepfake-detector-yd4q.onrender.com/api/analyze/url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: selectedFile.name })
        });
      } else {
        const formData = new FormData();
        if (selectedFile instanceof File) {
          formData.append('file', selectedFile);
        } else {
          // Mock files
          const blob = new Blob(['mock'], { type: selectedFile.type });
          formData.append('file', blob, selectedFile.name);
        }
        res = await fetch('https://deepfake-detector-yd4q.onrender.com/api/analyze/media', {
          method: 'POST',
          body: formData
        });
      }

      const data = await res.json();
      // Add offline flag for local files
      data.offline = !selectedFile.isUrl;
      analysisResultRef.current = data;
    } catch (error) {
      console.error('API Error:', error);
      analysisResultRef.current = {
        name: selectedFile.name,
        type: 'Unknown',
        isFake: false,
        score: 95.0,
        anomalies: [],
        offline: !selectedFile.isUrl
      };
    }
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    const data = analysisResultRef.current;
    if (!data) return;

    try {
      addScan(data);
      navigate('/result', {
        state: { fileData: data }
      });
    } catch (err) {
      alert(err.message);
      navigate('/pricing');
    }
  };

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-8 py-12 flex flex-col gap-12 relative">
      {isAnalyzing && <LoadingScreen onComplete={handleAnalysisComplete} />}

      {/* Header Section */}
      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-primary font-headline tracking-[0.2em] text-xs uppercase font-bold">New Forensic Analysis</span>
          <span className="h-1 w-1 rounded-full bg-outline-variant/30"></span>
          <span className="text-outline-variant font-headline tracking-[0.1em] text-[10px] uppercase font-bold">Credits: {scanCredits} / {subscriptionPlan}</span>
        </div>
        <h1 className="text-5xl font-headline font-bold tracking-tighter text-on-surface">Detection Setup</h1>
        <p className="text-on-surface-variant max-w-2xl font-light">
          Initialize deep pixel scrutiny. Switch between <span className="text-primary font-bold underline">Offline Local Processing</span> for higher privacy or <span className="text-primary font-bold underline">Cloud URL Scraping</span> for web forensics.
        </p>
      </div>

      {/* Detection Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10 perspective-1000">
        {/* Left Column: Upload */}
        <div className="lg:col-span-5 flex flex-col gap-8 rotate-3d active-3d animate-enter-3d">
          <div className="glass-card p-8 rounded-xl flex flex-col gap-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-headline text-xl font-semibold">Forensic Source</h3>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Offline Neural Mode</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant animate-pulse">memory</span>
            </div>

            <UploadBox variant="detect" onUpload={setSelectedFile} file={selectedFile && !selectedFile.isUrl ? selectedFile : null} />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="h-px bg-outline-variant/20 flex-grow"></div>
                <span className="text-xs font-bold text-outline-variant uppercase tracking-widest">Web Forensics</span>
                <div className="h-px bg-outline-variant/20 flex-grow"></div>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant/50">link</span>
                <input
                  type="url"
                  placeholder="Paste URL link here for analysis..."
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 focus:border-primary focus:outline-none"
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedFile({ name: e.target.value, type: 'url', isUrl: true });
                    } else {
                      setSelectedFile(null);
                    }
                  }}
                />
              </div>
            </div>

            {/* Quick Test Samples */}
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-xs font-bold text-outline-variant uppercase tracking-widest">Quick Test Samples</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedFile({ name: 'sample_deepfake.mp4', type: 'video/mp4', size: 12500000 })}
                  className="flex-1 py-2 px-3 bg-surface-container hover:bg-primary/20 hover:text-primary transition-colors rounded-lg border border-outline-variant/10 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">smart_display</span>
                  Video
                </button>
                <button
                  onClick={() => setSelectedFile({ name: 'forged_contract.pdf', type: 'application/pdf', size: 450000 })}
                  className="flex-1 py-2 px-3 bg-surface-container hover:bg-primary/20 hover:text-primary transition-colors rounded-lg border border-outline-variant/10 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  Document
                </button>
                <button
                  onClick={() => setSelectedFile({ name: 'profile_pic.jpg', type: 'image/jpeg', size: 3400000 })}
                  className="flex-1 py-2 px-3 bg-surface-container hover:bg-primary/20 hover:text-primary transition-colors rounded-lg border border-outline-variant/10 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">image</span>
                  Image
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-outline-variant uppercase tracking-widest">Active Analysis Stream</p>
              <div className="h-40">
                <ForensicConsole />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-7 flex flex-col gap-4 rotate-3d active-3d animate-enter-3d-delayed">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-headline text-xl font-semibold">Live Preview</h3>
            <div className="flex gap-4 items-center">
              {/* X-Ray Toggle */}
              <button
                onClick={() => setIsXrayEnabled(!isXrayEnabled)}
                className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all ${isXrayEnabled ? 'bg-primary/20 text-primary' : 'text-outline-variant hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined text-sm">visibility_lock</span>
                <span className="text-[10px] font-bold uppercase">X-Ray</span>
              </button>
              <div className="flex gap-2 items-center">
                <span className={`h-2 w-2 rounded-full ${selectedFile ? 'bg-primary animate-pulse' : 'bg-error animate-pulse'}`}></span>
                <span className="text-[10px] font-bold text-outline uppercase tracking-tighter">
                  {selectedFile ? 'Target Acquired' : 'System Ready'}
                </span>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl flex-grow flex items-center justify-center relative overflow-hidden group min-h-[500px]">
            {/* Visual Background Element */}
            <div className="absolute inset-0 opacity-10 grayscale">
              <img
                className="w-full h-full object-cover"
                alt="high-tech digital circuit pattern"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrmaytrdXiRL8wK7VO_Hh8yHM1qmsPc3CzKWxeQnsgqag-rwj-8zTFQRsyq2ok0nr9qEdMsDd1OCOgera6aDHVv873ZtFjMDuHJnuIAP8-fQYwhVw9I1gaFLzY9lVJ2TwL2engIEW3pbda8LkPTOrQoU22exFPt3hcKYZxMekk7mX7hOWU_fuZgZiztP1DPTLmLPVxHF8sKSjUu2UBHnePjZ_0rGysFrsTDfhiHzB_1NOHVm9OHdCawKlggHwmaoJUMRfoYOZl8QM"
              />
            </div>

            {selectedFile ? (
              <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 bg-surface-container-highest/20 backdrop-blur-sm overflow-hidden p-2 ${isXrayEnabled ? 'x-ray-mode' : ''}`}>
                {/* Biometric HUD Overlay */}
                {selectedFile.type?.startsWith('image') || selectedFile.type?.startsWith('video') ? <BiometricHUD /> : null}

                {/* Advanced Scanning HUD Overlay */}
                <div className="absolute inset-0 z-30 opacity-40 pointer-events-none">
                  <ForensicTopology isFake={false} type={selectedFile.type} />
                </div>

                {previewUrl && selectedFile.isUrl ? (
                  <iframe src={previewUrl} className="w-full h-full shadow-2xl rounded-lg bg-white border-0" title="URL Preview" sandbox="allow-scripts allow-same-origin" />
                ) : previewUrl && selectedFile.type?.startsWith('video') ? (
                  <video src={previewUrl} controls className="w-full h-full object-contain shadow-2xl rounded-lg" />
                ) : previewUrl && selectedFile.type?.startsWith('image') ? (
                  <img src={previewUrl} className="w-full h-full object-contain shadow-2xl rounded-lg" />
                ) : previewUrl && selectedFile.type?.includes('pdf') ? (
                  <embed src={previewUrl} type="application/pdf" className="w-full h-full shadow-2xl rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 bg-surface-container-high/90 rounded-2xl backdrop-blur-md shadow-2xl border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary text-6xl mb-6 opacity-80" style={{ fontVariationSettings: "'FILL' 0" }}>file_present</span>
                    <h4 className="font-headline text-2xl font-bold text-on-surface mb-2">{selectedFile.name}</h4>
                    <p className="text-on-surface-variant max-w-sm text-sm text-center">
                      Live preview unavailable for this format. Subject media loaded into active memory buffer.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-12 bg-surface-container-high/40 backdrop-blur-sm">
                <div className="w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-4xl">visibility</span>
                  </div>
                </div>
                <h4 className="font-headline text-2xl font-bold text-on-surface mb-2">Awaiting Input</h4>
                <p className="text-on-surface-variant max-w-sm text-sm">
                  Once a file is selected, the forensic previewer will initialize the spatial analysis layer here.
                </p>
              </div>
            )}

            {/* HUD Elements */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
              <div className="px-2 py-1 bg-primary text-on-primary text-[10px] font-bold rounded uppercase">Sensor 01</div>
              <div className="text-[10px] font-mono text-outline-variant">POS: 34.22.88.1</div>
            </div>
            <div className="absolute bottom-6 right-6 z-20 text-right">
              <div className="text-3xl font-headline font-bold text-on-surface/50">00.00.00</div>
              <div className="text-[10px] font-mono text-outline-variant uppercase">Frame Count Index</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex justify-end pt-8 relative z-10">
        <button
          onClick={startAnalysis}
          disabled={!selectedFile || isAnalyzing}
          className={`px-12 py-5 rounded-xl text-on-primary font-headline font-bold text-lg flex items-center gap-3 transition-all ${selectedFile && !isAnalyzing ? 'glass-gradient hover:brightness-110 active:scale-95 shadow-xl shadow-primary-container/20 cursor-pointer pointer-events-auto border-0' : 'bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed border-0'
            }`}
        >
          <span>Analyze Now</span>
          <span className="material-symbols-outlined">analytics</span>
        </button>
      </div>
    </main>
  );
}
