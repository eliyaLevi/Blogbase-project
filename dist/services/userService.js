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
exports.deleteToUser = exports.updateUser = exports.getAllUsersWithPosts = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("userData", userData);
    const user = new userModel_1.default(userData);
    return yield user.save();
});
exports.createUser = createUser;
// לקבל משתמש לפי ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findById(id).select("-password").populate("posts");
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.find().select("-password");
});
exports.getAllUsers = getAllUsers;
const getAllUsersWithPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.find().select("-password").populate("posts");
});
exports.getAllUsersWithPosts = getAllUsersWithPosts;
const updateUser = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
});
exports.updateUser = updateUser;
const deleteToUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findByIdAndDelete(id);
});
exports.deleteToUser = deleteToUser;
