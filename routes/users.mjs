import {Router} from "express";
import {GetAllUsers} from "../controller/user.mjs";
const router=Router();

router.get('/',GetAllUsers);



export default router;