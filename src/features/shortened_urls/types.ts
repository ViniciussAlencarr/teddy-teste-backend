export interface UrlProperties {
    id: { type: 'number' };
    userId: { type: 'number' };
    clicks: { type: 'number' };
    createdAt: { type: 'string' };
    originalUrl: { type: 'string' };
    shortenedUrl: { type: 'string' };
    updatedAt: { type: 'string' };
    lastAccess: { type: 'string' };
    deletedAt: { type: 'string' | 'null' };
}