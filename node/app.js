const connection = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

const planeRouter = require('./routes/PlaneRouter');
const boardingGateRouter = require('./routes/BoardingGateRouter');


app.use(express.json());
app.use(cors());
app.use('/api',planeRouter); 
app.use('/api',boardingGateRouter); 

connection.sync()
    .then( () => {
        console.log("Proyecto sincronizado");
        app.listen(PORT, () => {
            console.log(`Servidor iniciado en puerto ${PORT}`);
        });
    })
    .catch((error) =>{
        console.error('Error al sincronizar el proyecto',error);
    })