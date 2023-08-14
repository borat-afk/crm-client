import { FC, useState, useEffect } from 'react';
import { ISelectOption } from '../../../../types/select-option.ts';
import { IUser } from '../../../../types/user.ts';
import { userStatusOptionsConst } from '../../../../constants/user-status-options.const.ts';
import Select from 'react-select';
import UserStore from '../../../../stores/user.ts';

type IProps = {
  userData: IUser,
  onConfirm: () => void,
}

const userStore = UserStore;

const StatusModal: FC<IProps> = ({ userData, onConfirm }) => {
  const [status, setStatus] = useState<ISelectOption | null>();

  useEffect(() => {
    if (userData.status) {
      setStatus(userStatusOptionsConst
        .find(item => item.value === userData.status)
      )
    }
  }, []);

  const changeStatus = async () => {
    try {
      if (!status || typeof status.value !== 'number') return;
      await userStore.updateUserStatus(status?.value, userData.id);
      onConfirm();
    } catch (e) {
      throw new Error();
    }
  };

  return (status &&
    <div className={'app__form-field'}>
      <Select
        onChange={(newStatus) => setStatus(newStatus)}
        options={userStatusOptionsConst}
        value={status}
      />

      <div className={'app__modal-btn-wrp'}>
        <button
          type={'button'}
          className={'app__modal-confirm-btn'}
          disabled={!status}
          onClick={changeStatus}
        >
          save
        </button>
      </div>
    </div>
  )
};

export default StatusModal;