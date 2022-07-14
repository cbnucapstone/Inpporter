// [LOAD PACKAGE]
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes");

// [CONFIGURE APP TO USE bodyParser and cors]
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:true,
    credentials:true, // 도메인이 다른 경우 서로 쿠키를 주고받을 때 허용해준다?
}));
app.use(router);

// [CONFIGURE SERVER PORT]
const port = process.env.PORT||5001;

// [RUN SERVER]
app.listen(port,()=>console.log(`Listening on port ${port}`));

// [CONNECT MONGOOSE]
mongoose.connect('mongodb+srv://eunjeong:dmswjd1225@inpporter.eurev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))