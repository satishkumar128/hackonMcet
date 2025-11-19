import React from 'react';

const TooltipProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastViewport } from '@/components/ui/toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/placeholders/Index';
import Dashboard from './pages/placeholders/Dashboard';
import SkillAnalyser from './pages/placeholders/SkillAnalyzer';
import ConsistencyTracker from './pages/placeholders/ConsistencyTracker';
import PeerMatching from './pages/placeholders/PeerMatching';
import Resources from './pages/placeholders/Resources';
import NotFound from './pages/placeholders/NotFound';
import Chatbot from './components/Chatbot';
import MainLayout from './components/MainLayout';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToastViewport />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="skill-analyzer" element={<SkillAnalyser />} />
            <Route path="consistency" element={<ConsistencyTracker />} />
            <Route path="peers" element={<PeerMatching />} />
            <Route path="resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;