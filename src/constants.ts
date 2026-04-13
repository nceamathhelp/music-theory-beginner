import { Note, ViolinFingerPosition } from './types';

export const VIOLIN_STRINGS = ['G', 'D', 'A', 'E'] as const;

export const NOTE_FREQUENCIES: Record<string, number> = {
  'G3': 196.00, 'G#3': 207.65, 'Ab3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'Gb4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'Ab4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'Db5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'Gb5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'Ab5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'C#6': 1108.73, 'Db6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'Eb6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'Gb6': 1479.98, 'G6': 1567.98
};

// 1st Position Mapping
export const VIOLIN_1ST_POSITION: ViolinFingerPosition[] = [
  // G String
  { string: 'G', finger: 0, note: { name: 'G', octave: 3 } },
  { string: 'G', finger: 1, note: { name: 'A', octave: 3 } },
  { string: 'G', finger: 2, note: { name: 'B', octave: 3 } },
  { string: 'G', finger: 3, note: { name: 'C', octave: 4 } },
  { string: 'G', finger: 4, note: { name: 'D', octave: 4 } },
  // D String
  { string: 'D', finger: 0, note: { name: 'D', octave: 4 } },
  { string: 'D', finger: 1, note: { name: 'E', octave: 4 } },
  { string: 'D', finger: 2, note: { name: 'F', octave: 4 } },
  { string: 'D', finger: 3, note: { name: 'G', octave: 4 } },
  { string: 'D', finger: 4, note: { name: 'A', octave: 4 } },
  // A String
  { string: 'A', finger: 0, note: { name: 'A', octave: 4 } },
  { string: 'A', finger: 1, note: { name: 'B', octave: 4 } },
  { string: 'A', finger: 2, note: { name: 'C', octave: 5 } },
  { string: 'A', finger: 3, note: { name: 'D', octave: 5 } },
  { string: 'A', finger: 4, note: { name: 'E', octave: 5 } },
  // E String
  { string: 'E', finger: 0, note: { name: 'E', octave: 5 } },
  { string: 'E', finger: 1, note: { name: 'F', octave: 5 } },
  { string: 'E', finger: 2, note: { name: 'G', octave: 5 } },
  { string: 'E', finger: 3, note: { name: 'A', octave: 5 } },
  { string: 'E', finger: 4, note: { name: 'B', octave: 5 } },
];

export const STAFF_NOTES = [
  { name: 'E', octave: 4, type: 'line' },
  { name: 'F', octave: 4, type: 'space' },
  { name: 'G', octave: 4, type: 'line' },
  { name: 'A', octave: 4, type: 'space' },
  { name: 'B', octave: 4, type: 'line' },
  { name: 'C', octave: 5, type: 'space' },
  { name: 'D', octave: 5, type: 'line' },
  { name: 'E', octave: 5, type: 'space' },
  { name: 'F', octave: 5, type: 'line' },
];
