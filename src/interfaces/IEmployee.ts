interface IEmployee {
    id: string,
    image: string,
    lastName: string,
    firstName: string,
    code: string,
    birthday: Date,
    departmentId: string,
    positionId: string,
    gender: boolean | 1,
    status: boolean | 1,
    createdAt: Date,
    updatedAt: Date
}
export default IEmployee
