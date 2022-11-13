export const Note = (props) => {
	const { headOfLongNote, bodyOfLongNote, tailOfLongNote } = props;

	const noteStyles = {
		background: '#8F54B0',
		height: '15px',
		margin: '2px',
		...(tailOfLongNote && { marginLeft: 0 }),
		...(bodyOfLongNote && { marginLeft: 0, marginRight: 0 }),
		...(headOfLongNote && { marginRight: 0 }),
	};

	return <div style={noteStyles}></div>;
};
