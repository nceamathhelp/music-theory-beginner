import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RefreshCcw, Music, Fingerprint } from 'lucide-react';
import { Note, ViolinFingerPosition } from '../types';
import { VIOLIN_1ST_POSITION } from '../constants';
import Fingerboard from './Fingerboard';
import Staff from './Staff';
import { cn } from '../lib/utils';

type QuizMode = 'staff-to-finger' | 'finger-to-note' | 'staff-to-note';

export default function ViolinQuiz() {
  const [mode, setMode] = useState<QuizMode>('staff-to-finger');
  const [currentQuestion, setCurrentQuestion] = useState<ViolinFingerPosition | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [options, setOptions] = useState<string[]>([]);

  const generateQuestion = (newMode?: QuizMode) => {
    const activeMode = newMode || mode;
    const randomIndex = Math.floor(Math.random() * VIOLIN_1ST_POSITION.length);
    const question = VIOLIN_1ST_POSITION[randomIndex];
    setCurrentQuestion(question);
    setFeedback(null);

    if (activeMode === 'finger-to-note') {
      // Generate options for note names (without octave)
      const correctNote = question.note.name;
      const allNoteNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      const otherNoteNames = allNoteNames.filter(n => n !== correctNote);
      const shuffledOthers = otherNoteNames.sort(() => 0.5 - Math.random()).slice(0, 3);
      setOptions([correctNote, ...shuffledOthers].sort(() => 0.5 - Math.random()));
    } else if (activeMode === 'staff-to-note') {
      // Generate options for note names (without octave)
      const correctNote = question.note.name;
      const allNoteNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      const otherNoteNames = allNoteNames.filter(n => n !== correctNote);
      const shuffledOthers = otherNoteNames.sort(() => 0.5 - Math.random()).slice(0, 3);
      setOptions([correctNote, ...shuffledOthers].sort(() => 0.5 - Math.random()));
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleFingerClick = (finger: ViolinFingerPosition) => {
    if (mode !== 'staff-to-finger' || feedback) return;

    const isCorrect = 
      finger.note.name === currentQuestion?.note.name && 
      finger.note.octave === currentQuestion?.note.octave;

    setFeedback({
      isCorrect,
      message: isCorrect ? 'Perfect! You found the right position.' : `Not quite. That was ${finger.note.name}${finger.note.octave}.`
    });

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const handleNoteSelect = (noteName: string) => {
    if ((mode !== 'finger-to-note' && mode !== 'staff-to-note') || feedback) return;

    const correctNote = currentQuestion?.note.name || '';
    const isCorrect = noteName === correctNote;

    setFeedback({
      isCorrect,
      message: isCorrect ? 'Correct! You identified the note.' : `Incorrect. The correct note was ${correctNote}.`
    });

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const switchMode = (newMode: QuizMode) => {
    setMode(newMode);
    setScore({ correct: 0, total: 0 });
    generateQuestion(newMode);
  };

  return (
    <div className="space-y-8">
      {/* Quiz Mode Selector */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => switchMode('staff-to-finger')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
            mode === 'staff-to-finger' 
              ? "bg-brand-900 text-white shadow-lg scale-105" 
              : "bg-white text-brand-600 border border-brand-200 hover:bg-brand-50"
          )}
        >
          <Music size={18} />
          Staff to Fingerboard
        </button>
        <button
          onClick={() => switchMode('finger-to-note')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
            mode === 'finger-to-note' 
              ? "bg-brand-900 text-white shadow-lg scale-105" 
              : "bg-white text-brand-600 border border-brand-200 hover:bg-brand-50"
          )}
        >
          <Fingerprint size={18} />
          Fingerboard to Note
        </button>
        <button
          onClick={() => switchMode('staff-to-note')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
            mode === 'staff-to-note' 
              ? "bg-brand-900 text-white shadow-lg scale-105" 
              : "bg-white text-brand-600 border border-brand-200 hover:bg-brand-50"
          )}
        >
          <Music size={18} />
          Staff to Note Name
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Question Area */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-brand-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-serif font-bold">
                {mode === 'staff-to-finger' ? 'Find this note:' : mode === 'finger-to-note' ? 'Identify this position:' : 'What is this note?'}
              </h4>
              <div className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-bold">
                Score: {score.correct}/{score.total}
              </div>
            </div>

            {mode === 'staff-to-finger' || mode === 'staff-to-note' ? (
              <div className="py-4">
                <Staff note={currentQuestion?.note} className="h-48" />
              </div>
            ) : (
              <div className="flex justify-center py-8">
                <Fingerboard 
                  position={1} 
                  highlightedFinger={currentQuestion || undefined}
                  className="w-full max-w-xs"
                />
              </div>
            )}

            {/* Feedback Area */}
            <AnimatePresence mode="wait">
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "p-4 rounded-2xl flex items-center gap-3",
                    feedback.isCorrect ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                  )}
                >
                  {feedback.isCorrect ? <CheckCircle2 className="shrink-0" /> : <XCircle className="shrink-0" />}
                  <span className="font-medium">{feedback.message}</span>
                  <button 
                    onClick={() => generateQuestion()}
                    className="ml-auto p-2 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <RefreshCcw size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Instructions */}
          <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100">
            <p className="text-sm text-brand-800 leading-relaxed">
              {mode === 'staff-to-finger' 
                ? "Look at the note on the staff and click the corresponding finger position on the violin fingerboard."
                : mode === 'finger-to-note'
                ? "A position is highlighted. Select the correct note name. The staff will show the note to help you learn!"
                : "Look at the note on the staff and select its name (A, B, C, D, E, F, or G)."}
            </p>
          </div>
        </div>

        {/* Right Column: Interaction Area */}
        <div className="space-y-6">
          {mode === 'staff-to-finger' ? (
            <div className="bg-white p-6 rounded-3xl border border-brand-200 shadow-sm">
              <Fingerboard 
                position={1} 
                onFingerClick={handleFingerClick}
                className="h-[500px]"
              />
            </div>
          ) : mode === 'finger-to-note' ? (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-brand-200 shadow-sm">
                <Staff note={currentQuestion?.note} showLabels={!!feedback} className="h-48" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {options.map((note) => (
                  <button
                    key={note}
                    onClick={() => handleNoteSelect(note)}
                    disabled={!!feedback}
                    className={cn(
                      "p-8 rounded-2xl border-2 text-2xl font-serif font-bold transition-all",
                      feedback 
                        ? note === currentQuestion?.note.name
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-white border-brand-100 text-brand-200"
                        : "bg-white border-brand-200 text-brand-900 hover:border-brand-900 hover:scale-105 active:scale-95 shadow-sm"
                    )}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {options.map((note) => (
                <button
                  key={note}
                  onClick={() => handleNoteSelect(note)}
                  disabled={!!feedback}
                  className={cn(
                    "p-8 rounded-2xl border-2 text-2xl font-serif font-bold transition-all",
                    feedback 
                      ? note === currentQuestion?.note.name
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-white border-brand-100 text-brand-200"
                      : "bg-white border-brand-200 text-brand-900 hover:border-brand-900 hover:scale-105 active:scale-95 shadow-sm"
                  )}
                >
                  {note}
                </button>
              ))}
            </div>
          )}

          {feedback && (
            <button
              onClick={() => generateQuestion()}
              className="w-full p-4 bg-brand-900 text-white rounded-xl font-bold hover:bg-brand-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCcw size={20} />
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
