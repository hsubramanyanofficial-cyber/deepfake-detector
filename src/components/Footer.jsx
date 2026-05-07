import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-background mt-auto border-t border-outline-variant/15">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 w-full py-12 px-8 font-body text-sm tracking-wide">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold text-on-surface flex items-center gap-2 font-headline">
            <span className="material-symbols-outlined text-primary">shield</span>
            Sentinel AI
          </div>
          <div className="text-on-surface-variant">© 2024 Sentinel AI. Digital Forensic Lab.</div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="text-on-surface-variant hover:text-white transition-colors" to="/terms">Terms of Service</Link>
          <Link className="text-on-surface-variant hover:text-white transition-colors" to="/privacy">Privacy Policy</Link>
          <Link className="text-on-surface-variant hover:text-white transition-colors" to="/docs">API Documentation</Link>
          <Link className="text-on-surface-variant hover:text-white transition-colors" to="/contact">Contact Support</Link>
        </div>
      </div>
    </footer>
  );
}
