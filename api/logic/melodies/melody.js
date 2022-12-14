const Harmonizer = require('./harmonizer');

class Melody {
	#notes;

	removeStops = removeStops;
	harmonize = harmonize;
	getAbc = getAbc;

	static getMeasureAbc = getMeasureAbc;
	static getNoteAbc = getNoteAbc;
	static getPauseAbc = getPauseAbc;
	static isStop = isStop;
	static isSharp = isSharp;

	constructor(melody) {
		this.#notes = melody;
	}

	get notes() {
		return this.#notes;
	}
}

function removeStops() {
	const melodyWithoutStops = this.notes
		.map((measure) => measure.filter((note) => note.noteName !== 'stop'))
		.filter((measure) => measure.length);

	return melodyWithoutStops;
}

function harmonize(options) {
	const filteredNotes = this.removeStops();
	const harmonizer = new Harmonizer(filteredNotes);
	if (options === 'chrd') {
		return harmonizer.getChordsAbc();
	} else {
		return harmonizer.getArpeggioAbc();
	}
}

function getAbc(options) {
	console.log('Given notes: ', this.notes);
	const startAbc =
		'X:1\nT:Harmonized Melody\nR: Harmonized by GARMON I YA\nM: 4/4\nK:C\nV:1 clef=treble\n';
	const notesAbc =
		this.notes.reduce((resAbc, curMeasure, measureNumber) => {
			resAbc += getMeasureAbc(curMeasure) + '|';
			if (
				(measureNumber + 1) % 6 === 0 &&
				measureNumber + 1 !== this.notes.length
			) {
				resAbc += '\n';
			}
			return resAbc;
		}, startAbc) +
		']\nV:2 clef=bass\n' +
		this.harmonize(options) +
		']';
	console.log(notesAbc);
	return notesAbc;
}

function getMeasureAbc(measure) {
	const measureAbc = measure.reduce((resMeasureAbc, curNote) => {
		let curNoteAbc;
		if (isStop(curNote)) {
			curNoteAbc = getPauseAbc(curNote.noteLength);
		} else {
			curNoteAbc = getNoteAbc(curNote);
		}

		return resMeasureAbc + curNoteAbc;
	}, '');
	return measureAbc;
}

function getNoteAbc(noteInfo) {
	const octaveNumber = noteInfo.noteName.slice(-1);
	let note;
	note = noteInfo.noteName.slice(0, -1);
	switch (octaveNumber) {
		case '3':
			note = `${note},`;
			break;
		case '5':
			note = note.toLowerCase();
			break;
		case '6':
			note = `${note.toLowerCase()}'`;
			break;
		default:
			break;
	}
	if (isSharp(noteInfo)) {
		note = '^' + note;
		note = note.substring(0, 2) + note.substring(3);
	}
	return note + noteInfo.noteLength;
}

function getPauseAbc(pauseLength) {
	return 'z' + pauseLength;
}

function isStop(noteInfo) {
	return noteInfo.noteName === 'stop';
}

function isSharp(noteInfo) {
	return noteInfo.noteName[1] === '#';
}

module.exports = Melody;
