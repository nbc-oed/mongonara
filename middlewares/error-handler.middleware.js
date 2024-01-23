export default function (err, req, res, next) {
  console.log(err.message);
  return res.status(404).json({ message: "상품이 존재하지 않습니다." });
}
