import React, { Component, Dimensions  } from 'react'
import { View, CameraRoll, StyleSheet, TouchableOpacity, Text, Vibration } from 'react-native'
import { Constants, Camera, FileSystem, Permissions } from 'expo';
import GalleryScreen from './GalleryScreen';
import Animate from './Animate'

const landmarkSize = 2;

export default class FaceCamera extends Component {

  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    faces: [],
    currentPhoto : '',
    permissionsGranted: true,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidMount() {
    //FileSystem.deleteAsync(FileSystem.documentDirectory + 'photos')
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  getRatios = async () => {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }


  takePicture = async function () {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1
          });

          Vibration.vibrate();
          this.renderGallery();
        });
      });
      
    }
  };


  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);


  renderGallery() {
    this.props.navigation.navigate('GalleryScreen') 
   }

renderNoPermissions() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>
  );
}


renderFace({ bounds, faceID, rollAngle, yawAngle }) {
  return (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` },
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}>
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
  );
}


renderLandmarksOfFace(face) {
  const renderLandmark = position =>
    position && (
      <View
        style={[
          styles.landmark,
          {
            left: position.x - landmarkSize / 2,
            top: position.y - landmarkSize / 2,
          },
        ]}
      />
    );
  return (
    <View key={`landmarks-${face.faceID}`}>
      {renderLandmark(face.leftEyePosition)}
      {renderLandmark(face.rightEyePosition)}
      {renderLandmark(face.leftEarPosition)}
      {renderLandmark(face.rightEarPosition)}
      {renderLandmark(face.leftCheekPosition)}
      {renderLandmark(face.rightCheekPosition)}
      {renderLandmark(face.leftMouthPosition)}
      {renderLandmark(face.mouthPosition)}
      {renderLandmark(face.rightMouthPosition)}
      {renderLandmark(face.noseBasePosition)}
      {renderLandmark(face.bottomMouthPosition)}
    </View>
  );
}

renderFaces() {
  return (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );
}

renderLandmarks() {
  return (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );
}

renderCamera() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
          ref={ref => {
            this.camera = ref;
          }}
            style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[styles.buttonContainer,styles.flipCamrea]}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={styles.buttonText}>
                  FLIP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.buttonContainer,styles.takePic]}>
                <Text style={styles.buttonText} onPress={this.takePicture.bind(this)}>
                  <Text style={styles.flipText}> TAKE A PIC </Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.buttonContainer,styles.takePic]}>
              <Text style = {styles.buttonText} onPress={ () => { this.props.navigation.navigate('GalleryScreen')} }>
              <Text style={styles.flipText}> GALLERY </Text>
              </Text>
            </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 20,
    width: 20
  },
  capture: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },

 buttonContainer: {
    backgroundColor: '#EF5E35',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    paddingVertical: 8,
    alignItems: 'center',
    margin : 10
  },

  takePic:{
    alignSelf: 'flex-end',
  },

  flipCamrea:{
      flex: 1,
      alignSelf: 'flex-end',
 },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 5,
    fontWeight: '700',
    fontFamily: 'Academy Engraved LET'
  }

})