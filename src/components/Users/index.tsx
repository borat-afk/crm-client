import { usersTableColumnsConst } from '../../constants/users-table-columns.const.ts';
import { observer } from 'mobx-react-lite';
import { IUser } from "../../types/user.ts";
import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { userStatusFilter } from '../../filters/user-status.filter.ts';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { pageCountCalculate } from '../../helpers/page-count.calculate.ts';
import { paginationPerPageConst } from '../../constants/pagination-per-page.const.ts';
import { pageSkipCalculate } from '../../helpers/page-skip.calculate.ts';
import Select from 'react-select';
import UsersStore from '../../stores/users.ts';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/bootstrap.css';
import './style.css';

const usersStore = UsersStore;

const Users = observer(() => {
  const [users, setUsers] = useState<IUser[] | null | undefined>(null);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(2);
  const [rowCount, setRowCount] = useState<number>(0);
  const [perPage, setPerPage] = useState<{ value: number, label: string }>({ value: 5, label: '5' });

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
        if (page > 1) usersStore.setSkip(pageSkipCalculate(perPage.value, page));
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
        setRowCount(usersStore.getTotal());
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

  return (
    <div>
      <h2>Users</h2>
      {users && <MaterialReactTable
        columns={columns}
        data={users}
        enableClickToCopy
        enablePagination={false}
      />}
      {users && pageCount > 1 && <div className={'w-full flex justify-end mt-2'}>
        <div className={'flex items-center mr-4'}>
          <span className={'text-primary font-light text-lg mr-2'}>
            Items per page:
          </span>
          <Select
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onChange={(newPerPage) => setPerPage(newPerPage)}
            options={paginationPerPageConst}
            value={perPage}
          />
        </div>
        <ResponsivePagination
          current={page}
          total={pageCount}
          onPageChange={(page: number) => setPage(page)}
        />
      </div>}
    </div>
  )
});

export default Users;