import express from 'express';
import { getUser, userLogin, userLogout, userRegister } from '../controller/user.js';

const router = express.Router();

router.post("/login", userLogin);
router.get("/me", getUser);
router.post("/register",userRegister);
router.get("/logout", userLogout);





export default router;