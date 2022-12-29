const Router = require('express')
const router = new Router()

const checkRole = require('../middleware/checkRoleMiddleware')
const videoController = require('../controllers/videoController')

router.post('/', checkRole('admin'), videoController.addVideo)
router.get('/:id', )

module.exports = router