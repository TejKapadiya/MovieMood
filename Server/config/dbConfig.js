const mongoose=require('mongoose')
require('dotenv').config();
// console.log("hi============",process.env.MONGO_URL)
// console.log("MONGO_URL:", process.env.MONGO_URL);
// console.log(process.env)
// MONGO_URL=(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL,

//    { useNewUrlParser: true,
//     useUnifiedTopology: true,
//     ssl: false, // Enable SSL/TLS
//     tlsAllowInvalidCertificates: true, // Validate SSL certificate
// }
)
// console.log("MONGO_URL:", process.env.MONGO_URL);

const connection=mongoose.connection;
connection.on("connected",()=>{
    console.log("Mongo DB connected successfully")
})
connection.on("error",(err)=>{
    console.log("Mongo DB not connected ",err)
})
