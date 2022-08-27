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
import {Link,useParams} from "react-router-dom"
import {useContext} from "react"
import {Store} from "../utils/Store"




const rows = [];
function createData(_id, name, quantity, amount) {
  return { _id, name, quantity, amount };
}
const fetchProduct = async (id)=>{
 try{
  const {data} =  await api.get(`/products/${id}`);
  console.log(data)
  return data;
 }catch(err){
  console.log(err);
 }
}


const Product = () => {
  const params = useParams()
  const {state,dispatch} = useContext(Store)
  const [prod,setProd] = useState([])
  const [productDataJSON,setProductDataJSON] = useState("")
  useEffect(()=>{
    fetchProduct(params.id).then((prdct)=>{
      setProductDataJSON(JSON.stringify(prdct,null,2) || "NO data found");
      setProd(prdct);
    })
  },[])


  const {userInfo:{token}} = state;
  const buyHandler = (product)=>{
    api.post(`/sales`,{
        headers:{
          Authorization:`Bearer ${token}`
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
    <Box mt={3}>
      <Link  to="/products">Go Back</Link>
      <Typography component="h1" align="center" variant="h1">Products</Typography>
    </Box>
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
          
            <TableRow
              key={prod._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="prod">
                <Link to={`/products/${prod._id}`}>{prod._id}</Link>
              </TableCell>
              <TableCell align="right">{prod.name}</TableCell>
              <TableCell align="right">{prod.quantity}</TableCell>
              <TableCell align="right">{prod.amount}</TableCell>
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
                <Button onClick={()=>buyHandler(prod)} variant="contained">Buy</Button>
              </TableCell>*/}
            </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
    </Box >
    </div>
  );
}


export default Product