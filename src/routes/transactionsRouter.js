import express from 'express';

import {transactions, inputs, outputs} from '../controllers/fundsController.js';
import {validateHeader} from '../middlewares/headerMiddleware.js';
import {validateFormat} from '../middlewares/formatMiddleware.js';

const transactionsRouter = express.Router();

transactionsRouter.use(validateHeader);

transactionsRouter.get('/transactions', transactions);
transactionsRouter.post('/transactions/input', validateFormat, inputs);
transactionsRouter.post('/transactions/output', validateFormat, outputs);

export default transactionsRouter;