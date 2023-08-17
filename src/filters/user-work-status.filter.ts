import { UserWorkStatus } from '../enums/user-work-status.enum.ts';
import {
  mdiBriefcaseOutline,
  mdiFoodOutline,
  mdiHomeAccount
} from '@mdi/js';

export const userWorkStatusFilter = (status: UserWorkStatus) => {
  const callback = { title: '', icon: '' };
  switch (status) {
    case UserWorkStatus.AtHome: {
      callback.title = 'At home';
      callback.icon = mdiHomeAccount;
      break;
    }
    case UserWorkStatus.AtLunch: {
      callback.title = 'At lunch';
      callback.icon = mdiFoodOutline;
      break;
    }
    case UserWorkStatus.AtWork: {
      callback.title = 'At work';
      callback.icon = mdiBriefcaseOutline;
      break;
    }
  }

  return callback;
}