import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, BookOpen, PlayCircle } from 'lucide-react';
import { cn } from './lib/utils';

// Components
import ViolinSection from './components/ViolinSection';

export default function App() {
  const [view, setView] = useState<'theory' | 'practice'>('theory');

  return (
    <div className="min-h-screen bg-brand-50 text-brand-900 selection:bg-brand-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-brand-50/80 backdrop-blur-md border-b border-brand-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('theory')}
          >
            <div className="p-2 bg-brand-900 text-brand-50 rounded-lg group-hover:scale-110 transition-transform">
              <Music size={20} />
            </div>
            <h1 className="text-2xl font-serif font-semibold tracking-tight">MuseTheory</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 bg-brand-100 p-1 rounded-full border border-brand-200">
              <button
                onClick={() => setView('theory')}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  view === 'theory' ? "bg-white text-brand-900 shadow-sm" : "text-brand-600 hover:text-brand-900"
                )}
              >
                <BookOpen size={14} />
                Theory
              </button>
              <button
                onClick={() => setView('practice')}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  view === 'practice' ? "bg-white text-brand-900 shadow-sm" : "text-brand-600 hover:text-brand-900"
                )}
              >
                <PlayCircle size={14} />
                Practice
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ViolinSection view={view} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-200 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Music size={20} className="text-brand-400" />
            <span className="font-serif font-semibold text-brand-400">MuseTheory</span>
          </div>
          <p className="text-sm text-brand-400">© 2026 MuseTheory. Designed for aspiring violinists.</p>
        </div>
      </footer>
    </div>
  );
}
