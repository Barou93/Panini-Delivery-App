/** @format */

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      cartId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Carts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        //onDelete: 'CASCADE',
        //onUpdate: 'CASCADE'
      },
      optionId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Options",
          key: "id",
        },
        //onDelete: 'CASCADE',
        //onUpdate: 'CASCADE'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("OrderItems");
  },
};
