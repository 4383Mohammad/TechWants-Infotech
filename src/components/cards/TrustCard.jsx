import React from 'react';
import { ShieldCheck, Clock, Users, MessageSquare } from 'lucide-react';

export const trustItems = [
  {
    icon: ShieldCheck,
    title: "QUALITY CODE",
    line1: "Clean",
    line2: "Scalable",
    line3: "Secure"
  },
  {
    icon: Clock,
    title: "ON-TIME DELIVERY",
    line1: "Your Time",
    line2: "Our Priority",
    line3: ""
  },
  {
    icon: Users,
    title: "EXPERT TEAM",
    line1: "Creative",
    line2: "Experienced",
    line3: ""
  },
  {
    icon: MessageSquare,
    title: "ONGOING SUPPORT",
    line1: "We're Here",
    line2: "Always",
    line3: ""
  }
];

export const TrustCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-pink-100/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-pink-50 text-brand-900 flex items-center justify-center shrink-0 border border-pink-100">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h2 className="text-xs font-extrabold text-slate-900 tracking-wider uppercase">
          {item.title}
        </h2>
        <p className="text-xs text-slate-600 mt-0.5 font-medium">
          {item.line1} <span className="text-pink-400">|</span> {item.line2} {item.line3 ? <> <span className="text-pink-400">|</span> {item.line3}</> : ''}
        </p>
      </div>
    </div>
  );
};
