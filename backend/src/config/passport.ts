import PassPortLocal from 'passport-jwt';
import Extract from 'passport-jwt';
import { variable } from './keys';
import {User} from '../models/user';
const JwtStrategy = PassPortLocal.Strategy;
const ExtractJwt = Extract.ExtractJwt;

export const localStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: variable.secretKey
}, async function (jwt_payload, done) {
    try {
        console.log(jwt_payload)
        const user = await User.findOne({
            where: {
                email: jwt_payload.email
            }
        })
        return user ?
            done(null, user) :
            done(null, false);
    } catch (err) {
        return done(err, false);
    }
})