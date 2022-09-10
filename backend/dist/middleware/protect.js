"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const isCustomAuth = token && token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jsonwebtoken_1.default.verify(token, "test");
            console.log("decodedData", decodedData);
            req.userId = decodedData === null || decodedData === void 0 ? void 0 : decodedData.id;
            console.log("req.userId", req.userId);
        }
        else {
            decodedData = jsonwebtoken_1.default.decode(token);
            req.userId = decodedData === null || decodedData === void 0 ? void 0 : decodedData.sub;
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.Auth = Auth;
