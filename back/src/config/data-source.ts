import { DataSource } from "typeorm";
import { User } from "../entities/Users";
import { Appointment } from "../entities/Turb";
import { Credential } from "../entities/Credential";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Damarismia11.",
    database: "Proyecto M3",
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
})