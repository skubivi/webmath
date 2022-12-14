const jwt = require('jsonwebtoken')
const config = require('config')
const { Op } = require('sequelize')
const {ProposedTasks} = require('../models/models')

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const {id} = req.params
        
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, config.get('secretkey'))
        const userId = decoded.id
        const task = await ProposedTasks.findAll({
            where: {
                [Op.and]: [
                    {id},
                    {userId}
                ]
            }
        })
        const check = task.length !== 0
        if (decoded.role !== 'admin' && !check) {
            return res.status(403).json({message: "Нет доступа"})
        }
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
}