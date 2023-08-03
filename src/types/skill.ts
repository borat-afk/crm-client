import { IUser } from './user';

export interface ISkill {
  id?: number;
  name: string;
  users?: IUser[];
}
