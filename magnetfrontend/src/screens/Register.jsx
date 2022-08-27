import {
	Grid,
	Paper,
	TextField,
	Button,
	Typography,
	Container
} from "@mui/material"
import {useState,useContext} from "react"
import {Store} from "../utils/Store" 
import { useSnackbar } from 'notistack';
import {Link} from "react-router-dom"


import {register} from "../actions/auth"


const Register = ()=>{

	const { state, dispatch } = useContext(Store);
	const {enqueueSnackbar} = useSnackbar()

	const [userInfo,setUserInfo] = useState({
		name:"",
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
		dispatch(register(userInfo))
	}

	


	return(
		<div>
			<Container maxWidth="sm">
			<Grid container spacing={2} direction="column" justifyContent="center" style={{minHeight:"80vh"}}>
				<Paper elevation={2} sx={{padding:5}}>
					<Grid container spacing={2} direction="column">
						<Grid item>
							<Typography align="center" variant="h4" mb={1}>Sign Up</Typography>
						</Grid>
						<Grid item>
							<TextField onInput={inputHandler} fullWidth id="name" name="name" label="Name" variant="standard" />
						</Grid>
						<Grid item>
							<TextField onInput={inputHandler} fullWidth id="email" name="email" label="Email" variant="standard" />
						</Grid>
						<Grid item>
							<TextField onInput={inputHandler} fullWidth type="password" id="password" name="password" label="Password" variant="standard" />
						</Grid>
						<Grid item>
							<Button onClick={formHandler} fullWidth variant="contained">Register</Button>
						</Grid>
					</Grid>
					<Typography align="center" variant="body1" mt={2}>
						<Link to="/login">
							Already have an account?
						</Link>
				</Typography>
				</Paper>
			</Grid>
			</Container>
		</div>
	)
}

export default Register