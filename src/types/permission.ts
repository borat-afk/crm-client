import { Controllers } from '../enums/controllers.enum';
import { Permissions } from '../enums/permissions.enum';
import { IUser } from './user.ts';

export interface IPermission {
  id?: number;
  controller: Controllers;
  permissions: Permissions;
  users?: IUser[];
}
