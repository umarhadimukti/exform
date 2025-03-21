import { Request, Response, Router } from "express";
import { prisma } from "../db/connection";
import UserController from "../controllers/UserController";
import jwtAuth from "../middlewares/jwtAuth";
import FormController from "../controllers/FormController";
import QuestionController from "../controllers/QuestionController";

const router: Router = Router();

router.post('/form/:formId/question', jwtAuth(), async (req: Request, res: Response) => {
    await QuestionController.create(req, res);
});

router.get('/forms', jwtAuth(), async (req: Request, res: Response) => {
    await FormController.index(req, res);
})

router.get('/form/:id', jwtAuth(), async (req: Request, res: Response) => {
    await FormController.show(req, res);
})

router.post('/form', jwtAuth(), async (req: Request, res: Response) => {
    await FormController.create(req, res);
});

router.put('/form/:id', jwtAuth(), async (req: Request, res: Response) => {
    await FormController.update(req, res);
});

router.delete('/form/:id', jwtAuth(), async (req: Request, res: Response) => {
    await FormController.delete(req, res);
});

router.get('/users', jwtAuth(),  async (req: Request, res: Response) => {
    await UserController.index(req, res);
});

router.get('/users/:id', jwtAuth(), async (req: Request, res: Response) => {
    await UserController.show(req, res);
});

router.post('/users', jwtAuth(), async (req: Request, res: Response) => {
    await UserController.create(req, res);
});

router.post('/roles', jwtAuth(), async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await prisma.role.create({
        data: payload
    });
    res.json(result);
});

export default router;