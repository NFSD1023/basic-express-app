const crypto = require('crypto')

const citizenController = {
    listOfCitizens: [],
    getCitizens: function (req, res) {
        return res.json(citizenController.listOfCitizens)
    },
    addCitizen: function (req, res) {
        console.log('alguien nos está intentando añadir un citizen y esta es la info', req.body)

        const citizenToBeAdded = req.body;
        citizenToBeAdded.id = 'citizen-' + crypto.randomUUID();

        console.log('este es el citizen que vamos a añadir', citizenToBeAdded)

        citizenController.listOfCitizens.push(citizenToBeAdded)

        res.json(citizenController.listOfCitizens)
    },
    getCitizensByCountryId: function (idOfCountry) {
        return citizenController.listOfCitizens.filter(citizen => citizen.nationality === idOfCountry)
    }
}


module.exports = citizenController;