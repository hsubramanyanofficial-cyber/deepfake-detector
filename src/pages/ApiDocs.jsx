export default function ApiDocs() {
  return (
    <main className="flex-grow flex flex-col md:flex-row w-full max-w-[1400px] mx-auto bg-surface-container-lowest">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-outline-variant/10 p-6 flex flex-col gap-8 shrink-0">
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-2">Getting Started</h4>
          <nav className="flex flex-col">
            <a href="#" className="py-2 px-3 rounded-lg text-primary font-medium bg-primary/10">Introduction</a>
            <a href="#" className="py-2 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors">Authentication</a>
            <a href="#" className="py-2 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors">Rate Limits</a>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-2">Analysis Endpoints</h4>
          <nav className="flex flex-col">
            <a href="#" className="py-2 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors flex justify-between">
              <span>Submit Media</span>
              <span className="text-[10px] font-mono text-primary font-bold">POST</span>
            </a>
            <a href="#" className="py-2 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors flex justify-between">
              <span>Get Report</span>
              <span className="text-[10px] font-mono text-primary font-bold">GET</span>
            </a>
            <a href="#" className="py-2 px-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors flex justify-between">
              <span>List Scans</span>
              <span className="text-[10px] font-mono text-primary font-bold">GET</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 md:p-16 flex flex-col gap-8 overflow-y-auto">
        <div className="flex flex-col gap-3 border-b border-outline-variant/10 pb-8">
          <h1 className="text-4xl font-headline font-bold text-on-surface">Deepfake Detection API</h1>
          <p className="text-lg text-on-surface-variant max-w-3xl">
            Integrate forensic analysis models programmatically into your own applications using our REST API. Send video or image payloads and receive confidence matrices in milliseconds.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-headline font-semibold text-on-surface">Base URL</h2>
          <div className="bg-surface-container rounded-xl p-4 font-mono text-sm text-primary flex items-center justify-between border border-outline-variant/20">
            <span>https://api.sentinel-ai.com/v1</span>
            <button className="material-symbols-outlined text-outline-variant hover:text-on-surface transition-colors text-lg" title="Copy to clipboard">content_copy</button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <h2 className="text-2xl font-headline font-semibold text-on-surface">Submit Media for Analysis</h2>
          <p className="text-on-surface-variant">Post a binary payload to initialize the forensic detection layer.</p>
          
          <div className="bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/20">
            <div className="bg-surface-container-highest px-4 py-2 border-b border-outline-variant/10 flex gap-2">
               <span className="text-xs text-primary font-mono font-bold">POST</span>
               <span className="text-xs text-on-surface-variant font-mono">/analyze</span>
            </div>
            <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-on-surface">
<pre><code>{`curl -X POST https://api.sentinel-ai.com/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@deepfake_video.mp4"`}
</code></pre>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <h2 className="text-2xl font-headline font-semibold text-on-surface">JSON Response Example</h2>
          <div className="bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/20">
            <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-[#c3c0ff]">
<pre><code>{`{
  "id": "scn_98XjK2Lm",
  "status": "completed",
  "is_synthetic": true,
  "confidence_score": 98.4,
  "details": {
    "facial_blending_artifacts": 96,
    "temporal_consistency": 89,
    "lip_sync_accuracy": 45
  },
  "created_at": "2024-10-14T10:45:00Z"
}`}
</code></pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
