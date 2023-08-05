const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.readIncubator)
router.get('/incubators/add', Controller.addIncubator)
router.post('/incubators/add', Controller.postIncubator)
router.get('/incubators/:incubatorId', Controller.detailIncubator)// sama startup masuk
router.get('/incubators/:incubatorId/startUp/add', Controller.addStartUp)
router.post('/incubators/:incubatorId/startUp/add', Controller.postStartUp)
router.get('/incubators/:incubatorId/startUp/:startUpId/edit', Controller.editStartUp)
router.post('/incubators/:incubatorId/startUp/:startUpId/edit', Controller.postEditStartUp)
router.get('/incubators/:incubatorId/startUp/:startUpId/delete', Controller.deleteStartUp)
router.get('/startUp', Controller.readStartUp)

module.exports = router