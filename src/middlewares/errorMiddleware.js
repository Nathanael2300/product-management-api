export default function errorMiddleware(err, req, res, next) {
  return req.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
}
