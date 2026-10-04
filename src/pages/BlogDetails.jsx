import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getBlogBySlug } from '../services/blogService';
import { CTASection } from '../components/widgets/CTASection';
import { Badge } from '../components/common/Badge';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, MessageSquareCode } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/contact';
import { updateSEO } from '../utils/seo';
import { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from '../utils/schema';
import { company } from '../data/company';
import { HelpCircle } from 'lucide-react';

export const BlogDetails = ({ onOpenInquiryModal }) => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogBySlug(slug).then(b => {
      setBlog(b);
      setLoading(false);
      if (b) {
        const articleSchema = buildArticleSchema(b);
        const breadcrumbSchema = buildBreadcrumbSchema([
          { name: "Blog", url: `${company.website}/blog` },
          { name: b.title, url: `${company.website}/blog/${b.slug}` }
        ]);

        const schemaGraph = [articleSchema, breadcrumbSchema];

        // Include FAQPage Schema if blog has FAQs for AEO (Answer Engine Optimization)
        if (Array.isArray(b.faqItems) && b.faqItems.length > 0) {
          schemaGraph.push(buildFAQSchema(b.faqItems));
        }

        updateSEO({
          title: b.title,
          description: b.excerpt,
          canonicalUrl: `${company.website}/blog/${b.slug}`,
          schemaData: {
            "@context": "https://schema.org",
            "@graph": schemaGraph
          }
        });
      }
    });
  }, [slug]);

  if (loading) {
    return <div className="pt-40 pb-20 text-center text-slate-500 font-bold">Loading article...</div>;
  }

  if (!blog) {
    return (
      <div className="pt-40 pb-20 max-w-xl mx-auto text-center px-4 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <Link to="/blog" className="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs">
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-28">
      <article>
        
        {/* Article Header */}
        <header className="bg-gradient-to-b from-pink-50/70 to-white py-12 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-4">
              <Breadcrumbs items={[
                { name: "Blog", url: "/blog" },
                { name: blog.title, url: `/blog/${blog.slug}` }
              ]} />
            </div>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO ALL ARTICLES</span>
            </Link>

            <div className="space-y-4">
              <Badge variant="pink">{blog.category}</Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {blog.title}
              </h1>

              {/* Direct Answer-First Executive Summary */}
              <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-100 text-slate-800 font-semibold text-base">
                {blog.excerpt}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-200/60">
                <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                  <User className="w-4 h-4 text-brand-600" />
                  <span>{blog.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <span>Published: {blog.date}</span>
                </span>
                {blog.updatedAt && (
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span>(Updated: {blog.updatedAt})</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg aspect-video">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-800 text-base leading-relaxed">
            
            <div className="prose prose-pink max-w-none font-sans text-slate-700 blog-content">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            {/* Answer Engine FAQ Section (AEO) */}
            {Array.isArray(blog.faqItems) && blog.faqItems.length > 0 && (
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Frequently Asked Questions & Quick Answers</span>
                </div>
                <div className="space-y-3">
                  {blog.faqItems.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-pink-50/50 border border-pink-100 space-y-2">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-pink-200 text-brand-700 flex items-center justify-center text-xs shrink-0 font-extrabold">Q</span>
                        <span>{faq.question}</span>
                      </div>
                      <p className="text-slate-700 text-xs sm:text-sm pl-7 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Author Credibility */}
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Authored By</div>
                  <div className="text-base font-bold text-slate-900">{blog.author}</div>
                  <div className="text-xs text-brand-600 font-medium">{company.designation}, {company.name}</div>
                </div>

                <a
                  href={getWhatsAppUrl(`Hello ${company.founder}, I read your article '${blog.title}' and would like to discuss a project.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-brand-600 text-white font-bold text-xs shadow-md border border-pink-500/20 transition-colors"
                >
                  <MessageSquareCode className="w-4 h-4" />
                  <span>Discuss Article</span>
                </a>
              </div>
            </div>

          </div>
        </section>

      </article>

      <CTASection onOpenInquiryModal={onOpenInquiryModal} />
    </main>
  );
};
