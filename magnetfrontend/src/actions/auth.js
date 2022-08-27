import {useContext} from "react";
import api from "../utils/api"
import {Store} from "../utils/Store" 

const login = (userInfo) => async dispatch =>{
	try{
		let {data} = await api.post("/user/login",userInfo)
		dispatch({ type: 'USER_LOGIN', payload: data });
	}catch(err){
		dispatch({ type: 'ERROR', payload: err });
	}
}


const register = (userInfo) => async dispatch =>{
	try{
		let {data} = await api.post("/user/login",userInfo)
		dispatch({ type: 'USER_LOGIN', payload: data });
	}catch(err){
		dispatch({ type: 'ERROR', payload: err });
	}
}


export {login,register}