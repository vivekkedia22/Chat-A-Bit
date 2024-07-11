import dotenv from "dotenv";
import app from "./app.js"

//dotEnv connfig
dotenv.config();

//env variables

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server connected at port ${PORT}`);
});