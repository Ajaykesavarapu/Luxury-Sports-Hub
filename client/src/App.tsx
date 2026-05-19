import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ThemeToggle from "@/components/ThemeToggle";

// Lazy loaded pages
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Sports = lazy(() => import("@/pages/Sports"));
const Facilities = lazy(() => import("@/pages/Facilities"));
const Events = lazy(() => import("@/pages/Events"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const MSKAcademy = lazy(() => import("@/pages/MSKAcademy"));
const Contact = lazy(() => import("@/pages/Contact"));
const Coaches = lazy(() => import("@/pages/Coaches"));
const CoachProfile = lazy(() => import("@/pages/CoachProfile"));
const SportDetail = lazy(() => import("@/pages/SportDetail"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function AppRouter() {
  return (
    <div className="flex flex-col min-h-screen bg-grain">
      <CustomCursor />
      <ThemeToggle />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]">
            <div className="h-1 bg-primary absolute top-1/2 left-0 -translate-y-1/2 w-1/2 animate-pulse" />
            <h1 className="text-primary text-3xl md:text-5xl font-bold tracking-widest uppercase animate-pulse">
              LOADING
            </h1>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/sports/:sportId" element={<SportDetail />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/msk-academy" element={<MSKAcademy />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/coaches/:id" element={<CoachProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <AppRouter />
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
