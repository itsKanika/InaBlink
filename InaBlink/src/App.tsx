import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// Components
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import PipelineViewer from './pages/PipelineViewer';
import About from './pages/About';
import { ThemeProvider } from './context/ThemeContext';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/pipelines" element={<PipelineViewer />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;