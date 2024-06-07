import * as controller from '../controllers'
import express from "express";
import verifyToken from "../middlewares/verify_token";
import {isAdmin} from "../middlewares/verify_roles";
import uploadCloud from "../middlewares/uploader";

const router = express.Router()

//PUBLIC ROUTES
router.get('/', controller.getProducts)

//PRIVATE ROUTES
router.use(verifyToken)
router.use(isAdmin)
router.post('/', uploadCloud.single('image'), controller.createNewProduct)
router.put('/', uploadCloud.single('image'), controller.updateProduct)
router.delete('/', controller.deleteProducts)

export default router