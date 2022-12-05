import { useState } from 'react';

import { Input } from './Input';
import { Piano } from './Piano';
import { keyIndexToNote, getRangeArray } from '../../../../utils';

export const Sequencer = (props) => {
	const { inputMelody, noteLength, setInputMelody } = props;

	const sequencerStyles = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		overflow: 'scroll',
	};

	const lengthToCellQuantity = {
		eighth: 1,
		quarter: 2,
		half: 4,
		whole: 8,
	};

	const getActualNoteLength = (column) => {
		if (
			Math.floor(column / 8) !==
			Math.floor((column + lengthToCellQuantity[noteLength] - 1) / 8)
		) {
			return 8 - (column % 8);
		} else {
			return lengthToCellQuantity[noteLength];
		}
	};

	const deleteNote = (newMelody, index) => {
		if (newMelody[index] === null) {
			return;
		}
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
		while (
			index < newMelody.length &&
			newMelody[index] !== null &&
			newMelody[index].isHeld
		) {
			newMelody[index] = null;
			++index;
		}
	};

	const changeMelody = (row, column) => {
		const newMelody = [...inputMelody];
		const actualNoteLength = getActualNoteLength(column);

		const noteInterval = getRangeArray(actualNoteLength, column);

		if (
			newMelody[column] &&
			newMelody[column].note === keyIndexToNote(47 - row)
		) {
			deleteNote(newMelody, column);
		} else {
			noteInterval.forEach((cellIndex) => {
				deleteNote(newMelody, cellIndex);

				newMelody[cellIndex] = {
					note: keyIndexToNote(47 - row),
					isHeld: cellIndex > column,
				};
			});
		}
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
