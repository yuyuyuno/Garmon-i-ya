const Harmonizer = require('./harmonizer');

class Melody {
	#notes;
	#removeStops = removeStops;

	constructor(melody) {
		this.#notes = melody;
	}

	get notes() {
		return this.#notes;
	}

	harmonize(options) {
		const filteredNotes = this.#removeStops();
		const harmonizer = new Harmonizer(filteredNotes);

		// The magic of harmonization later

		return this;
	}
}

function removeStops() {
	const melodyWithoutStops = this.notes.map((measure) =>
		measure.filter((note) => note.noteName !== 'stop')
	);

	return melodyWithoutStops;
}

module.exports = Melody;
