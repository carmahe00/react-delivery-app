import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const EmptyBagsItem = () => {
  return (
    <View
      style={styles.container}
    >

      <Image
        source={require("../../../assets/shopping_bag.png")}
        style={styles.image}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
    
  },
  image:{
    height: 100,
    width: 100
  }
})
export default EmptyBagsItem