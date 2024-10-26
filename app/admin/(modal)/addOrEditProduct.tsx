import { View, TextInput, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { Product } from '@/types/Product'
import { useMutation, useQuery } from '@tanstack/react-query';
import CategoryService from '@/services/CategoryService';
import { API } from '@/constants/constains';
import ProductService from '@/services/ProductService';
import ToastManager, { Toast } from 'toastify-react-native';
import Loading from '@/components/Loading';
import * as ImagePicker from 'expo-image-picker';



const inputStyles = 'border bg-white rounded-xl p-3 my-3 text-lg';

const Addproduct = () => {

  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    categoryId: '',
    image: '',
    price: 0,
    description: ''
  });

  const [image, setImage] = useState<string>("")
  const handleAddProduct = () => {

    for (const key in product) {
      if (key !== 'id' && key != 'image' && !product[key as keyof Product]) {
        Toast.error(`Vui lòng nhập đầy đủ thông tin `);
        return;
      }
    }


    mutate(product);

  }

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getList(API.CATEGORY.GET_LIST_CATEGORIES),

  })
  const { mutate, isPending } = useMutation({
    mutationFn: (product: Product) => ProductService.create(API.PRODUCT.CREATE, product),
    onSuccess: () => {
      Toast.success("Thêm sản phẩm thành công");
    },
    onError: (error) => {
      console.log(error)
      Toast.error("Thêm sản  phẩm không thành công");
    }

  })

  const categories = data?.map((item) => ({
    "key": item.id,
    "value": item.name
  })) || []

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64:true
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setProduct({ ...product, image: result.assets[0].base64 || ""})
    } 
  };

  return (
    <ScrollView className='flex-1'>

      {isPending && <Loading />}

      <ToastManager
        showCloseIcon={false}
        positionValue={70}
        width={350}
        animationStyle={'rightInOut'}
        animationInTiming={700}
      />

      <View className='flex-1 items-center'>
        <TouchableOpacity onPress={pickImageAsync} className='w-72 my-10 h-72  '>
          <Image
            className='w-full  rounded-2xl h-full'
            source={ image ? {uri:image} : require('@/assets/images/imageUpload.webp')}
          />
        </TouchableOpacity>
        <View className='w-96 '>
          <TextInput
            className={inputStyles}
            placeholder='Tên sản phẩm'
            value={product.name}
            onChangeText={(name) => setProduct({ ...product, name })}
          />

          <TextInput
            className={inputStyles}
            placeholder='Mô tả'
            value={product.description}
            onChangeText={(description) => setProduct({ ...product, description })}
          />

          <TextInput
            className={inputStyles}
            placeholder='Giá'
            value={String(product.price)}
            onChangeText={(price) => setProduct({ ...product, price: Number(price) })}
          />


          <SelectList
            setSelected={(val: string) => setProduct({ ...product, categoryId: val })}
            data={categories}
            save="key"
            search={false}
            placeholder='Chọn danh mục'
            boxStyles={{
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 10

            }}
            inputStyles={{
              fontSize: 17
            }}
            dropdownStyles={{
              backgroundColor: "white"
            }}
            dropdownTextStyles={{
              fontSize: 17
            }}
          />

          <TouchableOpacity className='w-full p-4 bg-black rounded-xl my-9' onPress={handleAddProduct}>
            <Text className='text-center text-xl font-semibold text-white'>Thêm sản phẩm</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  )
}

export default Addproduct