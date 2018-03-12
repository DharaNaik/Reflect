import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
import { NavigationActions } from 'react-navigation'



export default class Animate extends React.Component {
  state = {
    animation: null
  };


  getAnimationImage(percentage){
    let returnLottie="https://www.lottiefiles.com/storage/datafiles/6VN84lL27Xh8ReG/data.json"; //Laughing Bear

    if(percentage > 90)
        returnLottie="https://www.lottiefiles.com/storage/datafiles/L24bw6K1vbW8WqT/data.json"; //Motivated
    else if(percentage > 80)
        returnLottie="https://www.lottiefiles.com/storage/datafiles/6VN84lL27Xh8ReG/data.json"; //Laughing Bear
    else if(percentage > 70)
    returnLottie = "https://www.lottiefiles.com/storage/datafiles/A9zB6wzqAra9ijf/data.json" // Trying so hard
    else if(percentage > 60)
        returnLottie="https://www.lottiefiles.com/storage/datafiles/ZQnE4XBjAalKEV0/data.json"; // Confused
    else if (percentage > 50)
        returnLottie="https://www.lottiefiles.com/storage/datafiles/d2r7Sp2fKIkHuDb/data.json"; // Wine Class
    else if (percentage > 40)
        returnLottie ="https://www.lottiefiles.com/storage/datafiles/ZQnE4XBjAalKEV0/data.json" //Confused

    else if(percentage > 20) 
        returnLottie="https://www.lottiefiles.com/storage/datafiles/lwMreIK0mvcAid2QIXGOhibSTofFbL2W5cifY7CP/1_Disease/animation.json" // Zombie
    
    else if(percentage > 5)
        returnLottie="https://www.lottiefiles.com/storage/datafiles/kz3bPEHOzs8Finv/data.json"; //Goose -Wing 
     
       //Engry == returnLottie="https://www.lottiefiles.com/storage/datafiles/wXHQjXgvnh8WXoZ/data.json";

    else if(percentage > -1)
    returnLottie="https://www.lottiefiles.com/storage/datafiles/tawau8o8xa7TTxx/data.json"; // Crying Bear
    return returnLottie
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
    const smile = this.props.navigation.state.params.smileProbability;
    const smilepercentage =  (smile * 100).toFixed(0);
    console.log("Smile Percentage ==", smilepercentage);
    let lottie = this.getAnimationImage(smilepercentage);
    let result = await fetch(
        lottie
    );

    this.setState(
      { animation: JSON.parse(result._bodyText) },
      this._playAnimation
    );
  };

  render() {
    return (

      <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={()=> this.props.navigation.dispatch(NavigationActions.back())}>
            <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        <View style={styles.animationContainer}>
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

        <TouchableOpacity style={styles.feedbackButton} onPress={()=> this.props.navigation.navigate('Feedback')}>
        <Text style={styles.feedbackText}>Feedback</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  loadingAnimation: {
    width: 400,
    height: 400,
    backgroundColor: 'transparent'
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
});