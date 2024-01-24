export default function (err, req, res, next) {
  console.log(err.name, ":", err.message);

  if (err.name === "CastError") {
    return res.status(404).json({ message: "상품이 존재하지 않습니다." });
  }

  if (err.name === "ValidationError") {
    return res.status(403).json({ message: "올바른 값을 입력해주세요." });
  }

  if (err.name === "SyntaxError") {
    return res
      .status(400)
      .json({ message: "request 문법을 다시 확인 해주세요." });
  }

  return res.status(500).json({ message: err.message });
}
