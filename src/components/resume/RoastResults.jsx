import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, RotateCcw, ChevronDown, ChevronUp, 
  FileText, MessageSquare, AlertTriangle, Award,
  Lightbulb, Briefcase, Quote
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import ScoreRing from './ScoreRing';
import CategoryCard from './CategoryCard';

export default function RoastResults({ results, onReset }) {
  const [expandedTips, setExpandedTips] = useState(false);
  const [expandedCareers, setExpandedCareers] = useState(false);

  const categoryIcons = {
    formatting: FileText,
    buzzwords: MessageSquare,
    accomplishments: Award,
    red_flags: AlertTriangle
  };

  const categoryLabels = {
    formatting: 'Formatting',
    buzzwords: 'Buzzwords',
    accomplishments: 'Accomplishments',
    red_flags: 'Red Flags'
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Score Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 text-center"
      >
        <ScoreRing score={results.overall_score} />
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-bold mt-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
        >
          {results.roast_headline}
        </motion.h2>
      </motion.div>

      {/* Main Roast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-400" />
          <h3 className="font-semibold">The Roast</h3>
        </div>
        <p className="text-slate-300 leading-relaxed whitespace-pre-line">
          {results.main_roast}
        </p>
      </motion.div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(results.categories).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <CategoryCard
              icon={categoryIcons[key]}
              label={categoryLabels[key]}
              score={value.score}
              roast={value.roast}
              details={value.issues || value.offenders || value.flags || [value.feedback].filter(Boolean)}
            />
          </motion.div>
        ))}
      </div>

      {/* Improvement Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden"
      >
        <button
          onClick={() => setExpandedTips(!expandedTips)}
          className="w-full p-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20">
              <Lightbulb className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold">Improvement Tips</h3>
              <p className="text-sm text-slate-400">{results.improvement_tips?.length || 0} actionable suggestions</p>
            </div>
          </div>
          {expandedTips ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        
        {expandedTips && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="px-4 pb-4 space-y-2"
          >
            {results.improvement_tips?.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-700/30"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-sm text-slate-300">{tip}</p>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Career Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden"
      >
        <button
          onClick={() => setExpandedCareers(!expandedCareers)}
          className="w-full p-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20">
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold">Career Paths</h3>
              <p className="text-sm text-slate-400">Roles that match your experience</p>
            </div>
          </div>
          {expandedCareers ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        
        {expandedCareers && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="px-4 pb-4 flex flex-wrap gap-2"
          >
            {results.career_suggestions?.map((career, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium"
              >
                {career}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Final Verdict */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-3xl border border-orange-500/20 p-6 text-center"
      >
        <Quote className="w-8 h-8 text-orange-400/50 mx-auto mb-3" />
        <p className="text-lg font-medium text-slate-200 italic">
          "{results.final_verdict}"
        </p>
      </motion.div>

      {/* Reset Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full h-12 rounded-2xl border-slate-600 text-slate-300 hover:bg-slate-800"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Roast Another Resume
      </Button>
    </div>
  );
}