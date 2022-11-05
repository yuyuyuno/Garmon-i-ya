import { PianoKey } from './PianoKey';
import { getRangeArray } from '../../../../../utils';
import { OCTAVE_LENGTH } from '../../../../../utils';
import { keyIndexToNote } from '../../../../../utils';

export const Piano = (props) => {
	const pianoStyles = {
		width: '180px',
	};

	const { keysCount = 48, showKeyNames = true } = props;

	const isKeyBlack = (keyIndex) => {
		const isOdd = keyIndex % 2 !== 0;
		const isLesserThanFive = keyIndex < 5;
		return (isOdd && isLesserThanFive) || (!isOdd && !isLesserThanFive);
	};

	const getKeyInfo = (keyIndex) => {
		return {
			label: showKeyNames ? keyIndexToNote(keyIndex) : '',
			isBlack: isKeyBlack(keyIndex % OCTAVE_LENGTH),
		};
	};

	const keysInfo = getRangeArray(keysCount)
		.map((keyIndex) => getKeyInfo(keyIndex))
		.reverse();

	return (
		<div style={pianoStyles}>
			{keysInfo.map((keyInfo, i) => (
				<PianoKey key={`pianokey${i}`} {...keyInfo} />
			))}
		</div>
	);
};
