'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShopOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Carts',
          key: 'id',
        },
        //onDelete: 'SET DEFAULT',
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['Pedding', 'Accepted', 'Rejected', 'Delivery'],
        defautValue: 'Pedding'
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShopOrders');
  }
};