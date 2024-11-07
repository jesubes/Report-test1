const XLSX = require('xlsx');
const {filterToJSON} = require('../utils/filter.js')


//Devolver un JSON de los contactos en excel
const excelToJsonContact = async (req, res) =>{
    try{
        if(!req.file){
            return res.status(400).send('No se cargó ningun archivo...')
        }

        const workbook = XLSX.read(req.file.buffer, {type: 'buffer'}) // leer el archivo del buffer con XLSX

        const worksheet = workbook.Sheets[workbook.SheetNames[0]] // convertir la primera hoja a JSON

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        //validación de datps - nombre y su numero de telefono
        const resultDataFilter = await filterToJSON(["Almacén","Nombre","Numero"], jsonData);

        //se devuelve limpio, sin capos vacios
        const resultNoNull = resultDataFilter.filter((item) => {
            if(item.Nombre && item.Numero) {
                return item
            }
        })

        console.log(resultNoNull);
        
        return res.send(resultNoNull);

    }catch( error ){
        console.error('Error al procesar el archivo: ', error)
        res.status(500).send('Error al procesar el archivo...')
    }
}

module.exports = {
    excelToJsonContact,
}