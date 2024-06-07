import jwt, {TokenExpiredError} from "jsonwebtoken";
import { notAuth } from "./handle_errors";


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) return notAuth("Token is required", res)
    const accessToken = token.split(' ')[1]

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err){
            const isChecked = err instanceof TokenExpiredError
            if(!isChecked) return notAuth("Invalid token", res, isChecked)
            if(isChecked) return notAuth("Token expired", res, isChecked)
        }
        req.user = user
        next()
    })
}

export default verifyToken