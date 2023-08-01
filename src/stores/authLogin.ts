import { makeObservable, observable, action } from 'mobx';
import api from '../services/axiosInstance.ts';
import axiosInstance from "../services/axiosInstance.ts";

export class AuthLoginStore {
  email: string = '';
  phone: string = '';
  password: string = '';
  isPending: boolean = false;

  constructor() {
    makeObservable(this, {
      email: observable,
      phone: observable,
      password: observable,
      isPending: observable,
      handleLogin: action,
    })
  }

  async handleLogin() {
    if (!this.email || !this.password) return;

    try {
      const body = {
        email: this.email,
        password: this.password,
      }

      const res = await api.post('/auth/login', body);

      if (res.data.token) {
        localStorage.setItem('access_token', res.data.token);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
      }
    } catch (e) {
      throw new Error()
    }
  }
}