import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background print:bg-white">
      {/* Grand Atmospheric Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/15 rounded-full blur-[140px] animate-orb"></div>
        <div className="absolute top-[30%] -right-[15%] w-[50%] h-[70%] bg-secondary-fixed/10 rounded-full blur-[120px] animate-orb-delayed"></div>
        <div className="absolute -bottom-[20%] left-[10%] w-[70%] h-[50%] bg-primary-container/15 rounded-full blur-[160px] animate-orb"></div>
        <div className="absolute top-[10%] left-[40%] w-[30%] h-[30%] bg-tertiary/10 rounded-full blur-[100px] animate-orb-delayed opacity-50"></div>
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="print:hidden">
          <Navbar />
        </div>
        <Outlet />
        <div className="print:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
