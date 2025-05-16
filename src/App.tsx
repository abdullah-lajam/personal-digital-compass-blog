
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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminCreatePost from "./pages/admin/AdminCreatePost";
import AdminEditPost from "./pages/admin/AdminEditPost";
import AdminSettings from "./pages/admin/AdminSettings";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  console.log("App is rendering, base path: /");
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/:categorySlug" element={<CategoryPage />} />
              <Route path="/:categorySlug/:postSlug" element={<BlogPost />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/posts" element={<ProtectedRoute><AdminPosts /></ProtectedRoute>} />
              <Route path="/admin/posts/create" element={<ProtectedRoute><AdminCreatePost /></ProtectedRoute>} />
              <Route path="/admin/posts/:postId/edit" element={<ProtectedRoute><AdminEditPost /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              
              {/* Error Routes */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
