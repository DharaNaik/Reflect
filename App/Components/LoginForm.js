import React, { Component } from 'react'
import { Text,TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity, 
    StatusBar, StyleSheet , Alert} from 'react-native'
import FaceCamera from '../Components/Camera'
import { Fingerprint } from 'expo'


const UserName = "Dhara"
const Password = "Naik"

export default class LoginForm extends Component {
    constructor(){
        super()
        this.state ={
            isValid : false
        }
    }

    handleUserName(text){
        if(UserName === text){
            this.setState({isValid : true})
        }

    }

    handlePassword(text){
        if(Password === text){
            this.setState({isValid : true})

        }
    }


    loginUsingFingerPrint(){
        if(Fingerprint.hasHardwareAsync() && Fingerprint.isEnrolledAsync())
        {
            Fingerprint.authenticateAsync(
                  'Please use fingerprints to Login!'
                ).then(result => {
                    if (result.success) {
                        this.props.navigation.navigate('FaceCamera')
                    } else {
                        console.log('In Valid Login , Please try agin!');
                      }
            })
        }
    }

    login(){    

            if(this.state.isValid) {
                this.props.navigation.navigate('FaceCamera')
            }else{
                console.log("False Login");
             Alert.alert(
                    'Invalid Login',
                    'Invalid login details, Please Try Again !!',
                [
                
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false })
            }
    }

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
                <TextInput onChangeText={(text) => this.handleUserName(text)} style={styles.input}
                    placeholder='Enter UserName/Email' placeholderTextColor='#EF5E35'
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}/>
                <TextInput onChangeText={(text) => this.handlePassword(text)} style={styles.input}
                    placeholder='Enter Password' 
                    placeholderTextColor='#EF5E35'
                    secureTextEntry={true}
                    returnKeyType="go" 
                    ref={(input) => this.passwordInput = input} />
             </View>
                <TouchableOpacity onPress={ () => this.login() }  style={styles.buttonContainer}> 
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => this.loginUsingFingerPrint() }  style={styles.signonContainer}> 
                    <Image style={styles.signinlogo} 
                    source={require('../Images/Touch-icon-lg.png')}
                    />
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

    signonContainer :{
        margin : 10,
        justifyContent: 'center',
        alignItems : 'center',

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
    },

    logo:{
        height:200,
        width:200,
        borderRadius:100,

    },

    signinlogo: {
        height:60,
        width:60,
        borderRadius:10,
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
        margin: 5,
        fontFamily: 'Academy Engraved LET'
      },
      
      inlineView : {  
        marginTop : 30,
        padding : 5,
        justifyContent: 'center',
        alignItems : 'center'
      },


  });