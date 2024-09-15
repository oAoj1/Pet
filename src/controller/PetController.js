const sqlconnection = require('../connection/SQLConnection.js')

async function lerPet(req,res){
    try{
        const connection = await sqlconnection()

        const [rows] = await connection.query('select * from pet')

        res.status(200).send(rows)

        await connection.end() 

    }catch(error){
        res.status(500).json({
            message:'Erro de servidor, confira o console',
            error:error
        })
    }
}

async function criarPet(req,res){
    try{
        const connection = await sqlconnection()
        
        const {nome, especie } = req.body

        if (!nome || !especie) {
            return res.status(400).json({
                message: 'Os campos nome e espécie são obrigatórios.'
            });
        }

        const [result] = await connection.query('insert into pet (nome,especie) values (?,?)', [nome,especie])

        res.status(201).json({
            message:'Pet criado com sucesso!',
            data: {
                idPet: result.insertId,
                nome,
                especie
            }
        })

        await connection.end()

    }catch(error){
        res.status(500).json({
            message:'Erro de servidor, confira o console',
            erroMessage:console.log(error)
        })
        
    }
}

async function excluirPet(req,res){
    try{
        const connection = await sqlconnection()

        const { idPet } = req.params

        if(!idPet){
            return res.status(400).json({
                message:'Campo idPet obrigatorio'
            })
        }

        const [result] = await connection.query('delete from pet where idPet = ?', [idPet])

        if(result.affectedRows === 0){
            return res.status(404).json({
                message:'Pet nao encontrado'
            })
        }

        res.status(200).json({
            message:'Pet deletado com sucesso!',
            data:{
                idPet
            }
        })

        await connection.end()

    }catch(error){
        res.status(500).json({
            message:'Erro de servidor, confira o console',
            erroMessage:console.log(error)
        })
        
    }
}

async function atualizarPet(req,res){
    try{
        const connection = await sqlconnection()

        const { idPet } = req.params

        const { nome, especie } = req.body

        if(!idPet ||(!nome || !especie) ){
            return res.status(400).json({
                message:'Campos idPet, nome ou especie sao obrigatorios'
            })
        }

        const [result] = await connection.query(
            'update pet set nome = ?, especie = ? where idPet = ?',
            [nome, especie, idPet]
        )

        if(result.affectedRows === 0){
            return res.status(404).json({
                message:'Pet nao encontrado'
            })
        }

        res.status(200).json({
            message:'Pet atualizado com sucesso!',
            data:{
                idPet,
                nome,
                especie
            }
        })

        await connection.end()

    }catch(error){
        res.status(500).json({
            message:'Erro de servidor, confira o console',
            erroMessage:console.log(error)
        })
        
    }
}

module.exports = {
    lerPet,
    criarPet,
    excluirPet,
    atualizarPet
}