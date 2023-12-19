const bcrypt = require('bcrypt');


const users = [
  {
    id_user: 1,
    id_role: 1,
    created_at: new Date()
  },
  {
    id_user: 1,
    id_role: 2,
    created_at: new Date()
  },
  {
    id_user: 1,
    id_role: 3,
    created_at: new Date()
  },
  {
    id_user: 3,
    id_role: 3,
    created_at: new Date()
  }
  // Add more users here
];

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      
      
      return Promise.all([
        queryInterface.bulkInsert('users_roles', users, { transaction }),
      ]);
    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration undo changes
      return Promise.all([
        queryInterface.bulkDelete('users_roles', {}, { transaction })
      ]);
    }),
};
