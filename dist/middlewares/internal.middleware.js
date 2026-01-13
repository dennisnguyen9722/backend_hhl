"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSetupKey = requireSetupKey;
function requireSetupKey(req, res, next) {
    const key = req.headers['x-setup-key'];
    if (key !== process.env.INTERNAL_SETUP_KEY) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}
