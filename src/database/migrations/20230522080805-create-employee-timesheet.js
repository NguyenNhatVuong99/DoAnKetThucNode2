'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable('EmployeeTimesheet', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true
			},
            
			// timesheetId: {
			// 	type: Sequelize.UUID ,
			// 	allowNull: false,
            //     references: {
            //         model: {
            //             tableName: 'Timesheet',
            //         },
            //         key: 'id'
            //     },
			// },
			// employeeId: {
			// 	type: Sequelize.STRING,
			// 	allowNull: false,
            //     references: {
            //         model: {
            //             tableName: 'Employee',
            //         },
            //         key: 'id'
            //     },
			// },
            // attendanceId: {
			// 	type: Sequelize.STRING,
			// 	allowNull: false,
            //     references: {
            //         model: {
            //             tableName: 'A',
            //         },
            //         key: 'id'
            //     },
			// },
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
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable('EmployeeTimesheet');
	}
};
