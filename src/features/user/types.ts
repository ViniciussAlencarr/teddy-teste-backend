export interface UserProperties {
    id: { type: 'number' };
    email: { type: 'string' };
    password: { type: 'string' };
    createdAt: { type: 'string' };
    name: { type: 'string' };
    updatedAt: { type: 'string' };
    deletedAt: { type: 'string' | 'null' };
}