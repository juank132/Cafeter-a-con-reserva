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
exports.getUsersId = exports.getUsers = exports.loginUsers = exports.registerUsers = void 0;
const usersService_1 = require("../services/usersService");
const registerUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const newUser = yield (0, usersService_1.createUser)(user);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({
            error: "Los datos son incorrectos"
        });
    }
});
exports.registerUsers = registerUsers;
const loginUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userLog = yield (0, usersService_1.loginUserServices)({ username, password });
        if (!userLog) {
            throw Error("no se encontro el usuario");
        }
        ;
        const user = yield (0, usersService_1.credentialId)(userLog.id);
        res.status(202).json({ login: true, user });
    }
    catch (error) {
        res.status(400).json({
            error: "Los datos son incorrectos"
        });
    }
});
exports.loginUsers = loginUsers;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getUsersServices)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});
exports.getUsers = getUsers;
const getUsersId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, usersService_1.getUsersIdServices)(Number(id));
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({
            error: "El usuario no fue encontrado"
        });
    }
});
exports.getUsersId = getUsersId;
