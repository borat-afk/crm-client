import User from '../../stores/user.ts';
import './style.css';
import { mdiFileEditOutline } from '@mdi/js';
import Icon from '@mdi/react';

const userStore = User;

const Account = () => {
  const user = userStore.getUser();

  return (
    <div className={'account'}>
      <h2 className={'account__header'}>
        Account information
      </h2>
      <span className={'account__header-des'}>
        Update your account information
      </span>

      <div className={'account__info-wrp'}>
        <h2 className={'account__header'}>
          Personal information
        </h2>

        <div className={'account__info-edit-wrp'}>
          <Icon
            size={'32px'}
            path={mdiFileEditOutline}
            color={'currentColor'}
          />
          <p className={'ml-2'}>Edit</p>
        </div>
      </div>
    </div>
  )
};

export default Account;