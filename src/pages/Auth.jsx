import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    
    // Redirect logic prioritizing recovery hooks
    if (location.state?.from) {
      navigate(location.state.from, { state: { fileData: location.state.fileData } });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center py-12 px-4 w-full">
      <div className="w-full max-w-md bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10 shadow-[0_32px_64px_rgba(0,0,0,0.4)] relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl point-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary/10 rounded-full blur-3xl point-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 shadow-inner border border-surface-container-highest">
            <span className="material-symbols-outlined text-primary text-3xl">shield_lock</span>
          </div>
          
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-2 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-on-surface-variant text-sm mb-8 font-light text-center">
            {isLogin 
              ? 'Enter your credentials to access the forensic lab.' 
              : 'Sign up to utilize industry-leading deepfake analysis.'}
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-1">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline-variant"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline-variant"
                placeholder="analyst@domain.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-1">Password</label>
                {isLogin && <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>}
              </div>
              <input 
                type="password" 
                className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline-variant"
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-outline-variant uppercase tracking-widest pl-1">Confirm Password</label>
                <input 
                  type="password" 
                  className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline-variant"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            <button 
              type="submit"
              className="mt-4 w-full cursor-pointer h-12 rounded-xl gradient-bg text-on-primary font-bold shadow-lg shadow-primary-container/20 hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
            >
              {isLogin ? 'Sign In' : 'Register'}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>

          <div className="mt-8 text-sm text-on-surface-variant flex gap-2">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button className="text-primary font-bold hover:underline" onClick={toggleAuthMode}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
