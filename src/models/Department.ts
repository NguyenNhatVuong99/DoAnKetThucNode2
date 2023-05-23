import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from '../config/connectDB';
import IDepartment from "../interfaces/IDepartment";
class Department extends Model {
}

Department.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    departmentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    positionId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    createdAt: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Department' // We need to choose the model name
});

export default Department;