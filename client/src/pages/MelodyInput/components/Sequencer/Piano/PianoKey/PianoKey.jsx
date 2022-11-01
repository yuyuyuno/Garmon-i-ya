export const PianoKey = (props) => {
	const { label, isBlack } = props;

	const keyStyles = {
		border: 'solid 1px #000',
		backgroundColor: isBlack ? '#000' : '#fff',
		color: isBlack ? '#fff' : '#000',
		textAlign: 'right',
	};

	console.log(props);
	return <div style={keyStyles}>{label}</div>;
};
