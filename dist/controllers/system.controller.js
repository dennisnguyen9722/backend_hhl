"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerTime = getServerTime;
function getServerTime(req, res) {
    res.json({
        now: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
}
