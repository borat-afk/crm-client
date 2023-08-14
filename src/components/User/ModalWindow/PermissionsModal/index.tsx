import { FC, useEffect, useState } from 'react';
import { IUser } from '../../../../types/user.ts';
import { Switch } from 'pretty-checkbox-react';
import UserStore from '../../../../stores/user.ts';
import PermissionsStore from '../../../../stores/permissions.ts';
import '@djthoms/pretty-checkbox';

type IProps = {
  userData: IUser,
  onConfirm: () => void,
}

const userStore = UserStore;
const permissionsStore = PermissionsStore;

const PermissionsModal: FC<IProps> = ({ userData, onConfirm }) => {
  const [permissions, setPermissions] = useState<{
    permissionId: number;
    permission: string,
    value: boolean
  }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        await permissionsStore.fetchPermissions();
        const permissionsList = permissionsStore.getPermissions();
        if (!permissionsList.length) return;
        setPermissions(permissionsList.map(per => {
          return {
            permissionId: per.id as number,
            permission: `${per.controller}:${per.permissions}`,
            value: !!userData.permissions?.find(item => item.id === per.id),
          }
        }));
      } catch (e) {
        throw new Error();
      }
    })();
  }, []);

  const savePermissions = async () => {
    try {
      const payload: number[] = [];
      permissions.forEach(per => {
        if (per.value) payload.push(per.permissionId);
      });
      await userStore.updatePermissions(payload, userData.id);
      onConfirm();
    } catch (e) {
      throw new Error();
    }
  };

  return (permissions.length &&
    <div className={'app__form-field'}>
      { permissions.map(row => {
        return <div
          key={row.permissionId}
          className={'w-full flex justify-between items-center mt-4'}
        >
          <span>{row.permission}</span>
          <Switch
            color={'success'}
            shape={'fill'}
            onChange={() => setPermissions(permissions.map(item => {
              if (item.permissionId === row.permissionId) item.value = !item.value;
              return item;
            }))}
            checked={row.value}
          />
        </div>
      }) }

      <div className={'app__modal-btn-wrp'}>
        <button
          type={'button'}
          className={'app__modal-confirm-btn'}
          onClick={savePermissions}
        >
          save
        </button>
      </div>
    </div>
  )
};

export default PermissionsModal;