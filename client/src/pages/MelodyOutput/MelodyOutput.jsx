import { useRef, useEffect } from 'react';
import { synth, renderAbc } from 'abcjs';

import { Button } from '../../components/Button';

import 'abcjs/abcjs-audio.css';

export const MelodyOutput = (props) => {
	const { results, goBack, retry } = props;
	const sheetRef = useRef();
	const audioRef = useRef();

	const buttons = [
		//{ clickHandler: retry, label: 'Retry' },
		{ clickHandler: goBack, label: 'Return' },
	];

	const audioParams = { chordsOff: true };

	useEffect(() => {
		if (synth.supportsAudio()) {
			const synthControl = new synth.SynthController();
			synthControl.load(
				audioRef.current,
				{},
				{
					displayLoop: true,
					displayRestart: true,
					displayPlay: true,
					displayProgress: true,
					displayWarp: true,
				}
			);

			const visualObj = renderAbc(sheetRef.current, results);
			const createSynth = new synth.CreateSynth();
			createSynth
				.init({ visualObj: visualObj[0] })
				.then(function () {
					synthControl
						.setTune(visualObj[0], false, audioParams)
						.then(function () {
							console.log('Audio successfully loaded.');
						})
						.catch(function (error) {
							console.warn('Audio problem:', error);
						});
				})
				.catch(function (error) {
					console.warn('Audio problem:', error);
				});
		} else {
			document.querySelector(audioRef.current).innerHTML =
				'Audio is not supported in this browser.';
		}
	});

	console.log('Harmonized melody', results);

	useEffect(() => {
		renderAbc(sheetRef.current, results);
	}, []);

	return (
		<div>
			<div ref={sheetRef}></div>
			<div ref={audioRef}></div>
			{buttons.map((button, i) => (
				<Button
					key={`button${i}`}
					className="btn"
					clickHandler={button.clickHandler}
					label={button.label}
				/>
			))}
		</div>
	);
};
