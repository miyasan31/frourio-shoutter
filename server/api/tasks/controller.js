var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { defineController } from './$relay';
import { getTasks, createTask } from '$/service/tasks';
const print = (text) => console.log(text);
export default defineController({ getTasks, print }, ({ getTasks, print }) => ({
    get: ({ query }) => __awaiter(void 0, void 0, void 0, function* () {
        if (query === null || query === void 0 ? void 0 : query.message)
            print(query.message);
        return { status: 200, body: yield getTasks(query === null || query === void 0 ? void 0 : query.limit) };
    }),
    post: ({ body }) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            status: 201,
            body: yield createTask(body.label)
        });
    })
}));
