const express = require("express");
const ErrorHandler = require("./middleware/Error");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require('path');


app.use(express.static('public'));

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());


app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));


//config
if(process.env.NODE_ENV !== "PRODUCTION")
{
    require("dotenv").config({
        path:"server/config/.env"
    })
}

  

//import routes
const user = require("./controller/User");
const shop = require("./controller/Shop");
const product = require("./controller/Product");
const event = require("./controller/Event");
const coupons = require("./controller/Coupons");
const payment = require("./controller/Payments");
const order = require("./controller/Order");
const withdrawl = require('./controller/Withdrawl')
const sellerRequest = require('./controller/SellerRequest')
const category = require('./controller/Category')
const subscribe = require('./controller/Subscribe')



app.use("/api/v2",user);
app.use("/api/v2",shop);
app.use("/api/v2",product);
app.use("/api/v2",event);
app.use("/api/v2",coupons);
app.use("/api/v2",payment);
app.use("/api/v2",order);
app.use("/api/v2",withdrawl);
app.use("/api/v2",sellerRequest);
app.use("/api/v2",category);
app.use("/api/v2",subscribe);



// for error handler
app.use(ErrorHandler)

module.exports = app;