const mongoose=require('mongoose');
const connectionString="mongodb+srv://suraj:suraj@cluster0.k6w9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectionToDb(){
    await  mongoose.connect(connectionString);
     console.log("Db connection is successful!");
     
 }
 module.exports=connectionToDb