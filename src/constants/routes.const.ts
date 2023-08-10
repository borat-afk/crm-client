import { RoutesEnum } from '../enums/routes.enum.ts';

interface IRoute {
  path: RoutesEnum,
  title: string
}

export const routesConst: IRoute[] = [
  {
    path: RoutesEnum.Home,
    title: 'Home'
  },
  {
    path: RoutesEnum.AccountSettings,
    title: 'Account Settings'
  },
  {
    path: RoutesEnum.Users,
    title: 'Users'
  },
  {
    path: RoutesEnum.User,
    title: 'User'
  },
  {
    path: RoutesEnum.Positions,
    title: 'Positions'
  },
  {
    path: RoutesEnum.Skills,
    title: 'Skills'
  },
  {
    path: RoutesEnum.Permissions,
    title: 'Permissions'
  },
  {
    path: RoutesEnum.Forbidden,
    title: 'Access denied'
  }
]