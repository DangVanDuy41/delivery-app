import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Auth, AuthResponse, ROLE } from '@/constants/constains';
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
    onLogin: (auth: Auth) => void;
    onLogout: () => void;
}

export const AuthContext = createContext<PropsContext>({
    authState: initialAuthState,
    userID: "",
    onLogin: (auth: Auth) => { },
    onLogout: () => { }
})


const AuthProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);
    const [userID, setUserID] = useState<string>("");

    const { mutateAsync } = useMutation({
        mutationFn: (auth: Auth) => AuthService.login(auth),
    })

    const handleLogin = async (auth: Auth) => {
        const reponse = await mutateAsync(auth);
        setAuthState({
            accessToken: reponse.accessToken,
            role: reponse.role,
            isAuthenticated: true
        });
        setUserID(reponse.userID);
        await SecureStore.setItemAsync("accessToken", reponse.accessToken);
    }

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        setAuthState(initialAuthState)
    }

    useEffect(() => {
        const loadToken = async () => {
            const accessToken = await SecureStore.getItemAsync("accessToken");
            if (accessToken) {
                setAuthState((prevState) => ({
                    ...prevState,
                    accessToken,
                    isAuthenticated: true,
                }));
            }
        }
        loadToken();
    }, [])

    useEffect(() => {
        console.log(authState.isAuthenticated);
        if (authState.isAuthenticated) {

            router.replace('/user')
        } else {
            router.replace("/")
        }

    }, [authState.isAuthenticated])

    const value = {
        authState,
        userID,
        onLogin: handleLogin,
        onLogout: handleLogout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider


