const Schmuckler = require('./schmuckler');
const { NOTE_NAMES } = require('../../constants/musicConstants');

class Harmonizer {
	#melody;

	getChords = getChords;
	constructor(melody) {
		this.#melody = melody;
		// console.log('The melody to harmonize is: ', this.#melody);
	}
	get melody() {
		return this.#melody;
	}
}

function getChords() {
	const schmuckler = new Schmuckler(this.melody);
	return schmuckler.krumhanslSchmuckler();
}

module.exports = Harmonizer;
