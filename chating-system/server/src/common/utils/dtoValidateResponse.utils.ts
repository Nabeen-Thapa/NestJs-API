import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpException } from "@nestjs/common";

export async function validateDto<T extends object>(
    dtoClass: new () => T,
    raw: object,
    res?: Response
): Promise<{ valid: true; data: T } | { valid: false }> {
    const dto = plainToInstance(dtoClass, raw);
    const errors = await validate(dto);

    if (errors.length > 0) {
        const validationError = errors.map(err => ({
            property: err.property,
            constraints: err.constraints
        }));
        console.log("Validation failed:", validationError);
        throw new HttpException(
            { success: false, message: validationError },
            StatusCodes.BAD_REQUEST
        );
        return { valid: false };
    }

    return { valid: true, data: dto };
}
