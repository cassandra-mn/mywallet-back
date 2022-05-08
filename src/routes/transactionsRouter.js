import express from 'express';

import {transactions, inputs, outputs} from '../controllers/fundsController.js';

const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', transactions);
transactionsRouter.post('/transactions/input', inputs);
transactionsRouter.post('/transactions/output', outputs);

export default transactionsRouter;