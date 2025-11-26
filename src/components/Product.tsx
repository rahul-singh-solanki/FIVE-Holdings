import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Image from '@d11/react-native-fast-image'

import { ThemeStyle } from 'theme/ThemeStyle'
import { Colors } from 'theme/Colors'
import Tag from './Tag'
import { scale } from 'react-native-size-matters'

interface ProductProps {
  product: Product
}

const Product: React.FC<ProductProps> = props => {
  const { title, description, price, availabilityStatus, shippingInformation, tags, thumbnail } = props.product
  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={{ flexDirection: 'row', gap: scale(4) }}>
          {tags.map(tag => (
            <Tag key={tag}><Text style={styles.tag}>{tag}</Text></Tag>
          ))}
        </View>
        <Text style={styles.price}>Price: ${price}</Text>
        <Text>{availabilityStatus} | {shippingInformation}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(8),
    flexDirection: 'row',
    backgroundColor: Colors.background.default,
    elevation: 2,
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100 
  },
  content: {
    ...ThemeStyle.flexGrowCenter,
    flex: 1,
    gap: scale(4),
    padding: 8
  },
  title: {
    ...ThemeStyle.h3bold
  },
  description: {
    ...ThemeStyle.h6semibold,
  },
  tag: {
    ...ThemeStyle.h7,
    color: Colors.text.default
  },
  price: {
    ...ThemeStyle.h3bold,
  }
})

export default Product
