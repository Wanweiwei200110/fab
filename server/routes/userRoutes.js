const express = require('express');
router = express.Router();
const userController = require('../controllers/userController')

router.get("/:username/get", userController.getUser);
router.post('/api/profile/:username', userController.uploadProfile)
router.get("/:username/posts/get", userController.posts_get)
router.get("/:username/followings", userController.followings_get)
router.get("/:username/followers", userController.followers_get)

router.get("/:username/collections/post", userController.collection_post_get)
router.get("/:username/collections/item", userController.collection_item_get)

router.patch("/:username/follow", userController.follolwUser)
router.patch("/:username/unfollow", userController.unfollolwUser)
router.patch('/:username/intro', userController.editIntro)

router.patch('/shop/:item_id/cart', userController.cart_patch)
router.get('/:username/cart', userController.cart_get)
router.patch('/:username/cart/clean', userController.cart_clean)

router.get("/:username/orders/get", userController.orders_get)
router.post("/:username/order/post", userController.order_post)

module.exports = router;