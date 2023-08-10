import api from '../services/axiosInstance.ts';
import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../types/user.ts';

class UsersStore {
  users: IUser[] | null = null;
  total: number = 0;
  perPage: number | null = null;
  skip: number = 0;

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
    this.skip = newSkip;
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
      const res = await api.get(`/user?limit=${this.perPage}${this.skip ? '&skip=' + this.skip : ''}`);
      this.setUsers(res?.data.data);
      this.setTotal(res?.data.total);
    } catch (e) {
      throw new Error();
    }
  }
}

export default new UsersStore();