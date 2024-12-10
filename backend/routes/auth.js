import express from 'express'
import {signupper, logger, getUsers} from '../controller/auth.js'

const router=express.Router();
router.post('/signup', signupper);
router.post('/login', logger);
router.get('/getter', getUsers);





export default router;