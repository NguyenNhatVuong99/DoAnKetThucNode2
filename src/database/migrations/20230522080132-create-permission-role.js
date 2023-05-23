'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('PermissionRoles', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('PermissionRole', {
            id: {
                type: Sequelize.UUID(),
                allowNull: false,
                primaryKey: true,
                unique: true,
                defaultValue: Sequelize.UUIDV4,
            },
            permissionId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'Permission',
                    },
                    key: 'id'
                },
                allowNull: false,
            },
            roleId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'Role',
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
         * await queryInterface.dropTable('PermissionRoles');
         */
        await queryInterface.dropTable('PermissionRole');
    }
};
