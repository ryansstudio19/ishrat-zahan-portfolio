import { useEffect, useState, type ReactNode } from "react";
import { Route, Switch, useLocation } from "wouter";
import AwardsCertificates from "./pages/AwardsCertificates";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Expertise from "./pages/Expertise";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function PageTransition({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timer = window.setTimeout(() => setTransitioning(false), 760);
    return () => window.clearTimeout(timer);
  }, [location]);

  return <div className={`page-transition ${transitioning ? "is-transitioning" : ""}`} key={location}>
    <div className="route-atmosphere" aria-hidden="true" />
    {children}
  </div>;
}

export default function App() {
  return <PageTransition><Switch>
    <Route path="/" component={Home} />
    <Route path="/career" component={Career} />
    <Route path="/awards-certificates" component={AwardsCertificates} />
    <Route path="/expertise" component={Expertise} />
    <Route path="/contact" component={Contact} />
    <Route component={NotFound} />
  </Switch></PageTransition>;
}
