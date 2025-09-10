
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BookRepair from "./pages/BookRepair";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import Shop from "./pages/Shop";
import ServiceCenters from "./pages/ServiceCenters";
import Technicians from "./pages/Technicians";
import NotFound from "./pages/NotFound";
import SmartphoneRepair from "./pages/SmartphoneRepair";
import LaptopRepair from "./pages/LaptopRepair";
import TabletRepair from "./pages/TabletRepair";
import AudioDeviceRepair from "./pages/AudioDeviceRepair";
import HelpCenter from "./pages/HelpCenter";
import TrackRepair from "./pages/TrackRepair";
import PlanDetails from "./pages/PlanDetails";
import { SplashScreen } from "./components/SplashScreen";
import { SubscriptionPlans } from "./components/SubscriptionPlans";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showSubscription, setShowSubscription] = useState(false);

  useEffect(() => {
    // Check if user has seen splash screen before
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('hasSeenSplash', 'true');
  };

  const handleShowSubscription = () => {
    setShowSubscription(true);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showSubscription) {
    return <SubscriptionPlans />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/subscription" element={<SubscriptionPlans />} />
      <Route path="/plans/:planName" element={<PlanDetails />} />
      <Route path="/book" element={<BookRepair />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/service-centers" element={<ServiceCenters />} />
      <Route path="/technicians" element={<Technicians />} />
      <Route path="/smartphone-repair" element={<SmartphoneRepair />} />
      <Route path="/laptop-repair" element={<LaptopRepair />} />
      <Route path="/tablet-repair" element={<TabletRepair />} />
      <Route path="/audio-repair" element={<AudioDeviceRepair />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/track-repair" element={<TrackRepair />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
