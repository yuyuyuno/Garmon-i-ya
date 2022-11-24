import { Button } from '../../../../components/Button';
import { LengthSelect } from './LengthSelect';

export const Toolbar = (props) => {
	const { buttons, selectedLength, selectLength } = props;

	return (
		<div>
			<LengthSelect
				selectedLength={selectedLength}
				selectLength={selectLength}
			/>
			{buttons.map((button, i) => (
				<Button
					key={`button${i}`}
					clickHandler={button.clickHandler}
					label={button.label}
				/>
			))}
		</div>
	);
};
