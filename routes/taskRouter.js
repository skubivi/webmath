const Router = require('express')
const router = new Router()

const taskController = require('../controllers/taskController')
const checkRole = require('../middleware/checkRoleMiddleware')
const verify = require('../middleware/authMiddleware')
const checkCompleted = require('../middleware/checkCompletedTaskMiddleware')
const checkProposed = require('../middleware/checkProposedTaskMiddleware')

router.post('/', checkRole('admin'), taskController.addTask)
router.get('/all', taskController.getAll)
router.get('/:id', taskController.getOne)

router.post('/proposed/', verify, taskController.proposeTask)
router.delete('/proposed/delete/:id', checkProposed, taskController.deleteProposedTask)
router.get('/proposed/all', checkRole('admin'), taskController.getAllProposed)
router.get('/proposed/:id', checkProposed, taskController.getOneProposed)

router.post('/completed/', verify, taskController.addCompletedTask)
router.get('/completed/all', checkRole('admin'), taskController.getAllCompleted)
router.get('/completed/my', verify, taskController.getMyCompleted)
router.get('/completed/my-one/:id', verify, taskController.getMyOneCompleted)
router.get('/completed/:id', checkCompleted, taskController.getOneCompleted)
router.get('/completed/list/:userId', taskController.getUserCompletedList)

module.exports = router