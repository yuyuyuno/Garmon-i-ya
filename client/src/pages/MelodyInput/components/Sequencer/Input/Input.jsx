import { Note } from './Note';
import { getRangeArray } from '../../../../../utils';
import { keyIndexToNote } from '../../../../../utils';

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
		height: '21.969px',
	};

	return (
		<table style={tableStyles} className="inputfield">
			<tbody>
				{getRangeArray(rowCount).map((rowIndex) => (
					<tr key={`tr${rowIndex}`}>
						{getRangeArray(columnCount).map((columnIndex) => (
							<td
								key={`td${columnIndex}`}
								style={cellStyles}
								onClick={() => clickHandler(rowIndex, columnIndex)}
							>
								{inputMelody[columnIndex] !== null &&
									inputMelody[columnIndex].note ===
										keyIndexToNote(47 - rowIndex) && (
										<Note
											headOfLongNote={
												!inputMelody[columnIndex].isHeld &&
												inputMelody[columnIndex + 1]?.isHeld
											}
											bodyOfLongNote={
												inputMelody[columnIndex - 1] !== null &&
												inputMelody[columnIndex].isHeld &&
												inputMelody[columnIndex + 1] != null &&
												inputMelody[columnIndex + 1].isHeld
											}
											tailOfLongNote={
												inputMelody[columnIndex].isHeld &&
												!inputMelody[columnIndex + 1]?.isHeld
											}
										/>
									)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
