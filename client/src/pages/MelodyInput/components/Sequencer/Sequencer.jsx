import { useState } from 'react';

import { Input } from './Input';
import { Piano } from './Piano';

export const Sequencer = () => {
	const [inputMelody, setInputMelody] = useState(new Array(24).fill(null));

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
