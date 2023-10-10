import bcryptjs, { compareSync } from "bcrypt";

export default function password_is_ok(req, res, next) {
 try {
  let db_password = req.user.password;
  let form_password = req.body.password;
  let compare = compareSync(form_password, db_password);

  if (compare) {
   return next();
  } else {
   return res.status(401).json({
    success: false,
    message: "Invalid credentials",
   });
  }
 } catch (error) {
  next(error);
 }
}


