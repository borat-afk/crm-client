import {
  mdiFileEditOutline,
  mdiPencil,
  mdiServerSecurity,
  mdiBeach,
  mdiWheelchairAccessibility,
  mdiContentCopy,
} from '@mdi/js';
import {FC, FormEvent, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {IUser} from '../../types/user.ts';
import {userStatusFilter} from '../../filters/user-status.filter.ts';
import {UserModalType} from '../../enums/user-modal-type.enum.ts';
import { stringCut } from '../../helpers/string-cut.ts';
import { copyText } from '../../helpers/copy-text.ts';
import { userWorkStatusFilter } from '../../filters/user-work-status.filter.ts';
import ModalWindows from './ModalWindow';
import Icon from '@mdi/react';
import UserStore from '../../stores/user.ts';
import './style.css';

const userStore = UserStore

const User: FC<{ userId: number }> = observer(({ userId }) => {
  const [userData, setUserData] = useState<IUser | null>();

  const [isUpdateBtn, setIsUpdateBtn] = useState<boolean>(false);
  const [isDisabledForm, setIsDisabledForm] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<UserModalType>(UserModalType.Default);

  const fetchUser = async () => {
    try {
      await userStore.getUserData(userId);
      setUserData(userStore.getUser());
    } catch (e) {
      throw new Error();
    }
  }

  useEffect(() => {
    if (userData && !userData?.startWorkDate) {
      openModal(UserModalType.StartWorkDate);
    }
  }, [userData]);

  useEffect(() => {
    (async () => {
      await fetchUser();
    })()
  }, []);

  const openModal = (type: UserModalType) => {
    setModalType(type);
    setIsOpenModal(true);
  };

  const closeModal = async () => {
    await fetchUser();
    setIsOpenModal(false);
    setModalType(UserModalType.Default);
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userData) return
    setIsDisabledForm(true);

    try {
      await userStore.updateUserData(userData, userId);
    } catch (e) {
      throw new Error();
    }

    setIsDisabledForm(false);
  }

  return (userData &&
    <div className={'user'}>
      <h2 className={'user__header'}>
        User information
      </h2>
      <span className={'user__header-des'}>
        { userData.workStatus
          ? <div className={'flex items-center'}>
            <Icon
              size={'24px'}
              color={'currentColor'}
              path={userWorkStatusFilter(userData.workStatus).icon}
            />
            <p className={'ml-2'}>
              { userWorkStatusFilter(userData.workStatus).title }
            </p>
          </div>
          : 'update user information' }
      </span>

      <div className={'user__info-wrp'}>
        <h2 className={'user__header'}>
          Personal information
        </h2>

        <div className={'user__info-edit-wrp'}>
          <Icon
            size={'32px'}
            path={mdiFileEditOutline}
            color={'currentColor'}
          />
          <p className={'ml-2'}>Edit</p>
        </div>
      </div>

      <form
        className={'user__form'}
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
              value={userData.firstName ?? ''}
              disabled={isDisabledForm}
              onChange={(event) => {
                userData.firstName = event.target.value
                setIsUpdateBtn(true)
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
              value={userData.lastName ?? ''}
              disabled={isDisabledForm}
              onChange={(event) => {
                userData.lastName = event.target.value
                setIsUpdateBtn(true)
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
              value={userData.phone ?? ''}
              disabled={isDisabledForm}
              onChange={(event) => {
                userData.phone = event.target.value
                setIsUpdateBtn(true)
              }}
            />
          </div>

          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Email
            </span>
            <div className={'app-fake-input !w-full'}>
              {userData.email}
            </div>
          </div>
        </div>

        <div className={'app__form-row'}>
          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Telegram username
            </span>
            <div className={'app-fake-input !w-full'}>{
              userData.telegramUsername &&
              <button
                className={'ml-2 hover:text-green flex items-center'}
                type={'button'}
                onClick={() => userData.telegramUsername && copyText(userData.telegramUsername)}
              >
                <p className={'mr-2'}>
                  {userData.telegramUsername}
                </p>

                <Icon
                  size={'24px'}
                  color={'currentColor'}
                  path={mdiContentCopy}
                />
              </button>}
            </div>
          </div>

          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Telegram token
            </span>
            <div className={'app-fake-input !w-full'}>
              <button
                className={'ml-2 hover:text-green flex items-center'}
                type={'button'}
                onClick={() => copyText(userData.telegramToken)}
              >
                <p className={'mr-2'}>
                  {stringCut(userData.telegramToken, 34)}
                </p>

                <Icon
                  size={'24px'}
                  color={'currentColor'}
                  path={mdiContentCopy}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={'app__form-row'}>
          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Salary
            </span>
            <input
              className={'app-input !w-full'}
              type={'text'}
              value={userData.salary ?? ''}
              disabled={isDisabledForm}
              onChange={(event) => {
                userData.salary = +event.target.value
                setIsUpdateBtn(true)
              }}
            />
          </div>

          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Status
            </span>
            <div className={'app-fake-input !w-full'}>
              <button
                className={'ml-2 hover:text-green flex items-center'}
                type={'button'}
                onClick={() => openModal(UserModalType.Status)}
              >
                <p className={'mr-2'}>
                  {userStatusFilter(userData.status).title}
                </p>
                <Icon
                  size={'32px'}
                  path={userStatusFilter(userData.status).icon}
                  color={'currentColor'}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={'app__form-row'}>
          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Position
            </span>
            <div className={'app-fake-input !w-full'}>
              <button
                className={userData.position ? 'ml-2 hover:text-green flex items-center' : 'w-full flex justify-end hover:text-green'}
                type={'button'}
                onClick={() => openModal(UserModalType.Position)}
              >
                <span className={'mr-2'}>{userData.position?.title}</span>
                <Icon
                  size={'24px'}
                  color={'currentColor'}
                  path={mdiPencil}
                />
              </button>
            </div>
          </div>

          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Skills
            </span>
            <div className={'app-fake-input !w-full'}>
              <button
                className={userData.skills && userData.skills.length ? 'ml-2 hover:text-green flex items-center' : 'w-full flex justify-end hover:text-green'}
                type={'button'}
                onClick={() => openModal(UserModalType.Skill)}
              >
                <div className={'flex mr-2'}>{
                  userData.skills && userData.skills?.length ? userData.skills.map(skill => {
                    return <p className={'mr-2'} key={skill.id}>{ skill.name }</p>
                  }) : ''}
                </div>
                <Icon
                  size={'24px'}
                  color={'currentColor'}
                  path={mdiPencil}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={'app__form-row'}>
          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Permissions
            </span>
            <div className={'app-fake-input !w-full'}>
              <button
                className={'ml-2 hover:text-green flex items-center'}
                type={'button'}
                onClick={() => openModal(UserModalType.Permission)}
              >
                <span className={'mr-2'}>Edit user permissions</span>
                <Icon
                  size={'24px'}
                  color={'currentColor'}
                  path={mdiServerSecurity}
                />
              </button>
            </div>
          </div>

          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Day offs
            </span>
            <div className={'app-fake-input !w-full !justify-between'}>
              <div className={'flex items-center'}>
                <Icon
                  size={'24px'}
                  color={'currentColor'}
                  path={mdiBeach}
                />
                <span className={'ml-2'}>{`Vacation days left: ${userData.vacationDays}`}</span>
              </div>
              <div className={'flex items-center'}>
                <Icon
                  size={'24px'}
                  color={'currentColor'}
                  path={mdiWheelchairAccessibility}
                />
                <span className={'ml-2'}>{`Sick leave days left: ${userData.sickLeaveDays}`}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={'user__form-btn-wrp'}>
          <button
            type={'submit'}
            disabled={!isUpdateBtn}
            className={'user__form-btn'}
          >
            Save changes
          </button>
        </div>
      </form>

      <ModalWindows
        userData={userData}
        type={modalType}
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setModalType(UserModalType.Default);
        }}
        onConfirm={closeModal}
      />
    </div>
  )
});

export default User;