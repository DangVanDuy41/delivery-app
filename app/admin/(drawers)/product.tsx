import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useQueries } from '@tanstack/react-query'
import ProductService from '@/services/ProductService'
import Loading from '@/components/Loading'
import ProductItem from '@/components/ProductItem'
import CategoryService from '@/services/CategoryService'
import { API } from '@/constants/constains'
import Category from '@/components/Category'
import { Product } from '@/types/Product'
import ModalConfirm from '@/components/ModalConfirm'



const ProductComponent = () => {

    const [active, setActive] = useState<string>("All");
    const [products, setProducts] = useState<Product[]>([]);
    const [openConfirm,setOpenConfirm] = useState<boolean>(false);
    const data = useQueries({
        queries: [

            {
                queryKey: ['categories'],
                queryFn: () => CategoryService.getList(API.CATEGORY.GET_LIST_CATEGORIES),
            },
            {
                queryKey: ['product', active],
                queryFn: () => active === "All"
                    ? ProductService.getListProductByStore()
                    : ProductService.getListProductByCatogory(active),
                staleTime: 50 * 1000,
                gcTime: 1000,
            }
        ]
    });

    const categoriesQuery = data[0];
    const productByCategoryQuery = data[1];


    const handleActiveCategory = (id: string) => {
        setActive(id);
    }
    useEffect(() => {
        if (productByCategoryQuery.data) {
            setProducts(productByCategoryQuery.data)
        }

    }, [productByCategoryQuery.data])

    const handleConfirm = (active:boolean) =>{
        setOpenConfirm(active)
    }
    const handleButton = () => {
        router.push('/admin/(modal)')
    }
    useEffect(()=>{
        console.log(active)
    },[])
    
    return (

        <View className='flex-1'>
            {productByCategoryQuery.isLoading && <Loading />}
             <ModalConfirm openConfirm={openConfirm}  handleConfirm ={handleConfirm}/> 
            <View className='flex-row p-4 items-center justify-between'>
                <View className='w-[80%] border rounded-xl p-2 bg-white flex-row items-center'>
                    <Ionicons size={30} name='search' />
                    <TextInput className='w-full ml-3 text-base' placeholder='search' />
                </View>
                <TouchableOpacity className='p-4 rounded-xl bg-black' onPress={handleButton}>
                    <Text className='text-white  font-bold'>Thêm</Text>
                </TouchableOpacity>
            </View>
            <View className='px-2'>
                <Category handleActiveCategory={handleActiveCategory} active={active} categories={categoriesQuery.data} />
                <FlatList
                    data={products}
                    renderItem={({ item }) => <ProductItem handleConfirm ={handleConfirm} product={item} />}
                />
            </View>
        </View>
    )
}

export default ProductComponent