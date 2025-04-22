import type { Database } from './database.types';

export type DatabaseUser = Database['public']['Tables']['users']['Row'];

export interface IUser {
  id: string;
  name: string;
  createdAt: Date;
}

export const mapDatabaseUserToUser = (dbUser: DatabaseUser): IUser => {
  return {
    id: dbUser.id,
    name: dbUser.name,
    createdAt: new Date(dbUser.created_at),
  };
};