import JWT from "jsonwebtoken";
import createError from "../utils/Error.js";


// protected Routes token base
export const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return next(createError(401,'No token, authorization denied'))
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY); 
        req.user = decoded;
        next(); 
    } catch (err) {
        return next(createError(400,'Invalid token'));
    }
};