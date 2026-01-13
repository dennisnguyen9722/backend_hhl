"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSlug = toSlug;
function toSlug(input) {
    return input
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
