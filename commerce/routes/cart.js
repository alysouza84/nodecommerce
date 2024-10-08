const express = require('express');
const router = express.Router();
const { Cart, CartItem, Product } = require('../models');
const { where } = require('sequelize');
const cartitem = require('../models/cartitem');

// POST /cart/add - Adicionar produto à cesta
router.post('/add', async (req, res) => {
    const { userId, productId, quantidade } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

    // Verificar se o carrinho do usuário já existe
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        // Criar um novo carrinho se não existir
        cart = await Cart.create({ userId });
    }

    const precoTotal = product.preco * quantidade;

    // Adicionar o produto ao carrinho
    const cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantidade,
        precoTotal
    });

    res.status(201).json(cartItem);
});

// DELETE /cart/remove:id - Remover produto da cesta
router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) return res.status(404).json({ message: 'Produto não encontrado' });
    await cartItem.destroy({ where: { id } });
    res.status(204).end();
});

// GET /cart - Listar produtos da cesta
router.get('/', async (req, res) => {
    const cartItems = await CartItem.findAll({include: cartitem});
    res.status(200).json(cartItems);
});
