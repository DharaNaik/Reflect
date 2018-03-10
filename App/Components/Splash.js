import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import LoginForm from './LoginForm'




export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
                    <LoginForm />
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