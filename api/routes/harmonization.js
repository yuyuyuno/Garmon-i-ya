const express = require('express');

const melodiesController = require('../controllers').melodiesController;

const router = express.Router({ mergeParams: true });
const routesPrefix = '/harmonization';

// router.route('/options').get(optionsController.getOptionsList); - В файл маршрутов опций!
router
	.route(`${routesPrefix}/melodies`)
	.post(melodiesController.harmonizeMelody);
// .get(melodiesController.getCachedHarmonizedMelodies);

module.exports = router;
