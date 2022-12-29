const ApiError = require('../error/ApiError')
const { Videos, Tasks } = require('../models/models')

class videoController {
    async addVideo(req, res, next) {
        try {
            const {url, taskId} = req.body
            if(!url || !taskId) {
                return next(ApiError.badRequest("Введены некоректные данные"))
            }
            const task = Tasks.findByPk(taskId)
            if(!task) {
                return next(ApiError.badRequest("Введены некоректные данные"))
            }
            const video = Videos.create({url, taskId})
            return res.json(video)
        } catch (e) {
            return next(ApiError.badRequest("Введены некоректные данные"))
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params
            const video = Videos.findOne({where: {
                taskId: id
            }})
            if (!video) {
                return res.json({})
            }
            return res.json(video)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new videoController()