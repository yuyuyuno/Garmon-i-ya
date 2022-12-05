import { Button } from '../../../../components/Button';
import { LengthSelect } from './LengthSelect';
import { OptionsSelect } from './OptionsSelect';

export const Toolbar = (props) => {
	const {
		buttons,
		selectedLength,
		selectLength,
		selectedOption,
		selectOption,
		goToTheManual,
	} = props;

	const toolbarStyles = {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#DFD9E3',
		padding: '15px',
	};

	const manualButtonStyles = {
		float: 'right',
		display: 'inline-block',
	};

	return (
		<div style={toolbarStyles}>
			<img src="logo.png" width="120px" height="auto" />
			<LengthSelect
				selectedLength={selectedLength}
				selectLength={selectLength}
			/>
			<OptionsSelect
				selectedOption={selectedOption}
				selectOption={selectOption}
			/>
			{buttons.map((button, i) => (
				<Button
					key={`button${i}`}
					clickHandler={button.clickHandler}
					label={button.label}
				/>
			))}
			<div style={manualButtonStyles}>
				<Button clickHandler={goToTheManual} label={'Show user manual'} />
			</div>
		</div>
	);
};
