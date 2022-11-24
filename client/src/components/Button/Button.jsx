export const Button = (props) => {
	const { clickHandler, label } = props;

	const buttonStyles = {
		margin: '5px',
	};

	return (
		<button
			className="glow-on-hover"
			style={buttonStyles}
			onClick={clickHandler}
		>
			{label}
		</button>
	);
};
