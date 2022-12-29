const uuid = require('uuid')
const path = require('path')
const { Tasks, ProposedTasks, CompletedTasks } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

class TaskController {
    async addTask(req, res, next) {
        try {
            let {title, task, textSolution, isImage, isImageSolution} = req.body
            isImage = (isImage === "true");
            isImageSolution = (isImageSolution === "true")
            let fileNameImage
            let image
            let fileNameImageSolution
            let imageSolution
            if(!isImage && !task) {
                return next(ApiError.badRequest("Введены некоректные данные"))
            }
            if(!isImageSolution && !textSolution) {
                return next(ApiError.badRequest("Введены некоректные данные"))
            }
            if (isImage) {
                image = req.files.image
                fileNameImage = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', fileNameImage))
            }
            if (isImageSolution) {
                imageSolution = req.files.imageSolution
                fileNameImageSolution = uuid.v4() + ".jpg"
                imageSolution.mv(path.resolve(__dirname, '..', 'static', fileNameImageSolution))
            }
            if (isImage && isImageSolution) {
                const newTask = await Tasks.create({title, task, textSolution, image: fileNameImage, imageSolution: fileNameImageSolution})
                return res.json(newTask)
            }
            if (isImage) {
                const newTask = await Tasks.create({title, task, textSolution, image: fileNameImage})
                return res.json(newTask)
            }
            if (isImageSolution) {
                const newTask = await Tasks.create({title, task, textSolution, imageSolution: fileNameImageSolution})
                return res.json(newTask)
            }
            const newTask = await Tasks.create({title, task, textSolution})
            return res.json(newTask)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async proposeTask(req, res, next) {
        try {
            let {title, task, textSolution, isImage, isImageSolution} = req.body
            isImage = (isImage === "true");
            isImageSolution = (isImageSolution === "true")
            let fileNameImage
            let image
            let fileNameImageSolution
            let imageSolution
            if(!isImage && !task) {
                return next(ApiError.badRequest("Введены некоректные данные"))
            }
            if(!isImageSolution && !textSolution) {
                return next(ApiError.badRequest("Введены некоректные данные"))
            }
            if (isImage) {
                image = req.files.image
                fileNameImage = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', fileNameImage))
            }
            if (isImageSolution) {
                imageSolution = req.files.imageSolution
                fileNameImageSolution = uuid.v4() + ".jpg"
                imageSolution.mv(path.resolve(__dirname, '..', 'static', fileNameImageSolution))
            }
            if (isImage && isImageSolution) {
                const newTask = await ProposedTasks.create({title, task, textSolution, image: fileNameImage, imageSolution: fileNameImageSolution, userId: req.user.id})
                return res.json(newTask)
            }
            if (isImage) {
                const newTask = await ProposedTasks.create({title, task, textSolution, image: fileNameImage, userId: req.user.id})
                return res.json(newTask)
            }
            if (isImageSolution) {
                const newTask = await ProposedTasks.create({title, task, textSolution, imageSolution: fileNameImageSolution, userId: req.user.id})
                return res.json(newTask)
            }
            const newTask = await ProposedTasks.create({title, task, textSolution, userId: req.user.id})
            return res.json(newTask)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async deleteProposedTask(req, res, next) {
        try {
            const {id} = req.params
            const task = await ProposedTasks.findByPk(id)
            if (task) {
                await task.destroy();
                return res.json("Задача успешно удалена")
            }
            return next(ApiError.badRequest("Такой задачи не существует"))
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAllProposed(req, res, next) {
        try {
            let {limit, page} = req.query
            limit = limit || 10
            page = page || 1
            let offset = (page - 1) * limit
            let tasks = await ProposedTasks.findAndCountAll({limit, offset})
            return res.json(tasks)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOneProposed(req, res, next) {
        try {
            const {id} = req.params
            const userId = req.user.id
            const userRole = req.user.role
            const task = await ProposedTasks.findByPk(id)
            if(!task) {
                next(ApiError.badRequest("Задача не найдена"))
            }
            if (userRole === 'admin' || userId === task.userId){
                return res.json(task)
            }
            return next(ApiError.forbidden("Доступ запрещён"))
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            let {limit, page} = req.query
            limit = limit || 10
            page = page || 1
            let offset = (page - 1) * limit
            let tasks = await Tasks.findAndCountAll({limit, offset})
            return res.json(tasks)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const task = await Tasks.findByPk(id)
            if(!task) {
                return next(ApiError.badRequest("Задача не найдена"))
            }
            return res.json(task)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async addCompletedTask(req, res, next) {
        try {
            let {userTextSolution, isImageSolution, taskId} = req.body
            isImageSolution = (isImageSolution === "true")

            const task = await Tasks.findByPk(taskId)
            if (task === null) {
                return next(ApiError.badRequest("Введены некоректные данные"))
            }

            let fileNameImageSolution
            let userImageSolution

            if(!isImageSolution && !userTextSolution){
                return next(ApiError.badRequest("Введены некоректные данные"))
            }

            if (isImageSolution) {
                userImageSolution = req.files.imageSolution
                fileNameImageSolution = uuid.v4() + ".jpg"
                userImageSolution.mv(path.resolve(__dirname, '..', 'static', fileNameImageSolution))
                const newSolution = CompletedTasks.create({userTextSolution, userImageSolution: fileNameImageSolution, taskId, userId: req.user.id})
                return res.json(newSolution)
            }
            const newSolution = CompletedTasks.create({userTextSolution, taskId, userId: req.user.id})
            return res.json(newSolution)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAllCompleted(req, res, next) {
        try {
            let {limit, page} = req.query
            limit = limit || 10
            page = page || 1
            let offset = (page - 1) * limit
            let tasks = await CompletedTasks.findAndCountAll({limit, offset})
            return res.json(tasks)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getMyCompleted(req, res, next) {
        try {
            let {limit, page} = req.query
            limit = limit || 10
            page = page || 1
            let offset = (page - 1) * limit
            const userId = req.user.id
            let tasks = await CompletedTasks.findAndCountAll({
                where: {userId},
                limit, 
                offset
            })
            return res.json(tasks)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getMyOneCompleted(req, res, next) {
        try {
            const taskId = req.params.id
            const userId = req.user.id
            let task = await CompletedTasks.findOne({
                where: {
                    [Op.and]: [
                        {taskId},
                        {userId}
                    ]
                }
            })
            if (!task) {
                return next(ApiError.badRequest("Решение не найдено"))
            }
            return res.json(task)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOneCompleted(req, res, next) {
        try {
            const taskId = req.params.id
            const userId = req.query.userId
            let task = await CompletedTasks.findOne({
                where: {
                    [Op.and]: [
                        {taskId},
                        {userId}
                    ]
                }
            })
            if(!task) {
                return next(ApiError.badRequest("Решение не найдено"))
            }
            return res.json(task)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getUserCompletedList(req, res, next) {
        try {
            const userId = req.params.userId

            let {limit, page} = req.query
            limit = limit || 10
            page = page || 1
            let offset = (page - 1) * limit

            let tasks = await CompletedTasks.findAndCountAll({
                attributes: ['id', 'taskId'],
                where: {userId},
                limit,
                offset
            })
            return res.json(tasks)
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}


module.exports = new TaskController()