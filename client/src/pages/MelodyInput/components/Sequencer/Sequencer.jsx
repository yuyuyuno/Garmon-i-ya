import { useState } from 'react';

import { Input } from './Input';
import { Piano } from './Piano';
import { keyIndexToNote } from '../../../../utils';
import { getRangeArray } from '../../../../utils';

export const Sequencer = () => {
	const sequencerStyles = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
	};

	const [inputMelody, setInputMelody] = useState(new Array(24).fill(null));
	const [noteLength, setNoteLength] = useState('half');

	const lengthToCellQuantity = {
		eighth: 1,
		quarter: 2,
		half: 4,
		whole: 8,
	};

	const deleteNote = (newMelody, index) => {
		if (newMelody[index].isHeld) {
			let columnCopy = index - 1;
			while (newMelody[columnCopy].isHeld) {
				newMelody[columnCopy] = null;
				--columnCopy;
			}
			newMelody[columnCopy] = null;
		}
		newMelody[index] = null;
		++index;
		while (newMelody[index] !== null && newMelody[index].isHeld) {
			newMelody[index] = null;
			++index;
		}
	};

	const changeMelody = (row, column) => {
		const newMelody = [...inputMelody];
		const range = getRangeArray(lengthToCellQuantity[noteLength], column);

		range.forEach((index) => {
			if (newMelody[index] !== null) {
				deleteNote(newMelody, index);
			}

			newMelody[index] = {
				note: keyIndexToNote(47 - row),
				isHeld: index > column,
			};
		});

		setInputMelody(newMelody);
	};

	return (
		<div style={sequencerStyles}>
			<Piano />
			<Input
				rowCount={48}
				columnCount={inputMelody.length}
				inputMelody={inputMelody}
				clickHandler={changeMelody}
			/>
		</div>
	);
};
