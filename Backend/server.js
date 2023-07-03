const { log } = require("console");
const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

// Handling uncaught Exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught Exceptions`);
    process.exit(1);
});



// config
dotenv.config({path:"Backend/config/config.env"});

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})


// UnHandled Promise Rejections
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
  
    Server.close(() => {
      process.exit(1);
    });
  });
  