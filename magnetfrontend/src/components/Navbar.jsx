const Navbar = ()=>{
  return(
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
  )
}

export default Navbar