import crypto from 'crypto';

export default function generateVerificationToken(): string {
    const token = crypto.randomBytes(20).toString('hex');
    return token;
}