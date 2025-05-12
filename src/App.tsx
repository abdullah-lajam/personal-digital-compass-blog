
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import BlogPost from "./pages/BlogPost";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App is rendering, base path: /personal-digital-compass-blog");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/personal-digital-compass-blog">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/:categorySlug" element={<CategoryPage />} />
            <Route path="/:categorySlug/:postSlug" element={<BlogPost />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
