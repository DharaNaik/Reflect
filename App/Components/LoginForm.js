import React, { Component } from 'react'
import { Text,TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity, 
    StatusBar, StyleSheet } from 'react-native'
import FaceCamera from '../Components/Camera'


export default class LoginForm extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior='position' style={styles.container}>
                <StatusBar barStyle='light-content'/> 
                <View style={styles.logoContainer}>
                    <Text style={styles.welcome}>
                        Reflection
                    </Text>
                    <Image style={styles.logo} 
                    source={require('../Images/grace-hopper-academy.jpg')}
                    />
                </View>
            <View style={styles.inlineView}> 
                <TextInput style={styles.input}
                    placeholder='Enter UserName/Email' placeholderTextColor='#EF5E35'
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}/>
                <TextInput style={styles.input}
                    placeholder='Enter Password' 
                    placeholderTextColor='#EF5E35'
                    secureTextEntry={true}
                    returnKeyType="go" 
                    ref={(input) => this.passwordInput = input} />
             </View>
                <TouchableOpacity onPress={ () => { this.props.navigation.navigate('FaceCamera')} }  style={styles.buttonContainer}> 
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <Text style={styles.instructions}>
                    Welcome to Reflection
                    Reflect your mood today !!
                </Text>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex :1,
      padding : 20,
      backgroundColor: '#EF5E35',      
    },

    input: {
        height : 45,
        backgroundColor:'rgba(255,255,255,0.9)',
        width : 330,
        marginBottom : 5,
        borderRadius:5,
        justifyContent: 'center',
        color:'#EF5E35',
        fontSize:15,
        paddingHorizontal:4,
        fontFamily:'Avenir-MediumOblique'
    },


    buttonContainer:{
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth:1,
        borderRadius:5,
        borderColor:'white',
        paddingVertical:8,

    },

    logoContainer:{
        flexGrow: 1,
        alignItems : 'center',
        justifyContent: 'center',
        margin:10
    },

    logo:{
        height:200,
        width:200,
        borderRadius:100,

    },

    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontSize:20,
        marginTop:5,
        fontWeight:'700',
        fontFamily:'Academy Engraved LET'
    },

    welcome: {
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
        margin: 40,
        fontFamily : 'Academy Engraved LET'
  
      },
      instructions: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        margin: 40,
        fontFamily: 'Academy Engraved LET'
      },
      
      inlineView : {  
        marginTop : 30,
        padding : 5,
        justifyContent: 'center',
        alignItems : 'center'
      },


  });