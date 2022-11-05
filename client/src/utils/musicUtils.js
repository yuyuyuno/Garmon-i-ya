import { KEY_NAMES, OCTAVE_LENGTH } from '../constants';

export const keyIndexToNote = (keyIndex) => {
	const keyIndexInOctave = keyIndex % OCTAVE_LENGTH;
	const octave = Math.floor(keyIndex / 12) + 3;
	return `${KEY_NAMES[keyIndexInOctave]}${octave}`;
};

export const noteInfoToNoteObj = (noteInfo) => ({
	noteName: noteInfo[0],
	noteLength: noteInfo[1],
});
