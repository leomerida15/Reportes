import { Router } from 'express';
const router: Router = Router();

// controllers
import { register } from '../../controllers/auth/index';

//User
router.route('/login').post();
//
router.route('/register').post(register);
//
router.route('/newPass').post();
//
router.route('/validEmail').patch();

export default router;
