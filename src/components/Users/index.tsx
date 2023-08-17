import { usersTableColumnsConst } from '../../constants/users-table-columns.const.tsx';
import { observer } from 'mobx-react-lite';
import { IUser } from "../../types/user.ts";
import { FC, useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { userStatusFilter } from '../../filters/user-status.filter.ts';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_RowSelectionState } from 'material-react-table';
import { pageCountCalculate } from '../../helpers/page-count.calculate.ts';
import { pageSkipCalculate } from '../../helpers/page-skip.calculate.ts';
import { useNavigate } from 'react-router-dom';
import Pagination from '../App/Pagination';
import UsersStore from '../../stores/users.ts';
import 'react-responsive-pagination/themes/bootstrap.css';
import './style.css';

const usersStore = UsersStore;

const Users: FC = observer(() => {
  const [users, setUsers] = useState<IUser[] | null | undefined>(null);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [perPage, setPerPage] = useState<{ value: number, label: string }>({ value: 5, label: '5' });
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const navigate = useNavigate();

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => usersTableColumnsConst,
    []
  );

  useEffect(() => {
    (async () => {
      try {
        usersStore.setPerPage(perPage.value);
        if (page > 1) {
          usersStore.setSkip(pageSkipCalculate(perPage.value, page));
        } else {
          usersStore.setSkip(0);
        }
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
        setPageCount(
          pageCountCalculate(
            usersStore.getTotal(),
            perPage.value
          )
        );
      } catch (e) {
        throw new Error();
      }
    })()
  }, [page, perPage]);
  const onRowSelect = () => {
    const userId = +Object.keys(rowSelection)[0];
    if (userId) {
      navigate('/user', {
        state: { userId }
      })
    }
  };

  useEffect(() => {
    onRowSelect()
  }, [rowSelection]);

  return (
    <div>
      {users && <MaterialReactTable
        columns={columns}
        data={users}
        enableClickToCopy
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getRowId={(row) => row.id}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () =>
            setRowSelection((prev) => ({
              [row.id]: !prev[row.id],
            })),
          selected: rowSelection[row.id],
          sx: {
            cursor: 'pointer',
          },
        })}
        state={{ rowSelection }}
        enablePagination={false}
      />}
      {users &&
        <div className={'w-full flex justify-end mt-2'}>
          <Pagination
            page={page}
            pageCount={pageCount}
            perPage={perPage}
            changePage={setPage}
            setPerPage={setPerPage}
          />
        </div>
      }
    </div>
  )
});

export default Users;