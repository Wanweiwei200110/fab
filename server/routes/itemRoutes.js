const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router()


router.get('/shop', itemController.allItem_get)
router.post('/shop', itemController.item_post)
router.patch('/shop/:item_id/pics', itemController.pics_patch)
router.get('/shop/:item_id/:username', itemController.item_get)
router.patch('/shop/:item_id/collect', itemController.collect_item)
router.patch('/shop/:item_id/uncollect', itemController.uncollect_item)

module.exports = router