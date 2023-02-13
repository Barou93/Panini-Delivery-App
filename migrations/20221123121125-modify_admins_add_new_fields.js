'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Admins', // table name
        'picture', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: './uploads/profil/avatar.png'
        }
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Admins' , 'picture')
    ]);
  }
};
