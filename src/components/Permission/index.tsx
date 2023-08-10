import { observer } from 'mobx-react';
import { FC, useEffect, useState, useMemo, ChangeEvent } from 'react';
import { pageSkipCalculate } from '../../helpers/page-skip.calculate.ts';
import { pageCountCalculate } from '../../helpers/page-count.calculate.ts';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { mdiPackageVariantClosedPlus } from '@mdi/js';
import { permissionTableColumnsConst } from '../../constants/permission-table-columns.const.ts';
import { IPermission } from '../../types/permission.ts';
import Pagination from '../App/Pagination';
import PermissionStore from '../../stores/permissions.ts';
import Icon from '@mdi/react';
import './style.css';

const store = PermissionStore;

const Permission: FC = observer(() => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [perPage, setPerPage] = useState<{ value: number, label: string }>({ value: 5, label: '5' });

  const populateTable = async () => {
    try {
      store.setPerPage(perPage.value);
      if (page > 1) {
        store.setSkip(pageSkipCalculate(perPage.value, page));
      } else {
        store.setSkip(0);
      }

      await store.fetchPermissions();
      setPermissions(store.getPermissions());
      setPageCount(
        pageCountCalculate(
          store.getTotal(),
          perPage.value
        )
      );
    } catch (e) {
      throw new Error();
    }
  }

  useEffect(() => {
    (async () => {
      await populateTable();
    })()
  }, [page, perPage]);

  const columns = useMemo<MRT_ColumnDef<IPermission>[]>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => permissionTableColumnsConst,
    []
  );

  return (
    <>
      <div className={'positions__header-wrp'}>
        <h2 className={'positions__header'}>
          Manage permissions
        </h2>
      </div>

      {permissions &&
        <div className={'mt-4'}>
          <MaterialReactTable
            columns={columns}
            data={permissions}
            enableClickToCopy
            enablePagination={false}
          />
        </div>
      }

      {permissions &&
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
    </>
  )
});

export default Permission;