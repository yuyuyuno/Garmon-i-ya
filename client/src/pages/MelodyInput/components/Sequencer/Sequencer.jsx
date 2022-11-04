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

	const changeMelody = (row, column) => {
		const newMelody = [...inputMelody];

		if (newMelody[column] !== null) {
			//если нужно удалить

			if (newMelody[column].isHeld) {
				//если мы не в начале нотки
				let columnCopy = column - 1;
				while (newMelody[columnCopy].isHeld) {
					newMelody[columnCopy] = null;
					--columnCopy; // удаляем влево
				}
				newMelody[columnCopy] = null; // удаляем начало нотки
			}
			newMelody[column] = null;
			++column;
			while (newMelody[column] !== null && newMelody[column].isHeld) {
				newMelody[column] = null;
				++column; // удаляем вправо
			}
		} else {
			const range = getRangeArray(lengthToCellQuantity[noteLength], column);

			range.forEach((index) => {
				index > column
					? (newMelody[index] = {
							note: keyIndexToNote(47 - row),
							isHeld: true,
					  })
					: (newMelody[index] = {
							note: keyIndexToNote(47 - row),
							isHeld: false,
					  });
			});
		}

		setInputMelody(newMelody);
		console.log(newMelody);
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
