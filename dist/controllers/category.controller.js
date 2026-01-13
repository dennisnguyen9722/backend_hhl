"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = getCategories;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
exports.getCategoryBrands = getCategoryBrands;
exports.updateCategoryBrands = updateCategoryBrands;
const prisma_1 = require("../lib/prisma");
async function getCategories(req, res) {
    const categories = await prisma_1.prisma.category.findMany({
        orderBy: { sortOrder: 'asc' }
    });
    res.json(categories);
}
async function createCategory(req, res) {
    const { name, slug, sortOrder, isActive } = req.body;
    const category = await prisma_1.prisma.category.create({
        data: { name, slug, sortOrder, isActive }
    });
    res.json(category);
}
async function updateCategory(req, res) {
    const { id } = req.params;
    const category = await prisma_1.prisma.category.update({
        where: { id },
        data: req.body
    });
    res.json(category);
}
async function deleteCategory(req, res) {
    const { id } = req.params;
    await prisma_1.prisma.category.delete({ where: { id } });
    res.json({ success: true });
}
/* ================= BRAND ↔ CATEGORY ================= */
// GET brands + checked state
async function getCategoryBrands(req, res) {
    const { id } = req.params;
    const brands = await prisma_1.prisma.brand.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
        include: {
            categories: {
                where: { categoryId: id }
            }
        }
    });
    res.json(brands.map((b) => ({
        id: b.id,
        name: b.name,
        checked: b.categories.length > 0
    })));
}
// PUT update mapping
async function updateCategoryBrands(req, res) {
    const { id } = req.params;
    const { brandIds } = req.body;
    await prisma_1.prisma.brandCategory.deleteMany({
        where: { categoryId: id }
    });
    if (brandIds.length > 0) {
        await prisma_1.prisma.brandCategory.createMany({
            data: brandIds.map((bid) => ({
                brandId: bid,
                categoryId: id
            }))
        });
    }
    res.json({ success: true });
}
