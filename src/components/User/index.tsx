import { mdiFileEditOutline, mdiPencil, mdiServerSecurity } from '@mdi/js';
import { useState, useEffect, FormEvent } from 'react';
import { observer } from 'mobx-react';
import { IUser } from '../../types/user.ts';
import { userStatusFilter } from '../../filters/user-status.filter.ts';
import { MultiSelect } from 'react-multi-select-component';
import { Switch } from 'pretty-checkbox-react';
import { userStatusOptionsConst } from '../../constants/user-status-options.const.ts';
import Select from 'react-select';
import Modal from '../App/Modal';
import PositionModal from './ModalWondows/PositionModal';
import Icon from '@mdi/react';
import UserStore from '../../stores/user.ts';
import PositionsStore from '../../stores/positions.ts';
import SkillStore from '../../stores/skill.ts';
import PermissionsStore from '../../stores/permissions.ts';
import './style.css';
import '@djthoms/pretty-checkbox';

const userStore = UserStore;
const positionsStore = PositionsStore;
const skillStore = SkillStore;
const permissionsStore = PermissionsStore;

type IUserProps = {
  userId: number
}

const User = observer((props: IUserProps) => {
  let user: IUser | null;

  const [userData, setUserData] = useState<IUser | null>();

  const [position, setPosition] = useState<{ value: number, label: string } | undefined>();
  const [status, setStatus] = useState<{ title: string, icon: string } | null>(null);
  const [newPosition, setNewPosition] = useState<{ value: number, label: string } | null>();
  const [positions, setPositions] = useState<{ value: number, label: string }[] | undefined>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isUpdateBtn, setIsUpdateBtn] = useState<boolean>(false);
  const [isDisabledForm, setIsDisabledForm] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [skills, setSkills] = useState<{ label: string, value: number }[] | null>();
  const [userSkills, setUserSkills] =  useState<{ label: string, value: number }[] | null>([]);
  const [isOpenSkillModal, setIsOpenSkillModal] = useState<boolean>(false);

  const [userPermissions, setUserPermissions] = useState<{ permissionId: number, permission: string, value: boolean }[]>([]);
  const [isOpenPermissionsModal, setIsOpenPermissionsModal] = useState<boolean>(false);

  const [isOpenStatusModal, setIsOpenStatusModal] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<{ label: string, value: number }>();

  const fetchUser = async () => {
    await userStore.getUserData(props.userId);

    setUserData(userStore.getUser());

    user = userStore.getUser();
    setIsLoaded(!!user);
    if (!skillStore.skills || !skillStore.skills.length) {
      await skillStore.fetchSkills();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setSkills(skillStore.getSkills().map(item => {
      return {
        label: item.name,
        value: item.id
      }
    }));
    if (!permissionsStore.permissions || !permissionsStore.permissions.length) {
      await permissionsStore.fetchPermissions();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setUserPermissions(permissionsStore.getPermissions().map(item => {
      return {
        permissionId: item.id,
        permission: `${item.controller}:${item.permissions}`,
        value: !!user?.permissions?.find(perm => perm.id === item.id)
      }
    }));
    if (user) {
      setStatus(userStatusFilter(user?.status));
      setUserStatus(userStatusOptionsConst.find(item => item.value === user?.status));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setPosition({ value: user?.position?.id, label: user?.position?.title });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (user.skills && user.skills.length) setUserSkills(user.skills.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      }));
    }
  }

  useEffect(() => {
    (async () => {
      await fetchUser();
      if (!positions || positions.length) {
        await positionsStore.fetchPositions();
        setPositions(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          positionsStore.getPositions()?.map(pos => {
          return {
            value: pos.id,
            label: pos.title
          }
        })
        );
      }
    })()
  }, []);

  const changePosition = async () => {
    try {
      const payload = {
        position: { id: newPosition.value, title: newPosition.label },
      }
      await userStore.updateUserData(payload, props.userId);
      await fetchUser();
      setIsOpenModal(false);
    } catch (e) {
      throw new Error()
    }
  }

  const changeStatus = async () => {
    try {
      if (!userStatus) return;
      await userStore.updateUserStatus(userStatus?.value, props.userId);
      await fetchUser();
      setIsOpenStatusModal(false);
    } catch (e) {
      throw new Error();
    }
  }

  const openSkillsModal = () => {
    setIsOpenSkillModal(true);
  }

  const changeSkills = async () => {
    try {
      const skillPayload = userSkills?.map(skill => skill.value)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await userStore.updateUserSkills(skillPayload, props.userId);
      await fetchUser();
      setIsOpenSkillModal(false);
    } catch (e) {
      throw new Error();
    }
  }

  const openChangePositionModal = () => {
    setNewPosition(null);
    setIsOpenModal(true);
  }

  const savePermissions = async () => {
    try {
      const payload: number[] = [];
      userPermissions.forEach(perm => {
        if (perm.value) payload.push(perm.permissionId);
      });
      await userStore.updatePermissions(payload, props.userId);
      await fetchUser();
      setIsOpenPermissionsModal(false);
    } catch (e) {
      throw new Error();
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userData) return
    setIsDisabledForm(true);

    try {
      await userStore.updateUserData(userData, props.userId);
    } catch (e) {
      throw new Error();
    }

    setIsDisabledForm(false);
  }

  return (isLoaded && userData &&
    <div className={'user'}>
      <h2 className={'user__header'}>
        User information
      </h2>
      <span className={'user__header-des'}>
        update user information
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
              {status?.icon &&
                <button
                  className={'ml-2 hover:text-green flex items-center'}
                  type={'button'}
                  onClick={() => setIsOpenStatusModal(true)}
                >
                  <p className={'mr-2'}>
                    {status?.title}
                  </p>
                  <Icon
                    size={'32px'}
                    path={status?.icon}
                    color={'currentColor'}
                  />
                </button>}
            </div>
          </div>
        </div>

        <div className={'app__form-row'}>
          <div className={'app__form-field w-[45%]'}>
            <span className={'app__form-lbl'}>
              Position
            </span>
            <div className={'app-fake-input !w-full'}>
              <span className={'mr-2'}>{position?.label}</span>

              <button
                className={position && position?.value ? 'ml-2 hover:text-green' : 'w-full flex justify-end hover:text-green'}
                type={'button'}
                onClick={openChangePositionModal}
              >
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
              <div className={'flex mr-2'}>{
                userSkills && userSkills.length ? userSkills.map(skill => {
                return <p className={'mr-2'} key={skill.value}>{ skill.label }</p>
              }) : ''}
              </div>

              <button
                className={userSkills && userSkills?.length ? 'ml-2 hover:text-green' : 'w-full flex justify-end hover:text-green'}
                type={'button'}
                onClick={openSkillsModal}
              >
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
                onClick={() => setIsOpenPermissionsModal(true)}
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

      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        header={'Change position'}
      >
        <PositionModal
          userData={userData}
          onConfirm={async () => {
            await fetchUser();
            setIsOpenModal(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={isOpenStatusModal}
        onClose={() => setIsOpenStatusModal(false)}
        header={'Change status'}
      >
        <div className={'app__form-field'}>
          <Select
            onChange={(newStatus) => setUserStatus(newStatus)}
            options={userStatusOptionsConst}
            value={userStatus}
          />

          <div className={'w-full flex justify-end mt-4'}>
            <button
              type={'button'}
              className={'app__modal-confirm-btn'}
              disabled={!userStatus}
              onClick={changeStatus}
            >
              save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isOpenSkillModal}
        onClose={() => setIsOpenSkillModal(false)}
        header={'Change skills'}
      >
        <div className={'app__form-field'}>
          {skills?.length && userSkills && <MultiSelect
          options={skills}
          value={userSkills}
          onChange={(newSkill) => setUserSkills([...newSkill])}
          labelledBy={'Select'}
        />}

          <div className={'w-full flex justify-end mt-4'}>
            <button
              type={'button'}
              className={'app__modal-confirm-btn'}
              disabled={!userSkills || !userSkills.length}
              onClick={changeSkills}
            >
              save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isOpenPermissionsModal}
        onClose={() => setIsOpenPermissionsModal(false)}
        header={'Change skills'}
      >
        <div className={'app__form-field'}>
          {userPermissions?.length && userPermissions.map(row => {
            return <div key={row.permissionId} className={'w-full flex justify-between items-center mt-4'}>
              <span>{row.permission}</span>
              <Switch
                color={'success'}
                shape={'fill'}
                onChange={() => setUserPermissions(userPermissions.map(item => {
                  if (item.permissionId === row.permissionId) item.value = !item.value
                  return item
                }))}
                checked={row.value}
              />
            </div>
          })}

          <div className={'w-full flex justify-end mt-4'}>
            <button
              type={'button'}
              className={'app__modal-confirm-btn'}
              onClick={savePermissions}
            >
              save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
});

export default User;