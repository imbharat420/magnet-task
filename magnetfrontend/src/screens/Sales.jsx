import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardActions,
  CardContent
} from "@mui/material"
import {useEffect,useState} from "react"



import api from "../utils/api"
import {Link} from "react-router-dom"
import {useContext} from "react"
import {Store} from "../utils/Store"




const rows = [];
function createData(_id, name, quantity, amount) {
  return { _id, name, quantity, amount };
}

const topSales = async ()=>{
 try{
  const {data} =  await api.get("/sales/top");
  console.log(data)
  return data;
 }catch(err){
  console.log(err);
 }
}


const allSalesOrder = async ()=>{
 try{
  const {data} =  await api.get("/sales/all");
  return data;
 }catch(err){
  console.log(err);
 }
}


const revenueFetch = async ()=>{
 try{
  const {data} =  await api.get("/sales/revenue");
  return data;
 }catch(err){
  console.log(err);
 }
}




const Product = () => {
  const {state,dispatch} = useContext(Store)
  const [prod,setProd] = useState([])
  const [revenue,setRevenue] = useState("")
  const [allOrder,setAllOrder] = useState([])
  const [productDataJSON,setProductDataJSON] = useState("")


  useEffect(()=>{
    topSales().then((prdct)=>{
      setProductDataJSON(JSON.stringify(prdct,null,2) || "NO data found");
      setProd(prdct);
    })
  },[])

  useEffect(()=>{
    revenueFetch().then((rev)=>{
      console.log(rev)
      setRevenue(rev[0].sumValue)
    })
  },[])

  useEffect(()=>{
    allSalesOrder().then((rev)=>{
      setAllOrder(rev)
    })
  },[])

  const {userInfo:{token}} = state;

  return (
    <div >

    <Box
      sx={{
        display: 'flex',
        justifyContent:"center",
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          padding:1,
          width: 178,
        },
      }}
    >
      
      <Paper px={3} align="center" elevation={3}>
        {revenue ? (
          <>
            <Typography component="h1" align="center" variant="h1">Total Revenue</Typography>
            <Typography variant="h1" component="h1">{revenue}</Typography>
          </>
        ): ""}
      </Paper>
    </Box>

    <Typography component="h1" align="center" variant="h1">Top 5 Sale</Typography>
    <Box mt={2}>
    <TableContainer style={{maxWidth:"100%",width:"100%"}} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Total Sales Sum of product</TableCell>
            {/*<TableCell align="center">Buy</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {prod.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="center">{row.sumValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box >

    <Typography component="h1" align="center" variant="h1">All Orders</Typography>
    <Box mt={2}>
    <TableContainer style={{maxWidth:"100%",width:"100%"}} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align="center">User Id</TableCell>
            <TableCell align="center">Total Price</TableCell>
            {/*<TableCell align="center">Buy</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrder.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="center">{row.user}</TableCell>
              <TableCell align="center">{row.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box >
    </div>
  );
}


export default Product