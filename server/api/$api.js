/* eslint-disable */
// prettier-ignore
import { dataToURLString } from 'aspida';
// prettier-ignore
const api = ({ baseURL, fetch }) => {
    const prefix = (baseURL === undefined ? 'http://localhost:31735/api' : baseURL).replace(/\/$/, '');
    const PATH0 = '/tasks';
    const PATH1 = '/token';
    const PATH2 = '/user';
    const GET = 'GET';
    const POST = 'POST';
    const DELETE = 'DELETE';
    const PATCH = 'PATCH';
    return {
        tasks: {
            _taskId: (val1) => {
                const prefix1 = `${PATH0}/${val1}`;
                return {
                    patch: (option) => fetch(prefix, prefix1, PATCH, option).send(),
                    $patch: (option) => fetch(prefix, prefix1, PATCH, option).send().then(r => r.body),
                    delete: (option) => fetch(prefix, prefix1, DELETE, option).send(),
                    $delete: (option) => fetch(prefix, prefix1, DELETE, option).send().then(r => r.body),
                    $path: () => `${prefix}${prefix1}`
                };
            },
            get: (option) => fetch(prefix, PATH0, GET, option).json(),
            $get: (option) => fetch(prefix, PATH0, GET, option).json().then(r => r.body),
            post: (option) => fetch(prefix, PATH0, POST, option).json(),
            $post: (option) => fetch(prefix, PATH0, POST, option).json().then(r => r.body),
            $path: (option) => `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        },
        token: {
            post: (option) => fetch(prefix, PATH1, POST, option).json(),
            $post: (option) => fetch(prefix, PATH1, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH1}`
        },
        user: {
            get: (option) => fetch(prefix, PATH2, GET, option).json(),
            $get: (option) => fetch(prefix, PATH2, GET, option).json().then(r => r.body),
            post: (option) => fetch(prefix, PATH2, POST, option, 'FormData').json(),
            $post: (option) => fetch(prefix, PATH2, POST, option, 'FormData').json().then(r => r.body),
            $path: () => `${prefix}${PATH2}`
        },
        get: (option) => fetch(prefix, '', GET, option).text(),
        $get: (option) => fetch(prefix, '', GET, option).text().then(r => r.body),
        $path: () => `${prefix}`
    };
};
// prettier-ignore
export default api;
