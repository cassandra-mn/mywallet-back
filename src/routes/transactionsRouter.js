import express from 'express';

import {transactions, inputs, outputs, exclude, update} from '../controllers/fundsController.js';
import {validateHeader} from '../middlewares/headerMiddleware.js';
import {validateFormat} from '../middlewares/formatMiddleware.js';

const transactionsRouter = express.Router();

transactionsRouter.use(validateHeader);

transactionsRouter.get('/transactions', transactions);

transactionsRouter.use(validateFormat);

transactionsRouter.post('/transactions/input', inputs);
transactionsRouter.post('/transactions/output', outputs);
transactionsRouter.delete('/transactions/:id', exclude);
transactionsRouter.put('/transactions/:id', update);

export default transactionsRouter;