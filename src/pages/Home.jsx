import UploadBox from '../components/UploadBox';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-16 pb-24 w-full px-4">
        <div className="text-center max-w-3xl mb-16 animate-enter-3d">
          <h1 className="text-on-surface text-5xl md:text-7xl font-headline font-bold leading-tight mb-6 tracking-tighter drop-shadow-2xl">
            Detect Deepfakes <span className="text-gradient block mt-2">Instantly</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            Forensic-grade AI verification for images and videos. Identify manipulation with clinical precision.
          </p>
        </div>

        {/* Upload Area */}
        <div className="w-full max-w-2xl glass-card rounded-[2rem] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.6)] relative overflow-hidden group perspective-1000 animate-enter-3d-delayed">
          {/* Decorative background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 rounded-[2.5rem] -z-10"></div>
          
          <div className="rotate-3d active-3d">
            <UploadBox variant="home" />

          <div className="flex justify-center mt-8 relative z-10">
            <button 
              onClick={() => navigate('/detect')}
              className="flex w-full md:w-auto min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-10 gradient-bg text-on-primary text-base font-bold leading-normal tracking-wide shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 active-3d"
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>troubleshoot</span>
              <span>Start Detection</span>
            </button>
          </div>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="w-full py-24 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-40">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-on-surface text-3xl font-headline font-bold mb-4">The Process</h2>
              <p className="text-on-surface-variant text-base leading-relaxed">
                Our proprietary forensic models analyze media at the pixel level to detect inconsistencies invisible to the human eye.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6 perspective-1000">
              {/* Step 1 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col h-full hover:glow-primary transition-all rotate-3d active-3d animate-enter-3d-delayed">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary">upload_file</span>
                </div>
                <h3 className="text-on-surface text-lg font-headline font-bold mb-2">1. Upload</h3>
                <p className="text-on-surface-variant text-sm flex-grow">Securely upload your media. Files are processed entirely in memory.</p>
              </div>
              {/* Step 2 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col h-full hover:glow-primary transition-all relative top-0 md:top-4 rotate-3d active-3d animate-enter-3d-more-delayed">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary">memory</span>
                </div>
                <h3 className="text-on-surface text-lg font-headline font-bold mb-2">2. Analyze</h3>
                <p className="text-on-surface-variant text-sm flex-grow">Advanced neural networks scan for spatial and temporal anomalies.</p>
              </div>
              {/* Step 3 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col h-full hover:glow-primary transition-all relative top-0 md:top-8 rotate-3d active-3d animate-enter-3d-more-delayed">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary">fact_check</span>
                </div>
                <h3 className="text-on-surface text-lg font-headline font-bold mb-2">3. Result</h3>
                <p className="text-on-surface-variant text-sm flex-grow">Receive a detailed forensic report with confidence scores.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-40">
          <h2 className="text-on-surface text-4xl font-headline font-bold mb-16 text-center">Uncompromising Precision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            {/* Feature 1 */}
            <div className="glass-card rounded-[2rem] p-10 flex flex-col items-center text-center rotate-3d hover:glow-primary transition-all">
              <span className="material-symbols-outlined text-primary text-5xl mb-6 opacity-90 drop-shadow-[0_0_15px_rgba(195,192,255,0.5)]">bolt</span>
              <h3 className="text-on-surface text-xl font-headline font-bold mb-3">Blazing Fast</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Distributed GPU clusters ensure processing times measured in seconds, not hours.</p>
            </div>
            {/* Feature 2 */}
            <div className="glass-card rounded-[2rem] p-10 flex flex-col items-center text-center rotate-3d hover:glow-primary transition-all">
              <span className="material-symbols-outlined text-primary text-5xl mb-6 opacity-90 drop-shadow-[0_0_15px_rgba(195,192,255,0.5)]">radar</span>
              <h3 className="text-on-surface text-xl font-headline font-bold mb-3">Ultra Accurate</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Trained on millions of synthetic and real samples to achieve 99.8% detection accuracy.</p>
            </div>
            {/* Feature 3 */}
            <div className="glass-card rounded-[2rem] p-10 flex flex-col items-center text-center rotate-3d hover:glow-primary transition-all">
              <span className="material-symbols-outlined text-primary text-5xl mb-6 opacity-90 drop-shadow-[0_0_15px_rgba(195,192,255,0.5)]">neurology</span>
              <h3 className="text-on-surface text-xl font-headline font-bold mb-3">AI-Powered</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Multi-model ensemble techniques combine face-swapping, lip-sync, and artifact detection.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
