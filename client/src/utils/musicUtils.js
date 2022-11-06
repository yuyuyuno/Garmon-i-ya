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

export const getLastMeasureNote = (
	inputMelody,
	measureIndex,
	melodyNoteIndex,
	nullCounter,
	longNoteCounter
) => {
	const isLastCell = melodyNoteIndex === (measureIndex + 1) * 8 - 1;
	if (!isLastCell) {
		return;
	}

	const noteInfo = inputMelody[melodyNoteIndex];
	const lastNote = noteInfoToNoteObj([
		noteInfo?.note || 'stop',
		noteInfo ? longNoteCounter : nullCounter,
	]);

	return lastNote;
};

export const getNoteBeforeEmptyCell = (
	isFirstCell,
	prevCell,
	longNoteCounter
) => {
	if (isFirstCell || !prevCell) {
		return;
	}

	return noteInfoToNoteObj([prevCell.note, longNoteCounter]);
};

export const getNoteFromPrevCell = (prevCell, longNoteCounter) =>
	noteInfoToNoteObj([prevCell.note, longNoteCounter]);

export const getStopNote = (nullCounter) =>
	noteInfoToNoteObj(['stop', nullCounter]);
