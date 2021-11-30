import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../cofig'

export const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        if(!userId) {
            reject(new Error('userId is required'));
        }

    jwt.sign({id: userId}, JWT_SECRET, (err, token) => {
        
        if(err) {
            reject(err);
        }
        resolve(token);
    });
        
    })
}