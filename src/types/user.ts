import { IPosition } from './position';
import { ISkill } from './skill';
import { UserStatus } from '../enums/user-status.enum';
import { IPermission } from './permission';

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  position?: IPosition;
  skills?: ISkill[];
  salary?: number;
  status: UserStatus;
  isReLogin?: boolean;
  permissions?: IPermission[];
  createDate: Date;
  updateDate?: Date;
}
