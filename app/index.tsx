import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useAuth from '@/hooks/useAuth';



const Index = () => {
    const { onLogin } = useAuth();
    const [username, setUsername] = useState<string>("dangvanduy4103@gmail.com");
    const [password, setPassword] = useState<string>("123");

    return (
        <View className='flex-1 '>
            <View className='flex-1 justify-center items-center bg-gray-100 '>
                <View className='p-5 bg-white shadow-md w-[350px] rounded-xl '>
                    <TextInput
                        value={username}
                        onChangeText={(username) => setUsername(username)}
                        placeholder='username'
                        className='mb-4 p-4 text-lg border border-gray-300 '
                    />
                    <TextInput
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry
                        placeholder='password'
                        className='p-4 border text-lg border-gray-300 rounded'
                    />
                    <TouchableOpacity className=' w-[50%] m-auto mt-4 ' onPress={() => onLogin({ username, password })}>
                        <View className='bg-black p-3 rounded-xl'>
                            <Text className='text-white text-center font-bold text-xl'>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Index