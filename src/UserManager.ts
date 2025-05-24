import { useState } from "react";
import api from "./api";
import type { ChangePasswordRequest, UserData } from "./api";

export function useUserManager(): UserManager {
    const [data, setData] = useState<UserData|null>();
    return new UserManager(data, setData);
}

export default class UserManager {
    constructor(
        private data: UserData|null|undefined,
        private updateData: (data: UserData|null) => void,
    ) {}

    public get isLoading() {
        return this.data === undefined;
    }

    public get isLoggedIn() {
        return !!this.data;
    }

    public get selectedSkin() {
        return this.data?.skins?.find(s => s.selected);
    }

    public get userData(): UserData {
        if (!this.data) {
            throw new Error('User data is not available');
        }
        return this.data;
    }

    async init(): Promise<void> {
        if (this.data !== undefined) {
            return;
        }
        const resp = await api.status();
        if (resp.loggedIn) {
            this.updateData(resp.user);
        } else {
            this.updateData(null);
        }
    }

    async authenticate(username: string, password: string): Promise<void> {
        const resp = await api.login({username, password});
        if (resp.success) {
            this.updateData(resp.user);
        } else {
            throw new Error(resp.error);
        }
    }

    async logout(): Promise<void> {
        await api.logout();
        this.updateData(null);
    }

    async changePassword(newPassword: string, newPasswordRepeat: string, oldPassword: string|null = null): Promise<void> {
        const req: ChangePasswordRequest = {
            new_password: newPassword,
            new_password_repeat: newPasswordRepeat,
        };
        if (oldPassword !== null) {
            req.old_password = oldPassword;
        }
        const resp = await api.changePassword(req);
        if (!resp.success) {
            throw new Error(resp.error);
        }
        if (this.data?.passwordResetRequired) {
            const newData = {...this.data} as UserData;
            newData.passwordResetRequired = false;
            this.updateData(newData);
        }
    }

    async linkMojang(mojangUsername: string): Promise<void> {
        const resp = await api.linkMojang({mojang_username: mojangUsername});
        if (!resp.success) {
            throw new Error(resp.error);
        }
        if (this.data?.mojangUUID != resp.mojangUUID) {
            const newData = {...this.data} as UserData;
            newData.mojangUUID = resp.mojangUUID;
            this.updateData(newData);
        }
    }

    async uploadSkin(file: Blob): Promise<void> {
        const resp = await api.uploadSkin({skin: file});
        if (!resp.success) {
            throw new Error(resp.error);
        }
        const newData = {...this.data} as UserData;
        newData.skins.forEach(s => s.selected = false);
        newData.skins.push(resp.skin);
        this.updateData(newData);
    }

    async selectSkin(skinId?: string): Promise<void> {
        const resp = await api.selectSkin(skinId ? {skinId} : {deselect: '1'});
        if (!resp.success) {
            throw new Error(resp.error);
        }
        const newData = {...this.data} as UserData;
        newData.skins.forEach(s => s.selected = s.id == skinId);
        this.updateData(newData);
    }
}
