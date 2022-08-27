import { config } from "dotenv";
import jwt from "jsonwebtoken";


config();

 function generateToken(id){
	return jwt.sign(
	  {id},
	  process.env.SECRET,
	  { expiresIn: '5 days' }
    )
}

export default generateToken;