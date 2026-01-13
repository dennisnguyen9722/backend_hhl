"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = getAllCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const prisma_1 = require("../lib/prisma");
function getAllCategories() {
    return prisma_1.prisma.category.findMany({
        where: {
            isActive: true
        },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
    });
}
function createCategory(data) {
    return prisma_1.prisma.category.create({
        data: {
            name: data.name,
            slug: data.slug,
            sortOrder: data.sortOrder ?? 0,
            isActive: data.isActive ?? true
        }
    });
}
function updateCategory(id, data) {
    return prisma_1.prisma.category.update({
        where: { id },
        data
    });
}
function deleteCategory(id) {
    return prisma_1.prisma.category.delete({
        where: { id }
    });
}
