interface IHoliday {
    id: number,
    name: string,
    timeStart: Date,
    timeEnd: Date,
    note: string,
    status: boolean | 1,
    createdAt: Date,
    updatedAt: Date
}
export default IHoliday
