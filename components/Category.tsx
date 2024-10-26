import { View, Text, ScrollView } from 'react-native'
import React, { Dispatch } from 'react'
import { Category } from '@/types/Category'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    categories: Category[] | undefined
    handleActiveCategory : (id:string) => void
    active:string
}

const CategoryComponent = ({ categories,handleActiveCategory, active}: Props) => {

    return (
        <View className='my-3'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity className='p-3  px-6 ml-2 bg-black rounded-2xl' onPress={()=>handleActiveCategory("All")}>
                    <Text className='text-white font-semibold'>Tất cả</Text>
                </TouchableOpacity>
                {categories?.map(category => (
                    <TouchableOpacity key={category.id} onPress={()=>handleActiveCategory(category.id)} className='p-3  px-6 ml-2 bg-black rounded-2xl'>
                        <Text className='text-white font-semibold'>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

    )
}

export default CategoryComponent