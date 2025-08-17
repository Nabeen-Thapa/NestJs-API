import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userSession")
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    userId: string;

    @Column()
    AccessToken: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}