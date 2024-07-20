import validator from "validator";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/index.js";

//env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  // /check if fields are empty
  console.log(userData);
  console.log(name);
  console.log(email);
  console.log(password);
  if (!name || !email || !password) {
    throw new ApiError(401, "Please fill all the fields");
  }

  //check name Length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw new ApiError(
      400,
      "Please make sure ur name is bw 2 to 16 characters"
    );
  }

  //chek status length
  if (status && status.isLength > 64) {
    throw new ApiError(
      400,
      "Please make sure ur state is lesss than 64 characters"
    );
  }

  //check if email address is valid
  if (!validator.isEmail(email)) {
    throw new ApiError(
      400,
      "Please make sure to provide a valid email address"
    );
  }

  //check if user already exists
  const checkDb = await User.findOne({
    email,
  });
  if (checkDb) {
    throw new ApiError(
      409,
      "Please try again with different email this email already exists"
    );
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw new ApiError(
      400,
      "please make sure your password is between 6 and 128 characters"
    );
  }

  const user = await User.create({
    name,
    email,
    password,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
  });
  return user;
};

const   signUser=async(email,password)=>{
  const user=await User.findOne({email:email.toLowerCase()});
  
  //check if user with the provided email exists
  if(!user){
    throw new ApiError(404,"Invalid Credentials")
  }

  //compare password 
  const isPasswordValid=await user.comparePassword(password);
  if(!isPasswordValid){
    throw new ApiError(404,"Invalid credentials")
  }

  return user;
}
export {createUser,signUser}