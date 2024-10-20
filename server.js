
require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routes/route');
const port = process.env.PORT;
const cookieParser = require('cookie-parser');
const cors = require('cors');

 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(cors({credentials:true,origin:'http://localhost:5173'}))

app.use(router);

app.listen(port,(req,res)=>{
    console.log(`listen to the port ${port}`);
})