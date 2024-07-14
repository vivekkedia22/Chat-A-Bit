import jwt from "jsonwebtoken"
const sign=async(payload,expiresIn,secret)=>{
    return jwt.sign(payload,secret,{
        expiresIn:expiresIn
    })
}
const verify=async(token,secret)=>{
    const decodedToken=jwt.verify(token,secret)
    return decodedToken
}
export {sign,verify}