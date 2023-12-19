'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        name: 'ADMIN',
        image: 'path-to-restaurant-image',
        route: '/restaurant/orders/list',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DELYVERY',
        image: 'path-to-admin-image',
        route: '/delivery/orders/list',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CLIENT',
        image: 'path-to-admin-image',
        route: '/client/orders/list',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more roles if needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
