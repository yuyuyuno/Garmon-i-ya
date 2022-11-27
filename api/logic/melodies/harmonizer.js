const Schmuckler = require('./schmuckler');
const { NOTE_NAMES } = require('../../constants/musicConstants');

class Harmonizer {
	#melody;

	getChordNotes = getChordNotes;
	getKeyNotes = getKeyNotes;
	getChordsAbc = getChordsAbc;
	getArpeggioAbc = getArpeggioAbc;
	majorKey = [0, 2, 4, 5, 7, 9, 11];
	minorKey = [0, 2, 3, 5, 7, 8, 10];

	static getRootNotes = getRootNotes;
	static sharpToAbc = sharpToAbc;
	static getOutOfKeyChordAbc = getOutOfKeyChordAbc;

	constructor(melody) {
		this.#melody = melody;
	}

	get melody() {
		return this.#melody;
	}
}

function getChordsAbc() {
	let chordsAbc = '';
	const chordNotes = this.getChordNotes().map((elem) => sharpToAbc(elem));
	const keyNotes = this.getKeyNotes().map((elem) => sharpToAbc(elem));

	console.log(chordNotes);
	chordNotes.forEach((rootNote) => {
		if (keyNotes.includes(rootNote)) {
			chordsAbc += `[${rootNote},8${
				keyNotes[(keyNotes.indexOf(rootNote) + 2) % keyNotes.length]
			},8${keyNotes[(keyNotes.indexOf(rootNote) + 4) % keyNotes.length]},8]`;
		} else {
			chordsAbc += getOutOfKeyChordAbc(rootNote);
		}
		chordsAbc += '|';
	});

	return chordsAbc;
}

function getArpeggioAbc() {
	let arpeggioAbc = '';
	let lowerOctave = ',';
	const chordNotes = this.getChordNotes().map((elem) => sharpToAbc(elem));
	const abcNotes = NOTE_NAMES.map((elem) => sharpToAbc(elem));

	chordNotes.forEach((rootNote) => {
		fifth = abcNotes[(abcNotes.indexOf(rootNote) + 7) % abcNotes.length];
		console.log(rootNote.slice(-1));
		if (rootNote.slice(-1) < 'C' || rootNote.slice(-1) > 'E') {
			rootNote += lowerOctave;
		}
		arpeggioAbc +=
			rootNote + ',2' + fifth + ',2' + rootNote + '2' + fifth + ',2';
	});

	return arpeggioAbc;
}

function getChordNotes() {
	const keyNotes = this.getKeyNotes();
	const chordNotes = this.melody
		.map((measure) =>
			measure.reduce((prev, cur) =>
				prev.noteLength >= cur.noteLength ? prev : cur
			)
		)
		.map((note) => getRootNotes(note, keyNotes));
	chordNotes.splice(-1);
	chordNotes.push(keyNotes[0]);

	return chordNotes;
}

function getRootNotes(note, keyNotes) {
	const noteName = note.noteName.slice(0, -1);
	if (keyNotes.includes(noteName)) {
		const chance = Math.random();
		if (chance <= 0.3) {
			return keyNotes[(keyNotes.indexOf(noteName) + 3) % keyNotes.length];
		} else if (chance >= 0.7) {
			return keyNotes[(keyNotes.indexOf(noteName) + 5) % keyNotes.length];
		}
	}
	return noteName;
}

function getOutOfKeyChordAbc(rootNote) {
	const abcNotes = NOTE_NAMES.map((elem) => sharpToAbc(elem));
	const oneOutOfSix = Math.floor(Math.random() * 6);
	const intervals = [];

	switch (oneOutOfSix) {
		case 0:
			intervals.push(3, 7);
			break;
		case 1:
			intervals.push(4, 7);
			break;
		case 2:
			intervals.push(3, 8);
			break;
		case 3:
			intervals.push(4, 9);
			break;
		case 4:
			intervals.push(5, 8);
			break;
		case 5:
			intervals.push(5, 9);
			break;
	}

	const secondNote =
		abcNotes[(abcNotes.indexOf(rootNote) + intervals[0]) % abcNotes.length];
	const thirdNote =
		abcNotes[(abcNotes.indexOf(rootNote) + intervals[1]) % abcNotes.length];

	return `[${rootNote},8${secondNote},8${thirdNote},8]`;
}

function getKeyNotes() {
	const keyNotes = [];
	const schmuckler = new Schmuckler(this.melody);
	const tonality = schmuckler.krumhanslSchmuckler();
	const tonicIndex = NOTE_NAMES.findIndex((elem) => elem === tonality.tonic);

	if (tonality.isMajor) {
		for (let i = 0; i < 7; ++i) {
			keyNotes.push(
				NOTE_NAMES[(tonicIndex + this.majorKey[i]) % NOTE_NAMES.length]
			);
		}
	} else {
		for (let i = 0; i < 7; ++i) {
			keyNotes.push(
				NOTE_NAMES[(tonicIndex + this.minorKey[i]) % NOTE_NAMES.length]
			);
		}
	}

	return keyNotes;
}

function sharpToAbc(noteName) {
	if (noteName.length === 2) {
		noteName = '^' + noteName;
		noteName = noteName.substring(0, 2);
	}
	return noteName;
}

module.exports = Harmonizer;
