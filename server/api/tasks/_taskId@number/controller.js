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
import { updateTask, deleteTask } from '$/service/tasks';
export default defineController(() => ({
    patch: ({ body, params }) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateTask(params.taskId, body);
        return { status: 204 };
    }),
    delete: ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
        yield deleteTask(params.taskId);
        return { status: 204 };
    })
}));
