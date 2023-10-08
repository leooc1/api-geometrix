const utils = require('../utils')

//listar elementos do usuário
exports.list = async (id_usuario) => {
    const conexao = await utils.bdConnection()
    return new Promise((resolve, reject) => {
        conexao.query(
            `SELECT U.NOME, E.TIPO, E.NOME_OBJETO, E.DATA, E.ID
            FROM USUARIO U
            JOIN ELEMENTO E ON (U.ID = E.ID_USUARIO)
            WHERE U.ID = ?`, [id_usuario],
            (err, result) => {
                if (err) {
                    reject({
                        status: 400,
                        value: "err: " + err.sqlMessage
                    });
                }
                else {
                    resolve({
                        status: 200,
                        value: result
                    });
                }
            }
        );
    });
}

//salvar elemento no banco
exports.save = async (tipo, nome_objeto, objeto, data, id_usuario) => {
    const conexao = await utils.bdConnection()
    return new Promise((resolve, reject) => {
        conexao.query(`
            INSERT INTO
            ELEMENTO 
            VALUES ('0', ?, ?, ?, ?, ?)`, [tipo, nome_objeto, JSON.stringify(objeto), data, id_usuario],
            (err, result) => {
                if (err) {
                    reject({
                        status: 400,
                        value: "err: " + err.sqlMessage
                    });
                }
                else {
                    resolve({
                        status: 200,
                        value: result
                    });
                }
            }
        );
    });
}

//buscar elemento por data
exports.dateFilter = async (Data_Inicio, Data_Fim, id_usuario) => {
    const conexao = await utils.bdConnection()
    return new Promise((resolve, reject) => {
        conexao.query(`
        SELECT U.NOME, E.TIPO, E.NOME_OBJETO, E.DATA, E.ID
        FROM USUARIO U
        JOIN ELEMENTO E ON (U.ID = E.ID_USUARIO)
        WHERE E.DATA BETWEEN ? AND ?
        AND U.ID = ?`, [Data_Inicio, Data_Fim, id_usuario],
            (err, result) => {

                if (err) {
                    reject({
                        status: 400,
                        value: "err: " + err.sqlMessage
                    });
                }
                let Inicio = new Date(Data_Inicio)
                let Fim = new Date(Data_Fim)

                if (Inicio > Fim) {
                    resolve({
                        status: 410,
                        value: "Data inicio maior que a final"
                    })
                }

                else {
                    if (result.length == 0)
                        resolve({
                            status: 410,
                            value: "Achei nada, fodase"
                        })

                    else
                        resolve({
                            status: 210,
                            value: result
                        })
                }
            })
    })
}

//deletar elemento
exports.delete = async (id_elemento) => {
    const conexao = await utils.bdConnection()
    return new Promise((resolve, reject) => {
        conexao.query(`
        DELETE
        FROM ELEMENTO 
        WHERE ID = ?`, [id_elemento],
            (err, result) => {
                if (err) {
                    reject({
                        status: 400,
                        value: "err: " + err.sqlMessage
                    });
                }
                else {
                    resolve({
                        status: 200,
                        value: result
                    });
                }

            })
    })
}