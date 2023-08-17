import { IUser } from './user.ts';
import { VisitStatus } from '../enums/visit-status.enum.ts';

export interface IVisitlog {
  id?: number;
  year: number;
  month: number;
  day: number;
  user: IUser;
  status: VisitStatus,
}
