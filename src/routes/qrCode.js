const { Router } = require('express')
const {qrGenerate, testMessage } = require('../controllers/qrCodeController.js')

const router = Router();

//importar middlewares

router.get('/', qrGenerate)

router.get('/testmsg', testMessage)


module.exports = router