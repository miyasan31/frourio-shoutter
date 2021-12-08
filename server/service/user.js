var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import path from 'path';
import { API_ORIGIN, API_USER_ID, API_USER_PASS, API_UPLOAD_DIR } from './envValues';
const iconsDir = API_UPLOAD_DIR && path.resolve(API_UPLOAD_DIR, 'icons');
const createIconURL = (dir, name) => `${API_ORIGIN}/${dir}icons/${name}`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUserIconName = (_id) => {
    return `user-icon`;
};
export const getUserInfo = (id) => {
    const iconName = getUserIconName(id);
    return {
        name: 'sample user',
        icon: iconsDir && fs.existsSync(path.resolve(iconsDir, iconName))
            ? createIconURL('upload/', iconName)
            : createIconURL('static/', `dummy.svg`)
    };
};
export const validateUser = (id, pass) => id === API_USER_ID && pass === API_USER_PASS;
export const getUserInfoById = (id) => (Object.assign({ id }, getUserInfo(id)));
export const changeIcon = (id, iconFile) => __awaiter(void 0, void 0, void 0, function* () {
    const iconName = getUserIconName(id);
    if (!iconsDir) {
        throw new Error('API_UPLOAD_DIR is not configured.');
    }
    yield fs.promises.mkdir(iconsDir, { recursive: true });
    yield fs.promises.writeFile(path.resolve(iconsDir, iconName), yield iconFile.toBuffer());
    return Object.assign({ id }, getUserInfo(id));
});
