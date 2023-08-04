import { routesConst } from '../constants/routes.const.ts';

export const routeFilter = (path: string): string | undefined => {
  return routesConst.find(route => route.path === path)?.title;
}