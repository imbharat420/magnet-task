
import express  from "express";
const app = express()
import axios  from "axios"

app.use(express.json())


let ajax = ()=>{
    setInterval(()=>{
    axios({
      method:"POST",
      url:"/ajax/ajax_share.php?id="+"yen5",
      data:{
        "message":"as",
        "token":"43c117c8ea17c21e4a3a7607d4508937"
      }
    }).then((res)=>{
      console.log("Send");
    }).catch(err=>{
      console.log(err.message);
    })
  },2000)
}

ajax()

// app.listen(5000)
