import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import type { ListRenderItem, TextInputChangeEvent } from 'react-native'
import { scale } from 'react-native-size-matters'

import Product from 'components/Product'
import useProductList from 'hooks/useProductList'
import { StackNavigationProp, StackScreen } from 'types/RootStackParams'
import useDebounce from 'hooks/useDebounce'
import Filter from 'components/Filter'
import Animated from 'react-native-reanimated'

type HomeProps = {}
type HomeScreen = React.FC<HomeProps & StackNavigationProp<StackScreen.HOME>>
type onChangeEvent = (text: string) => void

const CATEGORY = ["beauty", "fragrances", "furniture", "groceries"]

const Home: HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { data, isLoading, isError, error, isFetching, isRefetching, isFetchingNextPage, hasNextPage, refetch, fetchNextPage } = useProductList(selectedCategory, 10)

  const onTextChange = useDebounce<onChangeEvent>(useCallback<onChangeEvent>((text) => {
    setSearchText(text)
  }, []), 500)
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (e: TextInputChangeEvent) => onTextChange(e.nativeEvent.text),
      },
    })
    return () => {
      navigation.setOptions({
        headerSearchBarOptions: undefined,
      })
    }
  }, [navigation, onTextChange])

  const products = useMemo(() => {
    if (!data) return []
    if (searchText.length > 0) {
      return data.pages.flatMap(page => 
        page.products.filter(product => 
          product.title.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    }
    return data.pages.flatMap(page => page.products)
  }, [data, searchText])

  const onPress = useCallback((productId: number) => {
    navigation.navigate(StackScreen.DETAIL, { productId })
  }, [navigation])
  
  const renderItem = useCallback<ListRenderItem<Product>>(({ item, index }) => <Product index={index} product={item} onPress={onPress}  />, [onPress])

  const itemSeparator = useCallback(() => <View style={styles.itemSeparator} />, [])

  const listFooterComponent = useMemo(() => (
    <ActivityIndicator animating={isFetching} size='large' />
  ), [isFetching])

  const keyExtractor = useCallback((item: Product) => item.id.toString(), [])

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      {isLoading && (
        <Text>Loading...</Text>
      )}
      {isError && (
        <Text>Error: {error instanceof Error ? error.message : 'Something went wrong'}</Text>
      )}
      <Filter items={CATEGORY} onPress={setSelectedCategory} />
      <Animated.FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={listFooterComponent}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  itemSeparator: { 
    height: scale(16) 
  },
  contentContainer: {
    padding: scale(16),
    paddingBottom: scale(32),
  }
})

export default Home
