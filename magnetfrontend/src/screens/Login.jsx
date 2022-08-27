import {
	Grid,
	Paper,
	TextField,
	Button,
	Typography,
	Container
} from "@mui/material"
import {useState,useContext,useEffect} from "react"
import {Store} from "../utils/Store" 
import api from "../utils/api" 
import { useSnackbar } from 'notistack';
import {Link,useNavigate} from "react-router-dom"

import {login} from "../actions/auth"

const Login = ()=>{
	const Navigate = useNavigate()
	const { state,dispatch } = useContext(Store);
	const {enqueueSnackbar} = useSnackbar()
	const [userInfo,setUserInfo] = useState({
		password:"",
		email:""
	})

	const inputHandler = (e)=>{
		setUserInfo((prev)=>({
			...prev,
			[e.target.name]:e.target.value
		}))
	}


	const  formHandler = async ()=>{
		// dispatch(login(userInfo)); //issue extra console

		try{
			let {data} = await api.post("/user/login",userInfo)
			dispatch({ type: 'USER_LOGIN', payload: data });
			Navigate("/products")
		}catch(err){
			dispatch({ type: 'ERROR', payload: err.response.data });
		}
	}


	return(
		<div>
		<Container maxWidth="sm">
		<Grid container spacing={2} direction="column" justifyContent="center" style={{minHeight:"80vh"}}>
			<Paper elevation={2} sx={{padding:5}}>
				<Grid container spacing={2} direction="column">
					<Grid item>
						<Typography align="center" variant="h4" mb={1}>Sign In</Typography>
					</Grid>
					<Grid item>
						<TextField onInput={inputHandler} fullWidth id="email" name="email" label="Email" variant="standard" />
					</Grid>
					<Grid item>
						<TextField onInput={inputHandler} fullWidth type="password" id="password" name="password" label="Password" variant="standard" />
					</Grid>
					<Grid item>
						<Button fullWidth variant="contained" onClick={formHandler}>Login</Button>
					</Grid>
				</Grid>
				<Typography align="center" variant="body1" mt={2}>
					<Link to="/">
						Create an account
					</Link>
				</Typography>
			</Paper>
		</Grid>
		</Container>
		</div>
	)
}

export default Login