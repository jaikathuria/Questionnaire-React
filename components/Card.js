import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { connect } from 'react-redux'


class Card extends Component {
    render() {
       return (
           <View style={[styles.container]}>
               <View style={[styles.card]}>
                   <View style={{flex: 0.5, flexDirection:'row'}}>
                       <Image source={require('../assets/topography.png')} style={{flex: 0.5, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                       <Image source={require('../assets/topography.png')} style={{flex: 0.5, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                   </View>
                   <View style={{flex: 0.5, flexDirection:'row'}}>
                       <Image source={require('../assets/topography.png')} style={{flex: 0.5, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                       <Image source={require('../assets/topography.png')} style={{flex: 0.5, width: null, height: null, resizeMode: 'cover', borderRadius: 5,}}/>
                   </View>
               </View>
               <View style={[{flex: 1},{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},{backgroundColor: 'transparent'}]}>
                    <View style={[{flex: 0.5, justifyContent:'center', alignItems: 'center', padding: 20}]}>
                        <Text style={{alignSelf: 'flex-start', left: 30, fontSize: 20, fontWeight: '700', marginBottom: 15}}>Question</Text>
                        <Text style={[{fontSize: 30, fontWeight: '100'}]}>
                            { this.props.card.question}
                        </Text>
                    </View>
               </View>
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
        borderRadius: 5,
        margin: 15,
        flex: 1,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },

    },
})

const mapStateToProps = (state,{navigation, index}) => {
    const title = 'React' || navigation.state.params.title
    return {
        card: state.decks[title].questions[index || 0]
    }
}
export default connect(mapStateToProps)(Card)