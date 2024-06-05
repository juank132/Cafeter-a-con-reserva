"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("../entities/Users");
const Turb_1 = require("../entities/Turb");
const Credential_1 = require("../entities/Credential");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Damarismia11.",
    database: "Proyecto M3",
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [Users_1.User, Turb_1.Appointment, Credential_1.Credential],
    subscribers: [],
    migrations: [],
});
