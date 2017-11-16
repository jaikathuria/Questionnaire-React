import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Animated} from 'react-native'
import {connect} from 'react-redux'
/* Import Action */
import {startQuiz} from '../actions'


class FadeInView extends Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 2500,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    render() {
        const {fadeAnim} = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}


class DeckView extends Component {
    startQuiz = () => {
        if (this.props.deck.questions.length != 0){
            this.props.dispatch(startQuiz(this.props.deck))
            this.props.navigation.navigate('Card')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FadeInView style={{flex: 1}}>
                    <View style={[styles.card, {flex: 0.5, padding: null}]}>
                        <Image source={require('../assets/pinkdust.png')}
                               style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                        <View style={[styles.center, {
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }, {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }, {backgroundColor: 'transparent'}]}>
                            <Text style={{
                                fontSize: 45,
                                fontWeight: "700",
                                color: "#eee"
                            }}> {this.props.deck.title} </Text>
                        </View>
                    </View>
                    <View style={[styles.card, {flex: 0.2, padding: null}]}>
                        <Image source={require('../assets/topography.png')}
                               style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                        <View style={[{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }, {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }, {backgroundColor: 'transparent'}]}>
                            <Text style={{fontSize: 25, fontWeight: "700"}}> {this.props.deck.questions.length} </Text>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: "100"
                            }}>{this.props.deck.questions.length === 1 ? `Card` : `Cards`}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.center, {backgroundColor: '#3498db', alignItems: 'center'}, styles.btn]}
                        activeOpacity={0.7} onPress={() => this.startQuiz()}>
                        <Text style={{fontSize: 22, color: '#fff', fontWeight: "900"}}> START QUESTIONNAIRE </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.center, {backgroundColor: '#9b59b6', alignItems: 'center'}, styles.btn]}
                        activeOpacity={0.7}
                        onPress={() => this.props.navigation.navigate('NewCard', {title: this.props.deck.title})}>
                        <Text style={{fontSize: 22, color: '#fff', fontWeight: "900"}}> ADD CARD </Text>
                    </TouchableOpacity>
                </FadeInView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    card: {
        backgroundColor: '#fff',
        margin: 15,
        marginBottom: 10,
        marginTop: 10,
        padding: 25,
        borderRadius: 5,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    center: {
        flex: 1,
        justifyContent: 'center',
    },
    btn: {
        flex: 0.15,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        margin: 15,
        marginTop: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state, {navigation}) => ({
    deck: state.decks[navigation.state.params.deckId]
})

export default connect(mapStateToProps)(DeckView)
