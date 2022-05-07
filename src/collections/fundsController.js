import { response } from 'express';
import db from './../db.js';

export async function transactions(req, res) {
    try {
        const transactions = await db.collection('transactions').find({}).toArray();
        res.send(transactions);
    } catch(e) {
        console.log(e);
        res.status(500).send('Erro ao obter transações');
    }
}

export async function inputs(req, res) {
    const data = req.body;
    const authorization = req.headers.authorization;

    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.status(401).send('Erro no token');

    const session = await db.collection('sessions').findOne({token});

    if (!session) return res.status(401).send('Erro na session');

    const user = await db.collection('users').findOne({_id: session.userId});

    if (user) {
        console.log(data);
        res.send(user);
    } else {
        res.sendStatus(401);
    }
}

export async function outputs(req, res) {
    const data = req.body;
    const authorization = req.headers.authorization;

    const token = authorization?.replace('Bearer', '').trim();

    if (!token) return res.status(401).send('Erro no token');

    const session = await db.collection('sessions').findOne({token});

    if (!session) return res.status(401).send('Erro na session');

    const user = await db.collection('users').findOne({_id: session.userId});

    if (user) {
        console.log(data);
        res.send(user);
    } else {
        res.sendStatus(401);
    }
}