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

  const newProduct = new Product({
    title,
    content,
    author,
    password,
    createdAt: new Date(),
  });
  await newProduct.save();

  return res
    .status(201)
    .json({ message: `${author}님, 상품이 등록되었습니다.` });
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

// 상품 상세 조회 API
router.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { password, ...productDetail } = (
      await Product.findOne({ _id: productId }).exec()
    )._doc;

    return res.status(200).json({ data: productDetail });
  } catch {
    return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  }
});

// 상품 정보 수정 API
router.put("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId }).exec();
    const { title, content, status, password } = req.body;

    if (!title && !content && !status) {
      return res.status(404).json({ message: "수정할 값을 입력해주세요." });
    }

    if (password !== product.password) {
      return res.status(404).json({ message: "올바른 비밀번호가 아닙니다." });
    }

    if (title) product.title = title;
    if (content) product.content = content;
    if (status) product.status = status;

    await product.save();
    return res
      .status(200)
      .json({ message: "상품이 다음과 같이 수정되었습니다.", data: product });
  } catch {
    return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  }
});

// 상품 삭제 API
router.delete("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId }).exec();
    const { password } = req.body;

    if (password !== product.password) {
      return res.status(404).json({ message: "올바른 비밀번호가 아닙니다." });
    }

    await Product.deleteOne({ _id: productId }).exec();

    return res
      .status(200)
      .json({ message: `${product.title} 상품이 삭제되었습니다.` });
  } catch {
    return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  }
});

export default router;
