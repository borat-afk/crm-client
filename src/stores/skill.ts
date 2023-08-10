import { observable, action, makeObservable } from 'mobx';
import { ISkill } from '../types/skill.ts';
import api from '../services/axiosInstance.ts';

class SkillStore {
  skills: ISkill[] | null = null;
  skill: ISkill | null = null;
  total: number = 0;
  perPage: number | null = null;
  skip: number = 0;


  constructor() {
    makeObservable(this, {
      skills: observable,
      total: observable,
      skill: observable,
      perPage: observable,
      skip: observable,
      setSkill: action,
      setTotal: action,
      setSkills: action,
    })
  }

  setPerPage(newPerPage: number) {
    this.perPage = newPerPage;
  }

  setSkip(newSkip: number) {
    this.skip = newSkip;
  }

  setSkills(newSkills: ISkill[]) {
    this.skills = [...newSkills];
  }

  setTotal(newTotal: number) {
    this.total = newTotal;
  }

  setSkill(newSkill: ISkill) {
    this.skill = newSkill;
  }

  getSkills() {
    return this.skills;
  }

  getSkill() {
    return this.skill;
  }

  getTotal() {
    return this.total
  }

  async fetchSkills() {
    try {
      const res = await api.get(`/skill${this.perPage ? '?limit=' + this.perPage : ''}${this.skip ? '&skip=' + this.skip : ''}`);
      this.setSkills(res?.data.data);
      this.setTotal(res?.data.total);
    } catch (e) {
      throw new Error();
    }
  }

  async createSkill(skillName: string) {
    try {
      const body = { name: skillName };
      await api.post('/skill', body);
    } catch (e) {
      throw new Error();
    }
  }

  async updateSkill(skillId: number, newName: string) {
    try {
      const body = { name: newName };
      await api.put(`/skill/${skillId}`, body);
    } catch (e) {

    }
  }

  async getSkillById(id: number) {
    try {
      const res = await api.get(`/skill/${id}`);
      this.setSkill(res.data);
    } catch (e) {
      throw new Error();
    }
  }
}

export default new SkillStore();