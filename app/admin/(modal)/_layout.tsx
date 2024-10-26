
import React from 'react'
import { Stack } from 'expo-router'

const LayoutModal = () => {
  return (
    <Stack>
      <Stack.Screen name='addOrEditProduct'
        options={{ title: "Thêm sản phẩm", }}
      />
    </Stack>
  )
}

export default LayoutModal