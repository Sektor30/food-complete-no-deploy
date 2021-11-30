import User from '../models/User'
import { userSchema } from '../libs/schema.validator'
import createError from 'http-errors'
import {signAccessToken} from '../helpers/signAccessToken'

export const login = async (req, res, next) => {
    try {
        const result = await userSchema.validateAsync(req.body);

        const userFound = await User.findOne({email: result.email});

        if(!userFound) {
            return next(createError.Unauthorized('Usuario no encontrado'));
        }

        const isMatch = await userFound.validPassword(result.password);

        if(!isMatch) {
            return next(createError.Unauthorized('Contraseña inválida'));
        }

        const token = await signAccessToken(userFound.id);

        res.json({token});
    } catch (error) {
        if(error.isJoi) {
            return next(createError.BadRequest());
        };
        next(error);
    }
}

export const register = async (req, res, next) => {
    
    try {
        const result = await userSchema.validateAsync(req.body);

        const userFound = await User.findOne({email: result.email});

        if(userFound) {
            return next(createError.Conflict("Usuario ya existe"));
        }
        
        const user = new User({ email: result.email, password: result.password });
        user.password = await user.generateHash(user.password);

        const userSaved = await user.save();

        const token = await signAccessToken(userSaved.id);
        
        res.json({ token });

    } catch (error) {
        if(error.isJoi) {
           return next(createError.BadRequest());
        };
        next(error);
    }
};

export const profile = async (req, res) => {
    const user = await User.findOne({ _id: req.userId }).select('-password');

    if(!user) {
        return res.status(401).send({message: "Usuario no encontrado"});
    }

    res.json(user);

}