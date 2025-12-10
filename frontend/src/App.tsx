import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { EmbroideryDigitizing } from './pages/EmbroideryDigitizing';
import { CustomPatches } from './pages/CustomPatches';
import { VectorConversion } from './pages/VectorConversion';
import { Order } from './pages/Order';
import { Pricing } from './pages/Pricing';
import { Portfolio } from './pages/Portfolio';
import { HowItWorks } from './pages/HowItWorks';
import { FAQs } from './pages/FAQs';
import { Contact } from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/account/Dashboard';
import Orders from './pages/account/Orders';
import OrderDetail from './pages/account/OrderDetail';
import Payments from './pages/account/Payments';
import Downloads from './pages/account/Downloads';
import Profile from './pages/account/Profile';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/embroidery-digitizing" element={<EmbroideryDigitizing />} />
          <Route path="/services/custom-patches" element={<CustomPatches />} />
          <Route path="/services/vector-conversion" element={<VectorConversion />} />
          <Route path="/order" element={<Order />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Account routes */}
          <Route path="/account" element={<Dashboard />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/orders/:id" element={<OrderDetail />} />
          <Route path="/account/payments" element={<Payments />} />
          <Route path="/account/downloads" element={<Downloads />} />
          <Route path="/account/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
