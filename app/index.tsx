import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Login from '@/components/Login'
import Register from '@/components/Register'

const index = () => {
    const [active, setActive] = useState<boolean>(true);
    return (
        <View className='flex-1'>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className='flex-1'>
                <StatusBar style='light' />
                <View className='flex-1 '>
                    <View style={styles.radius} className='flex-row  bg-black justify-center pt-72  '>
                        <TouchableOpacity className='text-white mx-4' onPress={() => setActive(true)} >
                            <Text className={`p-3 bg-black text-white font-bold text-xl`}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='text-white mx-4' onPress={() => setActive(false)}>
                            <Text className={`p-3 bg-black text-white font-bold text-xl`} >Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    {active && <Login />}
                    {!active && <Register />}
                </View>

            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    radius: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50
    },

})

export default index