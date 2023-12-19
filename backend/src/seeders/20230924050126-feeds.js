
const addresses = [
  { id: 1, neighborhood: "white mud", address: 'tower 2 apat 304', ref_point: "Carrera 2W # 16G - 02, Cra. 2, Piedecuesta, Santander", lat: 6.976436986615889, lng:-73.05375104693752, id_user:1, created_at: new Date() },
  { id: 2, neighborhood: "fence devops", address: 'tower 2 apat 101', ref_point: "Carrera 2W # 16G - 02, Cra. 2, Piedecuesta, Santander", lat: 6.976436986615889, lng:-73.05375104693752, id_user:1, created_at: new Date() },
  { id: 3, neighborhood: "hooker position", address: 'Residencias Decisiones', ref_point: "Cl. 54 #18-33, Bucaramanga, Santander", lat: 7.110134761005236, lng:-73.11762592950242, id_user:2, created_at: new Date() },
  { id: 4, neighborhood: "hooker house", address: 'Cl. 9 #22-47', ref_point: "Cl. 9 #22-47", lat: 7.138000662183896, lng:-73.12490706736205, id_user:2, created_at: new Date() }
];

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration changes
      return Promise.all([
        queryInterface.bulkInsert('addresses', addresses, { transaction }),
      ]);

    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration undo changes
      return Promise.all([
        queryInterface.bulkDelete('addresses', {}, { transaction })
      ]);
    }),
};