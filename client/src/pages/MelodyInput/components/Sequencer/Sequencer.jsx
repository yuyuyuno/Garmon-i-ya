import { Input } from './Input';
import { Piano } from './Piano';
import { useState } from 'react';

export const Sequencer = () => {
	const [inputMelody, setInputMelody] = useState(new Array(12).fill(null));

	const sequencerStyles = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
	};

	return (
		<div style={sequencerStyles}>
			<Piano />
			<Input
				rowCount={48}
				columnCount={inputMelody.length}
				inputMelody={inputMelody}
				clickHandler={() => console.log('clicked')}
			/>
		</div>
	);
};
