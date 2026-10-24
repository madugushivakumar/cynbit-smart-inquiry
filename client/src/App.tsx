import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { InquiryWizardPage } from './pages/InquiryWizardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inquiry" element={<InquiryWizardPage />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center text-center px-4">
            <div>
              <div className="text-6xl font-black gradient-text mb-4">404</div>
              <h1 className="text-xl font-bold text-white mb-4">Page not found</h1>
              <a href="/" className="btn-primary inline-flex">Go to Home</a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
