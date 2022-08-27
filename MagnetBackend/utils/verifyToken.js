import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const verifyToken = async (token)=>{
  return(await jwt.verify(token, process.env.SECRET))
} 

export default verifyToken;