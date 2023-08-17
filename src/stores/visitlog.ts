import { observable, makeObservable, action } from 'mobx';
import { IVisitlog } from '../types/visitlog.ts';
import { IDate } from '../types/date.ts';
import { VisitStatus } from '../enums/visit-status.enum.ts';
import api from '../services/axiosInstance.ts';

class VisitlogStore {
  visitlogList: IVisitlog[] = [];
  visitlog: IVisitlog | null = null;

  constructor() {
    makeObservable(this, {
      visitlogList: observable,
      visitlog: observable,
      setVisitlog: action,
    })
  }

  setVisitlog(newVisitlog: IVisitlog) {
    this.visitlog = newVisitlog;
  }

  async getVisitlogList(date: IDate) {
    try {
      const res = await api.get(`/visitlog?year=${date.year}&month=${date.month}${date.day ? '&day=' + date.day : ''}`);
      if (res.data.data) {
        this.visitlogList = [...res.data.data]
      }
    } catch (e) {
      throw new Error()
    }
  }

  async updateVisitlog(id: number, status: VisitStatus) {
    try {
      await api.patch(`/visitlog/${id}`, { status });
    } catch (e) {
      throw new Error();
    }
  }
}

export default new VisitlogStore();