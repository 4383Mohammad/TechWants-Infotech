import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const BlogCard = ({ blog }) => {
  return (
    <article className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          width="600"
          height="338"
        />
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="blue" className="bg-white/95 shadow-md">
            {blog.category}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-700 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-600" />
              <span>{blog.date}</span>
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 mt-2.5 line-clamp-2 leading-relaxed font-normal">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <div className="w-6 h-6 rounded-full bg-pink-100 text-brand-900 font-bold flex items-center justify-center text-[10px]">
              {blog.author.charAt(0)}
            </div>
            <span>{blog.author}</span>
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            aria-label={`Read article: ${blog.title}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </article>
  );
};
