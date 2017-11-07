import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { connect } from 'react-redux'
/* Constant from Expo */


class DeckView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.card,{flex: 0.5, padding: null}]}>
                    <Image source={require('../assets/pinkdust.png')} style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                    <View style={[styles.center,{alignItems: 'center', justifyContent: 'space-around'},{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},{backgroundColor: 'transparent'}]}>
                        <Text style={{fontSize: 45, fontWeight: "700", color: "#eee"}}> {this.props.deck.title} </Text>
                    </View>
                </View>
                <View style={[styles.card,{flex: 0.2, padding: null}]}>
                    <Image source={require('../assets/topography.png')} style={{flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                    <View style={[{flex: 1,flexDirection: 'row', justifyContent:'center', alignItems: 'center'},{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},{backgroundColor: 'transparent'}]}>
                        <Text style={{fontSize: 25,fontWeight: "700"}}> {this.props.deck.questions.length} </Text>
                        <Text style={{fontSize: 25,fontWeight: "100"}}>{ this.props.deck.questions.length === 1 ?  `Card` : `Cards`}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.center,{backgroundColor:'#3498db',alignItems: 'center'},styles.btn]} activeOpacity={0.7}>
                    <Text style={{fontSize:22, color: '#fff',fontWeight: "900"}}> START QUESTIONNAIRE </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.center,{backgroundColor:'#9b59b6',alignItems: 'center'},styles.btn]} activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('NewCard',{title: this.props.deck.title})}>
                    <Text style={{fontSize:22, color: '#fff',fontWeight: "900"}}> ADD CARD </Text>
                </TouchableOpacity>
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

const mapStateToProps = (state, { navigation }) => ({
    deck: state.decks[navigation.state.params.deckId]
})

export default connect(mapStateToProps)(DeckView)