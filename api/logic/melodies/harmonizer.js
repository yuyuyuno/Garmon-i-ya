class Harmonizer {
	#melody;

	krumhanslSchmuckler = krumhanslSchmuckler;
	getTonic = getTonic;
	getNoteLengths = getNoteLengths;
	majorProfile = [
		6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88,
	];
	minorProfile = [
		6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17,
	];

	static getAverage = getAverage;
	majorAverage = getAverage(this.majorProfile);
	minorAverage = getAverage(this.minorProfile);
	static calculateCorrelation = calculateCorrelation;

	constructor(melody) {
		this.#melody = melody;
		// console.log('The melody to harmonize is: ', this.#melody);
	}

	get melody() {
		return this.#melody;
	}
}

function krumhanslSchmuckler() {
	const tonic = this.getTonic();
	const NOTE_NAMES = [
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
	const noteLengths = this.getNoteLengths();
	const lengthSum = [];
	const tonicIndex = NOTE_NAMES.findIndex((elem) => elem === tonic);
	for (let i = tonicIndex; i < tonicIndex + 12; ++i) {
		if (!noteLengths[NOTE_NAMES[i % 12]]) {
			lengthSum.push(0);
		} else {
			lengthSum.push(noteLengths[NOTE_NAMES[i % 12]]);
		}
	}
	const majorCorrelation = calculateCorrelation(
		this.majorProfile,
		this.majorAverage,
		lengthSum,
		getAverage(lengthSum)
	);
	const minorCorrelation = calculateCorrelation(
		this.minorProfile,
		this.minorAverage,
		lengthSum,
		getAverage(lengthSum)
	);
	return {
		tonic: tonic,
		isMajor: majorCorrelation > minorCorrelation ? true : false,
	};
}

function getNoteLengths() {
	const noteLengths = this.melody.flat().reduce((res, cur) => {
		const noteName = cur.noteName.slice(0, -1);
		if (!res[noteName]) {
			res[noteName] = cur.noteLength;
		} else {
			res[noteName] += cur.noteLength;
		}
		return res;
	}, {});
	return noteLengths;
}

function calculateCorrelation(firstArray, firstAvg, secondArray, secondAvg) {
	let numerator = 0;
	let denominator1 = 0;
	let denominator2 = 0;
	for (let i = 0; i <= 11; ++i) {
		numerator += (firstArray[i] - firstAvg) * (secondArray[i] - secondAvg);
		denominator1 += (firstArray[i] - firstAvg) ** 2;
		denominator2 += (secondArray[i] - secondAvg) ** 2;
	}
	return numerator / Math.sqrt(denominator1 * denominator2);
}

function getTonic() {
	return this.melody[this.melody.length - 1][
		this.melody[this.melody.length - 1].length - 1
	].noteName.slice(0, -1);
}

function getAverage(array) {
	return array.reduce((prev, cur) => prev + cur, 0) / array.length;
}

module.exports = Harmonizer;
