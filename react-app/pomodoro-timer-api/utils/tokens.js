const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (data) => {
    console.log("token created")
    return jwt.sign(data, SECRET_KEY, { expiresIn: "10s" });
}
const createUserJwt = (user) => {
    const payload = {
        username: user.username,
    };

    return generateToken(payload);
};

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (err) {
        return {};
    }
};

module.exports = {
    generateToken,
    validateToken,
    createUserJwt,
};