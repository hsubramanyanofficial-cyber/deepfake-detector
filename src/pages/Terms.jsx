export default function Terms() {
  return (
    <main className="flex-grow flex flex-col py-20 px-8 w-full max-w-4xl mx-auto">
      <h1 className="text-5xl font-headline font-bold text-on-surface mb-8">Terms of Service</h1>
      <div className="text-on-surface-variant font-light space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-headline font-bold text-on-surface mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using the Sentinel AI Deepfake Detector, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>

        <h2 className="text-2xl font-headline font-bold text-on-surface mt-8 mb-4">2. Use License</h2>
        <p>Permission is granted to temporarily use Sentinel AI for personal, non-commercial, or approved enterprise forensic analysis. This is the grant of a license, not a transfer of title. You may not use the service for any illegal or unauthorized purpose.</p>

        <h2 className="text-2xl font-headline font-bold text-on-surface mt-8 mb-4">3. Data &amp; Privacy</h2>
        <p>Your privacy is important to us. Media uploaded for analysis is processed strictly in accordance with our Privacy Policy. Sentinel AI does not claim ownership over the content you upload.</p>

        <h2 className="text-2xl font-headline font-bold text-on-surface mt-8 mb-4">4. Limitations</h2>
        <p>In no event shall Sentinel AI or its suppliers be liable for any damages arising out of the use or inability to use the materials on the service. The analytical reports generated are based on probabilistic models and are not guaranteed to be 100% accurate.</p>
      </div>
    </main>
  );
}
