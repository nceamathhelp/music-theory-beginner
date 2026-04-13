import { motion } from 'motion/react';
import { Note } from '../types';
import { cn } from '../lib/utils';

interface StaffProps {
  note?: Note;
  showLabels?: boolean;
  className?: string;
}

export default function Staff({ note, showLabels, className }: StaffProps) {
  // Mapping notes to vertical positions
  // E4 is the bottom line. Let's say bottom line is at y=80
  // Each step (line to space) is 10px
  const getNoteY = (n: Note) => {
    const baseNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const baseIndex = baseNotes.indexOf(n.name[0]);
    const octaveOffset = (n.octave - 4) * 7;
    const totalSteps = baseIndex + octaveOffset - 2; // -2 because E4 is index 2
    
    // Use tighter spacing for ledger areas (8px per step instead of 10px)
    if (totalSteps < 0) {
      return 140 + Math.abs(totalSteps) * 8;
    } else if (totalSteps > 8) { // Above staff (F5 is 8 steps from E4)
      return 60 - (totalSteps - 8) * 8;
    }
    return 140 - totalSteps * 10;
  };

  const lines = [0, 1, 2, 3, 4].map(i => 140 - i * 20);

  return (
    <div className={cn("relative w-full h-48 bg-white rounded-xl border border-brand-200 overflow-hidden", className)}>
      <svg viewBox="0 0 400 250" className="w-full h-full">
        {/* Staff Lines */}
        {lines.map((y, i) => (
          <line 
            key={i} 
            x1="20" y1={y} x2="380" y2={y} 
            stroke="currentColor" strokeWidth="1.5" 
            className="text-brand-300"
          />
        ))}

        {/* Treble Clef Symbol */}
        <text x="25" y="145" fontSize="135" className="fill-brand-900 select-none font-serif">
          𝄞
        </text>

        {/* Note */}
        {note && (
          <motion.g
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 100 }}
            key={`${note.name}${note.octave}`}
          >
            {/* Ledger lines below staff (using 16px intervals) */}
            {[156, 172, 188, 204].map(ly => (
              getNoteY(note) >= ly - 4 && (
                <line key={ly} x1="85" y1={ly} x2="115" y2={ly} stroke="currentColor" strokeWidth="1.5" className="text-brand-900" />
              )
            ))}
            
            {/* Ledger lines above staff (using 16px intervals) */}
            {[44, 28, 12].map(ly => (
              getNoteY(note) <= ly + 4 && (
                <line key={ly} x1="85" y1={ly} x2="115" y2={ly} stroke="currentColor" strokeWidth="1.5" className="text-brand-900" />
              )
            ))}
            
            <ellipse 
              cx="100" cy={getNoteY(note)} rx="8" ry="6" 
              className="fill-brand-900"
              transform={`rotate(-20, 100, ${getNoteY(note)})`}
            />
            
            {/* Stem */}
            <line 
              x1={getNoteY(note) < 100 ? "92" : "108"} 
              y1={getNoteY(note)} 
              x2={getNoteY(note) < 100 ? "92" : "108"} 
              y2={getNoteY(note) < 100 ? getNoteY(note) + 50 : getNoteY(note) - 50} 
              stroke="currentColor" strokeWidth="1.5" 
              className="text-brand-900"
            />

            {showLabels && (
              <text 
                x="100" y={getNoteY(note) + 25} 
                textAnchor="middle" 
                className="text-[10px] font-bold fill-brand-400 uppercase"
              >
                {note.name}{note.octave}
              </text>
            )}
          </motion.g>
        )}
      </svg>
    </div>
  );
}
