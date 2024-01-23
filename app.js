import express from "express";
import connect from "./schemas/index.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 3000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ message: "this is peaceful mongonara API" });
});

app.use("/api", [router, productsRouter]);

app.listen(PORT, () => {
  console.log(`port: ${PORT}`);
});
