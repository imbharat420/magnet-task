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
  TextField
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
const fetchProduct = async ()=>{
 try{
  const {data} =  await api.get("/products");
  console.log(data)
  return data;
 }catch(err){
  console.log(err);
 }
}



const Product = () => {
  const {state,dispatch} = useContext(Store)
  const [prod,setProd] = useState([])
  const [productDataJSON,setProductDataJSON] = useState("")
  useEffect(()=>{
    fetchProduct().then((prdct)=>{
      setProductDataJSON(JSON.stringify(prdct,null,2) || "NO data found");
      setProd(prdct);
    })
  },[])


  const buyHandler = (product)=>{
    const {userInfo} = state;
    api.post(`/sales`,{
        headers:{
          Authorization:`Bearer ${userInfo?.token}`
        },
        data:{
          saleItems:{
            ...product,
            product:product._id
          },
        }
    })
  }

  return (
    <div>
    <Typography component="h1" align="center" variant="h1">Products</Typography>
    <Box mt={2}>
    <TableContainer style={{maxWidth:"100%",width:"100%"}} component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>_id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Amount</TableCell>
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
                <Link to={`/products/${row._id}`}>{row._id}</Link>
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              {/*<TableCell align="right">
                 <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </TableCell>
              <TableCell align="right">
                <Button onClick={()=>buyHandler(row)} variant="contained">Buy</Button>
              </TableCell>*/}
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