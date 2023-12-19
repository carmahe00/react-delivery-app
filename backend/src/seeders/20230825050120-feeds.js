const bcrypt = require('bcrypt');


const users = [
  {
    id: 1,
    name: 'viviana',
    email: 'juan.ardila@ias.com.co',
    last_name: 'pregnant',
    phone: '3182611800',
    password: bcrypt.hashSync('123456', 10), // Plain text password
    created_at: new Date(),
  },
  {
    id: 2,
    name: 'test',
    email: 'test@test.com',
    last_name: 'test',
    phone: '3124567887',
    password: bcrypt.hashSync('123456', 10), // Plain text password
    created_at: new Date(),
  },
  {
    id: 3,
    name: 'test2',
    email: 'test2@test.com',
    last_name: 'test2',
    phone: '3165633914',
    password: bcrypt.hashSync('123456', 10), // Plain text password
    created_at: new Date(),
  },
  // Add more users here
];

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      
      
      return Promise.all([
        queryInterface.bulkInsert('users', users, { transaction }),
      ]);
    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration undo changes
      return Promise.all([
        queryInterface.bulkDelete('users', {}, { transaction })
      ]);
    }),
};
