import passport from "passport";

export default function passport_call(strategy) {
 return async (req, res, next) => {
  passport.authenticate(
   strategy,
   (err, user, info) => {
    if (err) {
     return next(err)
    }
    if (!user) {
     return res.status(401).json({
      error: info.toString()
     })
    }
    req.user = user
    return next()
   }
  )(req, res, next)
 }
}