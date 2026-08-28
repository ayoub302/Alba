import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SobreNosotros from "./components/SobreNosotros";
import CookieBanner from "./components/CookieBanner";
import Reserva from "./components/Reserva";
import AdminDashboard from "./pages/AdminDashboard";
import Callback from "./pages/Callback";
import ProtectedRoute from "./components/ProtectedRoute";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import PoliticaCookies from "./pages/PoliticaCookies";
import AvisoLegal from "./pages/AvisoLegal";
import AiChatAssistant from "./components/AiChatAssistant"; // 👈 NUEVO

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Contact />
    </>
  );
}

function App() {
  return (
    <div style={{ background: "#faf6f0" }}>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
      </Routes>

      <Footer />
      <CookieBanner />
      <AiChatAssistant /> {/* 👈 NUEVO */}
    </div>
  );
}

export default App;