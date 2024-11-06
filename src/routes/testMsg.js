const { Router } = require('express')
const {testMessage } = require('../controllers/qrCodeController.js')

const router = Router();

//importar middlewares


router.get('/', testMessage)


module.exports = router