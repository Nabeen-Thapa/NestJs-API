
import dotenv from 'dotenv';
import { Users } from '../../users/models/user.model';
import { DataSource } from 'typeorm';
dotenv.config();

export const chatConenction = new DataSource({
    type: "postgres",
    host: process.env.HOST || "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.password || "Nt@post",
    database: process.env.database || "ChatingSystem",
    synchronize: true,
    logging: false,
    entities: [Users],
})

chatConenction.initialize()
    .then(() => {
        console.log("database connected success");
    }).catch((error) => {
        console.log("database connection error:", error.message);

    })