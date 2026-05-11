import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-background/80 backdrop-blur-xl sticky top-0 z-50 transition-colors border-b border-outline-variant/10">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tighter text-on-surface font-headline flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            shield
          </span>
          Sentinel AI
        </Link>
        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `transition-colors hover:text-on-surface ${isActive ? 'text-primary font-bold border-b-2 border-primary-container pb-1' : 'text-on-surface-variant'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/detect" 
            className={({ isActive }) => 
              `transition-colors hover:text-on-surface ${isActive ? 'text-primary font-bold border-b-2 border-primary-container pb-1' : 'text-on-surface-variant'}`
            }
          >
            Detect
          </NavLink>
          {isAuthenticated && (
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `transition-colors hover:text-on-surface ${isActive ? 'text-primary font-bold border-b-2 border-primary-container pb-1' : 'text-on-surface-variant'}`
              }
            >
              Dashboard
            </NavLink>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button 
              onClick={logout}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all duration-300 scale-95 active:scale-90 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/auth"
              className="px-5 py-2 rounded-xl text-sm font-medium bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all duration-300 scale-95 active:scale-90"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
