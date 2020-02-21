import Video from 'react-native-video';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.
const portraitVideoUri = 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4';
const landscapeVideoUri = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
var {height: windowHeight, width: windowWidth} = Dimensions.get('window');
export default class VideoView extends React.Component {
    state={
        paused: false,
        fullScreen: false,
        preferredVideoOrientation: 'portrait',
    };
    render() {
        return (
            <View
            style={[styles.containerWithControls,
                this.state.fullScreen ? {
                    height: windowHeight,
                    width: windowWidth,
                    borderColor: 'red',
                    borderWidth: 1
                }: {}
            ]}
            >
            <View style={[styles.containerWithControls,
                this.state.fullScreen ? (
                    this.state.preferredVideoOrientation === 'portrait' 
                    ? {
                        height: windowHeight,
                        width: windowWidth,
                    }
                    : {
                        transform: [{ rotate: '90deg'},
                        {translateX: 135}, {translateY: 135} ],
                        height: windowWidth,
                        width: windowHeight
                    })
                : {}
            ]}>
                <Video source={{uri: landscapeVideoUri}}   // Can be a URL or a local file.
                    ref={(ref) => {
                    this.player = ref
                }}                                    // Store reference
                paused={this.state.paused}
                fullscreen={this.state.fullScreen}
                resizeMode='contain'
                onLoad={(data) => {this.setState({preferredVideoOrientation: data.naturalSize.orientation})}}
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} />

            <TouchableOpacity onPress={() => {this.setState({ paused: false})}}>
                <Text>{'Play'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.setState({ paused: true})}}>
            <Text>{'Pause'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.setState({ fullScreen: !this.state.fullScreen})}}>
            <Text>{'Fullscreen'}</Text>
            </TouchableOpacity>

        </View>

            </View>
        );
    }
}

// Later on in your styles..
var styles = StyleSheet.create({
  containerWithControls: {
      height: 180, width: windowWidth,
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: 'yellow',
  },
  backgroundVideo: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
  }

});
