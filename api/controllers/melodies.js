const Melody = require('../logic/melodies/melody');

/*
	req.body contains melody and later options which should be passed to harmonize method. 
	To understand the structure, melody is of type Melody (wow!!!).
	In TS syntax it's like the following...

	type Melody = Measure[];
	type Measure = Note[];
	type Note = {
		noteName: string;
		noteLength: number;
	};
	
	noteName consists of note letter and octave number (like A5);
	noteLength is a note length in count of 1/8;
*/
const harmonizeMelody = (req, res) => {
	const { melody } = req.body;
	const harmonizedMelody = new Melody(melody).harmonize().getAbc();

	res.status(200).send({
		harmonizedMelody,
	});
};

module.exports = {
	harmonizeMelody,
};
