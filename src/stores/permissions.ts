import { observable, makeObservable, action } from 'mobx';
import { IPermission } from '../types/permission.ts';
import api from '../services/axiosInstance.ts';

class PermissionStore {
  permissions: IPermission[] = [];
  total: number = 0;
  perPage: number | null = null;
  skip: number = 0;

  constructor() {
    makeObservable(this, {
      permissions: observable,
      total: observable,
      perPage: observable,
      skip: observable,
      setPerPage: action,
      setSkip: action,
      setTotal: action,
      setPermissions: action,
    })
  }

  setPerPage(newPerPage: number) {
    this.perPage = newPerPage;
  }

  setSkip(newSkip: number) {
    this.skip = newSkip;
  }

  setPermissions(newPermissions: IPermission[]) {
    this.permissions = [...newPermissions];
  }

  setTotal(newTotal: number) {
    this.total = newTotal;
  }

  getPermissions(): IPermission[] {
    return this.permissions;
  }

  getTotal(): number {
    return this.total;
  }

  async fetchPermissions() {
    try {
      const res = await api.get(`/permission${this.perPage ? '?limit=' + this.perPage : ''}${this.skip ? '&skip=' + this.skip : ''}`);
      this.setPermissions(res.data.data);
      this.setTotal(res.data.total);
    } catch (e) {
      throw new Error();
    }
  }
}

export default new PermissionStore();