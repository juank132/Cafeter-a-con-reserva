"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsersIdServices = exports.credentialId = exports.loginUserServices = exports.getUsersServices = void 0;
const data_source_1 = require("../config/data-source");
const Credential_1 = require("../entities/Credential");
const Users_1 = require("../entities/Users");
const credentialsServices_1 = require("./credentialsServices");
let users = [];
let userId = 1;
const getUsersServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.AppDataSource.getRepository(Users_1.User).find({
        relations: {
            credential: true,
            appointments: true
        }
    });
    return users;
});
exports.getUsersServices = getUsersServices;
const loginUserServices = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userLog = yield data_source_1.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
        username: user.username,
        password: user.password
    });
    if (userLog === null) {
        throw Error("No se encontro el usuario");
    }
    else
        return userLog;
});
exports.loginUserServices = loginUserServices;
const credentialId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.AppDataSource.getRepository(Users_1.User).findOneBy({ credential: { id } });
    return user;
});
exports.credentialId = credentialId;
const getUsersIdServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getUId = yield data_source_1.AppDataSource.getRepository(Users_1.User).findOne({
        where: { id },
        relations: ["appointments"]
    });
    if (!getUId)
        throw Error('No se encontro un usuario con ese ID');
    return getUId;
});
exports.getUsersIdServices = getUsersIdServices;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const { username, password, name, email, birthdate, nDni } = user;
        const cred = yield (0, credentialsServices_1.createCredential)({ username, password });
        const newUser = yield data_source_1.AppDataSource.getRepository(Users_1.User).create({ name, email, birthdate, nDni });
        yield queryRunner.manager.save(newUser);
        const ncred = yield data_source_1.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
            id: cred
        });
        if (ncred == null) {
            throw Error("error");
        }
        else {
            newUser.credential = ncred;
            data_source_1.AppDataSource.getRepository(Users_1.User).save(newUser);
        }
        yield queryRunner.commitTransaction();
        return newUser;
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        throw Error("Error al crear usuario");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createUser = createUser;
