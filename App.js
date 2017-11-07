import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation';
/* Reducer */
import reducer from './reducer'
/* React Components */
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import NewCard from './components/NewCard'
import Card from './components/Card'
/* Actions */
import { fetchDecks } from './actions'
/* API Methods */
import { getDecks, clearData } from './utils/storageApi'
/* Constant from Expo */
import { Constants } from 'expo'

//clearData()

/* Create Store */
const STORE = createStore(reducer)
/* Fetching All the Decks in LocalDB and creating redux state */
getDecks().then(decks => {
    STORE.dispatch(fetchDecks(decks))
})

const CustomStatusBar = ({backgroundColor, ...props}) => (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )

const Stack = StackNavigator({
    Decks: {
        screen: DeckList,
        navigationOptions: {
            title: 'Decks'
        }
    },
    AddNew: {
        screen: NewDeck,
        navigationOptions: {
            title: 'New Deck'
        }
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            title: 'Questionnaire'
        }
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: {
            title: 'New Card'
        }
    }
},{})

/* Rendering App */
export default class App extends React.Component {
  render() {
    return (
      <Provider store={STORE}>
          <View style={{flex: 1}}>
              <CustomStatusBar />
              <Card />
          </View>
      </Provider>
    )
  }
}

