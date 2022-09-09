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
exports.signup = exports.signin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const oldUser = yield user_1.default.findOne({ email });
        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, oldUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ email: oldUser.email, id: oldUser._id }, "test", {
            expiresIn: "1h",
        });
        res.status(200).json({ result: oldUser, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, firstname, lastname } = req.body;
    try {
        const oldUser = yield user_1.default.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                msg: "password do not match ",
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const result = yield new user_1.default({
            name: `${firstname} ${lastname}`,
            // firstname,
            // lastname,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });
        console.log("res", result);
        result.save();
        const token = jsonwebtoken_1.default.sign({ email: result.email, id: result._id }, "test", {
            expiresIn: "1h",
        });
        return res.status(200).json({ result, token });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signup = signup;
