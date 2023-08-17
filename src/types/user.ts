import { IPosition } from './position';
import { ISkill } from './skill';
import { UserStatus } from '../enums/user-status.enum';
import { IPermission } from './permission';
import { UserWorkStatus } from '../enums/user-work-status.enum.ts';

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  telegramUsername?: string;
  telegramToken: string;
  position?: IPosition;
  skills?: ISkill[];
  salary?: number;
  status: UserStatus;
  workStatus?: UserWorkStatus;
  vacationDays: number;
  sickLeaveDays: number;
  startWorkDate?: Date;
  isReLogin?: boolean;
  permissions?: IPermission[];
  createDate: Date;
  updateDate?: Date;
}
