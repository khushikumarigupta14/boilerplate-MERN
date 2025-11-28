import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserController {
    constructor(private userService: UserService) { }

    createUser = async (req: Request, res: Response) => {
        const result = await this.userService.createUser(req.body as CreateUserDto);
        res.json(result);
    };

    getUsers = async (req: Request, res: Response) => {
        const result = await this.userService.getUsers(req.query);
        res.json(result);
    };

    getUser = async (req: Request, res: Response) => {
        const result = await this.userService.getUserById(req.params.id);
        res.json(result);
    };
}
