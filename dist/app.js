"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// routes
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const internal_route_1 = __importDefault(require("./routes/internal.route"));
const brand_route_1 = __importDefault(require("./routes/brand.route"));
const collection_route_1 = __importDefault(require("./routes/collection.route"));
const image_route_1 = __importDefault(require("./routes/image.route"));
const audit_log_route_1 = __importDefault(require("./routes/audit-log.route"));
const internal_rbac_route_1 = __importDefault(require("./routes/internal-rbac.route"));
const admin_user_routes_1 = __importDefault(require("./routes/admin-user.routes"));
const image_upload_route_1 = __importDefault(require("./routes/image-upload.route"));
const image_zip_upload_route_1 = __importDefault(require("./routes/image-zip-upload.route"));
const dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
const system_route_1 = __importDefault(require("./routes/system.route"));
const banner_route_1 = __importDefault(require("./routes/banner.route"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
const about_route_1 = __importDefault(require("./routes/about.route"));
const contact_route_1 = __importDefault(require("./routes/contact.route"));
const siteSetting_route_1 = __importDefault(require("./routes/siteSetting.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const admin_upload_route_1 = __importDefault(require("./routes/admin.upload.route"));
const admin_collection_route_1 = __importDefault(require("./routes/admin.collection.route"));
const public_route_1 = __importDefault(require("./routes/public.route"));
const app = (0, express_1.default)();
/* ================= CORE MIDDLEWARE ================= */
// ✅ CORS (ĐÚNG CHUẨN COOKIE + AUTH)
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://huyhoanglighting.com',
        'http://huyhoanglighting.com'
    ], // Thêm domain web của bạn vào đây
    credentials: true
}));
// ✅ Parse cookie
app.use((0, cookie_parser_1.default)());
// ✅ Parse JSON body
app.use(express_1.default.json());
/* ================= ROUTES ================= */
app.use('/auth', auth_route_1.default);
app.use('/internal', internal_route_1.default);
app.use('/brands', brand_route_1.default);
app.use(collection_route_1.default);
app.use(image_route_1.default);
app.use('/categories', category_route_1.default);
app.use(audit_log_route_1.default);
app.use('/internal', internal_rbac_route_1.default);
app.use('/admin-users', admin_user_routes_1.default);
app.use(image_upload_route_1.default);
app.use(image_zip_upload_route_1.default);
app.use('/admin/upload', admin_upload_route_1.default);
app.use('/admin', admin_collection_route_1.default);
app.use(dashboard_route_1.default);
app.use(system_route_1.default);
app.use('/banners', banner_route_1.default);
app.use(upload_route_1.default);
app.use(about_route_1.default);
app.use(contact_route_1.default);
app.use('/site-settings', siteSetting_route_1.default);
// ✅ Serve static uploads
app.use('/uploads', express_1.default.static('uploads'));
app.get('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) => {
    res.status(204).send();
});
app.use('/public', public_route_1.default);
/* ================= HEALTH ================= */
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
exports.default = app;
