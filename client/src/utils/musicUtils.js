export const KEY_NAMES = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
];

export const OCTAVE_LENGTH = KEY_NAMES.length;

export const keyIndexToNote = (keyIndex) => {
	const keyIndexInOctave = keyIndex % OCTAVE_LENGTH;
	const octave = Math.floor(keyIndex / 12) + 3;
	return `${KEY_NAMES[keyIndexInOctave]}${octave}`;
};
