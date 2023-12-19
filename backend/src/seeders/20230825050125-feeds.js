const meatImage = `https://firebasestorage.googleapis.com/v0/b/firechat-95a9a.appspot.com/o/category.jpg?alt=media&token=c5754db1-6560-4e9f-ba3f-1ac09d4f6204`

const categories = [
  { id: 1, name: 'meat', image: meatImage, description: 'best meat', created_at: new Date() },
  { id: 2, name: 'drinks', image: "https://media.istockphoto.com/id/690259246/es/foto/camarero-que-trabaja-en-preparar-habilidades-de-cocteler%C3%ADa.jpg?s=2048x2048&w=is&k=20&c=CPoWAbQvb0kNbB1CVfMQElk5O_D_y6fUIKNhvtzcAs8=", description: 'best drinks', created_at: new Date() },
  { id: 3, name: 'fast food', image: "https://media.istockphoto.com/id/1232401725/es/foto/escena-de-la-mesa-de-comidas-variadas-para-llevar-o-entregar-vista-de-arriba-hacia-abajo-en-un.jpg?s=2048x2048&w=is&k=20&c=-nSXEIwljiPnLQlcTkONelquXTJB72lrFe_cX8PQYio=", description: 'fast food', created_at: new Date() },
];

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration changes
      return Promise.all([
        queryInterface.bulkInsert('categories', categories, { transaction }),
      ]);
      
    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration undo changes
      return Promise.all([
        queryInterface.bulkDelete('categories', {}, { transaction })
      ]);
    }),
};