export const Note = (props) => {
	const { headOfLongNote, bodyOfLongNote } = props;

	const noteStyles = {
		background: '#8F54B0',
		height: '15px',
		margin: '2px',
		...(bodyOfLongNote && { marginLeft: 0 }),
		...(headOfLongNote && { marginRight: 0 }),
	};

	return <div style={noteStyles}></div>;
};
