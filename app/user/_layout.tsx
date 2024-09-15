import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Layout } from 'react-native-reanimated'

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                options={{
                    
                    title: "",
                    headerLeft: () => (
                        <TouchableOpacity>
                            <View>
                                <Text>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                name='index' />
        </Stack>
    )
}

export default _layout