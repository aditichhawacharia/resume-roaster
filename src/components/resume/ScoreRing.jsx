import React from 'react';
import { motion } from 'framer-motion';

export default function ScoreRing({ score, size = 140 }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return { gradient: 'from-green-400 to-emerald-500', text: 'text-green-400' };
    if (score >= 60) return { gradient: 'from-yellow-400 to-orange-500', text: 'text-yellow-400' };
    if (score >= 40) return { gradient: 'from-orange-400 to-red-500', text: 'text-orange-400' };
    return { gradient: 'from-red-400 to-rose-600', text: 'text-red-400' };
  };

  const colors = getScoreColor();

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="absolute" width={size} height={size}>
        <circle
          className="text-slate-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {/* Animated progress circle */}
      <svg className="absolute -rotate-90" width={size} height={size}>
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className={colors.gradient.split(' ')[0].replace('from-', 'text-')} stopColor="currentColor" />
            <stop offset="100%" className={colors.gradient.split(' ')[1].replace('to-', 'text-')} stopColor="currentColor" />
          </linearGradient>
        </defs>
        <motion.circle
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>

      {/* Score text */}
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`text-4xl font-bold ${colors.text}`}
        >
          {score}
        </motion.span>
        <p className="text-xs text-slate-500 mt-1">out of 100</p>
      </div>
    </div>
  );
}