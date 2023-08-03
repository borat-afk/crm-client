import { makeObservable, observable, action } from 'mobx';
import api from '../services/axiosInstance.ts';
import axiosInstance from "../services/axiosInstance.ts";

interface IReqPayload {
  email: string,
  phone?: string,
  password: string
}

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
      setEmail: action,
      setPhone: action,
      setPassword: action,
      setApiKey: action,
    })
  }

  setEmail(value: string) {
    this.email = value
  }

  setPhone(value: string) {
    this.phone = value
  }

  setPassword(value: string) {
    this.password = value
  }

  setApiKey(value: string) {
    this.apiKey = value
  }

  async handleRegistration() {
    if (!this.email || !this.password) return;

    try {
      const data: IReqPayload = {
        email: this.email,
        password: this.password,
      }

      if (this.phone) data.phone = this.phone;

      const res = await api.post('/auth/registration', data);

      if (res.data.token) {
        this.setToken(res.data.token, res.data.userId);
      }
    } catch (e) {
      throw new Error()
    }
  }

  async handleAdminRegistration() {
    if (!this.email || !this.password || !this.apiKey) return;

    try {
      const body: IReqPayload = {
        email: this.email,
        password: this.password,
      }

      if (this.phone) body.phone = this.phone;

      const res = await api.post('/auth/admin-registration', body, {
        headers: {
          'Api-Key': this.apiKey
        }
      });

      if (res.data.token) {
        this.setToken(res.data.token, res.data.userId);
      }
    } catch (e) {
      throw new Error();
    }
  }

  setToken(token: string, userId: number) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_id', userId.toString());
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
    window.location.href = '/home';
  }
}