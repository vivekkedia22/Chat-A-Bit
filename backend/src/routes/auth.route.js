import express,{Router} from "express"
import { registerUser,loginUser,logoutUser,refreshToken } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router();

router.route('/login').post(loginUser)
router.route("/register").post(registerUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refreshtoken").post(refreshToken)

export default router;