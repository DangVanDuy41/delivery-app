
export enum ROLE {
    USER = "ROLE_USER",
    ADMIN = "ROLE_ADMIN"
}

export type AuthLogin = {
    username: string,
    password: string
}

export type AuthRegister = {
    fullName: string,
    email: string,
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


export const  API  ={
    LOGIN : "/auth/login",
    REGISTER : "/auth/register",
    CATEGORY : {
        GET_LIST_CATEGORIES : "/api/categories/public"
    },
    PRODUCT:{
        CREATE:"/api/products/admin",
        GET_LIST_BY_STORE:'/api/products/admin/get-list-product-by-store',
        GET_LIST_BY_CATEGORY:'/api/products/public/get-list-product-by-category'
    }

}