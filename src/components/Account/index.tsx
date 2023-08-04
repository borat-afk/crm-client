import { mdiFileEditOutline } from '@mdi/js';
import { useState, useEffect, FormEvent } from 'react';
import { observer } from 'mobx-react';
import { IUser } from '../../types/user.ts';
import Icon from '@mdi/react';
import User from '../../stores/user.ts';
import './style.css';

const userStore = User;

const Account = observer(() => {
  const user: IUser | null = userStore.getUser();

  const [firstName, setFirstName] = useState<string | undefined>('');
  const [lastName, setLastName] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isUpdateBtn, setIsUpdateBtn] = useState<boolean>(false);
  const [isDisabledForm, setIsDisabledForm] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(!!user);
    if (user) {
      setPhone(user?.phone);
      setLastName(user?.lastName);
      setFirstName(user?.firstName);
    }
  }, [userStore.user]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsDisabledForm(true);

    try {
      await userStore.updateUserData({ firstName, lastName, phone });
    } catch (e) {
      throw new Error();
    }

    setIsDisabledForm(false);
  }

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

      <form
        className={'account__form'}
        onSubmit={submit}
      >
        <div className={'app__form-row'}>
          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              First Name
            </span>
            <input
              className={'app-input !w-full'}
              type={'text'}
              value={firstName || ''}
              disabled={isDisabledForm}
              onChange={(event) => {
                setFirstName(event.target.value);
                setIsUpdateBtn(true);
              }}
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
              disabled={isDisabledForm}
              onChange={(event) => {
                setLastName(event.target.value);
                setIsUpdateBtn(true);
              }}
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
              disabled={isDisabledForm}
              onChange={(event) => {
                setPhone(event.target.value);
                setIsUpdateBtn(true);
              }}
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

        <div className={'account__form-btn-wrp'}>
          <button
            type={'submit'}
            disabled={!isUpdateBtn}
            className={'account__form-btn'}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  )
});

export default Account;