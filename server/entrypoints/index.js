import { init } from '$/service/app';
import { API_SERVER_PORT } from '$/service/envValues';
init()
    .listen(API_SERVER_PORT, '0.0.0.0')
    .then(() => {
    var _a;
    // PM2 graceful start
    // See also https://pm2.keymetrics.io/docs/usage/signals-clean-restart/
    (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, 'ready');
});
