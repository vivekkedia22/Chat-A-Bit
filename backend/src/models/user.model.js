import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "This email address already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email adress"],
    },
    picture: {
      type: String,
      default:
        "https://i.pinimg.com/474x/f5/6b/ae/f56baef86aed6c261c422402aab59065.jpg",
    },
    status: {
      type: String,
      default: "Oi babwa ! Kaisen baa?",
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [
        6,
        "Please make sure your password is atleast 6 characters long",
      ],
      maxLength: [
        128,
        "Please make sure your password is atmost 128 characters long",
      ],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", userSchema);
