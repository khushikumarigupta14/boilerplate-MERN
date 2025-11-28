import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { validateCreateUser } from '../validation/user.validation';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post('/', validateCreateUser, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

export const userRoutes = router;
