const utils = require('../utils')
const elements = require('../models/elements') //model elements

//listar elementos do usuário
exports.list = async (req, res) => {
    const { ID } = req.body
    let result = await elements.list(ID)
    res.status(result.status).json(result.value)
}

//salvar elemento no banco
exports.save = async (req, res) => {
    const DATA = utils.atualDate()
    const { TIPO, NOME_OBJETO, OBJETO, ID_USUARIO } = req.body
    let result = await elements.save(TIPO, NOME_OBJETO, OBJETO, DATA, ID_USUARIO)
    res.status(result.status).json(result.value)
}

//buscar elemento por data
exports.dateFilter = async (req, res) => {
    const { Data_Inicio, Data_Fim, ID } = req.body
    let result = await elements.dateFilter(Data_Inicio, Data_Fim, ID)
    res.status(result.status).json(result.value)
}

//deletar elemento
exports.delete = async (req, res) => {
    const {id_elemento} = req.params
    let result = await elements.delete(id_elemento)
    res.status(result.status).json(result.value)
}