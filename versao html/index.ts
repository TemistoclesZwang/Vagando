// import express from 'express';
import express = require('express');

// import cors from 'cors';
import cors = require('cors');


// import router, {rotas} from './backend/routes/rotas';
// import rotas = require('./backend/routes/rotas');
import rotas from './backend/routes/rotas'



const port = 3005

const app = express()
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(rotas);


app.listen(port, function () {
    console.log("Server is running");
});
