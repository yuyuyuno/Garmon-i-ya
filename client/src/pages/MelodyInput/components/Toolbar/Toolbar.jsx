import { Button } from '../../../../components/Button';

export const Toolbar = (props) => {
	const { addButtonClickHandler, removeButton } = props;

	return (
		<div>
			some tools
			<Button clickHandler={addButtonClickHandler} label={'+'} />
			<Button clickHandler={removeButton} label={'-'} />
		</div>
	);
};
