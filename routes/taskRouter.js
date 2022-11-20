const Router = require('express')
const taskController = require('../controllers/taskController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const verify = require('../middleware/authMiddleware')

router.post('/', checkRole('admin'), taskController.addTask)
router.get('/all', taskController.getAll)
router.get('/:id', taskController.getOne)

router.post('/proposed/', verify, taskController.proposeTask)
router.delete('/proposed/delete', checkRole('admin'), taskController.deleteProposedTask)
router.get('/proposed/all', checkRole('admin'), taskController.getAllProposed)
router.get('/proposed/:id', verify, taskController.getOneProposed)

module.exports = router