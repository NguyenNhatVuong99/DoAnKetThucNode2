// src/models/user.ts
interface IUser {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    provider: string;
    providerId: string;
}
export default IUser