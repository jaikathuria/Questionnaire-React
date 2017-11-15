import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {connect} from 'react-redux'
/* Import Action */
import {restart, endQuiz} from '../actions'
/* Notification Method */
import { setLocalNotification , } from "../utils/helper"

class Final extends Component {

    render() {
        return (
            <View style={[{flex: 1, backgroundColor: '#eee',}, styles.container]}>
                <View style={[{flex: 1, backgroundColor: '#fff'}, styles.shadow]}>
                    <Image source={require('../assets/README.gif')}
                           style={{flex: 0.4, width: null, height: null, borderRadius: 5,}}/>
                    <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch', flexDirection: 'row'}}>
                            <Text style={{color: '#81d135', fontSize: 25, fontWeight: '700'}}> CORRECT: </Text>
                            <Text style={{
                                color: '#81d135',
                                fontSize: 25,
                                fontWeight: '100'
                            }}> {`${this.props.correct}`} </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch', flexDirection: 'row'}}>
                            <Text style={{color: '#e74c3c', fontSize: 25, fontWeight: '700'}}> INCORRECT: </Text>
                            <Text style={{
                                color: '#e74c3c',
                                fontSize: 25,
                                fontWeight: '100'
                            }}> {`${this.props.incorrect}`} </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch', flexDirection: 'row'}}>
                            <Text style={{color: '#2c3e50', fontSize: 25, fontWeight: '700'}}> SKIPPED: </Text>
                            <Text style={{
                                color: '#2c3e50',
                                fontSize: 25,
                                fontWeight: '100'
                            }}> {`${this.props.skipped}`} </Text>
                        </View>
                    </View>
                    <View style={{flex: 0.4}}>

                        <TouchableOpacity
                            style={[styles.btn]}
                            onPress={() => {
                                this.props.dispatch(restart())
                                this.props.navigation.dispatch({
                                    key: 'FinalToCardView',
                                    type: 'FinalToCardView',
                                    routeName: 'Card',
                                });
                            }}
                        >
                            <Text style={{fontSize: 22, color: '#fff', fontWeight: "900"}}> Restart Quiz </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn]}
                            onPress={()=>{
                                this.props.dispatch(restart())
                                this.props.navigation.dispatch({
                                    key: 'FinalToDeckView',
                                    type: 'FinalToDeckView',
                                    routeName: 'DeckView',
                                    params: { deckId: this.props.title },
                                });
                            }}
                        >
                            <Text style={{fontSize: 22, color: '#fff', fontWeight: "900"}}> Back To Deck </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    shadow: {
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        borderRadius: 5,
    },
    btn: {
        flex: 1,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        margin: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
    }
})

const mapStateToProps = (state) => {
    console.log(state)
    return {
        correct: state.quiz.correct,
        incorrect: state.quiz.incorrect,
        skipped: state.quiz.skipped,
        title: state.quiz.title
    }
}
export default connect(mapStateToProps)(Final)