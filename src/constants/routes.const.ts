import {RoutesEnum} from '../enums/routes.enum.ts';

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
  }
]