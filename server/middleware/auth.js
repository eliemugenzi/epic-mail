const verifyToken = (req, res, next) => {
  const bearHeader = req.headers.authorization;
  if (typeof bearHeader !== "undefined") {
    const bearer = bearHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res
      .json({
        status: 403,
        error: "Forbidden"
      })
      .status(403);
  }
};

export default verifyToken;
