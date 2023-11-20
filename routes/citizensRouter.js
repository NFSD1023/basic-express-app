const express = require('express');
const citizensRouter = express.Router();

const citizensController = require('../controllers/citizensController');

citizensRouter.get('/', citizensController.getCitizens);
citizensRouter.post('/', citizensController.addCitizen);


module.exports = citizensRouter