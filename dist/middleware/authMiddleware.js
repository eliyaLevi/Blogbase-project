"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
//אימות משתמש
const authMiddleware = (req, res, next) => {
    // ניסיון לחלץ את הטוקן 
    const token = req.cookies.token;
    //אם אין תוקן תחזיר שגיאה 401
    if (!token) {
        res.status(401).json({ message: 'אין לך תוקן התנתק וזריזז' });
        return;
    }
    try {
        //ניסיון לאמת את הטוקן
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //אם האימות מצליח אני מוסיף את פרטי המשתמש לאובייקט הבקשה
        req.user = decoded;
        //ממשיך לפונקציה הבאה בשרשרת הטיפול
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'הטוקן לא בתוקף' });
    }
};
exports.authMiddleware = authMiddleware;
