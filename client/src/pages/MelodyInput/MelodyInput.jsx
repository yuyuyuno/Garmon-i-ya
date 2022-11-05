import { useState } from 'react';
import axios from '../../axiosWrapper';

import { Button } from '../../components/Button';
import { Sequencer } from './components/Sequencer';

import { getRangeArray, pushIfNotNull, noteInfoToNoteObj } from '../../utils';

export const MelodyInput = () => {
	const [inputMelody, setInputMelody] = useState(new Array(24).fill(null));
	const [noteLength, setNoteLength] = useState('quarter');
	let nullCounter = 0;
	let longNoteCounter = 1;

	const getLastMeasureNote = (measureIndex, melodyNoteIndex) => {
		const isLastCell = melodyNoteIndex === (measureIndex + 1) * 8 - 1;
		if (!isLastCell) {
			return;
		}

		const noteInfo = inputMelody[melodyNoteIndex];
		const lastNote = noteInfoToNoteObj([
			noteInfo?.note || 'stop',
			noteInfo ? longNoteCounter : nullCounter,
		]);

		longNoteCounter = 1;
		nullCounter = 0;

		return lastNote;
	};

	const getNoteBeforeEmptyCell = (isFirstCell, prevCell) => {
		++nullCounter;

		if (isFirstCell || !prevCell) {
			return;
		}

		const cellNote = noteInfoToNoteObj([prevCell.note, longNoteCounter]);
		longNoteCounter = 1;

		return cellNote;
	};

	const getNoteFromPrevCell = (prevCell) => {
		const cellNote = noteInfoToNoteObj([prevCell.note, longNoteCounter]);
		longNoteCounter = 1;

		return cellNote;
	};

	const getStopNote = () => {
		const cellNote = noteInfoToNoteObj(['stop', nullCounter]);
		nullCounter = 0;

		return cellNote;
	};

	const getCellNote = (melodyNoteIndex, measureIndex) => {
		const isFirstCell = melodyNoteIndex === measureIndex * 8;
		const prevCell = inputMelody[melodyNoteIndex - 1];

		if (!inputMelody[melodyNoteIndex]) {
			return getNoteBeforeEmptyCell(isFirstCell, prevCell);
		}

		if (!isFirstCell && nullCounter) {
			return getStopNote();
		}

		if (inputMelody[melodyNoteIndex]?.isHeld) {
			++longNoteCounter;
			return;
		}

		if (!isFirstCell && prevCell) {
			return getNoteFromPrevCell(prevCell);
		}
	};

	const adaptMelodyArray = () => {
		const measureCount = inputMelody.length / 8;
		const melodyArray = getRangeArray(measureCount).map((measureIndex) =>
			getRangeArray(8, measureIndex * 8).reduce(
				(measureNotes, melodyNoteIndex) => {
					pushIfNotNull(measureNotes, [
						getCellNote(melodyNoteIndex, measureIndex),
						getLastMeasureNote(measureIndex, melodyNoteIndex),
					]);

					return measureNotes;
				},
				[]
			)
		);

		return melodyArray;
	};

	const handleResButtonClick = () => {
		const melodyArray = adaptMelodyArray();
		console.log('TEST melodyArray', melodyArray);

		axios
			.post('/api/harmonization/melodies', { melody: melodyArray })
			.then((shit) => console.log(shit));
	};

	return (
		<div>
			MelodyInput page
			<br />
			<Sequencer
				inputMelody={inputMelody}
				noteLength={noteLength}
				setInputMelody={setInputMelody}
			/>
			<Button clickHandler={handleResButtonClick} label={'harmonize'} />
		</div>
	);
};
