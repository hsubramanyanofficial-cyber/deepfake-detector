import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCurrency } from '../hooks/useCurrency';

export default function Pricing() {
  const navigate = useNavigate();
  const { currency, formatPrice, isLoading } = useCurrency();
  const [isYearly, setIsYearly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Define the base Monthly and Yearly INR prices
  const plans = [
    { id: 'free', name: 'Free', monthlyInr: 0, yearlyInr: 0 },
    { id: 'researcher', name: 'Researcher', monthlyInr: 499, yearlyInr: 5800 },
    { id: 'pro', name: 'Agent Pro', monthlyInr: 1999, yearlyInr: 23500 },
  ];

  const features = [
    { label: 'Offline Scans / Month', free: '3', researcher: '25', pro: '100', enterprise: 'Unlimited' },
    { label: 'Deep Biometric Scrutiny', free: true, researcher: true, pro: true, enterprise: true },
    { label: 'Max File Size', free: '10MB', researcher: '500MB', pro: '2GB', enterprise: 'Unlimited' },
    { label: 'Architecture Analysis', free: false, researcher: true, pro: true, enterprise: true },
    { label: 'Topology Visuals', free: false, researcher: false, pro: true, enterprise: true },
    { label: 'API Integration', free: false, researcher: false, pro: 'Standard', enterprise: 'Unlimited' },
    { label: 'Custom Model Access', free: false, researcher: false, pro: false, enterprise: true },
    { label: 'Global GPU Priority', free: false, researcher: false, pro: false, enterprise: true },
    { label: 'Response SLA', free: 'Best Effort', researcher: '24h', pro: '4h', enterprise: '1h' },
  ];

  const handleCheckout = async (planName, baseInrPrice) => {
    setIsProcessing(true);
    try {
      // Currency conversion logic
      let finalPrice = baseInrPrice;
      let currencyCode = 'inr';

      if (currency.symbol === '$') {
        finalPrice = Math.round(baseInrPrice / 83);
        currencyCode = 'usd';
      } else if (currency.symbol === '€') {
        finalPrice = Math.round(baseInrPrice / 90);
        currencyCode = 'eur';
      } else if (currency.symbol === '£') {
        finalPrice = Math.round(baseInrPrice / 105);
        currencyCode = 'gbp';
      }

      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName,
          price: finalPrice,
          interval: isYearly ? 'Yearly' : 'Monthly',
          currency: currencyCode
        })
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initialization failed: " + (data.error || "Unknown error"));
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Cannot connect to payment server. Ensure the backend is running.');
      setIsProcessing(false);
    }
  };

  const renderCheck = (value) => {
    if (value === true) return <span className="material-symbols-outlined text-primary text-xl">check_circle</span>;
    if (value === false) return <span className="material-symbols-outlined text-outline-variant/30 text-xl">cancel</span>;
    return <span className="font-medium text-on-surface">{value}</span>;
  };

  return (
    <main className="flex-grow flex flex-col items-center py-20 px-4 sm:px-8 w-full max-w-7xl mx-auto relative">

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-bold font-headline">Redirecting to Secure Payment Gateway...</h2>
          <p className="text-on-surface-variant text-sm mt-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            Powered by Stripe
          </p>
        </div>
      )}

      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-bold text-on-surface mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-on-surface-variant font-light">
          Forensic deepfake detection scaled for individuals, agencies, and enterprise infrastructure.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center gap-4 mb-16 bg-surface-container p-2 rounded-full border border-outline-variant/10 shadow-inner">
        <button
          onClick={() => setIsYearly(false)}
          className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${!isYearly ? 'bg-primary text-on-primary shadow-lg shadow-primary-container/30' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Monthly Billing
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`px-6 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isYearly ? 'bg-primary text-on-primary shadow-lg shadow-primary-container/30' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          Yearly Billing
          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${isYearly ? 'bg-on-primary/20 text-on-primary' : 'bg-primary/20 text-primary'}`}>Save 20%</span>
        </button>
      </div>

      {/* Structured Comparison Table */}
      <div className="w-full bg-surface-container-low rounded-3xl border border-outline-variant/10 shadow-2xl overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-8 w-1/4 border-b border-outline-variant/10 align-bottom">
                  <h3 className="text-xl font-headline font-bold mb-2">Compare Plans</h3>
                  <p className="text-xs text-on-surface-variant">Find the right tier for your forensic needs.</p>
                </th>

                {/* Free Header */}
                <th className="p-8 w-1/5 border-b border-outline-variant/10 border-l border-outline-variant/5">
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-1">Free</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-headline font-bold text-on-surface">
                      $0
                    </span>
                    <span className="text-on-surface-variant text-sm mb-1">/mo</span>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-2.5 rounded-xl border-2 border-outline-variant text-on-surface font-bold hover:bg-surface-container-highest transition-colors text-sm"
                  >
                    Current Plan
                  </button>
                </th>

                {/* Researcher Header */}
                <th className="p-8 w-1/5 border-b border-outline-variant/10 border-l border-outline-variant/5">
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-1">Researcher</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-headline font-bold text-on-surface">
                      {isLoading ? '...' : formatPrice(isYearly ? plans[1].yearlyInr : plans[1].monthlyInr)}
                    </span>
                    <span className="text-on-surface-variant text-sm mb-1">{isYearly ? '/yr' : '/mo'}</span>
                  </div>
                  <button
                    onClick={() => handleCheckout(plans[1].name, isYearly ? plans[1].yearlyInr : plans[1].monthlyInr)}
                    className="w-full py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-colors text-sm"
                  >
                    Start Free Trial
                  </button>
                </th>

                {/* Agent Pro Header */}
                <th className="p-8 w-1/5 border-b border-outline-variant/10 border-l border-outline-variant/5 bg-primary/5 relative">
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <span className="bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-b-lg shadow-md">Most Popular</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-1 mt-2">Agent Pro</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-headline font-bold text-primary">
                      {isLoading ? '...' : formatPrice(isYearly ? plans[2].yearlyInr : plans[2].monthlyInr)}
                    </span>
                    <span className="text-on-surface-variant text-sm mb-1">{isYearly ? '/yr' : '/mo'}</span>
                  </div>
                  <button
                    onClick={() => handleCheckout(plans[2].name, isYearly ? plans[2].yearlyInr : plans[2].monthlyInr)}
                    className="w-full py-2.5 rounded-xl gradient-bg text-on-primary font-bold shadow-lg hover:brightness-110 transition-all text-sm"
                  >
                    Upgrade to Pro
                  </button>
                </th>

                {/* Enterprise Header */}
                <th className="p-8 w-1/4 border-b border-outline-variant/10 border-l border-outline-variant/5">
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-1">Enterprise</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-4xl font-headline font-bold text-on-surface">Custom</span>
                  </div>
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-bold hover:bg-outline-variant/40 transition-colors text-sm"
                  >
                    Contact Sales
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className="hover:bg-surface-container-highest/30 transition-colors">
                  <td className="p-5 pl-8 border-b border-outline-variant/5 text-sm font-medium text-on-surface-variant">
                    {feature.label}
                  </td>
                  <td className="p-5 text-center border-b border-outline-variant/5 border-l border-outline-variant/5">
                    {renderCheck(feature.free)}
                  </td>
                  <td className="p-5 text-center border-b border-outline-variant/5 border-l border-outline-variant/5">
                    {renderCheck(feature.researcher)}
                  </td>
                  <td className="p-5 text-center border-b border-outline-variant/5 border-l border-outline-variant/5 bg-primary/5">
                    {renderCheck(feature.pro)}
                  </td>
                  <td className="p-5 text-center border-b border-outline-variant/5 border-l border-outline-variant/5">
                    {renderCheck(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods Footer */}
      <div className="mt-12 flex flex-col items-center gap-6 animate-enter-3d-delayed">
        <p className="text-xs font-bold text-outline-variant uppercase tracking-[0.3em]">Secure Global Payment Infrastructure</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">credit_card</span>
            <span className="text-[10px] font-black uppercase text-on-surface">Visa / Master / Amex</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-on-surface">account_balance</span>
            <span className="text-[10px] font-black uppercase text-on-surface">Net Banking / UPI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-on-surface">wallet</span>
            <span className="text-[10px] font-black uppercase text-on-surface">Apple / Google Pay</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-2xl">universal_currency</span>
            <span className="text-[10px] font-black uppercase">iDEAL / SEPA / Alipay</span>
          </div>
        </div>
      </div>
    </main>
  );
}
