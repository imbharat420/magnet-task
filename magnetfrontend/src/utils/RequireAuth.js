import {useLocation,Navigate,Outlet} from "react-router-dom"
import {useContext} from "react"
import {Store} from "./Store"

const RequiredAuth = ()=>{
	const {state} = useContext(Store)
	const user = state?.userInfo 
	const location = useLocation();
	console.log("user",user)
	return	!!user ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace/>
}

export default RequiredAuth
