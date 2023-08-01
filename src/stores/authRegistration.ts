import { makeObservable, observable, action } from 'mobx';
import api from '../services/axiosInstance.ts';
import axiosInstance from "../services/axiosInstance.ts";

export class AuthRegistrationStore {
  email: string = '';
  phone: string = '';
  password: string = '';
  apiKey: string = '';
  isPending: boolean = false;

  constructor() {
    makeObservable(this, {
      email: observable,
      phone: observable,
      password: observable,
      isPending: observable,
      apiKey: observable,
      handleRegistration: action,
    })
  }

  async handleRegistration() {
    if (!this.email || !this.password) return;

    try {
      const body: { email: string, phone?:string, password: string } = {
        email: this.email,
        password: this.password,
      }

      if (this.phone) body.phone = this.phone;

      const res = await api.post('/auth/registration', body);

      if (res.data.token) {
        this.setToken(res.data.token);
      }
    } catch (e) {
      throw new Error()
    }
  }

  async handleAdminRegistration() {
    if (!this.email || !this.password || !this.apiKey) return;

    try {
      const body: { email: string, phone?:string, password: string } = {
        email: this.email,
        password: this.password,
      }

      if (this.phone) body.phone = this.phone;

      const res = await api.post('/auth/registration', body, {
        headers: {
          'Api-Key': this.apiKey
        }
      });

      if (res.data.token) {
        this.setToken(res.data.token);
      }
    } catch (e) {
      throw new Error();
    }
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}