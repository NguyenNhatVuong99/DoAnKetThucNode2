'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('DepartmentShifts', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('DepartmentShift', {
            id: {
                type: Sequelize.UUID(),
                allowNull: false,
                primaryKey: true,
                unique: true,
                defaultValue: Sequelize.UUIDV4,
            },
            departmentId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'Department',
                    },
                    key: 'id'
                },
                allowNull: false,
            },
            shiftId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'Shift',
                    },
                    key: 'id'
                },
                allowNull: false,
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: 1
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('DepartmentShifts');
         */
        await queryInterface.dropTable('DepartmentShift');
    }
};
