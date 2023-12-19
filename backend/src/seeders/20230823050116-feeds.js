const svgClient = `https://firebasestorage.googleapis.com/v0/b/firechat-95a9a.appspot.com/o/client.png?alt=media&token=6ec96790-996a-4b26-a78b-e6c8fd039202`
const svgRestaurant = `https://firebasestorage.googleapis.com/v0/b/firechat-95a9a.appspot.com/o/restaurant.png?alt=media&token=3bda8632-2d01-49a8-87ca-ca30f2000efe`
const svgDelivery = `https://firebasestorage.googleapis.com/v0/b/firechat-95a9a.appspot.com/o/delivery.png?alt=media&token=21fbc402-2d63-48d3-9977-e4c78a0d11d9`
const roles = [
  { id: 1, name: 'CLIENT', image: svgClient, route: '/client/products/list', created_at: new Date() },
  { id: 2, name: 'ADMIN', image: svgRestaurant, route: '/restaurant/orders/list', created_at: new Date() },
  { id: 3, name: 'DELIVERY', image: svgDelivery, route: '/delivery/orders/list', created_at: new Date() },
];

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration changes
      return Promise.all([
        queryInterface.bulkInsert('roles', roles, { transaction }),
      ]);
      
    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration undo changes
      return Promise.all([
        queryInterface.bulkDelete('roles', {}, { transaction })
      ]);
    }),
};