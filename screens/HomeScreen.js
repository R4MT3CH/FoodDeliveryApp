import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon
} from "react-native-heroicons/outline";

import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity'

const HomeScreen = () => {

  const navigation = useNavigation();
  const [featuredCategories, setfeaturedCategories] = useState([])

  useLayoutEffect( ()=> {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  useEffect(()=>{
    sanityClient.fetch(
      `*[_type == "featured"] {
        ...,
        resturants[]->{
          ...,
          dishes[]->
          }
        }`
    ).then((data) =>{
      setfeaturedCategories(data)
    });
  },[])


  return (
    <SafeAreaView className="bg-white pt-2 flex-auto">
          <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
              <Image 
                source={{ uri:"https://links.papareact.com/wru"}} 
                className="h-7 w-7 bg-gray-300 p-4 rounded-full" />

            <View className="flex-1">
              <Text className="font-bold text-gray-400 text-xs">Deliver now</Text>
              <Text className="font-bold text-xl">Current Location
              <ChevronDownIcon size={20} color="#00CCBB"/>
              </Text>
            </View>

            <UserIcon size={35} color="#00CCBB"/>
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4 px-1">
          <View className="flex-row  flex-1 space-x-2 bg-gray-200 p-3">
            <MagnifyingGlassIcon color="#00CCBB"/>
            <TextInput placeholder="Restaurants and Cuisins"/>
          </View>
          <AdjustmentsVerticalIcon color="#00CCBB"/>
        </View>

        {/* body */}
        <ScrollView className="bg-neutral-200" >
           {/* categories */}
           <Categories/>
           {/* featured */}
           {featuredCategories?.map(category => (
            <FeaturedRow 
            key={category._id} 
            id={category._id}
            title={category.name} 
            description={category.short_description}/>

           ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;