import { FC, useState, useEffect, useMemo, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { ISkill } from '../../types/skill.ts';
import { pageCountCalculate } from '../../helpers/page-count.calculate.ts';
import { pageSkipCalculate } from '../../helpers/page-skip.calculate.ts';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_RowSelectionState } from 'material-react-table';
import { skillsTableColumns } from '../../constants/skills-table-columns.ts';
import { mdiPackageVariantClosedPlus } from '@mdi/js';
import SkillStore from '../../stores/skill.ts';
import Modal from '../App/Modal';
import Icon from '@mdi/react';
import Pagination from '../App/Pagination';
import './style.css';

const store = SkillStore;

const Skills: FC = observer(() => {
  const [skills, setSkills] = useState<ISkill[] | null | undefined>(null);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [perPage, setPerPage] = useState<{ value: number, label: string }>({ value: 5, label: '5' });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>('');
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [modalHeader, setModalHeader] = useState<string>('');
  const [isCreateModal, setIsCreateModal] = useState<boolean>(true);
  const [targetSkillId, setTargetSkillId] = useState<number | null>(null);

  const columns = useMemo<MRT_ColumnDef<ISkill>[]>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => skillsTableColumns,
    []
  );

  const openCreateSkillModal = () => {
    setNewSkill('');
    setIsCreateModal(true);
    setModalHeader('Create skill');
    setIsOpenModal(true);
  };

  const openUpdateSkillModal = (skillId: number) => {
    const currentSkill: ISkill | undefined = skills?.find(item => item.id === skillId);
    if (!currentSkill) return;
    setNewSkill(currentSkill.name);
    setTargetSkillId(skillId);
    setIsCreateModal(false);
    setModalHeader('Update skill');
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalHeader('');
  };

  const createSkill = async () => {
    if (!newSkill) return;
    await store.createSkill(newSkill);
    await populateTable();
    setIsOpenModal(false);
  };

  const updateSkill = async () => {
    if (!newSkill || !targetSkillId) return;
    await store.updateSkill(targetSkillId, newSkill);
    await populateTable();
    setIsOpenModal(false);
    setTargetSkillId(null);
  }

  const populateTable = async () => {
    try {
      store.setPerPage(perPage.value);
      if (page > 1) {
        store.setSkip(pageSkipCalculate(perPage.value, page));
      } else {
        store.setSkip(0);
      }

      await store.fetchSkills();
      setSkills(store.getSkills());
      setPageCount(
        pageCountCalculate(
          store.getTotal(),
          perPage.value
        )
      );
    } catch (e) {
      throw new Error();
    }
  };

  useEffect(() => {
    (async () => {
      await populateTable();
    })();
  }, [page, perPage]);

  const onRowSelect = () => {
    const skillId = +Object.keys(rowSelection)[0];
    if (skillId) {
      openUpdateSkillModal(skillId);
    }
  }

  useEffect(() => {
    onRowSelect();
  }, [rowSelection]);

  return(
    <>
      <div className={'skills__header-wrp'}>
        <h2 className={'skills__header'}>
          Manage skills
        </h2>

        <button
          type={'button'}
          onClick={openCreateSkillModal}
          className={'skills__header-btn'}
        >
          <Icon
            size={'24px'}
            color={'currentColor'}
            path={mdiPackageVariantClosedPlus}
          />
          <p className={'ml-2'}>Add skill</p>
        </button>
      </div>

      {skills &&
        <div className={'mt-4'}>
          <MaterialReactTable
            columns={columns}
            data={skills}
            enableClickToCopy
            enablePagination={false}
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
          />
        </div>
      }

      {skills &&
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
        header={modalHeader}
      >
        <div className={'app__form-field'}>
          <input
            type={'text'}
            placeholder={'Skill name'}
            className={'app-input'}
            value={newSkill}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setNewSkill(event.target.value)}
          />

          <div className={'w-full flex justify-end mt-4'}>
            {isCreateModal
              ? <button
                type={'button'}
                className={'app__modal-confirm-btn'}
                disabled={!newSkill}
                onClick={createSkill}
              >
                create
              </button>
              : <div className={'flex items-center'}>
                <button
                  type={'button'}
                  className={'app__modal-confirm-btn'}
                  disabled={!newSkill}
                  onClick={updateSkill}
                >
                  update skill
                </button>
              </div>
            }
          </div>
        </div>
      </Modal>
    </>
  )
});

export default Skills;