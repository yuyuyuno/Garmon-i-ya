import { useState } from 'react';

import { Button } from '../../components/Button';
import { Sequencer } from './components/Sequencer';

import { getRangeArray } from '../../utils';

export const MelodyInput = () => {
	const [inputMelody, setInputMelody] = useState(new Array(24).fill(null));
	const [noteLength, setNoteLength] = useState('quarter');
	let nullCounter = 0;
	let longNoteCounter = 1;

	const addNoteToMeasure = (measureNotes, noteInfo) => {
		measureNotes.push({
			noteName: noteInfo[0],
			noteLength: noteInfo[1],
		});
	};

	const handleLastMeasureNote = (
		measureNotes,
		measureIndex,
		melodyNoteIndex
	) => {
		const isLastCell = melodyNoteIndex === (measureIndex + 1) * 8 - 1;
		if (!isLastCell) {
			return;
		}

		addNoteToMeasure(measureNotes, [
			inputMelody[melodyNoteIndex] ? inputMelody[melodyNoteIndex].note : 'stop',
			inputMelody[melodyNoteIndex] ? longNoteCounter : nullCounter,
		]);

		longNoteCounter = 1;
		nullCounter = 0;
	};

	const getCellNote = (melodyNoteIndex, measureIndex) => {
		const measureNotes = [];

		const isFirstCell = melodyNoteIndex === measureIndex * 8;
		const prevCell = inputMelody[melodyNoteIndex - 1];

		if (!inputMelody[melodyNoteIndex]) {
			++nullCounter;
			if (!isFirstCell && prevCell) {
				addNoteToMeasure(measureNotes, [prevCell.note, longNoteCounter]);
				longNoteCounter = 1;
			}
		}

		if (inputMelody[melodyNoteIndex]) {
			if (!isFirstCell && nullCounter) {
				addNoteToMeasure(measureNotes, ['stop', nullCounter]);
				nullCounter = 0;
			} else {
				if (inputMelody[melodyNoteIndex]?.isHeld) {
					++longNoteCounter;
				} else {
					if (!isFirstCell && prevCell?.isHeld) {
						addNoteToMeasure(measureNotes, [prevCell.note, longNoteCounter]);
						longNoteCounter = 1;
					}
				}
			}
		}

		handleLastMeasureNote(measureNotes, measureIndex, melodyNoteIndex);

		console.log('NOTE OR 2', measureNotes);
		return measureNotes;
	};

	const handleResButtonClick = () => {
		const measureCount = inputMelody.length / 8;
		const melodyArray = getRangeArray(measureCount).map((measureIndex) =>
			getRangeArray(8, measureIndex * 8).reduce(
				(measureNotes, melodyNoteIndex) => {
					measureNotes.push(...getCellNote(melodyNoteIndex, measureIndex));
					return measureNotes;
				},
				[]
			)
		);

		console.log(melodyArray);
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
