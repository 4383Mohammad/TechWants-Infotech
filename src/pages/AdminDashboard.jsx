import React, { useState, useEffect } from 'react';
import { getLeads, updateLeadStatus, deleteLead, addManualLead } from '../services/leadService';
import { getProjects, addProject, deleteProject } from '../services/projectService';
import { getBlogs, addBlog, deleteBlog } from '../services/blogService';
import { auth } from '../firebase';
import { company } from '../data/company';
import { updateSEO } from '../utils/seo';
import { Logo } from '../components/common/Logo';
import { 
  Users, ShieldCheck, CheckCircle2, Clock, Trash2, Eye, RefreshCw, 
  Lock, User, Key, LogOut, Plus, Download, Search, Phone, Mail, 
  MessageSquareCode, FileText, Check, AlertCircle, EyeOff, AlertTriangle, Sparkles,
  FolderKanban, ExternalLink, Globe, Layers, BookOpen, HelpCircle, Code2, Copy, Tag, Calendar
} from 'lucide-react';

const ADMIN_PASSWORD = "Mohammad9534";
const AUTH_KEY = "techwants_admin_authed";

export const AdminDashboard = () => {
  useEffect(() => {
    updateSEO({
      title: "Admin Portal | TechWants Infotech Management Dashboard",
      description: "Secure management portal for TechWants Infotech.",
      canonicalUrl: `${company.website}/admin`
    });
  }, []);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true' || sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');

  // Active Tab: 'leads' | 'projects'
  const [activeTab, setActiveTab] = useState('leads');

  // Leads Data State
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Projects Data State
  const [projectsList, setProjectsList] = useState([]);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Blogs Data State
  const [blogsList, setBlogsList] = useState([]);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('All');
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [previewSchemaBlog, setPreviewSchemaBlog] = useState(null);
  const [copiedSlugId, setCopiedSlugId] = useState(null);

  // New Blog Form State
  const [newBlogData, setNewBlogData] = useState({
    title: '',
    slug: '',
    category: 'AEO & GEO',
    customCategory: '',
    author: 'Mansuri Mohammad',
    readTime: '',
    image: '',
    excerpt: '',
    content: '',
    tags: '',
    schemaType: 'Article',
    faqItems: []
  });

  const [currentFaqQ, setCurrentFaqQ] = useState('');
  const [currentFaqA, setCurrentFaqA] = useState('');

  // New Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    service: 'Web Development',
    budget: '₹50,00,000 - ₹1,00,000',
    message: ''
  });

  // New Project Form State
  const [newProjectData, setNewProjectData] = useState({
    title: '',
    category: 'Web Development',
    shortDescription: '',
    description: '',
    image: '',
    client: '',
    liveUrl: '',
    technologies: ''
  });

  // Show temporary toast feedback
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const fetchAllData = async () => {
    const leadsData = await getLeads();
    setLeads(leadsData);

    const projectsData = await getProjects();
    setProjectsList(projectsData);

    const blogsData = await getBlogs();
    setBlogsList(blogsData);
    
    showToast("Dashboard data refreshed!");
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const u = usernameInput.trim();
    const p = passwordInput.trim();

    const isValidUser = u === 'TechWantsAdmin';
    const isValidPass = p === ADMIN_PASSWORD;

    if (isValidUser && isValidPass) {
      if (rememberMe) {
        localStorage.setItem(AUTH_KEY, 'true');
      } else {
        sessionStorage.setItem(AUTH_KEY, 'true');
      }
      setIsAuthenticated(true);
      setAuthError('');
      showToast("Welcome back, Admin!");
    } else {
      setAuthError('Invalid Username or Password. Please check your credentials.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
    showToast("Logged out successfully.");
  };

  // Lead Status Change
  const handleStatusChange = async (id, newStatus) => {
    const updated = await updateLeadStatus(id, newStatus);
    setLeads(updated);
    showToast(`Lead status updated to "${newStatus}"`);
  };

  // Delete Lead Confirmation Handler
  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    const updated = await deleteLead(leadToDelete.id);
    setLeads(updated);
    if (selectedLead && selectedLead.id === leadToDelete.id) {
      setSelectedLead(null);
    }
    showToast(`Lead for "${leadToDelete.name}" deleted successfully.`);
    setLeadToDelete(null);
  };

  // Add Manual Lead Submit
  const handleAddManualLeadSubmit = async (e) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.phone) {
      alert("Please fill in at least Client Name and Phone Number.");
      return;
    }
    await addManualLead(newLeadData);
    const updated = await getLeads();
    setLeads(updated);
    setIsAddLeadModalOpen(false);
    showToast(`New lead added for ${newLeadData.name}`);
    setNewLeadData({
      name: '',
      phone: '',
      email: '',
      companyName: '',
      service: 'Web Development',
      budget: '₹50,000 - ₹1,00,000',
      message: ''
    });
  };

  // Add Project Submit
  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    if (!newProjectData.title || !newProjectData.description) {
      alert("Please provide at least a Project Title and Description.");
      return;
    }
    await addProject(newProjectData);
    const updated = await getProjects();
    setProjectsList(updated);
    setIsAddProjectModalOpen(false);
    showToast(`New project "${newProjectData.title}" published!`);
    setNewProjectData({
      title: '',
      category: 'Web Development',
      shortDescription: '',
      description: '',
      image: '',
      client: '',
      liveUrl: '',
      technologies: ''
    });
  };

  // Delete Project Confirmation
  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    const updated = await deleteProject(projectToDelete.id);
    setProjectsList(updated);
    showToast(`Project "${projectToDelete.title}" deleted.`);
    setProjectToDelete(null);
  };

  // Blog Handlers
  const handleBlogTitleChange = (val) => {
    const prevAutoSlug = newBlogData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    const isAutoSlugOrEmpty = !newBlogData.slug || newBlogData.slug === prevAutoSlug;
    const newAutoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setNewBlogData(prev => ({
      ...prev,
      title: val,
      slug: isAutoSlugOrEmpty ? newAutoSlug : prev.slug
    }));
  };

  const handleAddFaqItem = () => {
    if (!currentFaqQ.trim() || !currentFaqA.trim()) return;
    setNewBlogData(prev => ({
      ...prev,
      faqItems: [...prev.faqItems, { question: currentFaqQ.trim(), answer: currentFaqA.trim() }]
    }));
    setCurrentFaqQ('');
    setCurrentFaqA('');
  };

  const handleRemoveFaqItem = (index) => {
    setNewBlogData(prev => ({
      ...prev,
      faqItems: prev.faqItems.filter((_, i) => i !== index)
    }));
  };

  const handleAddBlogSubmit = async (e) => {
    e.preventDefault();
    if (!newBlogData.title.trim() || !newBlogData.content.trim()) {
      alert("Please provide at least a Blog Title and Article Content.");
      return;
    }
    const finalCategory = newBlogData.category === 'Other'
      ? (newBlogData.customCategory.trim() || 'Technology Insights')
      : newBlogData.category;

    await addBlog({
      ...newBlogData,
      category: finalCategory
    });

    const updated = await getBlogs();
    setBlogsList(updated);
    setIsAddBlogModalOpen(false);
    showToast(`Article "${newBlogData.title}" published successfully!`);

    setNewBlogData({
      title: '',
      slug: '',
      category: 'AEO & GEO',
      customCategory: '',
      author: 'Mansuri Mohammad',
      readTime: '',
      image: '',
      excerpt: '',
      content: '',
      tags: '',
      schemaType: 'Article',
      faqItems: []
    });
    setCurrentFaqQ('');
    setCurrentFaqA('');
  };

  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return;
    const updated = await deleteBlog(blogToDelete.id);
    setBlogsList(updated);
    showToast(`Article "${blogToDelete.title}" deleted.`);
    setBlogToDelete(null);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSlugId(id);
    setTimeout(() => setCopiedSlugId(null), 2000);
    showToast("URL copied to clipboard!");
  };

  // Filtered Blogs
  const filteredBlogs = blogsList.filter(b => {
    const matchesCat = blogCategoryFilter === 'All' || b.category.toLowerCase() === blogCategoryFilter.toLowerCase();
    const q = blogSearchQuery.toLowerCase();
    const matchesQ = !q ||
      b.title.toLowerCase().includes(q) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(q)) ||
      (b.content && b.content.toLowerCase().includes(q)) ||
      (Array.isArray(b.tags) && b.tags.some(t => t.toLowerCase().includes(q)));
    return matchesCat && matchesQ;
  });

  // Export CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast("No leads available to export.");
      return;
    }
    const headers = ["ID", "Name", "Phone", "Email", "Company", "Service", "Budget", "Status", "Date", "Source", "Message"];
    const rows = leads.map(l => [
      l.id,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.company || ''}"`,
      `"${l.service || ''}"`,
      `"${l.budget || ''}"`,
      `"${l.status || ''}"`,
      `"${l.createdAt || ''}"`,
      `"${l.source || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `techwants_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Leads exported to CSV successfully.");
  };

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      (lead.name && lead.name.toLowerCase().includes(q)) ||
      (lead.email && lead.email.toLowerCase().includes(q)) ||
      (lead.phone && lead.phone.toLowerCase().includes(q)) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      (lead.service && lead.service.toLowerCase().includes(q)) ||
      (lead.message && lead.message.toLowerCase().includes(q));
    
    return matchesStatus && matchesQuery;
  });

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const inDiscussionCount = leads.filter(l => l.status === 'In Discussion').length;
  const convertedLeadsCount = leads.filter(l => l.status === 'Converted').length;

  // ----------------------------------------------------
  // UNAUTHENTICATED LOGIN SCREEN (Clean & Un-hinted)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
        
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative z-10">
          
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-500/40 text-brand-400 flex items-center justify-center shadow-lg shadow-brand-600/20">
                <ShieldCheck className="w-8 h-8 text-brand-400" />
              </div>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Access Control</span>
            </div>

            <h1 className="text-2xl font-black text-white">Sign In to Dashboard</h1>
            <p className="text-xs text-slate-400">Enter your credentials to manage lead inquiries and portfolio data.</p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-300 text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter Username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>



            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-brand-600 focus:ring-0"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition-all shadow-lg shadow-brand-600/25 active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 text-center text-[11px] text-slate-500">
            TechWants Infotech © {new Date().getFullYear()} — Secure Admin Management System
          </div>

        </div>
      </main>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <main className="pt-24 pb-20 bg-slate-950 min-h-screen text-slate-100 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-brand-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-pink-400/40 font-bold text-xs flex items-center gap-2.5 animate-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-pink-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-600/20 border border-brand-500/40 text-brand-400 flex items-center justify-center shrink-0 shadow-lg shadow-brand-600/20">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-brand-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <Check className="w-3 h-3" />
                <span>Logged in as Admin</span>
              </div>
              <h1 className="text-2xl font-black text-white">TechWants Admin Portal</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {activeTab === 'leads' ? (
              <button
                onClick={() => setIsAddLeadModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md shadow-brand-600/20 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lead</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-md shadow-brand-600/20 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            )}

            {activeTab === 'leads' && (
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold transition-colors text-slate-200 active:scale-95"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export CSV</span>
              </button>
            )}

            <button
              onClick={fetchAllData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold transition-colors text-slate-200 active:scale-95"
              title="Refresh dashboard data"
            >
              <RefreshCw className="w-4 h-4 text-brand-400" />
              <span>Refresh Data</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-900/60 text-xs font-bold text-red-300 transition-colors active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Top Section Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'leads'
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leads Management ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'projects'
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects Management ({projectsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'blogs'
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog Management ({blogsList.length})</span>
          </button>
        </div>

        {/* Dashboard Statistics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Leads</div>
            <div className="text-3xl font-black text-white">{totalLeads}</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-brand-400 uppercase">New Leads</div>
            <div className="text-3xl font-black text-brand-400">{newLeadsCount}</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-amber-400 uppercase">In Discussion</div>
            <div className="text-3xl font-black text-amber-400">{inDiscussionCount}</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-emerald-400 uppercase">Converted</div>
            <div className="text-3xl font-black text-emerald-400">{convertedLeadsCount}</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-purple-400 uppercase">Total Projects</div>
            <div className="text-3xl font-black text-purple-400">{projectsList.length}</div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Published Blogs</div>
            <div className="text-3xl font-black text-white">{blogsList.length}</div>
          </div>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client name, email, phone, service..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-600"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {['All', 'New', 'Contacted', 'In Discussion', 'Converted', 'Closed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      statusFilter === tab
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

            </div>

            {/* Leads Table Card */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-400" />
                  <span>Inquiry Leads List</span>
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  Showing {filteredLeads.length} of {leads.length} recorded leads
                </span>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-2">
                  <FileText className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <div className="text-base font-bold text-slate-400">No matching leads found</div>
                  <p className="text-xs">Try adjusting your search criteria or filter options.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-4 px-6">Client Name</th>
                        <th className="py-4 px-6">Phone / Contact</th>
                        <th className="py-4 px-6">Service Required</th>
                        <th className="py-4 px-6">Budget</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-bold text-white">
                            <div>{lead.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{lead.company}</div>
                          </td>
                          <td className="py-4 px-6 text-slate-300">
                            <div>{lead.phone}</div>
                            <div className="text-[10px] text-slate-500">{lead.email}</div>
                          </td>
                          <td className="py-4 px-6 font-semibold text-brand-400">
                            {lead.service}
                          </td>
                          <td className="py-4 px-6 text-slate-300">
                            {lead.budget}
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold outline-none border cursor-pointer ${
                                lead.status === 'New'
                                  ? 'bg-pink-950/80 text-pink-400 border-pink-800'
                                  : lead.status === 'Converted'
                                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                                  : lead.status === 'In Discussion'
                                  ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                                  : lead.status === 'Contacted'
                                  ? 'bg-indigo-950/80 text-indigo-400 border-indigo-800'
                                  : 'bg-slate-800 text-slate-300 border-slate-700'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-slate-400">
                            {lead.createdAt}
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-400 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setLeadToDelete(lead)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/50 text-red-400 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-purple-400" />
                  <span>Portfolio Projects Management</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Add, edit, or remove portfolio projects. Published projects appear live on `/projects` and the homepage.
                </p>
              </div>

              <button
                onClick={() => setIsAddProjectModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {projectsList.length === 0 ? (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-12 text-center space-y-4">
                <FolderKanban className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-lg font-bold text-white">No Projects Added Yet</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  You haven't added any projects to your portfolio yet. Click "Add Project" to publish your first client project or case study.
                </p>
                <button
                  onClick={() => setIsAddProjectModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
                >
                  Publish First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsList.map((proj) => (
                  <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-video overflow-hidden bg-slate-950">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-pink-400 text-[10px] font-bold border border-slate-800">
                          {proj.category}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="text-base font-bold text-white leading-snug">{proj.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>
                        
                        {proj.technologies && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {(Array.isArray(proj.technologies) ? proj.technologies : [proj.technologies]).map((t, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-slate-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/50 text-xs">
                      <span className="text-slate-500 text-[11px]">{proj.client || 'Client Project'}</span>
                      <button
                        onClick={() => setProjectToDelete(proj)}
                        className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 font-semibold border border-red-900/60 flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: BLOGS MANAGEMENT */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            
            {/* Top Bar: Title & Add Button */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-400" />
                  <span>Blog & Perspectives Management</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Publish SEO & AEO articles with custom schema markup, slug URLs, meta descriptions, and featured images.
                </p>
              </div>

              <button
                onClick={() => setIsAddBlogModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 self-start sm:self-auto shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Article</span>
              </button>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  placeholder="Search articles by title, tags, or content..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-600"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {['All', 'AEO & GEO', 'GEO', 'Web Development', 'SEO', 'Technology'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setBlogCategoryFilter(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      blogCategoryFilter.toLowerCase() === cat.toLowerCase()
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List / Grid */}
            {filteredBlogs.length === 0 ? (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-12 text-center space-y-4">
                <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-lg font-bold text-white">No Articles Found</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {blogSearchQuery || blogCategoryFilter !== 'All' 
                    ? "Try adjusting your search criteria or category filter." 
                    : "No blog articles found. Click 'Publish New Article' to create your first dynamic post."}
                </p>
                <button
                  onClick={() => setIsAddBlogModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
                >
                  Publish First Article
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((b) => (
                  <div key={b.id || b.slug} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all">
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-video overflow-hidden bg-slate-950">
                        <img 
                          src={b.image || "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80"} 
                          alt={b.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-pink-400 text-[10px] font-bold border border-slate-800">
                          {b.category}
                        </span>
                        {b.readTime && (
                          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-bold border border-slate-800">
                            {b.readTime}
                          </span>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="p-5 space-y-3">
                        <h4 className="text-base font-bold text-white leading-snug line-clamp-2">{b.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2">{b.excerpt || b.description}</p>
                        
                        {/* URL Slug Pill */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                          <span className="truncate">/blog/{b.slug}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(`${company.website}/blog/${b.slug}`, b.id || b.slug)}
                            className="p-1 hover:text-white transition-colors"
                            title="Copy full URL"
                          >
                            {copiedSlugId === (b.id || b.slug) ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Schema Status Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{b.schemaType || 'Article'} Schema</span>
                          </span>

                          {Array.isArray(b.faqItems) && b.faqItems.length > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-pink-950/80 border border-pink-800 text-pink-400 text-[10px] font-semibold">
                              <HelpCircle className="w-3 h-3" />
                              <span>{b.faqItems.length} AEO FAQs</span>
                            </span>
                          )}
                        </div>

                        {/* Tags */}
                        {b.tags && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {(Array.isArray(b.tags) ? b.tags : [b.tags]).slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/50 text-xs">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Live</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setPreviewSchemaBlog(b)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-400 font-medium flex items-center gap-1.5 transition-colors"
                          title="Inspect JSON-LD Schema"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>Schema</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setBlogToDelete(b)}
                        className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 font-semibold border border-red-900/60 flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Lead View Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-lg w-full text-white space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h4 className="text-xl font-bold">{selectedLead.name}</h4>
                  <div className="text-xs text-brand-400">{selectedLead.company}</div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Phone Number</span>
                    <a href={`tel:${selectedLead.phone}`} className="font-bold text-white hover:text-brand-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-400" />
                      <span>{selectedLead.phone}</span>
                    </a>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Email Address</span>
                    <a href={`mailto:${selectedLead.email}`} className="font-bold text-white hover:text-brand-400 flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-brand-400" />
                      <span className="truncate">{selectedLead.email || 'N/A'}</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Requested Service</span>
                    <span className="font-bold text-brand-400">{selectedLead.service}</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Estimated Budget</span>
                    <span className="font-bold text-white">{selectedLead.budget}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Inquiry Source & Date</span>
                  <span className="text-slate-300 font-semibold">{selectedLead.source} — {selectedLead.createdAt}</span>
                </div>

                <div className="pt-1">
                  <span className="text-slate-400 font-bold block mb-1.5">Project Description & Requirements:</span>
                  <p className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 leading-relaxed text-xs">
                    {selectedLead.message || "No detailed message provided."}
                  </p>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${selectedLead.phone ? selectedLead.phone.replace(/[^0-9]/g, '') : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <MessageSquareCode className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => setLeadToDelete(selectedLead)}
                  className="px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900/80 border border-red-800 text-red-300 font-bold text-xs flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Custom Delete Lead Confirmation Modal */}
        {leadToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-red-900/60 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 text-red-400 border border-red-800/80 flex items-center justify-center mb-2">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">Delete Lead Record?</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Are you sure you want to permanently delete the lead record for <strong className="text-white">{leadToDelete.name}</strong> ({leadToDelete.phone})?
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <div><strong>Service:</strong> {leadToDelete.service}</div>
                <div><strong>Company:</strong> {leadToDelete.company}</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setLeadToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDeleteLead}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30"
                >
                  Yes, Delete Record
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Project Confirmation Modal */}
        {projectToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-red-900/60 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 text-red-400 border border-red-800/80 flex items-center justify-center mb-2">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">Delete Project?</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Are you sure you want to remove <strong className="text-white">{projectToDelete.title}</strong> from your portfolio?
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setProjectToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDeleteProject}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Manual Lead Modal */}
        {isAddLeadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-md w-full text-white space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h4 className="text-xl font-bold">Add New Client Lead</h4>
                <button
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddManualLeadSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    placeholder="e.g. Amit Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    value={newLeadData.companyName}
                    onChange={(e) => setNewLeadData({ ...newLeadData, companyName: e.target.value })}
                    placeholder="Company Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Service</label>
                    <select
                      value={newLeadData.service}
                      onChange={(e) => setNewLeadData({ ...newLeadData, service: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Custom ERP Software">Custom ERP Software</option>
                      <option value="SEO & Digital Marketing">SEO & Marketing</option>
                      <option value="E-Commerce Development">E-Commerce</option>
                      <option value="Mobile App Development">Mobile App</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Budget</label>
                    <select
                      value={newLeadData.budget}
                      onChange={(e) => setNewLeadData({ ...newLeadData, budget: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    >
                      <option value="Under ₹25,000">Under ₹25,000</option>
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000+">₹1,00,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Requirement Details</label>
                  <textarea
                    rows="3"
                    value={newLeadData.message}
                    onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                    placeholder="Notes or client project brief..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-md shadow-brand-600/20"
                  >
                    Save Lead
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Add Project Modal */}
        {isAddProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-lg w-full text-white space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h4 className="text-xl font-bold">Publish New Portfolio Project</h4>
                <button
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProjectSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={newProjectData.title}
                    onChange={(e) => setNewProjectData({ ...newProjectData, title: e.target.value })}
                    placeholder="e.g. Apex E-Commerce Storefront"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Category</label>
                    <select
                      value={newProjectData.category}
                      onChange={(e) => setNewProjectData({ ...newProjectData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="ERP">ERP & Software</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="SEO">SEO & Digital Marketing</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="AI">AI Solution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Client Name</label>
                    <input
                      type="text"
                      value={newProjectData.client}
                      onChange={(e) => setNewProjectData({ ...newProjectData, client: e.target.value })}
                      placeholder="e.g. Retail Client"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProjectData.image}
                    onChange={(e) => setNewProjectData({ ...newProjectData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/... (optional)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={newProjectData.technologies}
                    onChange={(e) => setNewProjectData({ ...newProjectData, technologies: e.target.value })}
                    placeholder="React, Vite, Tailwind CSS, Node.js"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Project Description *</label>
                  <textarea
                    rows="3"
                    required
                    value={newProjectData.description}
                    onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}
                    placeholder="Describe the client requirement, features built, and project highlights..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Live Project Link (optional)</label>
                  <input
                    type="url"
                    value={newProjectData.liveUrl}
                    onChange={(e) => setNewProjectData({ ...newProjectData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-md shadow-brand-600/20"
                  >
                    Publish Project
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ── ADD BLOG MODAL ── */}
        {isAddBlogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-2xl w-full text-white space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto my-auto">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-400" />
                    <span>Publish New Blog Article</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Engineered for Google SEO, Answer Engine Optimization (AEO), and AI Generative Search.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddBlogModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddBlogSubmit} className="space-y-5 text-xs">
                
                {/* 1. Title */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={newBlogData.title}
                    onChange={(e) => handleBlogTitleChange(e.target.value)}
                    placeholder="e.g. SEO vs AEO vs GEO: How AI Is Transforming Search in 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600 font-semibold"
                  />
                </div>

                {/* 2. URL Slug with live preview */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-300 font-bold">Custom URL Slug *</label>
                    <span className="text-[10px] text-brand-400 font-mono">https://techwantsinfotech.com/blog/{newBlogData.slug || 'my-slug'}</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={newBlogData.slug}
                    onChange={(e) => setNewBlogData({ ...newBlogData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })}
                    placeholder="seo-vs-aeo-vs-geo-guide"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600 font-mono text-xs"
                  />
                </div>

                {/* 3. Category & Author & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Category *</label>
                    <select
                      value={newBlogData.category}
                      onChange={(e) => setNewBlogData({ ...newBlogData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none cursor-pointer"
                    >
                      <option value="AEO & GEO">AEO & GEO</option>
                      <option value="GEO">GEO</option>
                      <option value="Web Development">Web Development</option>
                      <option value="SEO">Technical SEO</option>
                      <option value="Custom ERP">Custom ERP</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Technology Insights">Technology Insights</option>
                      <option value="Other">Other (Custom)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Author</label>
                    <input
                      type="text"
                      value={newBlogData.author}
                      onChange={(e) => setNewBlogData({ ...newBlogData, author: e.target.value })}
                      placeholder="Mansuri Mohammad"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Read Time</label>
                    <input
                      type="text"
                      value={newBlogData.readTime}
                      onChange={(e) => setNewBlogData({ ...newBlogData, readTime: e.target.value })}
                      placeholder="e.g. 5 min read"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                {/* Custom Category Input if "Other" */}
                {newBlogData.category === 'Other' && (
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Custom Category Name</label>
                    <input
                      type="text"
                      value={newBlogData.customCategory}
                      onChange={(e) => setNewBlogData({ ...newBlogData, customCategory: e.target.value })}
                      placeholder="Enter custom category name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                    />
                  </div>
                )}

                {/* 4. Featured Image URL + Quick Presets */}
                <div className="space-y-2">
                  <label className="block text-slate-300 font-bold">Featured Image URL</label>
                  <input
                    type="url"
                    value={newBlogData.image}
                    onChange={(e) => setNewBlogData({ ...newBlogData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/... (optional)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />

                  {/* Image Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-400 font-medium">Quick Presets:</span>
                    {[
                      { label: 'AI & Data', url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Web Tech', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Analytics', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
                      { label: 'Cloud', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
                    ].map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewBlogData({ ...newBlogData, image: preset.url })}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-brand-500 text-[10px] text-slate-300 hover:text-white"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {newBlogData.image && (
                    <div className="w-full h-28 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mt-2">
                      <img src={newBlogData.image} alt="Cover Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* 5. Excerpt / SEO Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-300 font-bold">Excerpt / SEO Meta Description *</label>
                    <span className="text-[10px] text-slate-500">Google snippet & AEO direct definition</span>
                  </div>
                  <textarea
                    rows="2"
                    required
                    value={newBlogData.excerpt}
                    onChange={(e) => setNewBlogData({ ...newBlogData, excerpt: e.target.value })}
                    placeholder="Concise, factual summary of the article (1-2 sentences). Used for Google Meta Description and Answer Engine previews."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  ></textarea>
                </div>

                {/* 6. Full Article Content */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-300 font-bold">Full Article Content (Markdown) *</label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setNewBlogData(prev => ({ ...prev, content: prev.content + "\n\n### Heading Title\n" }))}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white font-mono"
                      >
                        + Heading
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewBlogData(prev => ({ ...prev, content: prev.content + "\n- Point one\n- Point two\n" }))}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white font-mono"
                      >
                        + Bullets
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows="7"
                    required
                    value={newBlogData.content}
                    onChange={(e) => setNewBlogData({ ...newBlogData, content: e.target.value })}
                    placeholder="Write your article content here... Use markdown headings (### Heading) and paragraphs."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600 font-mono text-xs leading-relaxed"
                  ></textarea>
                </div>

                {/* 7. Tags */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newBlogData.tags}
                    onChange={(e) => setNewBlogData({ ...newBlogData, tags: e.target.value })}
                    placeholder="AEO, GEO, AI Search, TechWants Infotech"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-600"
                  />
                </div>

                {/* 8. SEO & AEO Schema Rich Snippet Section */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-400" />
                      <span className="font-bold text-white text-xs">Schema.org & AEO Rich Snippets</span>
                    </div>

                    <select
                      value={newBlogData.schemaType}
                      onChange={(e) => setNewBlogData({ ...newBlogData, schemaType: e.target.value })}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white text-[11px] outline-none"
                    >
                      <option value="Article">Schema: Article</option>
                      <option value="TechArticle">Schema: TechArticle</option>
                      <option value="BlogPosting">Schema: BlogPosting</option>
                    </select>
                  </div>

                  {/* Add FAQ Q&A for Answer Engine Optimization */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block font-semibold">
                      Add FAQ Question & Direct Answer (Generates Google FAQPage Schema for Voice & Rich Snippets):
                    </span>

                    <input
                      type="text"
                      value={currentFaqQ}
                      onChange={(e) => setCurrentFaqQ(e.target.value)}
                      placeholder="e.g. What is Answer Engine Optimization?"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-brand-600"
                    />

                    <textarea
                      rows="2"
                      value={currentFaqA}
                      onChange={(e) => setCurrentFaqA(e.target.value)}
                      placeholder="e.g. AEO is the optimization of content headings, direct definitions, and FAQ schema so search engines provide instant answers."
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-brand-600"
                    ></textarea>

                    <button
                      type="button"
                      onClick={handleAddFaqItem}
                      className="px-3 py-1.5 rounded-lg bg-pink-950 text-pink-300 hover:bg-pink-900 border border-pink-800 text-[11px] font-bold"
                    >
                      + Add FAQ Pair to Schema
                    </button>

                    {newBlogData.faqItems.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        {newBlogData.faqItems.map((faq, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
                            <div className="truncate mr-2">
                              <span className="text-brand-400 font-bold">Q:</span> {faq.question}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFaqItem(idx)}
                              className="text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit / Cancel */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddBlogModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-md shadow-brand-600/20"
                  >
                    Publish Blog Article
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ── DELETE BLOG CONFIRMATION MODAL ── */}
        {blogToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h4 className="text-lg font-bold">Delete Article?</h4>
                <p className="text-xs text-slate-400">
                  Are you sure you want to delete <strong className="text-white">"{blogToDelete.title}"</strong>? This will remove the article and its SEO schema markup.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBlogToDelete(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteBlog}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/20"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── SCHEMA PREVIEW MODAL ── */}
        {previewSchemaBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 max-w-xl w-full text-white space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto my-auto">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-brand-400" />
                  <div>
                    <h4 className="text-base font-bold">JSON-LD Schema Preview</h4>
                    <span className="text-[11px] text-slate-400 truncate max-w-xs block">{previewSchemaBlog.title}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewSchemaBlog(null)}
                  className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
                <pre className="text-[11px] font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                      {
                        "@type": previewSchemaBlog.schemaType || "Article",
                        "headline": previewSchemaBlog.title,
                        "description": previewSchemaBlog.excerpt,
                        "image": [previewSchemaBlog.image],
                        "datePublished": previewSchemaBlog.date,
                        "dateModified": previewSchemaBlog.updatedAt || previewSchemaBlog.date,
                        "author": {
                          "@type": "Person",
                          "name": previewSchemaBlog.author || company.founder
                        },
                        "publisher": {
                          "@type": "Organization",
                          "name": company.name,
                          "logo": {
                            "@type": "ImageObject",
                            "url": `${company.website}/logo_transparent.png`
                          }
                        }
                      },
                      {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                          { "@type": "ListItem", "position": 1, "name": "Blog", "item": `${company.website}/blog` },
                          { "@type": "ListItem", "position": 2, "name": previewSchemaBlog.title, "item": `${company.website}/blog/${previewSchemaBlog.slug}` }
                        ]
                      },
                      ...(previewSchemaBlog.faqItems && previewSchemaBlog.faqItems.length > 0 ? [{
                        "@type": "FAQPage",
                        "mainEntity": previewSchemaBlog.faqItems.map(f => ({
                          "@type": "Question",
                          "name": f.question,
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": f.answer
                          }
                        }))
                      }] : [])
                    ]
                  }, null, 2)}
                </pre>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    const jsonStr = JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": previewSchemaBlog.schemaType || "Article",
                      "headline": previewSchemaBlog.title,
                      "description": previewSchemaBlog.excerpt
                    }, null, 2);
                    navigator.clipboard.writeText(jsonStr);
                    showToast("Schema JSON copied!");
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Schema JSON</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewSchemaBlog(null)}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
};
