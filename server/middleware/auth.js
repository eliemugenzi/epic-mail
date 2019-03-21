import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const bearHeader = req.headers.authorization;
    if (typeof bearHeader !== "undefined") {
        const bearer = bearHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET_KEY, (err, userData) => {
            if (err) {
                return res.status(403).json({
                    status: 403,
                    error: "Forbidden",
                });
            }
            req.user = userData.user;
            next();
        });
    } else {
        res
            .json({
                status: 403,
                error: "Forbidden",
            })
            .status(403);
    }
};

export default verifyToken;
