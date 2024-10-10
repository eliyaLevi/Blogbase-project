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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = require("../utils/auth");
const userService_1 = require("../services/userService");
// פונקציה להרשמה של משתמש חדש
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, profile } = req.body;
    try {
        yield (0, userService_1.createUser)({
            username, password, email, profile
        });
        res.status(201).json({ message: "נרשמת בהצלחה  " });
    }
    catch (error) {
        console.log(error);
        res.status(400).json("תקלה בהרשמה");
    }
});
exports.register = register;
// התחברות של משתמש קיים
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield userModel_1.default.findOne({ username });
    if (!user || !(yield user.comparePassword(password))) {
        res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
        return;
    }
    ;
    yield user.save();
    const token = (0, auth_1.generateToken)(user.id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    });
    res.status(201).json({ message: "התחברת בהצלחה", token });
});
exports.login = login;
