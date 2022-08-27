import { BrowserRouter as Router, Routes, Route,Link as RouterLink,Navigate } from 'react-router-dom'
import RequireAuth from "./utils/RequireAuth.js"


import {
  Container,
  Box,
  Toolbar,
  Typography,
  AppBar,
  Grid,
  Link,
  ThemeProvider,
  CssBaseline
} from "@mui/material"

import {useContext,useEffect,useState} from "react"
import {Store} from "./utils/Store"
import api from "./utils/api"
import { useSnackbar } from 'notistack';



import Login from "./screens/Login"
import Register from "./screens/Register"
import Product from "./screens/Product"
import Sales from "./screens/Sales"
import Missing from "./screens/Missing"
import SingleProduct from "./screens/SingleProduct.js"

import { createTheme } from "@mui/material";
import { grey, purple } from '@mui/material/colors';
import Notification from "./components/Notification"

const theme = createTheme({
  components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
  },
 typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
    h2: {
      fontSize: '1.4rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: grey[100],
    },
  },
});





function App() {
  const {state:{userInfo},dispatch} = useContext(Store)
  const logoutHandler = ()=>{
     dispatch({type:"USER_LOGOUT"})
     Navigate("/login",{ replace: true });
  }
  return (
    <Router>
    <CssBaseline/>
    
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
            <Box>
              <Link component={RouterLink} to="/products">
                  <Typography component="h2" color="secondary" variant="h2" >Web Commerce</Typography>
              </Link>
            </Box>
            {
            !userInfo?.token?(
            <Box>
              <Grid container  spacing={2}>
                <Grid item>
                 { <Link component={RouterLink} color="secondary" to="/login">Login</Link>}
                </Grid>
                <Grid item>
                  <Link component={RouterLink} color="secondary" to="/">Register</Link>
                </Grid>
              </Grid>
            </Box>):(
            <Box>
              <Grid container  spacing={2}>
                <Grid item>
                  <Link component={RouterLink} color="secondary" to="/sales">Sales</Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} color="secondary" to="/products">Products</Link>
                </Grid>
                <Grid item>
                  <Link color="secondary" onClick={()=> logoutHandler()} >Logout</Link>
                </Grid>
              </Grid>
            </Box>
           )}
        </Toolbar>
    </AppBar>
    
      <Container maxWidth="md">
        <Routes>
            
            <Route path='/' exact element={<Register/>} />
            <Route path='/login' exact element={<Login/>} />

            <Route  element={<RequireAuth />}>
              <Route path='/products/:id' exact element={<SingleProduct/>} />
              <Route path='/products' element={<Product/>} />
              <Route path='/sales' element={<Sales/>} />
            </Route>
            
             <Route path="*" element={<Missing />} />
        </Routes>
      </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
