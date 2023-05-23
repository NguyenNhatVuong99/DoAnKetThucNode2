interface IUser {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    status: boolean | 1,
    createdAt: Date,
    updatedAt: Date
}
export default IUser