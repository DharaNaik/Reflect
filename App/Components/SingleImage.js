import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'




export default class SingleImage extends Component {
    render() {
        console.log("CUrrent Pic ==", this.props)
        return (
            <View style={styles.container}>
            <Image source={require('../Images/grace-hopper-academy.jpg')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EF5E35',
    },

  });