'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
        await queryInterface.bulkDelete('roles', null, { truncate: true, cascade: true });
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
        let data = [{
            id: uuidv4(),

            name: 'admin'
        },
        {
            id: uuidv4(),

            name: 'user'
        }
        ]
        await queryInterface.bulkInsert('roles', data);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};