import { UserStatus } from '../enums/user-status.enum.ts';
import {
  mdiAccountClockOutline,
  mdiBriefcaseOutline,
  mdiHomeAccount,
  mdiIsland,
  mdiWheelchair,
  mdiCloseNetworkOutline
} from '@mdi/js';

export const userStatusFilter = (status: number): { title: string, icon: string } => {
  const callback = { title: '', icon: '' };

  switch (status) {
    case UserStatus.Unverified: {
      callback.title = 'Unverified';
      callback.icon = mdiAccountClockOutline;
      break;
    }
    case UserStatus.Worked: {
      callback.title = 'Worked';
      callback.icon = mdiBriefcaseOutline;
      break;
    }
    case UserStatus.Remote: {
      callback.title = 'Remote';
      callback.icon = mdiHomeAccount;
      break;
    }
    case UserStatus.OnVacation: {
      callback.title = 'On vacation';
      callback.icon = mdiIsland;
      break;
    }
    case UserStatus.OnSickLiv: {
      callback.title = 'On sickLiv';
      callback.icon = mdiWheelchair;
      break;
    }
    case UserStatus.Dismissed: {
      callback.title = 'Dismissed';
      callback.icon = mdiCloseNetworkOutline;
      break;
    }
  }

  return callback;
}