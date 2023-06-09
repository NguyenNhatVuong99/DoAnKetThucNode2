import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from '../config/connectDB';

class User extends Model {

}


User.init({
    // Model attributes are defined here
    email: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        allowNull: true, // Cho phép giá trị null
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    provider: DataTypes.STRING,
    providerId: DataTypes.STRING,
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: 'User'
});

export default User;