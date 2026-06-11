import("./database/database.js");
import app from "../src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor runing on port ${PORT}`);
});
