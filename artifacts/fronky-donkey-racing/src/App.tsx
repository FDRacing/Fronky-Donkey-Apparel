import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect } from 'react';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={() => <Shop category="all" />} />
      <Route path="/shop/jerseys" component={() => <Shop category="jerseys" />} />
      <Route path="/shop/hats" component={() => <Shop category="hats" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Force dark mode for that gritty vibe
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
