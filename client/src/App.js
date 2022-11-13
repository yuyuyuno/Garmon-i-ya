import React, { useState } from 'react';

import { MelodyInput } from './pages/MelodyInput';
import { MelodyOutput } from './pages/MelodyOutput';

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
			{appState === 'output' && outputContent.status === 'ok' && (
				<MelodyOutput results={outputContent.sheets} />
			)}
		</div>
	);
};

export default App;
