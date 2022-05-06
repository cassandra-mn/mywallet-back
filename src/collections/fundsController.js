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