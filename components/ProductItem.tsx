import { View, Text, Image } from 'react-native'
import React from 'react'
import { Product } from '@/types/Product'
import { formatCurrency } from '@/utils/format'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'

interface Props {
  product: Product
  handleConfirm:(active:boolean)=>void
}

const ProductItem = ({ product,handleConfirm }: Props) => {
  return (
    <View>
      <TouchableOpacity className='px-4 my-3 '>
        <View className='flex-row items-center p-4 bg-white rounded-xl'>
          <View className=' w-[100] h-[100] ' >
            <Image className='h-full w-full rounded-lg' source={{ uri: `data:image/png;base64,${product.image}` }} />
          </View>
          <View className=' flex-1 ml-4 flex-col'>
            <Text className='text-xl font-semibold'>{product.name}</Text>
            <Text className='py-2'>{product.description}</Text>
            <View className='flex-row items-center gap-3'>
              <Text className='text-red-500 font-bold text-base'>{formatCurrency(product.price)}</Text>
              <Text>{product.rating} ⭐</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity  className='p-2 my-2'>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleConfirm(true)} className='p-2 my-2'>
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>

  )
}

export default ProductItem