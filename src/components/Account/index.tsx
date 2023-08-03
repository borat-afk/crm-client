import User from '../../stores/user.ts';
import './style.css';
import { mdiFileEditOutline } from '@mdi/js';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Icon from '@mdi/react';
import { IUser } from '../../types/user.ts';

const userStore = User;

const Account = observer(() => {
  const user: IUser | null = userStore.getUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phone, setPhone] = useState(user?.phone);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!!user);
    if (user) {
      setPhone(user?.phone);
      setLastName(user?.lastName);
      setFirstName(user?.firstName);
    }
  }, [userStore.user]);

  return (isLoaded &&
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

      <form className={'account__form'}>
        <div className={'app__form-row'}>
          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              First Name
            </span>
            <input
              className={'app-input !w-full'}
              type={'text'}
              value={firstName || ''}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>

          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Last Name
            </span>
            <input
              className={'app-input !w-full'}
              type={'text'}
              value={lastName || ''}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        </div>

        <div className={'app__form-row'}>
          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Phone
            </span>
            <input
              className={'app-input !w-full'}
              type={'text'}
              value={phone || ''}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Email
            </span>
            <div className={'app-fake-input !w-full'}>
              {user?.email}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
});

export default Account;