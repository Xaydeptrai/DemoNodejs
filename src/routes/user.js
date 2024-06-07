import * as controller from '../controllers'
import express from "express";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isModeratorOrAdmin } from "../middlewares/verify_roles";

const router = express.Router()

//nhung router duoi nay chi duoc truy cap khi da co token
router.use(verifyToken)
router.get('/', controller.getCurrent)

//co the su dung cach nay de tien kiem tra role truy cap
//router.get('/',[verifyToken, isAdmin], controller.getCurrent)

export default router