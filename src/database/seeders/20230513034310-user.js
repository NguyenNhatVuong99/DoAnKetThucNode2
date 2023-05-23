'use strict';
let { faker } = require('@faker-js/faker/locale/vi');
const bcrypt = require('bcryptjs');
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
        await queryInterface.bulkDelete('users', null, { truncate: true, cascade: true });
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

        var salt = bcrypt.genSaltSync(10)
        let hashPassword = await bcrypt.hashSync('nhatvuong99', salt);
        let data = []
        for (let i = 0; i <= 2; i++) {
            let object = {
                id: uuidv4(),
                email: faker.internet.email(),
                password: hashPassword,
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
            }
            data.push(object)
        }
        let user = {
            id: uuidv4(),
            email: 'nhatvuong99@gmail.com',
            password: hashPassword,
            lastName: 'Nguyễn',
            firstName: 'Nhất Vương'
        }
        data.push(user)

        await queryInterface.bulkInsert('users', data)
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, { truncate: true, cascade: true });
    }
};