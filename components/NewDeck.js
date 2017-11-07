import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native'
import TextField from 'react-native-md-textinput'
import { connect } from 'react-redux'
/* Import Action */
import { addDeck } from '../actions'
/* Storage API */
import { saveDeckTitle } from '../utils/storageApi'


class NewDeck extends Component {

    state = {
        title: ""
    }

    handleSubmit = () => {
        (this.state.title !== "") && saveDeckTitle(this.state.title).then(title => this.props.dispatch(addDeck(title))).then(()=> {
            this.props.navigation.goBack()
        })
    }

    handleTextChange = (value) => {
        this.setState({
            title: value
        })
    }


    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={[styles.container,{justifyContent: 'flex-start'}]}>
                <View style={styles.card}>
                    <View style={[styles.center,{alignItems: 'center'}]}>
                        <Text style={{fontSize: 25}}> NAME OF THE </Text>
                        <Text style={{fontSize: 35}}> QUESTIONNAIRE </Text>
                    </View>
                </View>
                <View style={[styles.card,{ flex: 0.6}]}>
                    <View style={[styles.center,{paddingLeft: 25, paddingRight: 25}]}>
                        <TextField
                            label="Title"
                            value={this.state.title}
                            style={styles.textInput}
                            labelColor={'#2ecc71'}
                            highlightColor={'#2ecc71'}
                            textColor={'#2ecc71'}
                            onChangeText={this.handleTextChange}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{flex: 0.40}} activeOpacity={0.7} onPress={this.handleSubmit}>
                    <View style={styles.addDeckBtn}>
                        <Text style={{fontSize:22, color: '#fff'}}> ADD DECK </Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
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
   addDeckBtn: {
       flex: 1,
       backgroundColor: '#2ecc71',
       height: 20,
       shadowRadius: 3,
       shadowOpacity: 0.8,
       shadowColor: 'rgba(0, 0, 0, 0.24)',
       margin: 15,
       marginTop: 5,
       borderRadius: 5,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
   },
    center: {
        flex: 1,
        justifyContent: 'center',
    },
    textInput: {
       flex: 1,
       fontSize: 30
    },
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
})

export default connect()(NewDeck)