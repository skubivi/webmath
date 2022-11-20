const uuid = require('uuid')
const path = require('path')
const { Tasks, ProposedTasks } = require('../models/models')
const ApiError = require('../error/ApiError')

class TaskController {
    async addTask(req, res, next) {
        try {
            let {title, task, textSolution, isImage, isImageSolution} = req.body
            isImage = (isImage === "true");
            isImageSolution = (isImageSolution === "true")
            console.log(req.body)
            let fileNameImage
            let image
            let fileNameImageSolution
            let imageSolution
            if (isImage) {
                image = req.files.image
                fileNameImage = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', fileNameImage))
            }
            if (isImageSolution) {
                imageSolution = req.files.imageSolution
                fileNameImageSolution = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', fileNameImageSolution))
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
            next(ApiError.badRequest(e.message))
        }
    }

    async proposeTask(req, res, next) {
        try {
            let {title, task, textSolution, isImage, isImageSolution} = req.body
            isImage = (isImage === "true");
            isImageSolution = (isImageSolution === "true")
            console.log(req.body)
            let fileNameImage
            let image
            let fileNameImageSolution
            let imageSolution
            if (isImage) {
                image = req.files.image
                fileNameImage = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', fileNameImage))
            }
            if (isImageSolution) {
                imageSolution = req.files.imageSolution
                fileNameImageSolution = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', fileNameImageSolution))
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
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteProposedTask(req, res, next) {
        const {id} = req.body
        const task = await ProposedTasks.findByPk(id)
        if (task) {
            await task.destroy();
            return res.json("Задача успешно удалена")
        }
        return next(ApiError.badRequest("Такой задачи не существует"))
    }

    async getAllProposed(req, res, next) {
        let {limit, page} = req.query
        limit = limit || 10
        page = page || 1
        let offset = (page - 1) * limit
        let tasks = await ProposedTasks.findAndCountAll({limit, offset})
        return res.json(tasks)
    }

    async getOneProposed(req, res, next) {
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
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        limit = limit || 10
        page = page || 1
        let offset = (page - 1) * limit
        let tasks = await Tasks.findAndCountAll({limit, offset})
        return res.json(tasks)
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const task = await Tasks.findByPk(id)
        if(!task) {
            return next(ApiError.badRequest("Задача не найдена"))
        }
        return res.json(task)
    }
}


module.exports = new TaskController()