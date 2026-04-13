import { motion } from 'motion/react';
import { ViolinFingerPosition, ViolinPosition } from '../types';
import { VIOLIN_1ST_POSITION } from '../constants';
import { cn } from '../lib/utils';

interface FingerboardProps {
  position: ViolinPosition;
  activeFinger?: ViolinFingerPosition;
  onFingerClick?: (finger: ViolinFingerPosition) => void;
  className?: string;
  highlightedFinger?: ViolinFingerPosition; // For quiz mode
}

export default function Fingerboard({ position, activeFinger, onFingerClick, className, highlightedFinger }: FingerboardProps) {
  const strings = ['G', 'D', 'A', 'E'];
  const fingers = [0, 1, 2, 3, 4];

  const getFingerData = (string: string, finger: number) => {
    return VIOLIN_1ST_POSITION.find(p => p.string === string && p.finger === finger);
  };

  return (
    <div className={cn("relative bg-[#2a1b0e] rounded-xl p-8 border-4 border-[#3d2b1f] shadow-2xl overflow-hidden", className)}>
      <div className="flex justify-between h-96 relative">
        {/* Strings */}
        {strings.map((s, i) => (
          <div key={s} className="relative flex flex-col items-center w-1/4">
            {/* String Line */}
            <div 
              className={cn(
                "absolute h-full w-0.5 bg-gradient-to-b from-slate-300 to-slate-500 shadow-sm",
                i === 0 && "w-1", // G string is thicker
                i === 3 && "w-[0.5px]" // E string is thinner
              )} 
            />
            
            {/* Fret/Finger Markers */}
            <div className="flex flex-col justify-between h-full py-4 w-full">
              {fingers.map((f) => {
                const fingerData = getFingerData(s, f);
                if (!fingerData) return null;

                const isActive = activeFinger?.string === s && activeFinger?.finger === f;
                const isHighlighted = highlightedFinger?.string === s && highlightedFinger?.finger === f;

                return (
                  <motion.button
                    key={f}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onFingerClick?.(fingerData)}
                    className={cn(
                      "z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                      f === 0 ? "mt-[-20px] bg-white/10 border-white/20" : "bg-brand-900/40 border-brand-400/30",
                      isActive && "bg-amber-400 border-amber-200 scale-110 shadow-[0_0_15px_rgba(251,191,36,0.5)]",
                      isHighlighted && !isActive && "bg-blue-400 border-blue-200 scale-110 shadow-[0_0_15px_rgba(96,165,250,0.5)]"
                    )}
                  >
                    <span className={cn(
                      "text-[10px] font-bold",
                      isActive ? "text-amber-950" : isHighlighted ? "text-blue-950" : "text-white/60"
                    )}>
                      {f === 0 ? 'O' : f}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <span className="absolute -bottom-6 text-xs font-mono text-brand-400 font-bold">{s}</span>
          </div>
        ))}

        {/* Nut (Top of fingerboard) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#1a1109]" />
      </div>
    </div>
  );
}
