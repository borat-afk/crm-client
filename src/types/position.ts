import { IUser } from './user';

export interface IPosition {
  id: number;
  title: string;
  users: IUser[];
}
