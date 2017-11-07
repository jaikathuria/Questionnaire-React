import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Image} from 'react-native'
import TextField from 'react-native-md-textinput'
import {connect} from 'react-redux'
/* Icons */
import {MaterialIcons, Ionicons} from '@expo/vector-icons'
/* Import Action */
import {add} from '../actions'
/* Storage API */
import {addCardToDeck} from '../utils/storageApi'
import {addCard} from "../actions/index";

class NewDeck extends Component {
    state = {
        question: "",
        answer: null,
    }

    handleTextChange = (value) => {
        this.setState({
            question: value
        })
    }

    handleSubmit = () => {
        const {question, answer} = this.state
        const title = this.props.navigation.state.params.title
        let card = null
        if (question !== "" && answer !== null) {
            card = {
                question,
                answer
            }
            addCardToDeck(title, card).then(() => {
                this.props.dispatch(addCard(title, card))
            }).then(() => {
                this.props.navigation.goBack()
            })
        }


    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={[styles.container]}>
                <View style={[styles.card, styles.shadow, styles.center, {flex: 0.35}, {
                    paddingLeft: 25,
                    paddingRight: 25
                }]}>
                    <TextField
                        label="Question"
                        value={this.state.question}
                        style={styles.textInput}
                        labelColor={'#f1c40f'}
                        highlightColor={'#f1c40f'}
                        textColor={'#f1c40f'}
                        onChangeText={this.handleTextChange}
                    />
                </View>
                <View style={[styles.card, styles.shadow, styles.center, {flex: 0.25, justifyContent: 'flex-end'}]}>
                    <Image source={require('../assets/topography.png')}
                           style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                    <View style={[{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }, {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}, {backgroundColor: 'transparent'}]}>
                        <Text style={{fontSize: 25, fontWeight: "100"}}> Answer: </Text>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: "100"
                        }}>  {this.state.answer === null ? 'UNDEFINED' : this.state.answer ? 'TRUE' : 'FALSE'} </Text>
                    </View>

                </View>
                <View style={[styles.center, {flex: 0.3, marginTop: 20}, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }]}>
                    <TouchableOpacity
                        style={[styles.bool, styles.center, styles.shadow, {shadowOffset: {width: 0, height: 1}}]}
                        activeOpacity={0.7}
                        onPress={() => {
                            this.setState({answer: true})
                        }}>
                        <Ionicons
                            name={'ios-checkmark-circle-outline'}
                            size={50}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.bool, styles.center, styles.shadow, {shadowOffset: {width: 0, height: 1}}]}
                        activeOpacity={0.7}
                        onPress={() => {
                            this.setState({answer: false})
                        }}>
                        <Ionicons
                            name={'ios-close-circle-outline'}
                            size={50}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[{flex: 1}, styles.center, {backgroundColor: '#f1c40f'}, styles.btn]}
                                  activeOpacity={0.8} onPress={this.handleSubmit}>
                    <Text style={{fontSize: 30, color: '#fff'}}>
                        Submit Card
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    bool: {
        backgroundColor: '#f1c40f',
        borderRadius: 50,
        height: 75,
        width: 75,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    center: {
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 10,
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        elevation: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 20
    },
    shadow: {
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        elevation: 10,
    },
    btn: {
        flex: 0.2,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        margin: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    }
})

export default connect()(NewDeck)