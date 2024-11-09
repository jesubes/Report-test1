const { MessageMedia } = require("whatsapp-web.js")
const { jsonToImage } = require("../utils/toImage.js")
const { client: whatsapp } = require("./qrCodeController.js")


const reportForMsg = async (req, res) =>{

    //sacar el numero de query
    /* Traemos el JSON para sacar el celular del almacen ya filtrado,
        y los demas campos los enviamos a generar una imagen para enviar
        un archivo .jpg al celular
    
    */

    const { number = number.toString(), name} = req.query
    const jsonData = req.body

    //mandamos el JSON a convertir en imagen
    const imageJpg = await jsonToImage(jsonData, number)

    //datos de whatsapp
    // const prefix = '549'
    const prefixNumber = `549${number}`
    // const chatId = `${prefix}${number}@c.us`.toString();
    const mediaWs = MessageMedia.fromFilePath(`./reportImage/materiales${number}.jpg`)

    try{
        const contactId = await whatsapp.getNumberId(prefixNumber)
        if(contactId){
            await whatsapp.sendMessage(contactId._serialized, `Hola ${name}, \nTe envio el stock en tu almacén: `)
            new Promise(resolve => setTimeout(resolve, 1000))
            const response = await whatsapp.sendMessage(contactId._serialized, mediaWs)

            console.log('Mensaje enviado -> ', response.fromMe);

            return res.send({messageSent : response.fromMe})
        } else {
            console.log('Numero no registrado en WhatsApp');   
        }

        // //
        // const isRegisterd = await whatsapp.isRegisteredUser(`${contactId._serialized}`)
        // if(isRegisterd){
        //     await whatsapp.sendMessage(chatId, `Hola ${name}, \nTe envio el stock en tu almacén: `)
        //     new Promise(resolve => setTimeout(resolve, 1000))
        //     const response = await whatsapp.sendMessage(chatId, mediaWs)

        //     console.log('Mensaje enviado -> ', response.fromMe);

        //     return res.send({messageSent : response.fromMe})
        // }
    } catch( error ){
        console.error('Error al enviar mensaje', error)
        res.status(500).send(`Error al Enviar el mensaje al numero: ${number}`)
    }
}


module.exports = {
    reportForMsg
}