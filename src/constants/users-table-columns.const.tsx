import { userWorkStatusFilter } from '../filters/user-work-status.filter.ts';

export const usersTableColumnsConst = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Work status',
    accessorKey: 'workStatus',
    Cell: ({ cell }) => {
      const filteredCell = userWorkStatusFilter(cell.getValue());
      return <span>{ filteredCell ? filteredCell.title : cell.getValue() }</span>
    },
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
  {
    header: 'Salary $',
    accessorKey: 'salary',
  },
  {
    header: 'Position',
    accessorKey: 'position.title',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Vacation days',
    accessorKey: 'vacationDays',
  },
  {
    header: 'Sick leave days',
    accessorKey: 'sickLeaveDays',
  },
  {
    header: 'Registered',
    accessorKey: 'createDate',
  },
  {
    header: 'Updated',
    accessorKey: 'updateDate',
  },
];
