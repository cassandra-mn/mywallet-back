import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';

import {signIn, signUp} from './collections/authController.js';
import {transactions, inputs, outputs} from './collections/fundsController.js';

const app = express();
app.use(cors());
app.use(json());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

app.get('/transactions', transactions);
app.post('/transactions/inputs', inputs);
app.post('/transactions/outputs', outputs);

app.listen(5000, () => {
    console.log(chalk.green.bold('Servidor no ar'));
});