import dayjs from 'dayjs';

import db from '../db.js';

export async function transactions(req, res) {
    const {user} = res.locals;
    
    try { 
        const transactions = await db.collection('transactions').find({user: user.email}).toArray();
        res.send(transactions);
    } catch(e) {
        console.log(e);
        res.status(500).send('Erro ao obter transações');
    }
}

export async function inputs(req, res) {
    const date = dayjs(Date.now()).format('DD/MM');
    const {user} = res.locals;
    const data = req.body;

    try {       
        const transaction = {...data, user: user.email, type: 'input', date};
        await db.collection('transactions').insertOne(transaction);

        res.sendStatus(200);
    } catch(e) {
        res.status(500).send(e);    
    }
}

export async function outputs(req, res) {
    const date = dayjs(Date.now()).format('DD/MM');
    const {user} = res.locals;
    const data = req.body;

    try {           
        const transaction = {...data, user: user.email, type: 'output', date};
        await db.collection('transactions').insertOne(transaction);

        res.sendStatus(200);
    } catch(e) {
        res.status(500).send(e);
    }
}