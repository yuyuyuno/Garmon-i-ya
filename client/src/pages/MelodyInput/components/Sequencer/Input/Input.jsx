import { Note } from './Note';
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
				{getRangeArray(rowCount).map((rowIndex) => (
					<tr>
						{getRangeArray(columnCount).map((columnIndex) => (
							<td
								style={cellStyles}
								onClick={() => clickHandler(rowIndex, columnIndex)}
							>
								{inputMelody[columnIndex] && (
									<Note headOfLongNote={false} bodyOfLongNote={false} />
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
