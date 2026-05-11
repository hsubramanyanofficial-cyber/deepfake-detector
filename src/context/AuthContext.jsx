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

  const [isLoading, setIsLoading] = useState(true);

  // Sync state with local storage
  useEffect(() => {
    localStorage.setItem('sentinel_auth', isAuthenticated);
  }, [isAuthenticated]);

  // Sync scans with backend
  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await fetch('https://deepfake-detector-yd4q.onrender.com/api/scans');
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



  const addScan = async (scanData) => {
    const newScan = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      file: scanData.name,
      date: new Date().toLocaleDateString(),
      status: scanData.isFake ? 'Synthetic' : 'Authentic',
      score: scanData.score,
      type: scanData.type || 'Video',
      offline: scanData.offline || false
    };

    // 1. Update local state
    setRecentScans(prev => {
      const updated = [newScan, ...prev];
      localStorage.setItem('sentinel_scans_backup', JSON.stringify(updated));
      return updated;
    });

    // 2. Persist to backend
    try {
      await fetch('https://deepfake-detector-yd4q.onrender.com/api/scans', {
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
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
