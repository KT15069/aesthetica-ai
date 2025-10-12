import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { Toaster } from './components/ui/toaster';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Generations from './pages/Generations';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { AnimatePresence, motion } from 'framer-motion';

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/generations" element={<Generations />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                <SidebarProvider defaultOpen={true}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex min-h-screen w-full"
                  >
                    <AppSidebar />
                    <main className="flex-1 flex flex-col">
                      <header className="h-12 flex items-center border-b border-border px-4">
                        <SidebarTrigger />
                      </header>
                      <div className="flex-1">
                        <AnimatedRoutes />
                      </div>
                    </main>
                  </motion.div>
                </SidebarProvider>
              }
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
