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
		await queryInterface.createTable('Attendance', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true
			},
			employeeId: {
				type: Sequelize.UUID,
				allowNull: false,
                references: {
                    model: {
                        tableName: 'employee',
                    },
                    key: 'id'
                },
			},
			timeIn:{
                type: Sequelize.DATE,
				allowNull: false,
            },
			timeOut:{
                type: Sequelize.DATE,
				allowNull: false,
            },
            duration:{
                type: Sequelize.DATE,
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
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable('Attendance');
	}
};
