const express = require('express')
const app = express()
const port = 3000;
const cors = require('cors');

//importar rutas
const taskRouter = require('./src/routes/task_router');

//Permite utilizar JSON
app.use(express.json());

//Permite que el API pueda aceptar solicitudes de dominios diferentes al suyo
app.use(cors());

//utilizar rutas importadas
app.use(taskRouter);

//EndPonit de prueba para verificar que la API se encuentra activa
app.get('/', (req, res) => {
    const respuesta = {
        status: 'ok',
        mensaje: 'servidor funcionando correctamente'
    }

    res.json(respuesta);
});

//Inicializar el Servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});