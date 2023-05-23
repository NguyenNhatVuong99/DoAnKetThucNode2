'use strict';
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const User = require("../../models/User");
const Role = require("../../models/Role");
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
        await queryInterface.bulkDelete('role_user', null, { truncate: true, cascade: true });
        await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
            console.log(User)
        // let user1 = await User.findOne({
        //     where: {
        //         email: "nhatvuong99@gmail.com",
        //     }
        // });
        // let users = await User.findAll({
        //     attributes: ['id'],
        //     where: {
        //         email: {
        //             [Op.notIn]: ['nhatvuong99@gmail.com']
        //         }
        //     }
        // });
        // let adminRole = await Role.findOne({
        //     attributes: ['id'],
        //     where: {
        //         name: 'admin',
        //     }
        // })
        // let userRole = await Role.findOne({
        //     attributes: ['id'],
        //     where: {
        //         name: 'user',
        //     }
        // })
        // let data = [
        //     {
        //         id: uuidv4(),
        //         user_id: user1.id,
        //         role_id: adminRole.id,
        //     }
        // ]
        // users.forEach(element => {
        //     let object = {
        //         id: uuidv4(),
        //         user_id: element.id,
        //         role_id: userRole.id
        //     }
        //     data.push(object)
        // });
        // await queryInterface.bulkInsert('role_user', data);

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