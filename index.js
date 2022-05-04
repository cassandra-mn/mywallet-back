import express, {json} from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import chalk from 'chalk';
import cors from 'cors';
import joi from 'joi';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);
const promise = mongoClient.connect();
promise.then(() => {
    db = mongoClient.db('mywallet');
    console.log(chalk.blue.bold('Banco de dados conectado!'));
});
promise.catch(e => {
    console.log(chalk.red.bold('Erro ao conectar banco de dados'));
});

app.listen(5000, () => {
    console.log(chalk.green.bold('Servidor no ar'));
});