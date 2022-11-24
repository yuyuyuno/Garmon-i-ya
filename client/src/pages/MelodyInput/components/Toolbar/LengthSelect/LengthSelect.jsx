export const LengthSelect = (props) => {
	const { selectedLength, selectLength } = props;

	const lengthSelectStyles = {
		backgroundColor: '#F7F5F9',
	};

	const noteLengths = [
		{ value: 'eighth', label: '1/8' },
		{ value: 'quarter', label: '1/4' },
		{ value: 'half', label: '1/2' },
		{ value: 'whole', label: 'whole' },
	];

	return (
		<fieldset style={lengthSelectStyles}>
			<legend>Select note length:</legend>

			{noteLengths.map((note, i) => (
				<div key={`radiofield${i}`}>
					<input
						type="radio"
						name="noteLength"
						value={note.value}
						checked={note.value === selectedLength}
						onChange={(e) => selectLength(e.target.value)}
					/>
					<label>{note.label}</label>
				</div>
			))}
		</fieldset>
	);
};
