import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useAuth from '@/hooks/useAuth';
import {  MaterialIcons } from '@expo/vector-icons';
const Login = () => {

    const { onLogin } = useAuth();
    const [username, setUsername] = useState<string>("dangvanduy4103@gmail.com");
    const [password, setPassword] = useState<string>("123");

    return (
        <View className='flex-1 '>
            <Text className='text-center text-4xl  p-6'>Đăng nhập</Text>
            <View className='justify-center items-center '>
                <View className='w-full p-3 gap-10'>
                    <View className='flex-row p-3 border '>
                        <MaterialIcons name="email" size={30} color="black" />
                        <TextInput
                            value={username}
                            keyboardType='email-address'
                            onChangeText={(username) => setUsername(username)}
                            placeholder='Email'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>
                    <View className='flex-row p-3 border'>
                        <MaterialIcons name="password" size={30} color="black" />
                        <TextInput
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry
                            placeholder='Password'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>

                    <TouchableOpacity onPress={() => onLogin({ username, password })}>
                        <View className='bg-black p-3 rounded-3xl'>
                            <Text className='text-white text-center font-bold text-xl'>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Login