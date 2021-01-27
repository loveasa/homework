const router = require('koa-router')();
const userCon = require('../controllers/userCon')

router.prefix('/user')

router.post('/login', userCon.login)

router.post('/regist', userCon.regist)

router.get('/checkUser',userCon.checkUser)



module.exports = router
