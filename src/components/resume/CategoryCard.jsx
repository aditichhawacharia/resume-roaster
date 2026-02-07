import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CategoryCard({ icon: Icon, label, score, roast, details }) {
  const [expanded, setExpanded] = useState(false);

  const getScoreColor = () => {
    if (score >= 8) return 'text-green-400 bg-green-500/20';
    if (score >= 6) return 'text-yellow-400 bg-yellow-500/20';
    if (score >= 4) return 'text-orange-400 bg-orange-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  return (
    <motion.div
      onClick={() => setExpanded(!expanded)}
      className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4 cursor-pointer hover:border-slate-600 transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 rounded-xl bg-slate-700/50">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
        <div className={`px-2 py-1 rounded-lg text-sm font-bold ${getScoreColor()}`}>
          {score}/10
        </div>
      </div>
      
      <h4 className="font-medium text-sm mb-1">{label}</h4>
      <p className="text-xs text-slate-400 line-clamp-2">{roast}</p>

      {details && details.length > 0 && (
        <div className="flex items-center justify-center mt-2 pt-2 border-t border-slate-700/50">
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      )}

      <AnimatePresence>
        {expanded && details && details.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 pt-2 border-t border-slate-700/50 space-y-1"
          >
            {details.map((detail, index) => (
              <p key={index} className="text-xs text-slate-400 flex items-start gap-2">
                <span className="text-orange-400">•</span>
                {detail}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}