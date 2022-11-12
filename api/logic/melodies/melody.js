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

	constructor(melody) {
		this.#notes = melody;
	}

	get notes() {
		return this.#notes;
	}
}

function removeStops() {
	const melodyWithoutStops = this.notes.map((measure) =>
		measure.filter((note) => note.noteName !== 'stop')
	);

	return melodyWithoutStops;
}

function harmonize(options) {
	const filteredNotes = this.removeStops();
	const harmonizer = new Harmonizer(filteredNotes);

	// The magic of harmonization later

	return this;
}

function getAbc() {
	console.log('Given notes: ', this.notes);
	const notesAbc = this.notes.reduce(
		(resAbc, curMeasure) => resAbc + getMeasureAbc(curMeasure) + '|',
		''
	);
	console.log(notesAbc);
	return notesAbc;
}

function getMeasureAbc(measure) {
	const measureAbc = measure.reduce((resMeasureAbc, curNote) => {
		let curNoteAbc;
		if (isStop(curNote)) {
			curNoteAbc = getPauseAbc(curNote.length);
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
			note = `${noteInfo.noteName},`;
		case '5':
			note = noteInfo.noteName.toLowerCase();
		case '6':
			note = `${noteInfo.noteName}'`;
	}
	return note + noteInfo.noteLength;
}

function getPauseAbc(pauseLength) {
	return 'z' + pauseLength;
}

function isStop(noteInfo) {
	return noteInfo.noteName === 'stop';
}

module.exports = Melody;
