import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sentinel_auth') === 'true';
  });
  
  const [recentScans, setRecentScans] = useState(() => {
    const saved = localStorage.getItem('sentinel_scans_backup');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [subscriptionPlan, setSubscriptionPlan] = useState(() => {
    return localStorage.getItem('sentinel_plan') || 'Free';
  });

  const getPlanLimits = (plan) => {
    switch (plan.toLowerCase()) {
      case 'researcher': return { max: 25, reset: 'Month' };
      case 'agent pro': return { max: 100, reset: 'Month' };
      case 'enterprise': return { max: 999, reset: 'Unlimited' };
      default: return { max: 3, reset: 'Month' };
    }
  };

  const [scanCredits, setScanCredits] = useState(() => {
    const saved = localStorage.getItem('sentinel_credits');
    return saved ? parseInt(saved) : getPlanLimits(subscriptionPlan).max;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Sync state with local storage
  useEffect(() => {
    localStorage.setItem('sentinel_auth', isAuthenticated);
    localStorage.setItem('sentinel_plan', subscriptionPlan);
    localStorage.setItem('sentinel_credits', scanCredits.toString());
  }, [isAuthenticated, subscriptionPlan, scanCredits]);

  // Sync scans with backend
  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/scans');
        if (res.ok) {
          const data = await res.json();
          setRecentScans(data);
          localStorage.setItem('sentinel_scans_backup', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Failed to fetch scan history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchScans();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const upgradePlan = (newPlan) => {
    setSubscriptionPlan(newPlan);
    setScanCredits(getPlanLimits(newPlan).max);
  };

  const addScan = async (scanData) => {
    if (scanCredits <= 0 && subscriptionPlan !== 'Enterprise') {
      throw new Error('Scan limit reached for your current plan.');
    }

    const newScan = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      file: scanData.name,
      date: new Date().toLocaleDateString(),
      status: scanData.isFake ? 'Synthetic' : 'Authentic',
      score: scanData.score,
      type: scanData.type || 'Video',
      offline: scanData.offline || false
    };

    // Deduct credit
    if (subscriptionPlan !== 'Enterprise') {
      setScanCredits(prev => Math.max(0, prev - 1));
    }

    // 1. Update local state
    setRecentScans(prev => {
      const updated = [newScan, ...prev];
      localStorage.setItem('sentinel_scans_backup', JSON.stringify(updated));
      return updated;
    });

    // 2. Persist to backend
    try {
      await fetch('http://localhost:5000/api/scans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newScan)
      });
    } catch (error) {
      console.error('Failed to persist scan to backend:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      recentScans, 
      addScan, 
      isLoading,
      subscriptionPlan,
      scanCredits,
      maxCredits: getPlanLimits(subscriptionPlan).max,
      planReset: getPlanLimits(subscriptionPlan).reset,
      upgradePlan
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
