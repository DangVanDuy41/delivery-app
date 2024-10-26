import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import useAuth from '@/hooks/useAuth'

const Index = () => {

  const { onLogout } = useAuth();
  return (
    <>
      <Stack.Screen options={{
        title:"",
        headerLeft: () => (
          <TouchableOpacity onPress={onLogout}>
            <View>
              <Text>Logout</Text>
            </View>
          </TouchableOpacity>
        )
      }} />
      <View>
        <Text> Day la user</Text>
      </View>
    </>

  )
}

export default Index