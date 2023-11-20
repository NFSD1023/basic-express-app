const crypto = require('crypto');
const citizensController = require('./citizensController');

let listOfCountries = []

const doesCountryExist = (req, res, next) => {
    const countryFound = listOfCountries.find(country => country.id === req.params.id);
    if (!countryFound) return res.json({ text: `No existe un pais con id ${req.params.id}` });
    next()
}


const getCountries = (req, res) => {
    console.log('alguien nos está pidiendo paises y este es el filtro', req.query)
    if (!req.query.region) {
        console.log('entramos porque req.query.region es undefined')
        return res.json(listOfCountries)
    }
    const regionOfCountry = req.query.region;
    const foundCountries = listOfCountries.filter(country => country.region === regionOfCountry);
    res.json(foundCountries)
}

const getCountry = (req, res) => {
    const idOfCountryToBeFound = req.params.id;
    const countryFound = listOfCountries.find(country => country.id === idOfCountryToBeFound);

    const peopleFound = citizensController.getCitizensByCountryId(idOfCountryToBeFound)

    res.json({ name: 'd', region: 'europe', people: peopleFound })
}

const addCountry = (req, res) => {
    console.log('alguien nos está intentando añadir un pais y esta es la info', req.body)

    const countryToBeAdded = req.body;
    countryToBeAdded.id = 'country-' + crypto.randomUUID();

    console.log('este es el pais que vamos a añadir', countryToBeAdded)

    listOfCountries.push(countryToBeAdded)

    res.json(listOfCountries)
}


function deleteCountry(req, res) {
    const idOfCountryToBeDeleted = req.params.id
    listOfCountries = listOfCountries.filter(country => country.id !== idOfCountryToBeDeleted)
    res.json({ text: `Hemos borrado un pais con id ${idOfCountryToBeDeleted}` });
}

const updateCountry = (req, res) => {
    // primero busco si existe, ya lo hace el middleware
    // como ya se que existe si o si si hemos llegado a aquí
    const idOfCountryToBeUpdated = req.params.id;
    const dataToUpdate = req.body;

    listOfCountries = listOfCountries.map(country => {
        if (country.id !== idOfCountryToBeUpdated) return country;
        return ({ ...country, ...dataToUpdate })
    })
    return res.json({ text: 'Hemos actualizado el pais con id ', idOfCountryToBeUpdated })
}

module.exports = {
    getCountries,
    getCountry,
    addCountry,
    deleteCountry,
    updateCountry,
    doesCountryExist
}