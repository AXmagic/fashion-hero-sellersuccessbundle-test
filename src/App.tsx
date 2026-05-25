import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SellerLanding from "./pages/seller/SellerLanding.tsx";
import SellerFlow from "./pages/seller/SellerFlow.tsx";
import SellerUnlock from "./pages/seller/SellerUnlock.tsx";
import SellerEvents from "./pages/seller/SellerEvents.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SellerLanding />} />
          <Route path="/seller" element={<SellerLanding />} />
          {import.meta.env.DEV && (
            <Route path="/seller/_events" element={<SellerEvents />} />
          )}
          <Route path="/seller/:profile" element={<SellerFlow />} />
          <Route path="/seller/:profile/unlock" element={<SellerUnlock />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
