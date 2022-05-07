import joi from 'joi';
import dayjs from 'dayjs';

import db from './../db.js';

const transactionSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required()
});

export async function transactions(req, res) {
    const authorization = req.headers.authorization;

    try {
        const token = authorization?.replace('Bearer', '').trim();
        if (!token) return res.status(401).send('Erro no token');
        
        const session = await db.collection('sessions').findOne({token});
        if (!session) return res.status(401).send('Erro na session');
        
        const user = await db.collection('users').findOne({_id: session.userId});
        const {email} = user;
        
        const transactions = await db.collection('transactions').find({user: email}).toArray();
        console.log(transactions);

        res.send(transactions);
    } catch(e) {
        console.log(e);
        res.status(500).send('Erro ao obter transações');
    }
}

export async function inputs(req, res) {
    const data = req.body;
    const date = dayjs(Date.now()).format('DD/MM');
    const authorization = req.headers.authorization;

    try {
        const token = authorization?.replace('Bearer', '').trim();
        if (!token) return res.status(401).send('Erro no token');
        
        const session = await db.collection('sessions').findOne({token});
        if (!session) return res.status(401).send('Erro na session');
        
        const user = await db.collection('users').findOne({_id: session.userId});
        
        const {error} = transactionSchema.validate(data, {abortEarly: false});
        if (error) return res.status(422).send(error.details.map(detail => detail.message));
        
        const transaction = {...data, user: user.email, type: 'input', date};

        await db.collection('transactions').insertOne(transaction);

        res.sendStatus(200);
    } catch(e) {
        res.status(500).send(e);    
    }
}

export async function outputs(req, res) {
    const data = req.body;
    const date = dayjs(Date.now()).format('DD/MM');
    const authorization = req.headers.authorization;

    try {
        const token = authorization?.replace('Bearer', '').trim();
        if (!token) return res.status(401).send('Erro no token');
        
        const session = await db.collection('sessions').findOne({token});
        if (!session) return res.status(401).send('Erro na session');
        
        const user = await db.collection('users').findOne({_id: session.userId});
          
        const {error} = transactionSchema.validate(data, {abortEarly: false});
        if (error) return res.status(422).send(error.details.map(detail => detail.message));
        
        const transaction = {...data, user: user.email, type: 'output', date};
        
        await db.collection('transactions').insertOne(transaction);

        res.sendStatus(200);
    } catch(e) {
        res.status(500).send(e);
    }
}