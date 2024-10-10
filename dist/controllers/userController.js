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
exports.deleteUser = exports.updatToeUser = exports.getUsersWithPosts = exports.getUsers = exports.getUser = void 0;
const userService_1 = require("../services/userService");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userService_1.getUserById)(req.params.id);
    if (!user) {
        res.status(404).json({ messege: "User not found" });
    }
    res.json(user);
});
exports.getUser = getUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userService_1.getAllUsers)();
    res.json(users);
});
exports.getUsers = getUsers;
const getUsersWithPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userService_1.getAllUsersWithPosts)();
    res.json(users);
});
exports.getUsersWithPosts = getUsersWithPosts;
const updatToeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userService_1.updateUser)(req.params.id, req.body);
    if (!user) {
        res.status(404).json({ messege: "User not found" });
    }
    res.json(user);
});
exports.updatToeUser = updatToeUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userService_1.deleteToUser)(req.params.id);
    if (!user) {
        res.status(404).json({ messege: "User not found" });
    }
    res.json({ message: "User Deleted!" });
});
exports.deleteUser = deleteUser;
// Optionally, add DELETE and EDIT functions
