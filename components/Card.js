import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Animated} from 'react-native'
import {connect} from 'react-redux'
import {MaterialIcons, Ionicons} from '@expo/vector-icons'
/* Import Action */
import {answer, skip} from '../actions'

class Card extends Component {


    showAns = false


    componentWillReceiveProps(newProps) {
        console.log("New Props:",newProps)
        if (newProps.number !== this.props.number) {
            this.showAns = false
        }
    }

    shouldComponentUpdate(newProps) {
        if (this.props.left <= 0) {
            return false
        }
        return true
    }

    respond = (res = null) => {
        switch (res) {
            case false:
                this.props.dispatch(answer(false, this.props.card.answer))
                break;
            case true:
                this.props.dispatch(answer(true, this.props.card.answer))
                break;
            default:
                this.props.dispatch(skip())
                break;
        }
        this.props.left <= 0 && this.props.navigation.navigate('Final')
    }


    render() {
        return (
            <View style={[{flex: 1, backgroundColor: '#eee',}, styles.container]}>
                <View style={[{flex: 1}, styles.card, {
                    justifyContent: 'center',
                    alignItems: 'center'
                }, styles.shadow]}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 20,
                        paddingRight: 20
                    }}>
                        <Text style={{
                            alignSelf: 'flex-start',
                            fontSize: 20,
                            fontWeight: '700',
                            marginBottom: 15,

                        }}>{`Question ${this.props.number} ( ${this.props.left} Left )`}</Text>
                        <Text style={[{fontSize: 30, fontWeight: '100'}]}>
                            {this.props.card && this.props.card.question}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1.5,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        padding: 20,
                        width: '100%'
                    }}>
                        <View style={{
                            flex: 1.5,
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            {!this.showAns && (<TouchableOpacity
                                style={[styles.bool, styles.center, styles.shadow, {
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                    justifyContent: 'center'
                                }]}
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.respond(true)
                                }}>
                                <Ionicons
                                    name={'ios-checkmark-circle-outline'}
                                    size={50}
                                    color={'#fff'}
                                />
                            </TouchableOpacity>)}
                            {!this.showAns && (<TouchableOpacity
                                style={[styles.bool, styles.center, styles.shadow, {
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                    justifyContent: 'center'
                                }]}
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.respond(false)
                                }}>
                                <Ionicons
                                    name={'ios-close-circle-outline'}
                                    size={50}
                                    color={'#fff'}
                                />
                            </TouchableOpacity>)}

                            {this.showAns && (
                                <Text style={{
                                    alignSelf: 'flex-start',
                                    fontSize: 20,
                                    fontWeight: '700',
                                    marginBottom: 15,

                                }}>{`Answer`} {this.props.card === null ? '' : this.props.card.answer ? ': TRUE' : ': FALSE'}</Text>

                            )}
                        </View>
                        <View style={{
                            flex: 1,
                            width: '100%',

                        }}>
                            {!this.showAns && <TouchableOpacity
                                style={[{
                                    flex: 1,
                                    backgroundColor: '#34495e',
                                }, styles.btn]}
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.showAns = true
                                    this.forceUpdate()
                                }}
                            >

                                <Text style={{
                                    fontSize: 30,
                                    color: '#fff',
                                }}>
                                    Show Answer
                                </Text>

                            </TouchableOpacity> }
                        </View>
                        <View style={{
                            flex: 1,
                            width: '100%',

                        }}>
                            <TouchableOpacity style={[{
                                flex: 1,
                                backgroundColor: '#34495e',
                            }, styles.btn]}
                                              activeOpacity={0.7}
                                              onPress={() => {
                                                  this.respond()
                                              }}
                            >
                                <Text style={{
                                    fontSize: 30,
                                    color: '#fff',
                                }}>
                                    Skip Question
                                </Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        flex: 1,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        width: '100%'

    },
    bool: {
        backgroundColor: '#34495e',
        borderRadius: 50,
        height: 75,
        width: 75,
        alignItems: 'center',
    },
    shadow: {
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        elevation: 10,
    },
    btn: {
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        margin: 15,
        marginTop: 25,
        marginBottom: 0,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => {
    return {
        card: state.quiz.questions[state.quiz.current],
        number: state.quiz.current + 1,
        left: state.quiz.total - state.quiz.current - 1,
    }
}
export default connect(mapStateToProps)(Card)