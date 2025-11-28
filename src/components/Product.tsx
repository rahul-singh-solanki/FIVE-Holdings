import React, { useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Image from '@d11/react-native-fast-image'

import { ThemeStyle } from 'theme/ThemeStyle'
import { Colors } from 'theme/Colors'
import Tag from './Tag'
import { scale } from 'react-native-size-matters'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

interface ProductProps {
  product: Product
  index: number
  onPress?: (productId: number) => void
}

const Button = Animated.createAnimatedComponent(TouchableOpacity)

const Product: React.FC<ProductProps> = props => {
  const { id, title, description, price, category, availabilityStatus, shippingInformation, tags, thumbnail } = props.product
  const animatedValue = useSharedValue(100)

  useEffect(() => {
    animatedValue.value = withDelay(props.index * 100, withTiming(0, { duration: 500 }))
  }, [animatedValue, props.index])

  const onPress = useCallback(() => {
    props.onPress?.(id)
  }, [props, id])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...styles.container,
      top: animatedValue.value
    }
  })

  return (
    <Button style={animatedStyle} onPress={onPress}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.tagContainer}>
          {tags.map(tag => (
            <Tag key={tag}><Text style={styles.tag}>{tag}</Text></Tag>
          ))}
        </View>
        <Text style={styles.description}>{category}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
        <Text>{availabilityStatus} | {shippingInformation}</Text>
      </View>
    </Button>
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
  tagContainer: {
    flexDirection: 'row',
    gap: scale(4) 
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
