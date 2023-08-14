import { FC, useState, useEffect } from 'react';
import { ISelectOption } from '../../../../types/select-option.ts';
import { IUser } from '../../../../types/user.ts';
import PositionsStore from '../../../../stores/positions.ts';
import Select from 'react-select';
import UserStore from '../../../../stores/user.ts';

type IProps = {
  userData: IUser,
  onConfirm: () => void,
}

const userStore = UserStore;
const positionStore = PositionsStore;

const PositionModal: FC<IProps> = ({ userData, onConfirm }) => {
  const [position, setPosition] = useState<ISelectOption | null>();
  const [positionOptions, setPositionOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    (async () => {
      try {
        await positionStore.fetchPositions();
        const positions = positionStore.getPositions();
        if (!positions) return;
        setPositionOptions(positions.map(pos => {
          return { value: pos.id, label: pos.title }
        }));
      } catch (e) {
        throw new Error();
      }
    })();
    if (!userData.position) return;
    setPosition({
      value: userData.position?.id,
      label: userData.position?.title
    });
  }, []);

  const changePosition = async () => {
    try {
      if (!position || !userData) return;
      const newPosition = positionStore.positions?.find(pos => pos.id === position.value);
      if (newPosition) {
        const payload = userData;
        payload.position = newPosition;
        await userStore.updateUserData(payload, userData.id);
        onConfirm();
      }
    } catch (e) {
      throw new Error();
    }
  }

  return (
    <div className={'app__form-field'}>
      <Select
        onChange={(newPosition) => setPosition(newPosition)}
        options={positionOptions}
        value={position}
      />

      <div className={'app__modal-btn-wrp'}>
        <button
          type={'button'}
          className={'app__modal-confirm-btn'}
          disabled={!position}
          onClick={changePosition}
        >
          save
        </button>
      </div>
    </div>
  )
};

export default PositionModal;