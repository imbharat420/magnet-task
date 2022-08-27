import asyncHandler from "express-async-handler"
import verifyToken from "../utils/verifyToken.js"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protect = asyncHandler(async (req,res,next)=>{
	let token = null;
	let {authorization} = req.headers
	if(authorization && authorization.startsWith("Bearer")){
		console.log("req.headers.authorization",authorization,"\n")


		try{
			token = authorization.split(' ')[1]
			let decoded = await verifyToken(token)
			console.log("decoded",decoded,"\n")
			
			let user =  await User.findById(decoded.id).select('-password');	//62fca2d1288779c6ca91aa3f
			console.log("user",user);

			req.user = user;
			next();
		
		}catch(err){
			console.log(err)
			throw new Error(`Invalid Token`);
		}
	}

	if(!token){
		res.status(400)
		throw new Error('No Authorization')
	}
})

export {protect};