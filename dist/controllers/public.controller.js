"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicCatalog = getPublicCatalog;
exports.getPublicCollectionDetail = getPublicCollectionDetail;
exports.getPublicBrandPage = getPublicBrandPage;
exports.increaseDownloadCount = increaseDownloadCount;
const prisma_1 = require("../lib/prisma");
/**
 * PUBLIC CATALOG
 * Category
 *  └─ Brands (đã tick category)
 *      └─ Collections (catalogue theo năm)
 *          └─ coverImage (ưu tiên coverImage, fallback ảnh đầu tiên)
 */
async function getPublicCatalog(req, res) {
    const categories = await prisma_1.prisma.category.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            sortOrder: 'asc'
        },
        include: {
            brands: {
                where: {
                    brand: {
                        isActive: true,
                        deletedAt: null
                    }
                },
                include: {
                    brand: {
                        include: {
                            collections: {
                                where: {
                                    isActive: true,
                                    deletedAt: null
                                },
                                orderBy: {
                                    createdAt: 'desc'
                                },
                                include: {
                                    images: {
                                        where: {
                                            isActive: true,
                                            deletedAt: null
                                        },
                                        orderBy: {
                                            sortOrder: 'asc'
                                        },
                                        take: 1,
                                        select: {
                                            imageUrl: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    const result = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        brands: cat.brands
            .map((bc) => bc.brand)
            .filter((b) => b.collections.length > 0)
            .map((b) => ({
            id: b.id,
            name: b.name,
            slug: b.slug,
            logo: b.logo,
            collections: b.collections.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                coverImage: c.coverImage ?? c.images[0]?.imageUrl ?? null
            }))
        }))
    }));
    res.json(result);
}
/**
 * PUBLIC COLLECTION DETAIL
 * /public/catalog/:brandSlug/:collectionSlug
 */
async function getPublicCollectionDetail(req, res) {
    const { brandSlug, collectionSlug } = req.params;
    const collection = await prisma_1.prisma.collection.findFirst({
        where: {
            slug: collectionSlug,
            isActive: true,
            deletedAt: null,
            brand: {
                slug: brandSlug,
                isActive: true,
                deletedAt: null
            }
        },
        include: {
            brand: {
                select: {
                    id: true,
                    name: true,
                    slug: true
                }
            },
            images: {
                where: {
                    isActive: true,
                    deletedAt: null
                },
                orderBy: {
                    sortOrder: 'asc'
                }
            }
        }
    });
    if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
    }
    res.json({
        id: collection.id,
        name: collection.name,
        slug: collection.slug,
        brand: collection.brand,
        pdfFile: collection.pdfFile ?? null,
        pdfLink: collection.pdfLink ?? null,
        images: collection.images.map((img) => ({
            id: img.id,
            imageUrl: img.imageUrl
        }))
    });
}
/**
 * PUBLIC BRAND PAGE
 * /public/catalog/:categorySlug/:brandSlug
 */
async function getPublicBrandPage(req, res) {
    const { categorySlug, brandSlug } = req.params;
    // 1. Lấy category
    const category = await prisma_1.prisma.category.findFirst({
        where: {
            slug: categorySlug,
            isActive: true
        }
    });
    if (!category) {
        return res.status(404).json(null);
    }
    // 2. Lấy brand thuộc category đó
    const brand = await prisma_1.prisma.brand.findFirst({
        where: {
            slug: brandSlug,
            isActive: true,
            deletedAt: null,
            categories: {
                some: {
                    categoryId: category.id
                }
            }
        },
        include: {
            collections: {
                where: {
                    isActive: true,
                    deletedAt: null
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    images: {
                        where: {
                            isActive: true,
                            deletedAt: null
                        },
                        orderBy: {
                            sortOrder: 'asc'
                        },
                        take: 1
                    }
                }
            }
        }
    });
    if (!brand) {
        return res.status(404).json(null);
    }
    // 3. Response cho frontend
    return res.json({
        category: {
            id: category.id,
            name: category.name,
            slug: category.slug
        },
        brand: {
            id: brand.id,
            name: brand.name,
            slug: brand.slug,
            logo: brand.logo,
            collections: brand.collections.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                coverImage: c.coverImage ?? c.images[0]?.imageUrl ?? null
            }))
        }
    });
}
async function increaseDownloadCount(req, res) {
    const { brandSlug, collectionSlug } = req.params;
    await prisma_1.prisma.collection.updateMany({
        where: {
            slug: collectionSlug,
            brand: {
                slug: brandSlug
            }
        },
        data: {
            downloadCount: { increment: 1 }
        }
    });
    res.json({ success: true });
}
