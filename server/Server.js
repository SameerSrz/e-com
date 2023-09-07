const app = require("./App");
const connectDatabase = require("./Db/Database")


//Handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server")
})

//config
if(process.env.NODE_ENV !== "PRODUCTION")
{
    require("dotenv").config({
        path:"server/config/.env"
    })
}

// connecting database
connectDatabase();

// create server
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

// unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
})