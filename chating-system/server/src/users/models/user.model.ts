import { ChatMessage } from "src/chats/models/chattings.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ unique: true })
    phone: string

    @OneToMany(() => ChatMessage, (message) => message.sender)
    sentMessages: ChatMessage[];

    @OneToMany(() => ChatMessage, (message) => message.receiver)
    receivedMessages: ChatMessage[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}