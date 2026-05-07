import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Detection = lazy(() => import('./pages/Detection'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Results = lazy(() => import('./pages/Results'));
const Auth = lazy(() => import('./pages/Auth'));
const ApiDocs = lazy(() => import('./pages/ApiDocs'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));

// A simple fallback spinner for Suspense
const SuspenseFallback = () => (
  <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center bg-surface">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
      <p className="text-on-surface-variant font-medium animate-pulse">Loading Module...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="detect" element={<Detection />} />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="result" element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              } />
              <Route path="auth" element={<Auth />} />
              <Route path="docs" element={<ApiDocs />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
