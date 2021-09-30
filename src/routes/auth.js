import { Router } from 'express';
import {authController} from '../controllers/auth'



const router = Router();

router.get('/login', authController.getLogin)

 router.post('/login', authController.postLogin)

 router.get('/logout', authController.getLogOut)

 router.post('/signup', authController.postSignUp)

 router.get('/signup', authController.getSignUp)




export default router
