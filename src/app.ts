import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// routes
import authRoute from './routes/auth.route'
import internalRoute from './routes/internal.route'
import brandRoute from './routes/brand.route'
import collectionRoute from './routes/collection.route'
import imageRoute from './routes/image.route'
import auditLogRoute from './routes/audit-log.route'
import internalRbacRoute from './routes/internal-rbac.route'
import adminUserRoutes from './routes/admin-user.routes'
import imageUploadRoute from './routes/image-upload.route'
import imageZipUploadRoute from './routes/image-zip-upload.route'
import dashboardRoutes from './routes/dashboard.route'
import systemRoute from './routes/system.route'
import bannerRoute from './routes/banner.route'
import uploadRoutes from './routes/upload.route'
import aboutRoute from './routes/about.route'
import contactRoute from './routes/contact.route'
import siteSettingRoute from './routes/siteSetting.route'
import categoryRoute from './routes/category.route'
import adminUploadRoutes from './routes/admin.upload.route'
import adminCollectionRoutes from './routes/admin.collection.route'

import publicRoute from './routes/public.route'

const app = express()

/* ================= CORE MIDDLEWARE ================= */

// ✅ CORS (ĐÚNG CHUẨN COOKIE + AUTH)
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://huyhoanglighting.com',
      'http://huyhoanglighting.com'
    ], // Thêm domain web của bạn vào đây
    credentials: true
  })
)

// ✅ Parse cookie
app.use(cookieParser())

// ✅ Parse JSON body
app.use(express.json())

/* ================= ROUTES ================= */

app.use('/auth', authRoute)
app.use('/internal', internalRoute)

app.use('/brands', brandRoute)
app.use(collectionRoute)
app.use(imageRoute)
app.use('/categories', categoryRoute)

app.use(auditLogRoute)
app.use('/internal', internalRbacRoute)
app.use('/admin-users', adminUserRoutes)

app.use(imageUploadRoute)
app.use(imageZipUploadRoute)

app.use('/admin/upload', adminUploadRoutes)
app.use('/admin', adminCollectionRoutes)

app.use(dashboardRoutes)
app.use(systemRoute)
app.use('/banners', bannerRoute)
app.use(uploadRoutes)
app.use(aboutRoute)
app.use(contactRoute)

app.use('/site-settings', siteSettingRoute)

// ✅ Serve static uploads
app.use('/uploads', express.static('uploads'))

app.get('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) => {
  res.status(204).send()
})

app.use('/public', publicRoute)

/* ================= HEALTH ================= */

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default app
