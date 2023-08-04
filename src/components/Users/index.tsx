import { usersTableColumnsConst } from '../../constants/users-table-columns.const.ts';
import { observer } from 'mobx-react-lite';
import { IUser } from "../../types/user.ts";
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { userStatusFilter } from '../../filters/user-status.filter.ts';
import Table from 'rc-table';
import UsersStore from '../../stores/users.ts';
import './style.css';

const usersStore = UsersStore;

const Users = observer(() => {
  const [users, setUsers] = useState<IUser[] | null | undefined>(null);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    (async () => {
      try {
        await usersStore.fetchUsers();
        const tableData: IUser[] | undefined = usersStore.getUsers()?.map(item => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item.createDate = DateTime.fromISO(item.createDate).toISODate();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item.updateDate = DateTime.fromISO(item.updateDate).toISODate();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item.status = userStatusFilter(item.status).title;
          return item;
        });
        setUsers(tableData);
      } catch (e) {
        throw new Error();
      }
    })()
  }, [page, perPage]);

  return (
    <div>
      <h2>Users</h2>
      {users && <Table columns={usersTableColumnsConst} data={users} rowKey={'dataIndex'}/>}
    </div>
  )
});

export default Users;