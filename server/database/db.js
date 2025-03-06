import mongoose from "mongoose";

const ConnectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb server connected✅')
    } catch (error) {
        console.log("try again"+error)
    }
}
export default ConnectDB;
