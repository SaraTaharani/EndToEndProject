const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.sendStatus(401);
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.user;
            next();
        }
    );
}

const authAdmin = (req, res, next) => {
    if (!req.user) {
        return res.sendStatus(401);
    }
    const user=JSON.parse(req.user);
    if (user.role === "admin") {
        next();
    } else {
        res.sendStatus(401);
    }
}

const authEmployee = (req, res, next) => {
    
    if (!req.user) {
        return res.sendStatus(401);
    }
    const user=JSON.parse(req.user);
    if (user.role === "admin" || user.role === "employee") {
        next();
    } else {
        res.tatus(403);
    }
}
module.exports = { verifyJWT, authAdmin , authEmployee}
