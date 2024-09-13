const express = require('express')
const router = express.Router()
const PetController = require('../controller/PetController.js')

router.get('/pets', PetController.lerPet)
router.post('/pets', PetController.criarPet)
router.delete('/pets/:idPet', PetController.excluirPet)
router.put('/pets/:idPet', PetController.atualizarPet)

module.exports = router