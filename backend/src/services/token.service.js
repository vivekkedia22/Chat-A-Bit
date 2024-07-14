import {sign,verify} from "../utils/token.util.js"
const generateToken=async(payload,expiresIn,secret)=>{
    let token =await sign(payload,expiresIn,secret)
    return token;
}

const verifyToken=async(token,secret)=>{
    let check=await verify(token,secret);
    return check
}
export {generateToken,verifyToken}