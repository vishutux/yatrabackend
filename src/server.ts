import app from "./app";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;

dotenv.config();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
