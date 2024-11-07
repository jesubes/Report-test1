const {Router} = require('express')
const multer = require('multer')
const {excelToJsonContact} = require('../controllers/excelConvertController.js') //todo: Ingresar el archivo 


const router = Router();

const upload = multer({ storage: multer.memoryStorage() })

router.post('/', upload.single('fileContact'), excelToJsonContact) //todo: ingresar funcion de convertir excel a json de contactos