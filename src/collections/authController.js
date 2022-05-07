import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import joi from 'joi';

import db from './../db.js';

export async function signUp(req, res) {
    const user = req.body;
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
        passwordConfirm: joi.ref('password')
    });
    const {error} = userSchema.validate(user, {abortEarly: false});
    
    if (error) return res.status(422).send(error.details.map(detail => detail.message));
    
    try {
        const password = bcrypt.hashSync(user.password, 10);
        await db.collection('users').insertOne({...user, password: password, passwordConfirm: password});
        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const {email, password} = req.body;

    try {
        const user = await db.collection('users').findOne({email});
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection('sessions').insertOne({token, userId: user._id});
            res.status(200).send({name: user.name, token});
        }
        else res.status(404).send('Usuário ou senha incorretos');
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}