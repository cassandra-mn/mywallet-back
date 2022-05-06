import db from './../db.js';
import joi from 'joi';

export async function signUp(req, res) {
    const user = req.body;
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')),
        passwordConfirm: joi.ref('password')
    });
    const {error} = userSchema.validate(user, {abortEarly: false});

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    try {
        await db.collection('users').insertOne({user});
        res.sendStatus(201);
    } catch(e) {
        console.log('Erro ao cadastrar usuário', e);
        res.sendStatus(500);
    }
}