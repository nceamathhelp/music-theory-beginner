export type Instrument = 'violin';

export type NoteName = 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab' | 'A' | 'A#' | 'Bb' | 'B';

export interface Note {
  name: NoteName;
  octave: number;
  accidental?: 'sharp' | 'flat' | 'natural';
}

export type ViolinPosition = 1 | 2 | 3;

export interface ViolinFingerPosition {
  string: 'G' | 'D' | 'A' | 'E';
  finger: 0 | 1 | 2 | 3 | 4;
  note: Note;
}
