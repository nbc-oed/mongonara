import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.DB_CONNECT_URL, {
      dbName: "mongonara",
    })
    .then(() => console.log("MongoDB 연결 성공"))
    .catch((err) => console.log(`MongoDB 연결 실패 ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

export default connect;
