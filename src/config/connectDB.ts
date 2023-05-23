import { Sequelize } from "sequelize";

const sequelize = new Sequelize('Timekeeping', 'root', 'nhatvuong99', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export  { connectDB, sequelize };