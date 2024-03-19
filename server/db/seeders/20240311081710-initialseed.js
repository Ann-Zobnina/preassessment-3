const { hashSync } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        { name: 'Alex', email: '1@1', hashpass: hashSync('1', 10) },
        { name: 'Bob', email: '2@2', hashpass: hashSync('2', 10) },
        { name: 'Charlie', email: '3@3', hashpass: hashSync('3', 10) },
      ],
      {},
    );

    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();
    await queryInterface.bulkInsert(
      'Characters',
      data.results.map(({ name, image, type, status }, ind) => ({
        name,
        image,
        type,
        alive: status === 'Alive',
        userId: (ind % 3) + 1,
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
