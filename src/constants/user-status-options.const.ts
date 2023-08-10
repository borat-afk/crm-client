import { UserStatus } from '../enums/user-status.enum.ts';

export const userStatusOptionsConst = [
  {
    label: 'Unverified',
    value: UserStatus.Unverified
  },
  {
    label: 'Worked',
    value: UserStatus.Worked
  },
  {
    label: 'Remote',
    value: UserStatus.Remote
  },
  {
    label: 'On vacation',
    value: UserStatus.OnVacation
  },
  {
    label: 'On sickLiv',
    value: UserStatus.OnSickLiv
  },
  {
    label: 'Dismissed',
    value: UserStatus.Dismissed
  },
]