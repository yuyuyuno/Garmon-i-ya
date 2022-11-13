import { useState } from 'react';
import axios from '../../axiosWrapper';

import { Button } from '../../components/Button';
import { Sequencer } from './components/Sequencer';

import {
	getRangeArray,
	pushIfNotNull,
	getLastMeasureNote,
	getNoteBeforeEmptyCell,
	getNoteFromPrevCell,
	getStopNote,
} from '../../utils';

export const MelodyInput = (props) => {
	const { handleGetHarmonized } = props;

	const [inputMelody, setInputMelody] = useState(new Array(24).fill(null));
	const [noteLength, setNoteLength] = useState('quarter');

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

	const handleResButtonClick = () => {
		const starryNight = [
			[
				{ noteName: 'D4', noteLength: 4 },
				{ noteName: 'A4', noteLength: 2 },
				{ noteName: 'A4', noteLength: 2 },
			],
			[
				{ noteName: 'D4', noteLength: 4 },
				{ noteName: 'A4', noteLength: 2 },
				{ noteName: 'A4', noteLength: 2 },
			],
			[
				{ noteName: 'C4', noteLength: 4 },
				{ noteName: 'A4', noteLength: 2 },
				{ noteName: 'A4', noteLength: 2 },
			],
		];

		const melody = adaptMelodyArray(); // starryNight
		let result;

		axios
			.post('/api/harmonization/melodies', { melody })
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
	};

	return (
		<div>
			<Sequencer
				inputMelody={inputMelody}
				noteLength={noteLength}
				setInputMelody={setInputMelody}
			/>
			<Button clickHandler={handleResButtonClick} label={'harmonize'} />
		</div>
	);
};
