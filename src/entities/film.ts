import { User } from './user';

export type Film = {
  id: string;
  title: string;
  year: number;
  description: string;
  director: string;
  author: User;
};
