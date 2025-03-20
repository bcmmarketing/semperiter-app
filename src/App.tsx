import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PrivateRoute } from "@/components/PrivateRoute";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Support from "@/pages/Support";
import CookiesPolicy from "@/pages/CookiesPolicy";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import LegalNotice from "@/pages/LegalNotice";
import Destination from "@/pages/Destination";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AdminRoutes from "@/pages/admin/AdminRoutes";
import UserDashboard from "@/pages/dashboard/UserDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Layout>
              <Toaster />
              <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explorar" element={<Explore />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/legal/cookies" element={<CookiesPolicy />} />
              <Route path="/legal/privacy" element={<PrivacyPolicy />} />
              <Route path="/legal/terms" element={<LegalNotice />} />
              <Route path="/destino/:id" element={<Destination />} />
              <Route path="/admin/*" element={<PrivateRoute requireAdmin><AdminRoutes /></PrivateRoute>} />
              <Route path="/dashboard/*" element={<UserDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Layout>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
