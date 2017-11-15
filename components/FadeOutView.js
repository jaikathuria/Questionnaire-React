import React, {Component} from 'react'
import {View, Animated} from 'react-native'

export default class FadeOutView extends Component {
    state = {
        fadeAnim: new Animated.Value(1),  // Initial value for opacity: 0
    }

    fadeOut = () => {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 0,                   // Animate to opacity: 1 (opaque)
                duration: 3000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View                 // Special Animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,
                    flex: 1,// Bind opacity to animated value
                }}
                fadeOut={()=>{
                    this.fadeOut()
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}
