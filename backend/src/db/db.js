import mongoose from "mongoose";

export const ConnectDb = async (url)=>{
    try{
    console.log(url)

        await mongoose.connect(url);
        console.log("db connected succesfully");
    }
    catch(err){
        console.log(err, "failed to connect mongoDB")
    }
}
