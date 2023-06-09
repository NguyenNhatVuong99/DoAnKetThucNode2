import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export const generateToken = (userId: string, expiresIn: string): string => {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: expiresIn });
    return token;
};

export function verifyToken(token: string): any {
    return jwt.verify(token, secretKey);
}
