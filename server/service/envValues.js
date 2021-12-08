var _a, _b, _c, _d, _e, _f, _g;
import dotenv from 'dotenv';
dotenv.config();
const API_JWT_SECRET = (_a = process.env.API_JWT_SECRET) !== null && _a !== void 0 ? _a : '';
const API_USER_ID = (_b = process.env.API_USER_ID) !== null && _b !== void 0 ? _b : '';
const API_USER_PASS = (_c = process.env.API_USER_PASS) !== null && _c !== void 0 ? _c : '';
const API_SERVER_PORT = +((_d = process.env.API_SERVER_PORT) !== null && _d !== void 0 ? _d : '8080');
const API_BASE_PATH = (_e = process.env.API_BASE_PATH) !== null && _e !== void 0 ? _e : '';
const API_ORIGIN = (_f = process.env.API_ORIGIN) !== null && _f !== void 0 ? _f : '';
const API_UPLOAD_DIR = (_g = process.env.API_UPLOAD_DIR) !== null && _g !== void 0 ? _g : '';
export { API_JWT_SECRET, API_USER_ID, API_USER_PASS, API_SERVER_PORT, API_BASE_PATH, API_ORIGIN, API_UPLOAD_DIR };