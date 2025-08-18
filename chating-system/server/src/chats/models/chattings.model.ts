import { Users } from "src/users/models/user.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, (user) => user.sentMessages, { eager: true })
  sender: Users;

  @ManyToOne(() => Users, (user) => user.receivedMessages, { eager: true })
  receiver: Users;

  @Column()
  message: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

}