import React, { useState } from 'react';

import { MelodyInput } from './pages/MelodyInput';
import { MelodyOutput } from './pages/MelodyOutput';
import { UserManual } from './pages/UserManual';

const App = () => {
	const [appState, setAppState] = useState('input');
	const [outputContent, setOutputContent] = useState(null);
	const goBack = () => {
		setAppState('input');
	};

	return (
		<div>
			{appState === 'manual' && <UserManual goBack={goBack} />}
			{appState === 'input' && (
				<MelodyInput
					handleGetHarmonized={(harmonizationResult) => {
						setOutputContent(harmonizationResult);
						setAppState('output');
					}}
					goToTheManual={() => {
						setAppState('manual');
					}}
				/>
			)}
			{appState === 'output' && outputContent.status === 'ok' && (
				<MelodyOutput
					results={outputContent.sheets}
					goBack={goBack}
					//	retry={() => {}}
				/>
			)}
		</div>
	);
};

export default App;
