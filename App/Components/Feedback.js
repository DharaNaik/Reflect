import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView , Alert} from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
import { NavigationActions } from 'react-navigation'



export default class Feedback extends React.Component {
    constructor(){
        super();
        this.state = {
            feedbackText : '',
            animation: null
        };
    }


    componentWillMount() {
        this._playAnimation();
      }
    
      _playAnimation = () => {
        if (!this.state.animation) {
          this._loadAnimationAsync();
        } else {
          this.animation.reset();
          this.animation.play();
        }
      };
    
      _loadAnimationAsync = async () => {
        let result = await fetch(
            lottie = "https://www.lottiefiles.com/storage/datafiles/uUVcQk30GJMpCjt/data.json"
        );
    
        this.setState(
          { animation: JSON.parse(result._bodyText) },
          this._playAnimation
        );
      };

    // https://www.lottiefiles.com/storage/datafiles/uUVcQk30GJMpCjt/data.json // Feedback


  render() {
    return (
      <View style={styles.container}>
        <View>
                <TouchableOpacity style={styles.backButton} onPress={()=> this.props.navigation.dispatch(NavigationActions.back())}>
                <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
        </View> 
       
        <KeyboardAvoidingView behavior='position' style={styles.container}>

        <View >
          {this.state.animation && (
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={styles.loadingAnimation}
              source={this.state.animation}
            />
          )}
        </View>

      <View style={styles.inlineView}> 
      
      <TextInput style={styles.input}
          placeholder='Give your Feedback' placeholderTextColor='#EF5E35'
          autoCapitalize='none'
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => this.setState({feedbackText: text})}
          value={this.state.feedbackText}
          autoCorrect={false}
          onSubmitEditing={() => {
            Alert.alert(
                'Thank You',
                'Thank you for your feedback !!',
            [
                {text: 'OK', onPress: () => 
                {
                    this.props.navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [NavigationActions.navigate({ routeName: 'LoginForm' })]
                    }))
                }
                },
            ],
            { cancelable: false })
        }
        } />
    </View>
        </KeyboardAvoidingView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  loadingAnimation: {
    width: 400,
    height: 400,
    backgroundColor: 'transparent'
  },

  animation:{
    width : 400,
    height : 400,
  },

  

  backButton: {
    padding: 20,
    marginBottom: 4,
    backgroundColor: '#EF5E35',

  },

  feedbackButton :{
    padding : 10,
    backgroundColor: '#EF5E35',
    justifyContent: 'center',
    alignItems: 'center'
  },

  feedbackText :{
    color: 'white',
    fontSize:20,
    marginTop:5,
    fontWeight:'700',
    fontFamily:'Academy Engraved LET',
  },

  buttonText:{
    color: 'white',
    fontSize:20,
    marginTop:5,
    fontWeight:'700',
    fontFamily:'Academy Engraved LET'
},


input: {
    backgroundColor:'transparent',
    width : 330,
    height : 100,
    marginBottom : 5,
    borderRadius:5,
    justifyContent: 'center',
    color:'#EF5E35',
    fontSize:15,
    paddingHorizontal:4,
    fontFamily:'Avenir-MediumOblique'
},
inlineView : {  
    marginTop : 30,
    padding : 5,
    justifyContent: 'center',
    alignItems : 'center'
  },

});