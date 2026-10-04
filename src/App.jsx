import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
const FloatingWhatsApp = lazy(() => import('./components/widgets/FloatingWhatsApp').then(m => ({ default: m.FloatingWhatsApp })));
const ProjectInquiryModal = lazy(() => import('./components/common/ProjectInquiryModal').then(m => ({ default: m.ProjectInquiryModal })));
import { PageTransition } from './components/ui/PageTransition';
import { TopProgressBar } from './components/ui/TopProgressBar';
import { PageSkeleton } from './components/ui/Skeleton';

import { Home } from './pages/Home';

// Code Splitting with React Lazy

const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails').then(m => ({ default: m.ProjectDetails })));
const Technologies = lazy(() => import('./pages/Technologies').then(m => ({ default: m.Technologies })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogDetails = lazy(() => import('./pages/BlogDetails').then(m => ({ default: m.BlogDetails })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

export function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {/* YouTube-style top progress bar — fires on every route change */}
      <TopProgressBar />

      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-600 selection:text-white">
        <Navbar onOpenInquiryModal={() => setInquiryModalOpen(true)} />

        <div className="flex-1">
          {/* PageTransition wraps the routes and handles the curtain sweep animation */}
          <PageTransition>
            <Suspense fallback={<PageSkeleton variant="default" />}>
              <Routes>
                <Route path="/" element={<Home onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/about" element={<About onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/services" element={<Services onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/projects" element={<Projects onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/projects/:slug" element={<ProjectDetails onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/technologies" element={<Technologies onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/blog" element={<Blog onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/blog/:slug" element={<BlogDetails onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/contact" element={<Contact onOpenInquiryModal={() => setInquiryModalOpen(true)} />} />
                <Route path="/controlpanel" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </div>

        <Footer onOpenInquiryModal={() => setInquiryModalOpen(true)} />
        <Suspense fallback={null}>
          <FloatingWhatsApp />
          <ProjectInquiryModal isOpen={inquiryModalOpen} onClose={() => setInquiryModalOpen(false)} />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
