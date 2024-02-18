import { View, Text, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../sanity'

const Categories = () => {

  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    sanityClient.fetch(
      `*[_type == "category"]`
    ).then((data)=>{
      setCategories(data)
    });
  },[])


  return (
    <ScrollView 
    contentContainerStyle={{paddingContainerStyle: 15, paddingTop: 10}} 
    horizontal 
    showsHorizontalScrollIndicato={false}>

        {/* Category Card */}
        {categories.map((category)=>(
          <CategoryCard key={category._id} imgUrl={urlFor(category.image).width(200).url()} title={category.title}/>
        ))}
    </ScrollView>
  )
}

export default Categories