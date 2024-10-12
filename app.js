const {Client, LocalAuth} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const express = require('express')


const app = express();


const puppeteerOptions = {
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // '--disable-dev-shm-usage',
        // '--disable-accelerated-2d-canvas',
        // '--no-first-run',
        // '--no-zygote',
        // '--single-process', // Importante para evitar múltiples procesos en contenedores Docker
        // '--disable-gpu'
    ]
};

//crear un Cliente con autenticación local
const client = new Client({
    puppeteer: puppeteerOptions
    //authStrategy: new LocalAuth() //guardar la sesión para que no tengas que escanear el QR cada vez
})



client.once('ready', () => {
    console.log('Client is ready!');
});

// generar y mostrar el código QR para la primera autenticación
client.on('qr', (qr) => {

    qrcode.generate(qr, {small: true})

});

//confirmación de que cliente está listo
client.on('ready', async () =>{
    console.log('El cliente está listo para enviar mensajes...');
    
    const number = '5493816450030'; // Número de teléfono con código de país, sin signos de '+'
    const message = 'Este es el BOT DE JESUS de Web'
    const chatId = `${number}@c.us`; // '@c.us' es el identificador de usuarios en WhatsApp Web

    try{
        const response = await client.sendMessage(chatId, message)
        console.log('Mensaje enviado: -> ', response.body);  

    } catch( error ){
        console.error('Error al enviar mensaje', error);
    }
});

// manejo de mensajes recibidos
// client.on('message', message =>{
//     // console.log(`Mensaje recibido de ${message.from}: ${message.body}`);
//     //Puedes responder automáticamente al recibir un mensaje
//     if(message.body=== 'Hola'){
//         message.reply('Holaaa! Como estas?')
//     }
// });


//inicializar el cliente
client.initialize();



//Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en http;//localhost:${PORT}`)
})