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

	constructor(melody) {
		this.#melody = melody;
	}

	get melody() {
		return this.#melody;
	}
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

function getChordNotes() {
	const keyNotes = this.getKeyNotes();
	const chordNotes = this.melody
		.map((measure) =>
			measure.reduce((prev, cur) =>
				prev.noteLength >= cur.noteLength ? prev : cur
			)
		)
		.map((note) => {
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
		});

	chordNotes.splice(-1);
	chordNotes.push(keyNotes[0]);

	return chordNotes;
}

function getChordsAbc() {
	let chordsAbc = '';
	const chordNotes = this.getChordNotes().map((elem) => sharpToAbc(elem));
	const keyNotes = this.getKeyNotes().map((elem) => sharpToAbc(elem));

	console.log(chordNotes);
	chordNotes.forEach((elem) => {
		if (keyNotes.includes(elem)) {
			chordsAbc += `[${elem},8${
				keyNotes[(keyNotes.indexOf(elem) + 2) % keyNotes.length]
			},8${keyNotes[(keyNotes.indexOf(elem) + 4) % keyNotes.length]},8]`;
		} else {
			chordsAbc += `${elem},8`;
		}
		chordsAbc += '|';
	});
	return chordsAbc;
}

function getArpeggioAbc() {
	let arpeggioAbc = '';
	let lowerOctave = ',';
	const chordNotes = this.getChordNotes().map((elem) => sharpToAbc(elem));
	const keyNotes = this.getKeyNotes().map((elem) => sharpToAbc(elem));

	chordNotes.forEach((elem) => {
		elem === 'C' || '^C' || 'D' || '^D' || 'E'
			? (tonic = elem)
			: (tonic = elem + lowerOctave);
		fifth = keyNotes[(keyNotes.indexOf(elem) + 4) % keyNotes.length];
		if (keyNotes.includes(elem)) {
			arpeggioAbc += tonic + ',2' + fifth + ',2' + tonic + '2' + fifth + ',2';
		} else {
			arpeggioAbc += `${elem},8`;
		}
		arpeggioAbc += '|';
	});
	return arpeggioAbc;
}

function sharpToAbc(noteName) {
	if (noteName.length === 2) {
		noteName = '^' + noteName;
		noteName = noteName.substring(0, 2);
	}
	return noteName;
}

module.exports = Harmonizer;
