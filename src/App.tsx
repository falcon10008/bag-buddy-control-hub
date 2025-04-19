
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";

import Auth from "./pages/auth";
import Dashboard from "./pages/Dashboard";
import LuggageList from "./pages/LuggageList";
import LuggageDetail from "./pages/LuggageDetail";
import ScanPage from "./pages/ScanPage";
import LostFound from "./pages/LostFound";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import StockView from "./pages/StockView";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/luggage" element={<ProtectedRoute><LuggageList /></ProtectedRoute>} />
              <Route path="/luggage/:id" element={<ProtectedRoute><LuggageDetail /></ProtectedRoute>} />
              <Route path="/scan" element={<ProtectedRoute><ScanPage /></ProtectedRoute>} />
              <Route path="/lost-found" element={<ProtectedRoute><LostFound /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/stock" element={<ProtectedRoute><StockView /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
