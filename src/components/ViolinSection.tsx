import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViolinPosition, ViolinFingerPosition } from '../types';
import Staff from './Staff';
import Fingerboard from './Fingerboard';
import ViolinQuiz from './ViolinQuiz';
import { Info, GraduationCap, Music2 } from 'lucide-react';

export default function ViolinSection({ view }: { view: 'selection' | 'theory' | 'practice' }) {
  const [position, setPosition] = useState<ViolinPosition>(1);
  const [selectedNote, setSelectedNote] = useState<ViolinFingerPosition | null>(null);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-serif font-bold flex items-center gap-3">
            <Music2 className="text-amber-600" />
            Violin Mastery
          </h2>
          <p className="text-brand-600">Master the strings, one note at a time.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-brand-100 p-1.5 rounded-xl border border-brand-200 w-fit">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => setPosition(p as ViolinPosition)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                position === p 
                  ? "bg-white text-brand-900 shadow-sm ring-1 ring-brand-200" 
                  : "text-brand-600 hover:text-brand-900 hover:bg-brand-50"
              }`}
            >
              {p}{p === 1 ? 'st' : p === 2 ? 'nd' : 'rd'} Position
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'theory' ? (
          <motion.div
            key="theory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            <div className="space-y-8">
              <section className="bg-white p-8 rounded-3xl border border-brand-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-amber-900">
                  <GraduationCap size={24} />
                  <h3 className="text-2xl font-serif font-semibold">The Treble Clef</h3>
                </div>
                <p className="text-brand-600 leading-relaxed">
                  The violin uses the <span className="font-bold text-brand-900">Treble Clef</span> (or G Clef). 
                  It's designed for higher-pitched instruments. The clef symbol curls around the second line from the bottom, which represents the note <span className="font-bold text-brand-900">G4</span>.
                </p>
                <Staff note={selectedNote?.note} showLabels className="h-48 bg-brand-50/50" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100">
                    <span className="text-xs font-bold uppercase text-brand-400 block mb-1">Lines</span>
                    <p className="text-sm font-medium">E G B D F</p>
                    <span className="text-[10px] text-brand-400 italic">"Every Good Boy Does Fine"</span>
                  </div>
                  <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100">
                    <span className="text-xs font-bold uppercase text-brand-400 block mb-1">Spaces</span>
                    <p className="text-sm font-medium">F A C E</p>
                    <span className="text-[10px] text-brand-400 italic">"Spells FACE"</span>
                  </div>
                </div>
              </section>

              <section className="bg-amber-900 text-amber-50 p-8 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <Info size={20} />
                  <h4 className="font-serif font-bold text-xl">Understanding Positions</h4>
                </div>
                <p className="text-amber-200/80 leading-relaxed">
                  Positions refer to where your left hand is placed on the neck. 
                  In <span className="text-white font-bold">1st Position</span>, your hand is closest to the scroll. 
                  As you move to <span className="text-white font-bold">2nd</span> and <span className="text-white font-bold">3rd</span> positions, your hand moves closer to the body of the violin, allowing you to play higher notes on the same string.
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-white p-8 rounded-3xl border border-brand-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-amber-900">
                  <Music2 size={24} />
                  <h3 className="text-2xl font-serif font-semibold">Fingerboard Geography</h3>
                </div>
                <p className="text-brand-600 leading-relaxed">
                  Click on the markers below to see which note they correspond to on the staff. 
                  The <span className="font-bold text-brand-900">"O"</span> represents an open string (no fingers pressed).
                </p>
                <Fingerboard 
                  position={position} 
                  activeFinger={selectedNote || undefined}
                  onFingerClick={setSelectedNote}
                  className="h-[500px]"
                />
              </section>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ViolinQuiz />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
