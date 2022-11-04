import { useState } from 'react';

import { getRangeArray } from '../../../../utils';
import { Input } from './Input';
import { Piano } from './Piano';
import { keyIndexToNote } from '../../../../utils';

export const Sequencer = () => {
	const sequencerStyles = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
	};

	const [inputMelody, setInputMelody] = useState(new Array(24).fill(null));
	const [noteLength, setNoteLength] = useState('eighth');

	const lengthToCellQuantity = {
		eighth: 1,
		quarter: 2,
		half: 4,
		whole: 8,
	};

	const changeMelody = (row, column) => {
		const newMelody = [...inputMelody];

		const range = getRangeArray(lengthToCellQuantity[noteLength], column);

		range.forEach((index) => {
			index > column
				? (newMelody[index] = { note: keyIndexToNote(47 - row), isHeld: true })
				: (newMelody[index] = {
						note: keyIndexToNote(47 - row),
						isHeld: false,
				  });
		});

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
