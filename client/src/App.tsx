import { Route, Switch } from "wouter";
import AwardsCertificates from "./pages/AwardsCertificates";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Expertise from "./pages/Expertise";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/career" component={Career} />
    <Route path="/awards-certificates" component={AwardsCertificates} />
    <Route path="/expertise" component={Expertise} />
    <Route path="/contact" component={Contact} />
    <Route component={NotFound} />
  </Switch>;
}
