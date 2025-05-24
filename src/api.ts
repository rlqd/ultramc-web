
async function getJson<T>(path: string): Promise<T> {
    const resp = await fetch(path);
    if (!resp.ok) {
        throw new Error('Сервер недоступен');
    }
    return await resp.json() as T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function postJson<T>(path: string, data: any = {}): Promise<T> {
    const resp = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!resp.ok) {
        throw new Error('Не удалось выполнить запрос');
    }
    return await resp.json() as T;
}

async function postForm<T>(path: string, data: Record<string, string | Blob>): Promise<T> {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    const resp = await fetch(path, {
        method: 'POST',
        body: formData,
    });
    if (!resp.ok) {
        throw new Error('Не удалось выполнить запрос');
    }
    return await resp.json() as T;
}

const api = {
    status: () => getJson<StatusResponse>('/api/web/status.php'),
    login: (req: AuthenticateRequest) => postJson<AuthenticateResponse>('/api/web/login.php', req),
    logout: () => postJson<SuccessResponse>('/api/web/logout.php'),
    changePassword: (req: ChangePasswordRequest) => postJson<GenericResponse>('/api/web/change-password.php', req),
    linkMojang: (req: LinkMojangRequest) => postJson<LinkMojangResponse>('/api/web/link-mojang.php', req),
    uploadSkin: (req: UploadSkinRequest) => postForm<UpdateSkinResponse>('/api/web/update-skin.php', req),
    selectSkin: (req: SelectSkinRequest) => postForm<UpdateSkinResponse>('/api/web/update-skin.php', req),
};
export default api;

export interface SkinData {
    id: string,
    url: string,
    selected: boolean,
}

export interface UserData {
    id: string,
    name: string,
    mojangUUID: string|null,
    privileges: Record<string, boolean>,
    passwordResetRequired: boolean,
    skins: SkinData[],
}

type SuccessResponse = {
    success: true,
}
type ErrorResponse = {
    success: false,
    error: string,
};

export type GenericResponse = SuccessResponse | ErrorResponse;

export type AuthenticateRequest = {
    username: string,
    password: string,
};

export type AuthenticateResponse = {
    success: true,
    user: UserData,
} | ErrorResponse;

export type StatusResponse = {
    loggedIn: true,
    user: UserData,
} | { loggedIn: false };

export type ChangePasswordRequest = {
    old_password?: string,
    new_password: string,
    new_password_repeat: string,
};

export type LinkMojangRequest = {
    mojang_username: string,
};

export type LinkMojangResponse = {
    success: true,
    mojangUUID: string,
} | ErrorResponse;

export type UploadSkinRequest = {
    skin: Blob,
};

export type SelectSkinRequest = {
    skinId: string,
} | {
    deselect: '1',
};

export type UpdateSkinResponse = {
    success: true,
    skin: SkinData,
} | {
    success: false,
    error: string,
};
