export const ROLE_PERMISSIONS: Record<
  'SUPER_ADMIN' | 'ADMIN' | 'EDITOR',
  string[]
> = {
  SUPER_ADMIN: ['*'],

  ADMIN: [
    'category.read',
    'category.create',
    'category.update',
    'category.delete',

    'brand.read',
    'brand.create',
    'brand.update',
    'brand.delete',

    'collection.read',
    'collection.create',
    'collection.update',
    'collection.delete',

    'image.read',
    'image.create',
    'image.update',
    'image.delete',

    'audit.read',
    'admin-user.read',
    'admin-user.create',
    'admin-user.update',

    'settings.read',
    'settings.update'
  ],

  EDITOR: [
    'category.read',
    'category.create',
    'category.update',
    'category.delete',

    'brand.read',
    'brand.create',
    'brand.update',

    'collection.read',
    'collection.create',
    'collection.update',

    'image.read',
    'image.create',
    'image.update'
  ]
}
