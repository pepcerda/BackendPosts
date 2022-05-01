
const mongoose = require("mongoose"); 
const MongoServer = require("mongodb-memory-server").MongoMemoryServer; 


MongoServer.create().then((mongoServer) => {
    mongoose.connect(mongoServer.getUri(), {
        dbName: "posts"
    })
    .then(() => {
        console.info("Connected to database"); 
    })
    .catch((err) => {
        console.log("Error connecting to database: ", err); 
    })
}); 

process.on("SIGINT", () => {
    mongoose.disconnect();
}); 
