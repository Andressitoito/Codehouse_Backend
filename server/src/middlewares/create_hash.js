import { hashSync, genSaltSync } from "bcrypt";

export default function create_hash(req, res, next) {
 try {
  const { password } = req.body;

  
  const hash_password = hashSync(password, genSaltSync());
  
  req.body.password = hash_password;
  
  req.body.password2 = password
  
  console.log("req.body CREATE HASH ", req.body)
  return next();
 } catch (error) {
  next(error);
 }
}
