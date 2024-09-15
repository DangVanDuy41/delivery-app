
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from '@/context/AuthProvider'
import { Slot, Stack } from 'expo-router'



const InitialLayout = () => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RootLayout />
            </AuthProvider>
        </QueryClientProvider>

    )
}

const RootLayout = () => {

    return (
        <Stack>
            <Stack.Screen name='user' options={{headerShown:false}}/>
            <Stack.Screen name='index' />
        </Stack>
    )
}
export default InitialLayout