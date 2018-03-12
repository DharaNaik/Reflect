import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, FaceDetector, DangerZone } from 'expo';
import Animate from './Animate'
import { NavigationActions } from 'react-navigation'


const pictureSize = 250;

export default class GalleryScreen extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    currentPhoto: '',
  };
  _mounted = false;

  componentDidMount() {
    this.setState({ currentPhoto: this.props.currentPhoto })
    this._mounted = true;
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
      if (this._mounted) {
        this.setState(
          {
            photos,
          },
          this.detectFaces
        );
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }



  getImageDimensions = ({ width, height }) => {
    if (width > height) {
      const scaledHeight = pictureSize * height / width;
      return {
        width: pictureSize,
        height: scaledHeight,

        scaleX: pictureSize / width,
        scaleY: scaledHeight / height,

        offsetX: 0,
        offsetY: (pictureSize - scaledHeight) / 2,
      };
    } else {
      const scaledWidth = pictureSize * width / height;
      return {
        width: scaledWidth,
        height: pictureSize,

        scaleX: scaledWidth / width,
        scaleY: pictureSize / height,

        offsetX: (pictureSize - scaledWidth) / 2,
        offsetY: 0,
      };
    }
  };

  detectFaces = () => this.state.photos.forEach(this.detectFace);

  detectFace = photoUri => {
    return FaceDetector.detectFacesAsync(`${FileSystem.documentDirectory}photos/${photoUri}`, {
      detectLandmarks: FaceDetector.Constants.Landmarks.none,
      runClassifications: FaceDetector.Constants.Classifications.all,
    })
      .then(this.facesDetected)
      .catch(this.handleFaceDetectionError);
  }

  facesDetected = ({ image, faces }) => {
    if (!this._mounted) return;
    this.setState({
      faces: { ...this.state.faces, [image.uri]: faces },
      images: { ...this.state.images, [image.uri]: image },
    });
  }

  handleFaceDetectionError = error => console.warn(error);

  renderFaces = photoUri =>
    this.state.images[photoUri] &&
    this.state.faces[photoUri] &&
    this.state.faces[photoUri].map(this.renderFace(this.state.images[photoUri]));

  renderFace = image => (face, index) => {
    const { scaleX, scaleY, offsetX, offsetY } = this.getImageDimensions(image);
    const layout = {
      top: offsetY + face.bounds.origin.y * scaleY,
      left: offsetX + face.bounds.origin.x * scaleX,
      width: face.bounds.size.width * scaleX + 50,
      height: face.bounds.size.height * scaleY + 50,
    };

    return (
      <View
        key={index}
        style={[styles.face, layout]}
        transform={[
          { perspective: 600 },
          { rotateZ: `${(face.rollAngle || 0).toFixed(0)}deg` },
          { rotateY: `${(face.yawAngle || 0).toFixed(0)}deg` },
        ]}>
        <Text style={styles.faceText}> 😁 {(face.smilingProbability * 100).toFixed(0)}%</Text>
      </View>
    );
  };

  renderIndividulaImage = (photoUri) => {
    const selectedFile = `${FileSystem.documentDirectory}photos/${photoUri}`;
    let smileProbability = -1
    if(this.state.faces[selectedFile])
      smileProbability = this.state.faces[selectedFile][0].smilingProbability;
    this.props.navigation.navigate('Animate',{smileProbability});
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {this.state.photos.map(photoUri => (
              <TouchableOpacity
                style={styles.pictureWrapper} key={photoUri} onPress={() => this.renderIndividulaImage(photoUri)}>
                <Image
                  key={photoUri}
                  style={styles.picture}
                  source={{
                    uri: `${FileSystem.documentDirectory}photos/${photoUri}`,
                  }}
                />
                <View style={styles.facesContainer}>
                  {this.renderFaces(`${FileSystem.documentDirectory}photos/${photoUri}`)}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  
  loadingAnimation: {
    width: 400,
    height: 400,
    backgroundColor: 'transparent'
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',

  },
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    borderRadius:10,

  },
  pictureWrapper: {
    width: pictureSize + 100,
    height: pictureSize + 100,
    margin: 10,
    marginLeft : 10,
    marginRight:15,
    borderRadius:10,
  },
  
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    borderWidth: 5,
    borderRadius: 100,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 2,
    fontSize: 20,
    backgroundColor: 'transparent',
  },


  backButton: {
    padding: 20,
    marginBottom: 4,
    backgroundColor: '#EF5E35',

  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    marginTop: 5,
    fontWeight: '700',
    fontFamily: 'Academy Engraved LET'
  },
});