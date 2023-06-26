// import express from 'express';
import express = require('express');

// import cors from 'cors';
import cors = require('cors');


// import router, {rotas} from './backend/routes/rotas';
// import rotas = require('./backend/routes/rotas');
import rotas from './backend/routes/rotas'
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./backend/doc/swagger.json";
import dotenv from 'dotenv';
import MidLogin from './backend/middleware/MidLogin';
import MidPaginasFeed from './backend/middleware/MidPaginasFeed';


dotenv.config();


const port = process.env.PORT || 3006;
// .pegando porta da variável de ambiente dotenv

const app = express()
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(rotas);

app.use(MidLogin);
app.use(MidPaginasFeed);


app.listen(port, function () {
    console.log("Server is running");
});
