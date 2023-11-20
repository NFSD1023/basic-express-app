const express = require('express')
const router = express.Router()

const { getCountries, getCountry, addCountry, deleteCountry, doesCountryExist, updateCountry } = require('../controllers/countriesController')

router.get('/', getCountries);
router.get('/:id', doesCountryExist, getCountry);

router.post('/', addCountry);

router.delete('/:id', doesCountryExist, deleteCountry);

router.patch('/:id', doesCountryExist, updateCountry);


module.exports = router;