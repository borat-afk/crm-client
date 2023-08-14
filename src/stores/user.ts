import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../types/user.ts';
import { updatableUserFields } from '../constants/updatable-user-fields.ts';
import api from '../services/axiosInstance.ts';

class UserStore {
    user: IUser | null = null;

    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action,
        })
    }

    setUser(value: IUser) {
        this.user = value;
    }

    getUser(): IUser | null {
        return this.user;
    }

    async getUserData(userId: number) {
        if (!userId) return;

        try {
            const res = await api.get(`/user/${userId}`);
            this.setUser(res?.data);
        } catch (e) {
            throw new Error()
        }
    }

    async updateUserSkills(skills: number[], anyUserId?: number) {
        const userId = anyUserId || localStorage.getItem('user_id');

        if (!userId) return;

        try {
            await api.patch(`/user/skills/${userId}`, { skills });
        } catch (e) {
            throw new Error();
        }
    }

    async updatePermissions(permissions: number[], anyUserId?: number) {
        const userId = anyUserId || localStorage.getItem('user_id');
        if (!userId) return;

        try {
            await api.patch(`/user/permissions/${userId}`, { permissions });
        } catch (e) {
            throw new Error();
        }
    }

    async updateUserStatus(statusId: number, anyUserId?: number) {
        try {
            const userId = anyUserId || localStorage.getItem('user_id');
            await api.patch(`/user/status/${userId}`, { newStatus: statusId })
        } catch (e) {
            throw new Error();
        }
    }

    async setStartWorkDate(date: Date, anyUserId?: number) {
        try {
            const userId = anyUserId || localStorage.getItem('user_id');
            await api.post(`/user/work-date/${userId}`, { date });
        } catch (e) {
            throw new Error();
        }
    }

    async updateUserData(userData: IUser, anyUserId?: number) {
        const userId = anyUserId || localStorage.getItem('user_id');

        if (!userId) return;

        try {
            const payload: Record<string, any> = {};
            updatableUserFields.forEach(field => {
                payload[field as keyof IUser] = userData[field as keyof IUser]
            })
            await api.put(`/user/${userId}`, {...payload});
        } catch (e) {
            throw new Error();
        }
    }
}

export default new UserStore();