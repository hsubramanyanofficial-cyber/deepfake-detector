export default function Contact() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center py-20 px-8 w-full max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <span className="material-symbols-outlined text-primary text-6xl mb-4">support_agent</span>
        <h1 className="text-5xl font-headline font-bold text-on-surface mb-4">Contact Support</h1>
        <p className="text-on-surface-variant font-light text-lg">
          Our forensic specialists are here to help you with integration, billing, or analysis inquiries.
        </p>
      </div>

      <div className="w-full bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10">
        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent to support team!"); }}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-on-surface uppercase tracking-widest">Name</label>
            <input type="text" className="bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:outline-none" placeholder="Your full name" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-on-surface uppercase tracking-widest">Email</label>
            <input type="email" className="bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:outline-none" placeholder="you@company.com" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-on-surface uppercase tracking-widest">Inquiry Type</label>
            <select className="bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:outline-none">
              <option>Technical Support</option>
              <option>Billing &amp; Subscriptions</option>
              <option>API Access</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-on-surface uppercase tracking-widest">Message</label>
            <textarea rows="5" className="bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:outline-none resize-none" placeholder="How can we help you?" required></textarea>
          </div>
          <button type="submit" className="mt-4 w-full py-4 rounded-xl gradient-bg text-on-primary font-bold shadow-lg hover:brightness-110 transition-all text-lg cursor-pointer">
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
