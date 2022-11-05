export const getRangeArray = (elementsCount, firstElement = 0) => {
	const range = [...new Array(elementsCount).keys()];

	if (firstElement !== 0) {
		return range.map((num) => num + firstElement);
	}

	return range;
};

export const pushIfNotNull = (arr, elems) => {
	elems.forEach((elem) => {
		if (elem) {
			arr.push(elem);
		}
	});
};
