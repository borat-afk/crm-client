import { FC, useState } from 'react';
import { IUser } from '../../../../types/user.ts';
import UserStore from '../../../../stores/user.ts';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type DateValue = ValuePiece | [ValuePiece, ValuePiece];

type IProps = {
  userData: IUser,
  onConfirm: () => void,
}

const userStore =  UserStore;

const StartDateModal: FC<IProps> = ({ userData, onConfirm }) => {
  const [startWorkDate, setStartWorkDare] = useState<DateValue>(null);

  const saveDate = async () => {
    try {
      if (!startWorkDate) return;
      await userStore.setStartWorkDate(startWorkDate as Date, userData.id);
      onConfirm();
    } catch (e) {
      throw new Error();
    }
  }

  return (!userData.startWorkDate &&
    <div className={'app__form-field'}>
      <div className={'w-full flex justify-between items-center mt-4'}>
        <span>
          Start work date
        </span>

        <DatePicker
          value={startWorkDate}
          onChange={setStartWorkDare}
        />
      </div>

      <div className={'app__modal-btn-wrp'}>
        <button
          type={'button'}
          className={'app__modal-confirm-btn'}
          onClick={saveDate}
          disabled={!startWorkDate}
        >
          save
        </button>
      </div>
    </div>
  )
};

export default StartDateModal;