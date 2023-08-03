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
      password: observable,
      isPending: observable,
      setEmail: action,
      setPassword: action,
      handleLogin: action,
    })
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  async handleLogin() {
    if (!this.email || !this.password) return;

    try {
      const data = {
        email: this.email,
        password: this.password,
      }

      const res = await api.post('/auth/login', data);

      if (res.data.token) {
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('user_id', res.data.userId.toString());
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
        window.location.href = '/home';
      }
    } catch (e) {
      return
    }
  }
}