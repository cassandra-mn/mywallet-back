import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';

import {signIn, signUp} from './collections/authController.js';

const app = express();
app.use(cors());
app.use(json());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

app.listen(5000, () => {
    console.log(chalk.green.bold('Servidor no ar'));
});