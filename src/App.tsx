import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Departments from "./pages/Departments";
import Sermons from "./pages/Sermons";
import BibleStudy from "./pages/BibleStudy";
import Bible from "./pages/Bible";
import Children from "./pages/Children";
import Media from "./pages/Media";
import Calendar from "./pages/Calendar";
import Downloads from "./pages/Downloads";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/bible-study" element={<BibleStudy />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="/children" element={<Children />} />
          <Route path="/media" element={<Media />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
