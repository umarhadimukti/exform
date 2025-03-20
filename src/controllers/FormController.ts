import { Request, Response } from "express";
import { prisma } from "../db/connection";
import CustomError from "../libs/errors/CustomError";

class FormController
{
    public async create(req: Request, res: Response)
    {
        try {
            const { body: payload, user } = req;
    
            if (!user) {
                throw new CustomError('invalid user.', 400);
            }
            
            const form = await prisma.form.create({
                data: {
                    title: payload.title,
                    description: payload.description,
                    user_id: user.id,
                }
            });

            return res.status(201).json({
                status: true,
                message: `user successfully created.`,
                data: form,
            })
        } catch (error) {
            return res
                .status(error instanceof CustomError ? error.statusCode : 500)
                .json({
                    status: false,
                    message: `failed to create new form: ${error instanceof Error ? error.message : error}`,
                });
        }
    }
}

export default new FormController;