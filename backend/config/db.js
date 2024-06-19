import mongoose from "mongoose";

export const dbConnector = async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/tomatodb')
    .then(()=>console.log('Database Connected.'))
}
