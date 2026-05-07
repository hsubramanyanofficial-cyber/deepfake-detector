export default function Privacy() {
  return (
    <main className="flex-grow flex flex-col py-20 px-8 w-full max-w-4xl mx-auto">
      <h1 className="text-5xl font-headline font-bold text-on-surface mb-8">Privacy Policy</h1>
      <div className="text-on-surface-variant font-light space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-headline font-bold text-on-surface mt-8 mb-4">1. Information We Collect</h2>
        <p>When you use Sentinel AI, we collect the media files you upload solely for the purpose of forensic analysis. We also collect standard usage data, such as IP addresses, browser types, and usage patterns to improve our service.</p>

        <h2 className="text-2xl font-headline font-bold text-on-surface mt-8 mb-4">2. How We Use Your Data</h2>
        <p>Uploaded media is temporarily stored in our secure processing buffers. Once the analysis is complete and the forensic report is generated, the media file is immediately purged from our active servers unless you opt-in to help train our models.</p>

        <h2 className="text-2xl font-headline font-bold text-on-surface mt-8 mb-4">3. Data Security</h2>
        <p>We implement state-of-the-art encryption and access control protocols. Your data is encrypted in transit and at rest. However, no method of transmission over the Internet is 100% secure.</p>

        <h2 className="text-2xl font-headline font-bold text-on-surface mt-8 mb-4">4. Third-Party Sharing</h2>
        <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information or uploaded media. This does not include trusted third parties who assist us in operating our application.</p>
      </div>
    </main>
  );
}
