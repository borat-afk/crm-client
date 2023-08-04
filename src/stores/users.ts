import api from '../services/axiosInstance.ts';
import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../types/user.ts';

class UsersStore {
  users: IUser[] | null = null;

  constructor() {
    makeObservable(this, {
      users: observable,
      setUsers: action
    })
  }

  setUsers(usersList: IUser[]) {
    this.users = [...usersList];
  }

  getUsers(): IUser[] | null {
    return this.users;
  }

  async fetchUsers() {
    try {
      const res = await api.get('/user');
      this.setUsers(res?.data);
    } catch (e) {
      throw new Error();
    }
  }
}

export default new UsersStore();