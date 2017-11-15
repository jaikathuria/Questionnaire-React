import React from 'react'
import {StyleSheet, Text, View, StatusBar} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {StackNavigator} from 'react-navigation';
/* Reducer */
import reducer from './reducer'
/* React Components */
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import NewCard from './components/NewCard'
import Card from './components/Card'
import Final from './components/Final'

/* Actions */
import {fetchDecks} from './actions'
/* API Methods */
import {getDecks, clearData} from './utils/storageApi'
/* Constant from Expo */
import {Constants} from 'expo'
/* Notification Method */
import { setLocalNotification, clearLocalNotification } from "./utils/helper"

//clearData()

/* Create Store */
const STORE = createStore(reducer)
/* Fetching All the Decks in LocalDB and creating redux state */
getDecks().then(decks => {
    STORE.dispatch(fetchDecks(decks))
})

const CustomStatusBar = ({backgroundColor, ...props}) => (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
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
    },
    Card: {
        screen: Card,
        navigationOptions: {
            title: 'Quiz'
        }
    },
    Final: {
        screen: Final,
        navigationOptions: {
            title: 'Result',
            headerLeft: null,
        }
    },
}, {})

/* Method to Action to replace current View, With another in stackNavigator */
const prevGetStateForActionHomeStack = Stack.router.getStateForAction;
Stack.router.getStateForAction = (action, state) => {
     if (state && action.type === 'NewDeckToDeckView') {
        const routes = state.routes.slice(0, state.routes.length - 1);
        routes.push(action);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
     }
    if (state && action.type === 'FinalToCardView') {
        const routes = state.routes.slice(0, state.routes.length - 2);
        routes.push(action);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
    }
    if (state && action.type === 'FinalToDeckView') {
        const routes = state.routes.slice(0, state.routes.length - 3);
        routes.push(action);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
    }
    return prevGetStateForActionHomeStack(action, state);
}

/* Rendering App */
export default class App extends React.Component {

    componentDidMount() {
        clearLocalNotification().then(setLocalNotification)
    }

    render() {
        return (
            <Provider store={STORE}>
                <View style={{flex: 1}}>
                    <CustomStatusBar/>
                    <Stack/>
                </View>
            </Provider>
        )
    }
}

