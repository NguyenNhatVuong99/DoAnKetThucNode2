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
		await queryInterface.createTable('Employee', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
            code:{
                type: Sequelize.STRING,
                allowNull: false,
				unique: true
            },
			image:{
				type: Sequelize.STRING,
				allowNull: false,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gender: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			birthday: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			departmentId: {
				type: Sequelize.UUID,
				allowNull: false,
                references: {
                    model: {
                        tableName: 'department',
                    },
                    key: 'id'
                },
			},
			positionId: {
				type: Sequelize.UUID,
				allowNull: false,
                references: {
                    model: {
                        tableName: 'position',
                    },
                    key: 'id'
                },
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
		await queryInterface.dropTable('Employee');
	}
};
