import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Profile from "@/pages/profile";
import Destinations from "@/pages/destinations";
import CruiseDetails from "@/pages/cruise-details";
import Booking from "@/pages/booking";
import Contact from "@/pages/contact";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/cruise/:id" component={CruiseDetails} />
          <Route path="/booking/:cruiseId" component={Booking} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
