import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser=async(req,res)=>{
    try {
        
    } catch (error) {
        throw new ApiError(400,error?.message || "failed to register User")
    }
}

export {registerUser}