import("./database/database.js");
import app from "../src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Servidor runing on port ${PORT}`);
});
