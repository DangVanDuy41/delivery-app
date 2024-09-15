
export enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN"
}

export type Auth = {
    username: string,
    password: string
}

export type AuthResponse = {
    userID: string,
    accessToken: string,
    role: ROLE,
}
export type ApiResponse<T> = {
    message: string,
    data: T,
    time: Date
}


export const enum API {
    LOGIN = "/auth/login"
}