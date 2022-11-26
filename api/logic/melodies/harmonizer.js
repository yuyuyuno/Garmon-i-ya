const Schmuckler = require('./schmuckler');
const { NOTE_NAMES } = require('../../constants/musicConstants');

class Harmonizer {
	#melody;

	getChordNotes = getChordNotes;
	getKeyNotes = getKeyNotes;
	majorKey = [0, 2, 4, 5, 7, 9, 11];
	minorKey = [0, 2, 3, 5, 7, 8, 10];
	inKeyChord = [];

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
	chordNotes = this.melody
		.map((measure) =>
			measure.reduce((prev, cur) =>
				prev.noteLength >= cur.noteLength ? prev : cur
			)
		)
		.map((note) => note.noteName.slice(0, -1));
	return chordNotes;
}

module.exports = Harmonizer;
