"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.APP_SECRET, { expiresIn: process.env.EXPIRES_IN });
};
exports.createToken = createToken;
