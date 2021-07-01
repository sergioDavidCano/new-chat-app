//Parte en donde se ponen las condiciones del chat al lado del
//cliente,  funciones donde se escucha a los usuarios
var socket = io();
var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error('El nombre es necesario');
};
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};
//Escuhar cambios al conectar un cliente
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp)
    });
});
// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});
// Enviar información
/*socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/
// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});
//muestra todoas las personas que estan en el chat
socket.on('listarPersona', function(personas) {
    console.log(personas);
});
//mensajes privado
socket.on('mensajePrivado', function(mensaje) {
    console.log('mensajePrivado', mensaje)
});