import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SendMessageDto {
    @IsUUID()
    @IsNotEmpty()
    senderId: string;

    @IsUUID()
    @IsNotEmpty()
    receiverId: string;

    @IsString()
    @IsNotEmpty()
    message: string;

}