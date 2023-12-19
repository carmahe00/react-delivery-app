const meatImage = `https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger-2.jpg`
const meatImage2 = `https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-2.jpg`
const meatImage3 = `https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger-3.jpg`

const fastFoodImage = `https://assets.bonappetit.com/photos/625bf3a83b01f608ce71f348/16:9/w_1920,c_limit/0415-junk-food-dorilocos-lede.jpg`
const fastFoodImage2 = `https://i.blogs.es/46afda/dap-1-37-/1366_2000.jpg`
const fastFoodImage3 = `https://gluttodigest.com/wp-content/uploads/2020/10/tostilocos-dorilocos-mexican-chips-snacks-1-980x535.jpg`
const products = [
  { id: 1, name: 'hamburger-big', image1: meatImage, image2: meatImage2, image3: meatImage3, description: 'best meat for lunch', id_category: 1, price: 10000, created_at: new Date() },
  { id: 2, name: 'dori-locos', image1: fastFoodImage, image2: fastFoodImage2, image3: fastFoodImage3, description: 'mexican food', id_category: 3, price: 10000, created_at: new Date() }
];

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration changes
      return Promise.all([
        queryInterface.bulkInsert('products', products, { transaction }),
      ]);

    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      // here go all migration undo changes
      return Promise.all([
        queryInterface.bulkDelete('products', {}, { transaction })
      ]);
    }),
};