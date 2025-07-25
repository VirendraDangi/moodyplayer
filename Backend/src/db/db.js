const mongoose = require("mongoose")


function connectToDB(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("DB is connected");
        
    }).catch((error)=>{
        console.log("DB is not coonected" , error);
        
    })
}

module.exports = connectToDB