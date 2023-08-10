import { FC } from 'react';
import { paginationPerPageConst } from '../../../constants/pagination-per-page.const.ts';
import ResponsivePagination from 'react-responsive-pagination';
import Select from 'react-select';
import './style.css'


type IPagination = {
  page: number,
  pageCount: number,
  perPage: { value: number, label: string },
  changePage: (page: number) => void,
  setPerPage: (newPerPage: { value: number, label: string }) => void,
};

const Pagination: FC<IPagination> = ({ page, pageCount, perPage, changePage, setPerPage }) => {

  return(
    <div className={'pagination'}>
      <div className={'pagination__per-page'}>
        <span className={'pagination__per-page-lbl'}>
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
        onPageChange={(page: number) => changePage(page)}
      />
    </div>
  )
};

export default Pagination;