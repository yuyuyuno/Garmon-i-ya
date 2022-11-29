import { useRef, useEffect } from 'react';
import { synth, renderAbc } from 'abcjs';

import { Button } from '../../components/Button';

import 'abcjs/abcjs-audio.css';

export const MelodyOutput = (props) => {
	const { results, goBack, retry } = props;
	const ref = useRef();

	const buttons = [
		{ clickHandler: retry, label: 'Retry' },
		{ clickHandler: goBack, label: 'Return' },
	];

	/* const myContext = new AudioContext();
	const visualObj = renderAbc(ref.current, results);
	synth
		.init({
			audioContext: myContext,
			visualObj: visualObj,
			millisecondsPerMeasure: 500,
			options: {
				soundFontUrl: 'https:/path/to/soundfont/folder',
				pan: [-0.3, 0.3],
			},
		})
		.then(function (results) {
			// Ready to play. The results are details about what was loaded.
		})
		.catch(function (reason) {
			console.log(reason);
		});
 */
	console.log('Harmonized melody', results);

	useEffect(() => {
		renderAbc(ref.current, results);
	}, []);

	return (
		<div>
			<div ref={ref}></div>
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
