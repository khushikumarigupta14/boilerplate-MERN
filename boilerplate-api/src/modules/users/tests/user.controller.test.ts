import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

describe("UserController", () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
        userController = new UserController(userService);
    });

    it("should create user", async () => {
        const req = { body: { name: 'Test', email: 'test@test.com', password: 'password' } } as any;
        const res = { json: jest.fn() } as any;
        jest.spyOn(userService, 'createUser').mockResolvedValue(req.body);

        await userController.createUser(req, res);

        expect(res.json).toHaveBeenCalledWith(req.body);
    });
});
