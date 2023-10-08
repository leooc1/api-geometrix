const mysql = require('mysql')
const bcrypt = require('bcrypt')

module.exports = {
    //conexão com o banco de dados
    bdConnection: () => {
        const conexao = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "geometrix"
        })
        return conexao
    },
    //data atual
    atualDate: () => {
        const data = new Date()
        let ano = data.getFullYear()
        let mes = data.getMonth() + 1
        let dia = data.getDate()
        return (`${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`)
    },
    //hash da senha
    hash: async (senha) => {
        let hashPassword = await bcrypt.hash(senha, 10)
        return hashPassword
    },
    //comparar senha com hash
    compareHash: async (senha, hashPassword) => {
        return await bcrypt.compare(senha, hashPassword)
        .then(response=>response)
        .catch(err=>err)
    }
}