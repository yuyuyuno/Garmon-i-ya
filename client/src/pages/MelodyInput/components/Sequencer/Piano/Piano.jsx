import { PianoKey } from './PianoKey';
import { getRangeArray } from '../../../../../utils';

const KEY_NAMES = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
];

const OCTAVE_LENGTH = KEY_NAMES.length;

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
		const keyIndexInOctave = keyIndex % OCTAVE_LENGTH;
		return {
			label: showKeyNames ? KEY_NAMES[keyIndexInOctave] : '',
			isBlack: isKeyBlack(keyIndexInOctave),
		};
	};

	const keysInfo = getRangeArray(keysCount)
		.map((keyIndex) => getKeyInfo(keyIndex))
		.reverse();

	return (
		<div style={pianoStyles}>
			{keysInfo.map((keyInfo, i) => (
				<PianoKey key={i} {...keyInfo} />
			))}
		</div>
	);
};
