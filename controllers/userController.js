const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const {Users} = require('../models/models')
const jwt = require('jsonwebtoken')
const config = require('config')

const generateJwt = (id, email, role, username) => {
    return jwt.sign(
        {id, email, role, username},
        config.get('secretkey'),
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, username, role} = req.body
            if(!email || !password || !username) {
                return next(ApiError.badRequest('Введены некоректные данные'))
            }
            const candidate = await Users.findAll({where: {
                [Op.or]: [
                    {username},
                    {email}
                ]
            }})
            if (candidate.length !== 0) {
                console.log(candidate);
                return next(ApiError.badRequest('Пользователь с таким email или username уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await Users.create({email, role, password: hashPassword, username, rating: 0})
            const token = generateJwt(user.id, email, role, username)
            console.log(token)
            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest('Введены некоректные данные'))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({where: {email}})
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Указан неверный пароль'))
            }
            const token = generateJwt(user.id, email, user.role, user.username)
            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest('Введены некоректные данные'))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.username)
            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query
            limit = limit || 10
            page = page || 1
            let offset = (page - 1) * limit
            let users
            users = await Users.findAndCountAll({attributes: ['id', 'username', 'rating'], order: [['rating', 'DESC']], limit, offset})
            return res.json(users)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            console.log(id)
            const user = await Users.findOne({where: {id}, attributes: ['id', 'username', 'rating', 'email', 'createdAt', 'role']})
            return res.json(user)
        } catch (e) {
            console.log(e.message)
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()