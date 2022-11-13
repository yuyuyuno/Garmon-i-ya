import { useRef, useEffect } from 'react';
import { renderAbc } from 'abcjs';

import 'abcjs/abcjs-audio.css';

export const MelodyOutput = (props) => {
	const { results } = props;
	const ref = useRef();

	console.log('Harmonized melody', results);

	useEffect(() => {
		renderAbc(ref.current, results);
	}, []);

	return <div ref={ref}></div>;
};
