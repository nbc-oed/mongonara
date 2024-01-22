import express from "express";
import Product from "../schemas/products.schema.js";

const router = express.Router();

// 상품 작성 API
router.post("/products", async (req, res) => {
  const { title, content, author, password } = req.body;

  // validation check
  if (!title || !content || !author || !password) {
    return res
      .status(404)
      .json({ errorMessage: "필수 값이 입력되지 않았습니다." });
  }

  const status = "FOR_SALE";
  const createdAt = new Date();
  const newProduct = new Product({
    title,
    content,
    author,
    password,
    status,
    createdAt,
  });
  await newProduct.save();

  return res.status(201).json({ message: "상품이 등록되었습니다." });
});

// 상품 목록 조회 API
router.get("/products", async (req, res) => {
  const allProducts = (await Product.find().sort("-createdAt").exec()).map(
    (product) => {
      const { _id, title, author, status, createdAt } = product;
      return { _id, title, author, status, createdAt };
    }
  );

  return res.status(200).json({ data: allProducts });
});

export default router;
