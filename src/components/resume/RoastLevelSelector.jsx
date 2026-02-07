import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flame, Skull } from 'lucide-react';

const levels = [
  {
    id: 'gentle',
    name: 'Gentle',
    description: 'Constructive with a smile',
    icon: Heart,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/50',
    textColor: 'text-green-400'
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'Witty and honest',
    icon: Flame,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50',
    textColor: 'text-orange-400'
  },
  {
    id: 'savage',
    name: 'Savage',
    description: 'No mercy, all truth',
    icon: Skull,
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/50',
    textColor: 'text-red-400'
  }
];

export default function RoastLevelSelector({ selected, onSelect }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-400 mb-4">Choose your roast level</h3>
      
      {levels.map((level, index) => {
        const Icon = level.icon;
        const isSelected = selected === level.id;
        
        return (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(level.id)}
            className={`
              w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left
              ${isSelected 
                ? `${level.bgColor} ${level.borderColor}` 
                : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                p-3 rounded-xl transition-all duration-300
                ${isSelected 
                  ? `bg-gradient-to-r ${level.color}` 
                  : 'bg-slate-700/50'
                }
              `}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </div>
              
              <div className="flex-1">
                <p className={`font-semibold ${isSelected ? level.textColor : 'text-white'}`}>
                  {level.name}
                </p>
                <p className="text-sm text-slate-400">{level.description}</p>
              </div>

              <div className={`
                w-5 h-5 rounded-full border-2 transition-all duration-300
                ${isSelected 
                  ? `${level.borderColor} bg-gradient-to-r ${level.color}` 
                  : 'border-slate-600'
                }
              `}>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}