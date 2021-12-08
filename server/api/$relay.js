/* eslint-disable */
// prettier-ignore
import { depend } from 'velona';
// prettier-ignore
export function defineResponseSchema(methods) {
    return methods;
}
// prettier-ignore
export function defineHooks(hooks, cb) {
    return cb && typeof hooks !== 'function' ? depend(hooks, cb) : hooks;
}
// prettier-ignore
export function defineController(methods, cb) {
    return cb && typeof methods !== 'function' ? depend(methods, cb) : methods;
}
