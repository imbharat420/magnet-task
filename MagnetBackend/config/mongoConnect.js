import mongoose from "mongoose"
import { config } from "dotenv"; 

config()

const mongoConnect = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.mongo_uri)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(err){
        console.log(`MongoConnect Error : ${err.message}`);
        process.exit(1);
    }
}

export default mongoConnect