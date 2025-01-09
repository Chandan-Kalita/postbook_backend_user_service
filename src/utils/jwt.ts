var jwt = require('jsonwebtoken');

export const genJwt = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
}
export const verifyJwt = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
