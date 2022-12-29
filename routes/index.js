const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const videoRouter = require('./videoRouter')

router.use('/user', userRouter)
router.use('/task', taskRouter)
router.use('/video', videoRouter)

module.exports = router