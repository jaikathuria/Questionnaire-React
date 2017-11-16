const FETCH_DECKS = 'FETCH_DECKS'

export const fetchDecks = (decks) => {
    return {
        type: FETCH_DECKS,
        data: decks,
    }
}

const ADD_DECK = 'ADD_DECK'

export const addDeck = (title) => {
    return {
        type: ADD_DECK,
        title
    }
}

const ADD_CARD = 'ADD_CARD'

export const addCard = (title, card) => {
    return {
        type: ADD_CARD,
        title,
        card,
    }
}

const START_QUIZ = 'START_QUIZ'

export const startQuiz = (deck) => {
    return {
        type: START_QUIZ,
        deck
    }
}

const CORRECT = 'CORRECT'
const INCORRECT = 'INCORRECT'
const SKIPPED = 'SKIPPED'

export const answer = (guess, ans) => {
    if (guess === ans) {
        return {
            type: CORRECT
        }
    }
    return {type: INCORRECT}
}

export const skip = () => {
    return {type: SKIPPED}
}

const RESTART = 'RESTART'
const END_QUIZ = 'END_QUIZ'

export const restart = () => {
    return {type: RESTART}
}

export const endQuiz = () => {
    return {type: END_QUIZ}
}
