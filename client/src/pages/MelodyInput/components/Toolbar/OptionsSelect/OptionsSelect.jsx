export const OptionsSelect = (props) => {
	const { selectedOption, selectOption } = props;

	const optionSelectStyles = {
		backgroundColor: '#F7F5F9',
	};

	const options = [
		{ value: 'chrd', label: 'Chords' },
		{ value: 'arp', label: 'Arpeggio' },
	];

	return (
		<fieldset style={optionSelectStyles}>
			<legend>Select harmonization type:</legend>

			{options.map((option, i) => (
				<div key={`optionfield${i}`}>
					<input
						type="radio"
						name="option"
						value={option.value}
						checked={option.value === selectedOption}
						onChange={(e) => selectOption(e.target.value)}
					/>
					<label>{option.label}</label>
				</div>
			))}
		</fieldset>
	);
};
