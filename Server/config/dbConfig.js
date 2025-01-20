const mongoose=require('mongoose')
require('dotenv').config();
// console.log("hi============",process.env.MONGO_URL)
console.log("MONGO_URL:", process.env.MONGO_URL);
// console.log(process.env)
// MONGO_URL=(process.env.MONGO_URL)
if (process.env.MONGO_URL!=null)
    mongoose.connect(process.env.MONGO_URL)

//    { useNewUrlParser: true,
//     useUnifiedTopology: false,
//     ssl: false, // Enable SSL/TLS
//     tlsAllowInvalidCertificates: false,//lidate SSL certificate
// }
// )
// console.log("MONGO_URL:", process.env.MONGO_URL);

const connection=mongoose.connection;
connection.on("connected",()=>{
    console.log("Mongo DB connected successfully")
})
connection.on("error",(err)=>{
    console.log("Mongo DB not connected ",err)
})
