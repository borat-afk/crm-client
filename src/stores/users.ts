import api from '../services/axiosInstance.ts';
import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../types/user.ts';

class UsersStore {
  users: IUser[] | null = null;
  total: number = 0;
  perPage: number | null = null;
  skip: number | null = null;

  constructor() {
    makeObservable(this, {
      users: observable,
      total: observable,
      perPage: observable,
      skip: observable,
      setPerPage: action,
      setSkip: action,
      setUsers: action
    })
  }

  setPerPage(newPerPage: number) {
    this.perPage = newPerPage;
  }

  setSkip(newSkip: number) {
    this.skip = this.perPage? newSkip * this.perPage : null;
  }

  setUsers(usersList: IUser[]) {
    this.users = [...usersList];
  }

  setTotal(newTotal: number) {
    this.total = newTotal;
  }

  getUsers(): IUser[] | null {
    return this.users;
  }

  getTotal(): number {
    return this.total;
  }

  async fetchUsers() {
    try {
      // limit skip
      const paginationQuery = `?limit=${this.perPage}&skip=${this.skip}`
      const res = await api.get(`/user${this.perPage && this.skip ? paginationQuery : '' }`);
      this.setUsers(res?.data.data);
      this.setTotal(res?.data.total);
    } catch (e) {
      throw new Error();
    }
  }
}

export default new UsersStore();