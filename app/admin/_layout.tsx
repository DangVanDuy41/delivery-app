
import React from 'react'
import { Stack } from 'expo-router'

const RootLayoutAdmin = () => {
  return (
      <Stack>
        <Stack.Screen name='(drawers)' options={{headerShown:false}}  />
        <Stack.Screen name='(modal)'  options={{headerShown:false}}  />
      </Stack>
    
  )
}

export default RootLayoutAdmin