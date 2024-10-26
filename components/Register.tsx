import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import useAuth from '@/hooks/useAuth';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AuthRegister } from '@/constants/constains';
const Register = () => {

    const { onRegister } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");

    const handleRegister = (authRegister: AuthRegister) => {
        if (email && password && email) {
            onRegister(authRegister)
        } else {
            ToastAndroid.show('Vui lòng nhập đủ thông tin', ToastAndroid.SHORT);
        }

    }
    return (
        <View className='flex-1 '>
            <Text className='text-center text-4xl  p-6'>Đăng ký tài khoản</Text>
            <View className='justify-center items-center '>
                <View className='w-full p-3 gap-10'>
                    <View className='flex-row p-3 border '>
                        <FontAwesome name="user" size={30} color="black" />
                        <TextInput
                            value={fullName}
                            keyboardType='email-address'
                            onChangeText={(fullName) => setFullName(fullName)}
                            placeholder='Full Name'
                            className='ml-3 text-xl flex-1'
                        />
                    </View>
                    <View className='flex-row p-3 border '>
                        <MaterialIcons name="email" size={30} color="black" />
                        <TextInput
                            value={email}
                            keyboardType='email-address'
                            onChangeText={(email) => setEmail(email)}
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

                    <TouchableOpacity onPress={() => handleRegister({ fullName, email, password })}>
                        <View className='bg-black p-3 rounded-3xl'>
                            <Text className='text-white text-center font-bold text-xl'>Đăng ký</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Register