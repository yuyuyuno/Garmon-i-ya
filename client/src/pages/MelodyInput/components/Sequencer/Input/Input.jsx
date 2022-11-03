import { getRangeArray } from '../../../../../utils';

export const Input = (props) => {
	const { rowCount = 48, columnCount, inputMelody, clickHandler } = props;

	const tableStyles = {
		border: '1px solid',
		borderCollapse: 'collapse',
		backgroundColor: '#ECEDF2',
		borderColor: '#72768A',
	};
	const cellStyles = {
		border: '1px solid',
		width: '30px',
		padding: '0px',
		borderColor: '#72768A',
	};

	return (
		<table style={tableStyles} className="inputfield">
			<tbody>
				{getRangeArray(rowCount).map(() => (
					<tr>
						{getRangeArray(columnCount).map(() => (
							<td style={cellStyles}></td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
