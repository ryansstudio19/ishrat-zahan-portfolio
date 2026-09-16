import { useEffect, useState, type ReactNode } from "react";
import { Route, Switch, useLocation } from "wouter";
import AwardsCertificates from "./pages/AwardsCertificates";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Expertise from "./pages/Expertise";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminUpload from "./pages/AdminUpload";
import { AuthProvider } from "./contexts/AuthContext";
import IntroSequence from "./components/IntroSequence";
import { AnimatePresence, motion } from "framer-motion";

function PageTransition({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("iz_portfolio_intro_seen") === "true";
    }
    return false;
  });

  useEffect(() => {
    const handleReplay = () => {
      setIntroComplete(false);
    };
    window.addEventListener("replay-intro", handleReplay);
    return () => window.removeEventListener("replay-intro", handleReplay);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("iz_portfolio_intro_seen", "true");
    setIntroComplete(true);
  };

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        {!introComplete && (
          <IntroSequence key="intro-sequence" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main app content with motion page transitions */}
      <PageTransition>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/career" component={Career} />
          <Route path="/awards-certificates" component={AwardsCertificates} />
          <Route path="/expertise" component={Expertise} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/upload" component={AdminUpload} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AuthProvider>
  );
}


