import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X, Image } from 'lucide-react';

export default function ResumeUploader({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file) => {
    setIsUploading(true);
    await onUpload(file);
    setIsUploading(false);
  };

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative cursor-pointer rounded-3xl border-2 border-dashed p-8 transition-all duration-300
        ${isDragging 
          ? 'border-orange-400 bg-orange-500/10' 
          : 'border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800/70'
        }
        backdrop-blur-xl
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="text-center">
        <motion.div
          animate={isUploading ? { rotate: 360 } : { y: [0, -8, 0] }}
          transition={isUploading 
            ? { duration: 1, repeat: Infinity, ease: "linear" }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          className="inline-block mb-4"
        >
          <div className={`
            p-4 rounded-2xl 
            ${isDragging 
              ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30' 
              : 'bg-slate-700/50'
            }
          `}>
            <Upload className={`w-8 h-8 ${isDragging ? 'text-orange-400' : 'text-slate-400'}`} />
          </div>
        </motion.div>

        <h3 className="text-lg font-semibold mb-2">
          {isUploading ? 'Uploading...' : 'Drop your resume here'}
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          or tap to browse your files
        </p>

        <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </div>
          <div className="flex items-center gap-1">
            <Image className="w-4 h-4" />
            <span>PNG, JPG</span>
          </div>
        </div>
      </div>

      {/* Decorative corner flames */}
      <div className="absolute top-3 right-3 text-orange-500/20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
        </svg>
      </div>
      <div className="absolute bottom-3 left-3 text-red-500/20 rotate-180">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
        </svg>
      </div>
    </motion.div>
  );
}