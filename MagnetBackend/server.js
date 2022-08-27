import helmet from "helmet"
import express from "express"
import mongoConnect from "./config/mongoConnect.js"

import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import saleRoute from "./routes/saleRoute.js"
import {errorHandler,notFound} from "./middleware/errorMiddleware.js"

const app = express()
import cors from 'cors';


app.use(helmet());


const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(express.json())


mongoConnect()



app.use("/api/user",userRoute)
app.use("/api/products",productRoute)
app.use("/api/sales",saleRoute)



app.use(notFound)
app.use(errorHandler)

app.listen(4000,(err)=>{
    if(err) console.log(err);
    console.log(`Localhost:${4000}`)
}); 





/*

REQUESTS


POST - api/user/register

{
  "name":"Techh Jork",
  "email":"techhjork@gmail.com",
  "password":"pass"
}



POST - api/user/login

{
  "email":"techhjork@gmail.com",
  "password":"pass"
}


POST - api/products/
{
    "name":"Coat",
    "amount":200,
    "quantity":31
}


POSt - /api/sales
{
    "saleItems":[
        {
            "name":"Jeans",
            "amount":4,
            "quantity":2,
            "product":"62fce3383790052f70f05142"
        }
    ],
    "totalPrice":8
}
*/


