import { action, makeObservable, observable } from 'mobx';
import { IPosition } from '../types/position.ts';
import api from '../services/axiosInstance.ts';

class PositionStore {
  positions: IPosition[] | null = null;
  position: IPosition | null = null;
  total: number = 0;
  perPage: number | null = null;
  skip: number = 0;

  constructor() {
    makeObservable(this, {
      positions: observable,
      position: observable,
      total: observable,
      perPage: observable,
      skip: observable,
      setPerPage: action,
      setSkip: action,
      setPositions: action,
      setPosition: action,
    })
  }

  setPerPage(newPerPage: number) {
    this.perPage = newPerPage;
  }

  setSkip(newSkip: number) {
    this.skip = newSkip;
  }

  setPositions(newPositions: IPosition[]) {
    this.positions = [...newPositions];
  }

  setPosition(newPosition: IPosition) {
    this.position = newPosition;
  }

  setTotal(newTotal: number) {
    this.total = newTotal;
  }

  getPositions(): IPosition[] | null {
    return this.positions;
  }

  getTotal(): number {
    return this.total;
  }

  async createPosition(positionTitle: string) {
    try {
      const body = { title: positionTitle };
      await api.post('/position', body);
    } catch (e) {
      throw new Error();
    }
  }

  async fetchPositions() {
    try {
      const res = await api.get(`/position${this.perPage ? '?limit=' + this.perPage : ''}${this.skip ? '&skip=' + this.skip : ''}`);
      this.setPositions(res?.data.data);
      this.setTotal(res?.data.total);
    } catch (e) {
      throw new Error();
    }
  }
}

export default new PositionStore();
