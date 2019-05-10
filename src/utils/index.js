import FlvplayerError from './FlvplayerError';

export function errorHandle(condition, msg) {
    if (!condition) {
        throw new FlvplayerError(msg);
    }
    return condition;
}