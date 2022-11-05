import { useState } from 'react';

import { Button } from '../../components/Button';
import { getRangeArray } from '../../utils';
import { Sequencer } from './components/Sequencer';

export const MelodyInput = () => {
	const [inputMelody, setInputMelody] = useState(new Array(24).fill(null));
	const [noteLength, setNoteLength] = useState('quarter');

	const addNote = (name, length, noteArray) => {
		noteArray.push({
			noteName: name,
			noteLength: length,
		});
	};

	const ResButtonClickHandler = () => {
		const melodyArray = new Array(inputMelody.length / 8)
			.fill([])
			.map((measureNotes, measureIndex) => {
				let nullCounter = 0;
				let longNoteCounter = 1;
				measureNotes = [];
				getRangeArray(8, measureIndex * 8).forEach((melodyNoteIndex) => {
					if (!inputMelody[melodyNoteIndex]) {
						++nullCounter;
						if (
							melodyNoteIndex !== measureIndex * 8 &&
							inputMelody[melodyNoteIndex - 1]
						) {
							addNote(
								inputMelody[melodyNoteIndex - 1].note,
								longNoteCounter,
								measureNotes
							);
							longNoteCounter = 1;
						}
					} else {
						if (melodyNoteIndex !== measureIndex * 8 && nullCounter) {
							addNote('stop', nullCounter, measureNotes);
							nullCounter = 0;
						} else {
							if (inputMelody[melodyNoteIndex]?.isHeld) {
								++longNoteCounter;
							} else {
								if (
									melodyNoteIndex !== measureIndex * 8 &&
									inputMelody[melodyNoteIndex - 1]?.isHeld
								) {
									addNote(
										inputMelody[melodyNoteIndex - 1].note,
										longNoteCounter,
										measureNotes
									);
									longNoteCounter = 1;
								}
							}
						}
					}
					if (melodyNoteIndex === (measureIndex + 1) * 8 - 1) {
						addNote(
							inputMelody[melodyNoteIndex]
								? inputMelody[melodyNoteIndex].note
								: 'stop',
							inputMelody[melodyNoteIndex] ? longNoteCounter : nullCounter,
							measureNotes
						);
						longNoteCounter = 1;
						nullCounter = 0;
					}
				});

				return measureNotes;
			});
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
			<Button clickHandler={ResButtonClickHandler} label={'harmonize'} />
		</div>
	);
};
