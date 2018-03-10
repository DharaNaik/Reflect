import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import SplashScreen from '../Components/Splash'
import FaceCamera from '../Components/Camera'
import LoginForm from '../Components/LoginForm'


import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  FaceCamera : {screen : FaceCamera},
  LoginForm : {screen : LoginForm},
  LaunchScreen : {screen : LaunchScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginForm',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
