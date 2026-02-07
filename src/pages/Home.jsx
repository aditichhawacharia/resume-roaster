import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Upload, FileText, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ResumeUploader from '@/components/resume/ResumeUploader';
import RoastLevelSelector from '@/components/resume/RoastLevelSelector';
import RoastResults from '@/components/resume/RoastResults';
import { base44 } from '@/api/base44Client';

export default function Home() {
  const [step, setStep] = useState('upload'); // upload, level, loading, results
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [roastLevel, setRoastLevel] = useState('medium');
  const [roastResults, setRoastResults] = useState(null);

  const handleFileUpload = async (file) => {
    setUploadedFile(file);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setFileUrl(file_url);
    setStep('level');
  };

  const handleStartRoast = async () => {
    setStep('loading');
    
    const levelDescriptions = {
      gentle: "Be encouraging and constructive, like a supportive mentor. Point out issues gently with humor but focus on positives too.",
      medium: "Be witty and sarcastic, like a comedian doing a roast. Make jokes about common resume mistakes but keep it helpful.",
      savage: "Be brutally honest and hilariously savage, like Gordon Ramsay reviewing a resume. No mercy, but still ultimately constructive."
    };

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a professional resume reviewer with a comedic twist. Analyze this resume and provide feedback in a "${roastLevel}" roast style.

Style guide: ${levelDescriptions[roastLevel]}

CRITICAL INSTRUCTIONS:
- DO NOT glaze or be overly nice. If the resume is bad, say it's bad.
- Be GENUINELY CRITICAL of vague, weak, or generic accomplishments. Call them out specifically.
- If someone just lists job duties instead of achievements, ROAST THEM for it.
- Words like "responsible for", "helped with", "worked on" without metrics = WEAK. Call it out.
- No participation trophy energy. Bad resumes deserve honest feedback.
- Don't hold back on pointing out lack of quantifiable results, impact, or specificity.

Analyze the resume and return a JSON response with the following structure. Be specific about what you see in the actual resume:

{
  "overall_score": (number 1-100),
  "roast_headline": (a punchy, funny one-liner about the resume),
  "main_roast": (2-3 paragraphs of entertaining critique in your roast style, referencing specific things from the resume),
  "categories": {
    "formatting": { "score": (1-10), "roast": (short witty comment), "issues": [(list of specific issues)] },
    "buzzwords": { "score": (1-10), "roast": (short witty comment), "offenders": [(list of overused words found)] },
    "accomplishments": { "score": (1-10), "roast": (short witty comment), "feedback": (specific feedback) },
    "red_flags": { "score": (1-10), "roast": (short witty comment), "flags": [(list of concerning things)] }
  },
  "improvement_tips": [(5 specific, actionable tips to improve the resume)],
  "career_suggestions": [(3 job titles/paths that match this resume's experience)],
  "final_verdict": (a memorable closing zinger that's also encouraging)
}`,
      file_urls: [fileUrl],
      response_json_schema: {
        type: "object",
        properties: {
          overall_score: { type: "number" },
          roast_headline: { type: "string" },
          main_roast: { type: "string" },
          categories: {
            type: "object",
            properties: {
              formatting: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  roast: { type: "string" },
                  issues: { type: "array", items: { type: "string" } }
                }
              },
              buzzwords: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  roast: { type: "string" },
                  offenders: { type: "array", items: { type: "string" } }
                }
              },
              accomplishments: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  roast: { type: "string" },
                  feedback: { type: "string" }
                }
              },
              red_flags: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  roast: { type: "string" },
                  flags: { type: "array", items: { type: "string" } }
                }
              }
            }
          },
          improvement_tips: { type: "array", items: { type: "string" } },
          career_suggestions: { type: "array", items: { type: "string" } },
          final_verdict: { type: "string" }
        }
      }
    });

    setRoastResults(response);
    setStep('results');
  };

  const handleReset = () => {
    setStep('upload');
    setUploadedFile(null);
    setFileUrl(null);
    setRoastResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 px-4 py-8 max-w-lg mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-4">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-300">AI-Powered Roasts</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              Resume Roaster
            </span>
          </h1>
          <p className="text-slate-400 text-sm">Get brutally honest feedback that actually helps</p>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ResumeUploader onUpload={handleFileUpload} />
            </motion.div>
          )}

          {step === 'level' && (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-green-500/20">
                    <FileText className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">{uploadedFile?.name}</p>
                    <p className="text-sm text-slate-400">Ready to roast</p>
                  </div>
                </div>
              </div>

              <RoastLevelSelector 
                selected={roastLevel} 
                onSelect={setRoastLevel} 
              />

              <Button
                onClick={handleStartRoast}
                className="w-full mt-6 h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-2xl shadow-lg shadow-orange-500/25"
              >
                <Flame className="w-5 h-5 mr-2" />
                Start the Roast
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-6"
              >
                <div className="p-6 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                  <Flame className="w-12 h-12 text-orange-400" />
                </div>
              </motion.div>
              <h2 className="text-xl font-semibold mb-2">Analyzing your resume...</h2>
              <p className="text-slate-400">Our AI is preparing your roast 🔥</p>
              
              <div className="mt-8 space-y-2">
                {['Reading between the lines', 'Counting buzzwords', 'Preparing zingers'].map((text, i) => (
                  <motion.p
                    key={text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 1.5 }}
                    className="text-sm text-slate-500"
                  >
                    {text}...
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'results' && roastResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RoastResults results={roastResults} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}