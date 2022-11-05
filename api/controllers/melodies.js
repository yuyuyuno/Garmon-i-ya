const harmonizeMelody = (req, res) => {
	console.log('harmonizeMelody');
	// getSolution(Object.values(req.body), res, {
	// 	task: JSON.stringify({
	// 		key: 0,
	// 		task: [
	// 			{
	// 				type: 'vector',
	// 				name: ['A', 'B'],
	// 				value: Object.values(req.body.vectorPoints).map((point) =>
	// 					Object.values(point)
	// 				),
	// 			},
	// 			{ type: 'number', name: 'a', value: req.body.ratioParts.a },
	// 			{ type: 'number', name: 'b', value: req.body.ratioParts.b },
	// 		],
	// 	}),
	// 	maths: maths.findRatioPoint3D,
	// 	descriptor: descriptors.describeRatioPoint3D,
	// });
};

module.exports = {
	harmonizeMelody,
};
