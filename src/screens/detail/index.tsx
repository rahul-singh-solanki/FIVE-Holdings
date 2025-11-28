import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackNavigationProp, StackScreen } from 'types/RootStackParams'
import { useProductDetail } from 'hooks/useProductDetail'

const styles = StyleSheet.create({
  container: {},
})

interface DETAILProps {}
type DetailScreen = React.FC<DETAILProps & StackNavigationProp<StackScreen.DETAIL>>

const DETAIL: DetailScreen = ({ route }) => {
  const { productId } = route.params
  const product = useProductDetail(productId)


  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(product, null, 2)}</Text>
    </View>
  )
}

export default DETAIL
