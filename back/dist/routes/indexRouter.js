"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnRouter_1 = __importDefault(require("./turnRouter"));
const usersRouter_1 = require("./usersRouter");
const router = (0, express_1.Router)();
router.use("/users", usersRouter_1.usersRouter);
router.use("/", turnRouter_1.default);
exports.default = router;
