import { PianoKey } from './PianoKey';

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

const getRangeArray = (elementsCount) => [...new Array(elementsCount).keys()];

export const Piano = (props) => {
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

	const keysInfo = getRangeArray(keysCount).map((keyIndex) =>
		getKeyInfo(keyIndex)
	);

	return (
		<div>
			{keysInfo.map((i, keyInfo) => (
				<PianoKey key={i} {...keyInfo} />
			))}
		</div>
	);
};
