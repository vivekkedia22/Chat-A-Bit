import { createUser, signUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import logger from "../config/logger.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { findUser } from "../services/user.service.js";
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, picture, status, password } = req.body;
    // console.log("request",req);
    console.log(req.body);
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password
    });
    const accessToken = await generateToken(
      { userId: newUser._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );
    const refreshToken = await generateToken(
      { userId: newUser._id },
      "10d",
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      picture: newUser.picture,
      status:newUser.status,
      token: accessToken,
    };
    const options = {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 10 * 24 * 60 * 60 * 1000, //10days
    };
    return res
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          user,
          "User registered successfully"
        ).data
      );
  } catch (error) {
    throw new ApiError(400, error?.message || "failed to register User");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signUser(email, password);
    logger.info("here lies user", user);
    const options = {
      httpsOnly: true,
      secure: true,
    };
    const refreshToken = await generateToken(
      { userId: user._id },
      "10d",
      process.env.REFRESH_TOKEN_SECRET
    );

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/v1/auth/refreshtoken",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      })
      .cookie(
        "accessToken",
        await generateToken(
          { userId: user._id },
          "1d",
          process.env.ACCESS_TOKEN_SECRET
        ),
        options
      )
      .json(new ApiResponse(200, user, "User Logged In succesfully").data);
  } catch (error) {
    logger.error("hola");
    return res.status(error.statusCode).json(error);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .clearCookie("refreshToken", { path: "/api/v1/auth/refreshtoken" })
      .clearCookie("accessToken", options)
      .json(
        new ApiResponse(
          200,
          { message: "user logged out succesfully" },
          "Logged Out succesfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Failed to log out user");
  }
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new ApiError(401, "Please Login");

  const check = await verifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
    // console.log("hola bola",check);
  const user = await findUser(check.userId);
  const accessToken = await generateToken(
    { userId: user._id },
    "1d",
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json(
    new ApiResponse(
      200,
     { user : {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
       token: accessToken,
      }},
       
    ).data
  );
});

export { registerUser, loginUser, logoutUser, refreshToken };
