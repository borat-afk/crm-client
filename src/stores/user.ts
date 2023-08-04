import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../types/user.ts';
import { IUpdateUserArg } from '../types/updateUserArg.ts';
import api from '../services/axiosInstance.ts';

class User {
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

    async getUserData() {
        const userId = localStorage.getItem('user_id');

        if (!userId) return;

        try {
            const res = await api.get(`/user/${userId}`);
            this.setUser(res?.data);
        } catch (e) {
            throw new Error()
        }
    }

    async updateUserData(fields: IUpdateUserArg) {
        const userId = localStorage.getItem('user_id');

        if (!userId) return;

        try {
            const payload = Object.entries(fields).reduce((total, item) => {
                if (item[1]) total[item[0]] = item[1];
                return total;
            }, {})

            await api.put(`/user/${userId}`, {...payload});
        } catch (e) {
            throw new Error();
        }
    }
}

export default new User();