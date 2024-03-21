const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001; // Puedes cambiar el puerto si es necesario

app.use(express.static('assets'));

// Ruta para crear un archivo
app.get('/crear-archivo', (req, res) => {
    const { nombre, contenido } = req.query;
    console.log(nombre, contenido);

    // Agregar la fecha actual al contenido del archivo
    const fecha = obtenerFechaActual();
    const contenidoConFecha = `${fecha} - ${contenido}`;

    fs.writeFile(`${nombre}.txt`, contenidoConFecha, (err) => {
        if (err) {
            res.send('Error al crear el archivo');
        } else {
            res.send('Archivo creado exitosamente');
        }
    });
});

// Ruta para leer el contenido de un archivo
app.get('/leer-archivo', (req, res) => {
    const { nombre } = req.query;

    fs.readFile(`${nombre}.txt`, 'utf8', (err, data) => {
        if (err) {
            res.send('Error al leer el archivo');
        } else {
            res.send(data);
        }
    });
});

// Ruta para renombrar un archivo
app.get('/renombrar-archivo', (req, res) => {
    const { nombre, nuevoNombre } = req.query;

    fs.rename(`${nombre}.txt`, `${nuevoNombre}.txt`, (err) => {
        if (err) {
            res.send('Error al renombrar el archivo');
        } else {
            res.send(`Archivo renombrado exitosamente de ${nombre}.txt a ${nuevoNombre}.txt`);
        }
    });
});

// Ruta para eliminar un archivo
app.get('/eliminar-archivo', (req, res) => {
    const { nombre } = req.query;

    fs.unlink(`${nombre}.txt`, (err) => {
        if (err) {
            res.send('Error al eliminar el archivo');
        } else {
            res.send('Archivo eliminado exitosamente');
        }
    });
});

// Función para obtener la fecha actual en formato dd/mm/yyyy
function obtenerFechaActual() {
    const fecha = new Date();
    const dia = agregarCerosIzquierda(fecha.getDate());
    const mes = agregarCerosIzquierda(fecha.getMonth() + 1); // Los meses van de 0 a 11
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año}`;
}

// Función para agregar ceros a la izquierda si es necesario
function agregarCerosIzquierda(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

app.listen(PORT, () => { 
  console.log(`🔥🔥🔥🔥🔥Servidor corriendo en el puerto🔥🔥🔥🔥🔥http://localhost:${PORT}`);
});
