import { useState } from 'react';
import axios from '../../axiosWrapper';

import { Sequencer } from './components/Sequencer';
import { Toolbar } from './components/Toolbar';

import {
	getRangeArray,
	pushIfNotNull,
	getLastMeasureNote,
	getNoteBeforeEmptyCell,
	getNoteFromPrevCell,
	getStopNote,
} from '../../utils';

export const MelodyInput = (props) => {
	const { handleGetHarmonized, goToTheManual } = props;

	const [noteLength, setNoteLength] = useState('eighth');
	const [option, setOption] = useState('chrd');
	const [inputMelody, setInputMelody] = useState(new Array(32).fill(null));

	const adaptMelodyArray = () => {
		const measureCount = inputMelody.length / 8;
		let nullCounter = 0;
		let longNoteCounter = 1;

		const getCellNote = (melodyNoteIndex, measureIndex) => {
			const isFirstCell = melodyNoteIndex === measureIndex * 8;
			const prevCell = inputMelody[melodyNoteIndex - 1];

			if (!inputMelody[melodyNoteIndex]) {
				const noteInfo = getNoteBeforeEmptyCell(
					isFirstCell,
					prevCell,
					longNoteCounter
				);

				++nullCounter;
				if (noteInfo) {
					longNoteCounter = 1;
				}

				return noteInfo;
			}

			if (!isFirstCell && nullCounter) {
				const noteInfo = getStopNote(nullCounter);
				nullCounter = 0;

				return noteInfo;
			}

			if (inputMelody[melodyNoteIndex]?.isHeld) {
				++longNoteCounter;
				return;
			}

			if (!isFirstCell && prevCell) {
				const noteInfo = getNoteFromPrevCell(prevCell, longNoteCounter);
				longNoteCounter = 1;

				return noteInfo;
			}
		};

		const getMeasureNotes = (measureNotes, melodyNoteIndex, measureIndex) => {
			const cellNote = getCellNote(melodyNoteIndex, measureIndex);
			const lastMeasureNote = getLastMeasureNote(
				inputMelody,
				measureIndex,
				melodyNoteIndex,
				nullCounter,
				longNoteCounter
			);

			if (lastMeasureNote) {
				longNoteCounter = 1;
				nullCounter = 0;
			}

			pushIfNotNull(measureNotes, [cellNote, lastMeasureNote]);

			return measureNotes;
		};

		const melodyArray = getRangeArray(measureCount).map((measureIndex) =>
			getRangeArray(8, measureIndex * 8).reduce(
				(measureNotes, melodyNoteIndex) =>
					getMeasureNotes(measureNotes, melodyNoteIndex, measureIndex),
				[]
			)
		);

		return melodyArray;
	};

	const addMeasure = () => {
		setInputMelody(inputMelody.concat(...new Array(8).fill(null)));
	};

	const deleteMeasure = () => {
		setInputMelody(inputMelody.slice(0, inputMelody.length - 8));
	};

	const handleResButtonClick = () => {
		const melody = adaptMelodyArray().filter(
			(measure) => measure.filter((note) => note.noteName !== 'stop').length
		);
		const options = option;
		let result;

		if (melody.length) {
			axios
				.post('/api/harmonization/melodies', { melody, options })
				.then((res) => {
					result = {
						status: 'ok',
						sheets: res.data.harmonizedMelody,
					};
				})
				.catch((err) => {
					result = {
						status: 'error',
						errorCode: err.code,
						errorMessage: err.message,
					};
				})
				.finally(() => {
					handleGetHarmonized(result);
				});
		} else {
			alert('Please input something first!');
		}
	};

	const buttons = [
		{ clickHandler: addMeasure, label: '+' },
		{ clickHandler: deleteMeasure, label: '-' },
		{ clickHandler: handleResButtonClick, label: 'Harmonize →' },
	];

	return (
		<div>
			<Toolbar
				buttons={buttons}
				selectedLength={noteLength}
				selectLength={setNoteLength}
				selectedOption={option}
				selectOption={setOption}
				goToTheManual={goToTheManual}
			/>
			<Sequencer
				inputMelody={inputMelody}
				noteLength={noteLength}
				setInputMelody={setInputMelody}
			/>
		</div>
	);
};
