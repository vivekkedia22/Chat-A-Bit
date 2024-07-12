import mongoose from "mongoose"
import logger from "../config/logger.config.js"
const connectDB=async () => {
    try{
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}`)
        logger.info(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`);
    }catch(error){
        logger.error("MONGODB CONNCETION failed", error)
        process.exit(1)
    }
}

export default connectDB