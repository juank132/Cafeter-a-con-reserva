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
exports.statusTurn = exports.getTurnData = exports.getTurns = exports.createTurn = void 0;
const turnsService_1 = require("../services/turnsService");
const data_source_1 = require("../config/data-source");
const Users_1 = require("../entities/Users");
const createTurn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, userid } = req.body;
        const newTurn = yield (0, turnsService_1.createTurnService)({ date, time, userid });
        const user = yield data_source_1.AppDataSource.getRepository(Users_1.User).findOneBy({
            id: userid
        });
        res.status(202).json(newTurn);
    }
    catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});
exports.createTurn = createTurn;
const getTurns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const turns = yield (0, turnsService_1.getTurnsService)();
        res.status(202).json(turns);
    }
    catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});
exports.getTurns = getTurns;
const getTurnData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const turnData = yield (0, turnsService_1.idTurn)(Number(id));
        res.status(202).json(turnData);
    }
    catch (error) {
        res.status(400).json({
            error: "El turno no fue encontrado"
        });
    }
});
exports.getTurnData = getTurnData;
const statusTurn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const turn = yield (0, turnsService_1.cancelTurn)(Number(id));
        res.status(202).json(`El status del turno es: ${turn}`);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.statusTurn = statusTurn;
