class Harmonizer {
	#melody;

	constructor(melody) {
		this.#melody = melody;
		console.log('The melody to harmonize is: ', this.#melody);
	}
}

module.exports = Harmonizer;
