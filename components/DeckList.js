import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckList extends Component {

    keyExtractor = (item, index) => item.title;

    renderCard = ({ item }) => (
        <TouchableOpacity
            onPress={()=>this.props.navigation.navigate(
                'DeckView',
                { deckId: item.title }
            )}
            activeOpacity={0.75}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={{fontSize: 25}}> { item.title } </Text>
                    <Text style={{fontSize: 20}}> { item.questions.length === 1 ? `${item.questions.length} Card` : `${item.questions.length} Cards`} </Text>
                </View>
             </View>
        </TouchableOpacity>
      )

      render () {

        const decks = Object.keys(this.props.decks).reduce((acc,deck)=>{
            acc.push(this.props.decks[deck])
            return acc
        },[])


        return (
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <FlatList
                data={decks}
                renderItem={this.renderCard}
                keyExtractor={this.keyExtractor}
              />
            </View>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddNew')} style={[{flex: 0.2},styles.header]} activeOpacity={0.7} >
              <View style={styles.addDeckBtn}>
                <Text style={{fontSize: 25, color: '#fff'}}> NEW DECK </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    addDeckBtn: {
        flex: 1,
        backgroundColor: '#e74c3c',
        height: 20,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        margin: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    header: {
        shadowRadius: 3,
        shadowOpacity: 0.3,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
            width: 0,
            height: -3
        },
        backgroundColor: '#eee',
        elevation: 10,
    }



})

const mapStateToProps = (state) => ({
    decks: state.decks
})

export default connect(mapStateToProps)(DeckList)