const express = require('express');
const router = express.Router();
const { product } = require('../models');

//POST /products - Criar novo produto
router.post('/', async (req, res) => {
    const { name, description, price, stock } = req.body;
    const product = await Product.create({ name, description, price, stock });
    res.status(201).json(product);
});

//GET /products - Listar todos os produtos
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.status(200).json(products);
});

//GET /products/:id - Listar produto específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(product);
});

//PUT /products/:id - Atualizar produto específico
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    await product.save();
    res.status(200).json(product);
});

//DELETE /products/:id - Deletar produto específico
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    await product.destroy();
    res.status(204).end();
});

module.exports = router;