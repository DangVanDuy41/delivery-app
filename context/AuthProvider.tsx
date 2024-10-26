import { Alert } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { AuthLogin, AuthRegister, ROLE } from '@/constants/constains';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/services/AuthService';
import { AuthState, initialAuthState } from '@/types/Auth';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

interface Props {
    children: React.ReactNode
}


export interface PropsContext {
    authState: AuthState,
    userID: string
    onLogin: (autLogin: AuthLogin) => void;
    onLogout: () => void;
    onRegister: (authRegister: AuthRegister) => void;
}

export const AuthContext = createContext<PropsContext>({
    authState: initialAuthState,
    userID: "",
    onLogin: (autLogin: AuthLogin) => { },
    onLogout: () => { },
    onRegister: (authRegister: AuthRegister) => { }
})


const AuthProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);
    const [userID, setUserID] = useState<string>("");

    const loginRequest = useMutation({
        mutationFn: (authLogin: AuthLogin) => AuthService.login(authLogin),
    })
    const registerRequest = useMutation({
        mutationFn: (authRegister: AuthRegister) => AuthService.register(authRegister),
    })

    const handleLogin = async (auth: AuthLogin) => {
        try {
            const response = await loginRequest.mutateAsync(auth);
            setAuthState({
                accessToken: response.accessToken,
                role: response.role,
                isAuthenticated: true
            });
            setUserID(response.userID);
            await SecureStore.setItemAsync("accessToken", response.accessToken);
            await SecureStore.setItemAsync("id",response.userID);
            await SecureStore.setItemAsync("role",response.role);
        } catch (error) {
            Alert.alert(
                'Đăng nhập thất bại',
                'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại!',
                [{ text: 'OK' }]
            );
        }
       
    }

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("id");
        await SecureStore.deleteItemAsync("role");
        setAuthState(initialAuthState)
    }

    const handleRegister = async (authRegister: AuthRegister) => {
        const response = await registerRequest.mutateAsync(authRegister);
        if (response) {
            Alert.alert(
                'Đăng ký thành công',
                'Bạn đã đăng ký tài khoản thành công!',
                [{ text: 'OK' }]
            );
        }
    }

    useEffect(() => {
        const loadToken = async () => {
            const accessToken = await SecureStore.getItemAsync("accessToken");
            const id = await SecureStore.getItemAsync("id") 
            const role = await SecureStore.getItemAsync("role") || ROLE.USER;
            if (accessToken) {
                setAuthState({
                        accessToken,
                        role,
                        isAuthenticated:true
                });
                setUserID(id ||"");
            }
        }
        loadToken();
    }, [])

    useEffect(() => {
        if (authState.isAuthenticated && authState.role === ROLE.USER) {
            router.replace('/user/')
        } else if (authState.isAuthenticated && authState.role === ROLE.ADMIN) {
            router.replace("/admin/")
        }else{
            router.replace("/")
        }
        console.log(authState.role)
    }, [authState.isAuthenticated])

    const value = {
        authState,
        userID,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onRegister:handleRegister
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider


