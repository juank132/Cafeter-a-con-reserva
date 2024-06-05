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
exports.checkDisp = exports.createCredential = void 0;
const data_source_1 = require("../config/data-source");
const Credential_1 = require("../entities/Credential");
const credentials = [];
let credentialid = 1;
const createCredential = (dtos) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCredential = yield data_source_1.AppDataSource.getRepository(Credential_1.Credential).findOne({ where: { username: dtos.username } });
    if (existingCredential) {
        throw Error("El usuario ya tiene una credencial asociada");
    }
    else {
        const newCredential = yield data_source_1.AppDataSource.getRepository(Credential_1.Credential).create(dtos);
        const save = yield data_source_1.AppDataSource.getRepository(Credential_1.Credential).save(newCredential);
        return newCredential.id;
    }
});
exports.createCredential = createCredential;
const checkDisp = (user, password) => {
    let obje = { user, password };
    const filC = credentials.filter((obj) => obj.username === obje.user && obj.password === obje.password);
    return filC[0].id;
};
exports.checkDisp = checkDisp;
