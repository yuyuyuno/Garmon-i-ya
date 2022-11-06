import React, { useState } from 'react';

import { MelodyInput } from './pages/MelodyInput';

const App = () => {
	const [appState, setAppState] = useState('input');
	const [outputContent, setOutputContent] = useState(null);

	return (
		<div>
			{appState === 'input' && (
				<MelodyInput
					handleGetHarmonized={(harmonizationResult) => {
						setOutputContent(harmonizationResult);
						setAppState('output');
					}}
				/>
			)}
			{appState === 'output' && (
				<div>Result screen props: {JSON.stringify(outputContent)}</div>
			)}
		</div>
	);
};

export default App;
