
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer';
const LayoutDrawers = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name='index'
                    options={{
                        title: "Home"
                    }}
                />
                <Drawer.Screen
                    name='product'
                    options={{
                        title:"Product"
                    }}
                    />
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default LayoutDrawers