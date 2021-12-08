var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable */
// prettier-ignore
import multipart from 'fastify-multipart';
// prettier-ignore
import { validateOrReject } from 'class-validator';
// prettier-ignore
import * as Validators from './validators';
// prettier-ignore
import hooksFn0 from './api/user/hooks';
// prettier-ignore
import controllerFn0 from './api/controller';
// prettier-ignore
import controllerFn1 from './api/tasks/controller';
// prettier-ignore
import controllerFn2 from './api/tasks/_taskId@number/controller';
// prettier-ignore
import controllerFn3 from './api/token/controller';
// prettier-ignore
import controllerFn4 from './api/user/controller';
// prettier-ignore
const parseNumberTypeQueryParams = (numberTypeParams) => (req, reply, done) => {
    var _a;
    const query = req.query;
    for (const [key, isOptional, isArray] of numberTypeParams) {
        const param = isArray ? ((_a = query[`${key}[]`]) !== null && _a !== void 0 ? _a : query[key]) : query[key];
        if (isArray) {
            if (!isOptional && param === undefined) {
                query[key] = [];
            }
            else if (!isOptional || param !== undefined) {
                const vals = (Array.isArray(param) ? param : [param]).map(Number);
                if (vals.some(isNaN)) {
                    reply.code(400).send();
                    return;
                }
                query[key] = vals;
            }
            delete query[`${key}[]`];
        }
        else if (!isOptional || param !== undefined) {
            const val = Number(param);
            if (isNaN(val)) {
                reply.code(400).send();
                return;
            }
            query[key] = val;
        }
    }
    done();
};
// prettier-ignore
const callParserIfExistsQuery = (parser) => (req, reply, done) => Object.keys(req.query).length ? parser(req, reply, done) : done();
// prettier-ignore
const createTypedParamsHandler = (numberTypeParams) => (req, reply, done) => {
    const params = req.params;
    for (const key of numberTypeParams) {
        const val = Number(params[key]);
        if (isNaN(val)) {
            reply.code(400).send();
            return;
        }
        params[key] = val;
    }
    done();
};
// prettier-ignore
const createValidateHandler = (validators) => (req, reply) => Promise.all(validators(req)).catch(err => reply.code(400).send(err));
// prettier-ignore
const formatMultipartData = (arrayTypeKeys) => (req, _, done) => {
    const body = req.body;
    for (const [key] of arrayTypeKeys) {
        if (body[key] === undefined)
            body[key] = [];
        else if (!Array.isArray(body[key])) {
            body[key] = [body[key]];
        }
    }
    Object.entries(body).forEach(([key, val]) => {
        if (Array.isArray(val)) {
            body[key] = val.map(v => v.file ? v : v.value);
        }
        else {
            body[key] = val.file ? val : val.value;
        }
    });
    for (const [key, isOptional] of arrayTypeKeys) {
        if (!body[key].length && isOptional)
            delete body[key];
    }
    done();
};
// prettier-ignore
const methodToHandler = (methodCallback) => (req, reply) => {
    const data = methodCallback(req);
    if (data.headers)
        reply.headers(data.headers);
    reply.code(data.status).send(data.body);
};
// prettier-ignore
const asyncMethodToHandler = (methodCallback) => (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield methodCallback(req);
    if (data.headers)
        reply.headers(data.headers);
    reply.code(data.status).send(data.body);
});
// prettier-ignore
export default (fastify, options = {}) => {
    var _a;
    const basePath = (_a = options.basePath) !== null && _a !== void 0 ? _a : '';
    const validatorOptions = Object.assign({ validationError: { target: false } }, options.validator);
    const hooks0 = hooksFn0(fastify);
    const controller0 = controllerFn0(fastify);
    const controller1 = controllerFn1(fastify);
    const controller2 = controllerFn2(fastify);
    const controller3 = controllerFn3(fastify);
    const controller4 = controllerFn4(fastify);
    fastify.register(multipart, Object.assign({ attachFieldsToBody: true, limits: { fileSize: Math.pow(1024, 3) } }, options.multipart));
    fastify.get(basePath || '/', methodToHandler(controller0.get));
    fastify.get(`${basePath}/tasks`, {
        preValidation: callParserIfExistsQuery(parseNumberTypeQueryParams([['limit', true, false]]))
    }, asyncMethodToHandler(controller1.get));
    fastify.post(`${basePath}/tasks`, asyncMethodToHandler(controller1.post));
    fastify.patch(`${basePath}/tasks/:taskId`, {
        preValidation: createTypedParamsHandler(['taskId'])
    }, asyncMethodToHandler(controller2.patch));
    fastify.delete(`${basePath}/tasks/:taskId`, {
        preValidation: createTypedParamsHandler(['taskId'])
    }, asyncMethodToHandler(controller2.delete));
    fastify.post(`${basePath}/token`, {
        preValidation: createValidateHandler(req => [
            validateOrReject(Object.assign(new Validators.LoginBody(), req.body), validatorOptions)
        ])
    }, methodToHandler(controller3.post));
    fastify.get(`${basePath}/user`, {
        onRequest: hooks0.onRequest
    }, methodToHandler(controller4.get));
    fastify.post(`${basePath}/user`, {
        onRequest: hooks0.onRequest,
        preValidation: formatMultipartData([])
    }, asyncMethodToHandler(controller4.post));
    return fastify;
};
