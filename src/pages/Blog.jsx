import React, { useState, useEffect } from 'react';
import { getBlogs, getBlogCategories } from '../services/blogService';
import { BlogCard } from '../components/cards/BlogCard';
import { CTASection } from '../components/widgets/CTASection';
import { BookOpen, Search } from 'lucide-react';
import { updateSEO } from '../utils/seo';
import { company } from '../data/company';

export const Blog = ({ onOpenInquiryModal }) => {
  useEffect(() => {
    updateSEO({
      title: "Blog & Perspectives",
      description: `Read technical insights and business automation articles by ${company.founder}, Founder of ${company.name}.`,
      canonicalUrl: `${company.website}/blog`
    });
  }, []);

  const [blogsList, setBlogsList] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getBlogs().then(data => {
      setBlogsList(data);
      setFilteredBlogs(data);
      setCategories(getBlogCategories());
    });
  }, []);

  useEffect(() => {
    let result = [...blogsList];

    if (selectedCat !== "All") {
      result = result.filter(b => b.category.toLowerCase() === selectedCat.toLowerCase());
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    setFilteredBlogs(result);
  }, [selectedCat, searchQuery, blogsList]);

  return (
    <main className="pt-28">
      {/* Header */}
      <section className="bg-gradient-to-b from-pink-50/60 to-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-900 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>INSIGHTS & ARTICLES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            TECHWANTS <span className="text-gradient">BLOG & PERSPECTIVES</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Practical articles on modern web development, Technical SEO, custom ERP automation, and digital growth strategies by Founder Mansuri Mohammad.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-[72px] z-30 backdrop-blur-xl bg-white/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="relative flex-1 max-w-md w-full">
              <label htmlFor="blog-search" className="sr-only">Search Articles</label>
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:border-brand-600 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    selectedCat === cat
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 bg-slate-50 min-h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <h2 className="text-lg font-bold text-slate-800">No Articles Found</h2>
              <p className="text-xs text-slate-600 mt-1 font-medium">Try resetting your search filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection onOpenInquiryModal={onOpenInquiryModal} />
    </main>
  );
};
