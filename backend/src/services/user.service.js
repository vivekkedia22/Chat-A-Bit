import { User } from "../models/index.js"; 
import { ApiError } from "../utils/ApiError.js";
const findUser=async(userId)=>{
    const user=await User.findById(userId);
    if(!user){
        throw new ApiError(400,"Please fill all the fields");
    }
    return user;
}
export {findUser}