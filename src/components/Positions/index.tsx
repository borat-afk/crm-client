import { observer } from 'mobx-react';
import { mdiPackageVariantClosedPlus } from '@mdi/js';
import { useState, ChangeEvent, useEffect, useMemo, FC } from 'react';
import { IPosition } from '../../types/position.ts';
import { pageSkipCalculate } from '../../helpers/page-skip.calculate.ts';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { pageCountCalculate } from '../../helpers/page-count.calculate.ts';
import { positionsTableColumnsConst } from '../../constants/positions-table-columns.const.ts';
import Pagination from '../App/Pagination';
import PositionsStore from '../../stores/positions.ts';
import Modal from '../App/Modal';
import Icon from "@mdi/react";
import './style.css';

const store = PositionsStore;

const Positions: FC = observer(() => {
  const [positions, setPositions] = useState<IPosition[] | null | undefined>(null);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [perPage, setPerPage] = useState<{ value: number, label: string }>({ value: 5, label: '5' });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newPosition, setNewPosition] = useState<string>('');

  const columns = useMemo<MRT_ColumnDef<IPosition>[]>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => positionsTableColumnsConst,
    []
  );

  const populateTable = async () => {
    try {
      store.setPerPage(perPage.value);
      if (page > 1) {
        store.setSkip(pageSkipCalculate(perPage.value, page));
      } else {
        store.setSkip(0);
      }

      await store.fetchPositions();
      setPositions(store.getPositions());
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

  const closeModal = () => {
    setIsOpenModal(false);
  }

  const openCreatePositionModal = () => {
    setNewPosition('');
    setIsOpenModal(true);
  }

  const createPosition = async () => {
    if (!newPosition) return;
    await store.createPosition(newPosition);
    await populateTable();
    setIsOpenModal(false);
  }

  return(
    <>
      <div className={'positions__header-wrp'}>
        <h2 className={'positions__header'}>
          Manage positions
        </h2>

        <button
          type={'button'}
          onClick={openCreatePositionModal}
          className={'positions__header-btn'}
        >
          <Icon
            size={'24px'}
            color={'currentColor'}
            path={mdiPackageVariantClosedPlus}
          />
          <p className={'ml-2'}>Add position</p>
        </button>
      </div>

      {positions &&
        <div className={'mt-4'}>
          <MaterialReactTable
            columns={columns}
            data={positions}
            enableClickToCopy
            enablePagination={false}
          />
        </div>
      }

      {positions &&
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

      <Modal
        isOpen={isOpenModal}
        onClose={closeModal}
        header={'Create position'}
      >
        <div className={'app__form-field'}>
          <input
            type={'text'}
            placeholder={'Position title'}
            className={'app-input'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPosition(event.target.value)}
          />

          <div className={'w-full flex justify-end mt-4'}>
            <button
              type={'button'}
              className={'app__modal-confirm-btn'}
              disabled={!newPosition}
              onClick={createPosition}
            >
              create
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
});

export default Positions;