const { User } = require('../models');

const createUser = async (userData) => {
    return User.create(userData);
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

modelu.exports = {
    createUser,
    getUserById
};  
