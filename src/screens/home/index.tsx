import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native'
import type { ListRenderItem, TextInputChangeEvent } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

import Product from 'components/Product'
import useProductList from 'hooks/useProductList'
import { StackNavigationProp, StackScreen } from 'types/RootStackParams'
import useDebounce from 'hooks/useDebounce'


type HomeProps = {}
type HomeScreen = React.FC<HomeProps & StackNavigationProp<StackScreen.HOME>>
type onChangeEvent = (text: string) => void

const Home: HomeScreen = () => {
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('')
  const { data, isLoading, isError, error, isFetching, isRefetching, isFetchingNextPage, hasNextPage, refetch, fetchNextPage } = useProductList(10)

  console.log(`[${new Date().toISOString()}] Rahul: hasNextPage`, hasNextPage)

  const onTextChange = useDebounce<onChangeEvent>(useCallback<onChangeEvent>((text) => {
    console.log(`[${new Date().toISOString()}] Rahul: text`, text)
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
    if (searchText) {
      return data.pages.flatMap(page => 
        page.products.filter(product => 
          product.title.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    }
    return data.pages.flatMap(page => page.products)
  }, [data, searchText])
  
  const renderItem = useCallback<ListRenderItem<Product>>(({ item }) => <Product product={item} />, [])

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
      <FlatList
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
