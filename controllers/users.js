const utils = require('../utils')
const users = require('../models/users') //model users

//cadastro
exports.register = async (req, res) => {
    const DATA = utils.atualDate()
    const { NOME, EMAIL, SENHA } = req.body
    const hashPassword = await utils.hash(SENHA)
    let result = await users.register(NOME, EMAIL, hashPassword, DATA)
    res.status(result.status).json(result.value)
}

//login
exports.login = async (req, res) => {
    const { EMAIL, SENHA } = req.body
    let result = await users.login(EMAIL, SENHA)
    res.status(result.status).json(result.value)
}