export default function (req, res, next) {
  console.log(
    "Request URL:",
    req.originalUrl,
    "| Method:",
    req.method,
    "| at:",
    new Date()
  );
  next();
}
