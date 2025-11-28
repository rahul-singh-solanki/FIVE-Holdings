import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


interface FilterProps {
  items: string[]
  onPress: (item: string) => void
}

const Filter: React.FC<FilterProps> = ({ items, onPress }) => {
  return (
    <View style={styles.container}>
      {items.map(item => (
        <TouchableOpacity key={item} onPress={() => onPress(item)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
})

export default Filter
