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
exports.cancelTurn = exports.createTurnService = exports.idTurn = exports.getTurnsService = void 0;
const data_source_1 = require("../config/data-source");
const Turb_1 = require("../entities/Turb");
const Users_1 = require("../entities/Users");
let arrTurns = [];
let TId = 1;
const getTurnsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const turns = yield data_source_1.AppDataSource.getRepository(Turb_1.Appointment).find({
        relations: {
            user: true
        }
    });
    return turns;
});
exports.getTurnsService = getTurnsService;
const idTurn = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getTId = yield data_source_1.AppDataSource.getRepository(Turb_1.Appointment).findOneBy({ id });
    if (!getTId)
        throw Error('No se encontro un turno con ese ID');
    return getTId;
});
exports.idTurn = idTurn;
const createTurnService = (turn) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const newTurn = yield data_source_1.AppDataSource.getRepository(Turb_1.Appointment).create(turn);
        newTurn.status = 'Active';
        yield queryRunner.manager.save(newTurn);
        const user = yield data_source_1.AppDataSource.getRepository(Users_1.User).findOneBy({
            id: turn.userid
        });
        if (user == null) {
            throw Error("Usuario no existe");
        }
        else {
            newTurn.user = user;
            data_source_1.AppDataSource.getRepository(Turb_1.Appointment).save(newTurn);
        }
        yield queryRunner.commitTransaction();
        return newTurn;
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        throw Error("Error al crear el Turno");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createTurnService = createTurnService;
const cancelTurn = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getTId = yield data_source_1.AppDataSource.getRepository(Turb_1.Appointment).findOneBy({ id });
    if (getTId) {
        getTId.status = "Cancelled";
        yield data_source_1.AppDataSource.getRepository(Turb_1.Appointment).save(getTId);
    }
    else {
        throw Error("El turno no existe");
    }
    ;
    return getTId.status;
});
exports.cancelTurn = cancelTurn;
