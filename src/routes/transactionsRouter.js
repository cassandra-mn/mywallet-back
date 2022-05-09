import express from 'express';

import {transactions, inputs, outputs, exclude} from '../controllers/fundsController.js';
import {validateHeader} from '../middlewares/headerMiddleware.js';
import {validateFormat} from '../middlewares/formatMiddleware.js';

const transactionsRouter = express.Router();

transactionsRouter.use(validateHeader);

transactionsRouter.get('/transactions', transactions);
transactionsRouter.post('/transactions/input', validateFormat, inputs);
transactionsRouter.post('/transactions/output', validateFormat, outputs);
transactionsRouter.delete('/transactions/:id', exclude);

export default transactionsRouter;