import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; 

        if (!token) {
            return res.status(401).json({ message: "You are not authorized to access this resource" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid" });
    }
};

export default isAuthenticated;
