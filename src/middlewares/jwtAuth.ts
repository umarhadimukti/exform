import { NextFunction, Request, Response } from "express";
import CustomError from "../libs/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import AuthService from "../libs/services/AuthService";
import dotenv from "dotenv";

dotenv.config();

declare module "express" {
    interface Request {
        user?: JwtPayload | string,
    }
}

export default function jwtAuth ()
{
    const authService = new AuthService;
    const JWT_ACCESS_TOKEN: string = process.env.JWT_ACCESS_TOKEN as string || 'asfdsfsdfw234';

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                throw new CustomError('unauthorized', 403);
            }

            const token: string = authorization.split(' ')[0]; // Bearer <token>

            const verified: JwtPayload | unknown = authService.verifyToken(token, JWT_ACCESS_TOKEN);

            if (!verified || typeof verified !== 'object') {
                throw new CustomError('invalid or expired token', 400);
            }

            req.user = verified;

            next();

        } catch (error) {
            return res
                .status(error instanceof CustomError ? error.statusCode : 500)
                .json({
                    status: false,
                    message: `failed to access the page: ${error instanceof Error ? error.message : error}`,
                });
        }
    }
}