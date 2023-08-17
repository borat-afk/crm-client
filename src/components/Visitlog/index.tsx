import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { getDateObj } from '../../helpers/getDateObj.ts';
import { IDate } from '../../types/date.ts';
import VisitlogStore from '../../stores/visitlog.ts';
import UsersStore from '../../stores/users.ts';

const visitlogStore = VisitlogStore;
const usersStore = UsersStore;

const Visitlog: FC = observer(() => {
  const [targetDateMonth, setTargetDateMonth] = useState<IDate>(getDateObj(new Date()));

  useEffect(() => {
    (async () => {
      try {
        await visitlogStore.getVisitlogList(targetDateMonth);
        await usersStore.fetchUsers();
      } catch (e) {
        throw new Error();
      }
    })();
  }, []);

  return (
    <div>LOL</div>
  )
});

export default Visitlog;
