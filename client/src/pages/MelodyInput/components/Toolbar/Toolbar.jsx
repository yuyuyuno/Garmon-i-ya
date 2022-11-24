import { Button } from '../../../../components/Button';
import { LengthSelect } from './LengthSelect';

export const Toolbar = (props) => {
	const { buttons, selectedLength, selectLength } = props;

	const toolbarStyles = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		backgroundColor: '#DFD9E3',
		padding: '15px',
		//borderBottom: '5px solid',
	};

	return (
		<div style={toolbarStyles}>
			<LengthSelect
				selectedLength={selectedLength}
				selectLength={selectLength}
			/>
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
