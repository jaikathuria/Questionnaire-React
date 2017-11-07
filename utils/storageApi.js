import { AsyncStorage } from 'react-native'

const QUESTIONNAIRE_STORAGE_KEY = 'SKYER:Questionnaire'

export const clearData = () => {
    AsyncStorage.removeItem(QUESTIONNAIRE_STORAGE_KEY)
}

const setInitData = () => {
    const decks = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'SectionList renders on-screen items, but with headers',
                    answer: true,
                },
                {
                    question: `'KeyboardAvoidingView' should always be contained within a 'View' component.`,
                    answer: false,
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'To convert Java to JavaScript, you would use a compiler.',
                    answer: false
                }
            ]
        }
    }

    AsyncStorage.setItem(QUESTIONNAIRE_STORAGE_KEY, JSON.stringify(decks))
    return decks
}

export const getDecks = () =>  AsyncStorage.getItem(QUESTIONNAIRE_STORAGE_KEY)
                                            .then((result) => {
                                                return result === null ?
                                                    setInitData() :
                                                    JSON.parse(result)
                                            })

export const getDeck = ( id ) => AsyncStorage.getItem(QUESTIONNAIRE_STORAGE_KEY)
                                            .then(result => {
                                                const deck = result[id]
                                                return deck
                                            })

export const saveDeckTitle = ( title ) => {
    return AsyncStorage.getItem(QUESTIONNAIRE_STORAGE_KEY)
        .then((result) => {
            result = JSON.parse(result)
            result[title] = {
                title: title,
                questions: []
            }
            AsyncStorage.setItem(QUESTIONNAIRE_STORAGE_KEY,JSON.stringify(result))
            return title
        })
}

export const addCardToDeck = ( title, card ) => {
    return AsyncStorage.getItem(QUESTIONNAIRE_STORAGE_KEY)
        .then(result => {
            result = JSON.parse(result)
            result[title].questions.push(card)
            AsyncStorage.setItem(QUESTIONNAIRE_STORAGE_KEY,JSON.stringify(result))
            return title, card
        })
}