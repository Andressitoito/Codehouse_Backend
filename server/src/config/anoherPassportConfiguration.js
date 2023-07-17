import passport from "passport";
import passportJWT from "passport-jwt";

const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// jwt set on the client
// req => obj req.cookies
// coderCookieToken: 'fdaqrfedartrgefdsetqwe'
let cookieExtractor = (req) => {
 let token = nu;

 if ((req && req, cookies)) {
  token = req.cookies[coderCookieToken];
 }
};

const configStrategy = {
 jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
 secretOrKey: process.env.SECRET_JWT,
};

export const initializePassport = () => {
 passport.use("jwt", new JWTStrategy(configStrategy, async (jwt_payload, done) => { 
  try {
   return done(null, jwt_payload)
  } catch (error) {
   
  }

 }));
};

