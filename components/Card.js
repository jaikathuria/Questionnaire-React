import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Animated} from 'react-native'
import {connect} from 'react-redux'
import {MaterialIcons, Ionicons} from '@expo/vector-icons'


class Card extends Component {

    render() {
        return (
            <View style={[{flex: 1, backgroundColor: '#eee',},styles.container]}>
                <View style={[{flex: 1}, styles.card, {
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            alignSelf: 'flex-start',
                            fontSize: 20,
                            fontWeight: '700',
                            marginBottom: 15,

                        }}>Question</Text>
                        <Text style={[{fontSize: 30, fontWeight: '100'}]}>
                            {this.props.card.question}
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
                            <TouchableOpacity
                                style={[styles.bool, styles.center, styles.shadow, {
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                    justifyContent: 'center'
                                }]}
                                activeOpacity={0.7}
                                onPress={() => {
                                    console.log('bkl')
                                }}>
                                <Ionicons
                                    name={'ios-checkmark-circle-outline'}
                                    size={50}
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.bool, styles.center, styles.shadow, {
                                    shadowOffset: {
                                        width: 0,
                                        height: 1
                                    },
                                    justifyContent: 'center'
                                }]}
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
                        <View style={{
                            flex: 1,
                            width: '100%',
                            paddingTop: 35,
                            paddingBottom: 35,
                        }}>
                            <TouchableOpacity style={[{
                                flex: 1,
                                backgroundColor: '#34495e'
                            },styles.btn]}>

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
        marginTop:25,
        marginBottom: 0,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state, {navigation, index}) => {
    const title = 'React'
    return {
        card: {
            "answer": true,
            "question": "SectionList renders on-screen items, but with headers",
        }

    }
}
export default connect(mapStateToProps)(Card)