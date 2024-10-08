'use strict';

const cart = require("./cart");
const product = require("./product");

module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
    }, {});
    return CartItem;
};