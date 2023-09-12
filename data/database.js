import mongoose from "mongoose";

const connectDB = () =>  mongoose.connect(process.env.DATABASE_URL,{dbName: "taskScheduler"}).then(()=>{
    console.log("database is connected");
})

export default connectDB;